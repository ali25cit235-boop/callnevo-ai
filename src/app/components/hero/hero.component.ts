import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  inject,
  signal,
  computed,
  PLATFORM_ID
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';
import { BRAND_CONFIG } from '../../config/brand.config';
import { INTEGRATIONS_CONFIG } from '../../config/integrations.config';
import { UiStateService } from '../../services/ui-state.service';
import { AiOrbComponent } from '../ai-orb/ai-orb.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, AiOrbComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent implements OnInit, AfterViewInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  readonly uiState = inject(UiStateService);
  readonly brand = BRAND_CONFIG;
  readonly videoConfig = INTEGRATIONS_CONFIG.heroVideo;

  @ViewChild('heroSection', { static: true }) heroSection!: ElementRef<HTMLElement>;
  @ViewChild('heroVideoEl', { static: false }) heroVideoEl?: ElementRef<HTMLVideoElement>;

  readonly videoFailedOrConstrained = signal<boolean>(false);
  readonly isMobileViewport = signal<boolean>(false);
  readonly isVideoLoaded = signal<boolean>(false);

  readonly shouldPlayBackgroundVideo = computed<boolean>(() => {
    if (!this.videoConfig.enabled) {
      return false;
    }
    if (this.uiState.prefersReducedMotion() || this.videoFailedOrConstrained()) {
      return false;
    }
    return true;
  });

  /**
   * Selects ONLY the single video source matching the current viewport:
   * - <= 767px: assets/videos/hero-mobile.mp4 (9:16)
   * - > 767px: assets/videos/hero-desktop.mp4 (16:9)
   */
  readonly activeVideoSrc = computed<string>(() => {
    if (!isPlatformBrowser(this.platformId) || !this.shouldPlayBackgroundVideo()) {
      return '';
    }
    return this.isMobileViewport()
      ? this.videoConfig.mobileMp4Url
      : this.videoConfig.desktopMp4Url;
  });

  private gsapCtx?: gsap.Context;
  private mobileMediaQuery?: MediaQueryList;
  private readonly onViewportBreakpointChange = (event: MediaQueryListEvent): void => {
    const nextIsMobile = event.matches;
    if (this.isMobileViewport() !== nextIsMobile) {
      this.isVideoLoaded.set(false);
      this.isMobileViewport.set(nextIsMobile);
      setTimeout(() => this.reloadAndPlayVideo(), 0);
    }
  };

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.checkConstrainedConnection();

    this.mobileMediaQuery = window.matchMedia('(max-width: 767px)');
    this.isMobileViewport.set(this.mobileMediaQuery.matches);
    this.mobileMediaQuery.addEventListener('change', this.onViewportBreakpointChange);
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.reloadAndPlayVideo();

    if (this.uiState.prefersReducedMotion()) {
      return;
    }

    this.gsapCtx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('.hero-eyebrow', {
        y: 20,
        opacity: 0,
        duration: 0.65
      })
        .from(
          '.hero-word',
          {
            y: 36,
            opacity: 0,
            rotateX: -20,
            stagger: 0.065,
            duration: 0.75
          },
          '-=0.35'
        )
        .from(
          '.hero-subheadline',
          {
            y: 22,
            opacity: 0,
            duration: 0.7
          },
          '-=0.45'
        )
        .from(
          '.hero-cta-group .btn',
          {
            y: 18,
            opacity: 0,
            stagger: 0.12,
            duration: 0.6
          },
          '-=0.45'
        )
        .from(
          '.hero-trust-strip',
          {
            y: 14,
            opacity: 0,
            duration: 0.6
          },
          '-=0.35'
        )
        .from(
          '.hero-visual-column',
          {
            scale: 0.92,
            opacity: 0,
            duration: 0.95
          },
          '-=0.85'
        )
        .from(
          '.floating-telemetry-card',
          {
            y: 24,
            opacity: 0,
            stagger: 0.16,
            duration: 0.7
          },
          '-=0.5'
        );
    }, this.heroSection.nativeElement);
  }

  onVideoLoaded(): void {
    this.isVideoLoaded.set(true);
  }

  onVideoError(): void {
    this.videoFailedOrConstrained.set(true);
  }

  onPrimaryCta(event: Event): void {
    event.preventDefault();
    this.uiState.scrollToSection('live-demo');
  }

  onSecondaryCta(event: Event): void {
    event.preventDefault();
    this.uiState.scrollToSection('how-it-works');
  }

  onScrollIndicatorClick(event: Event): void {
    event.preventDefault();
    this.uiState.scrollToSection('how-it-works');
  }

  private reloadAndPlayVideo(): void {
    if (!this.shouldPlayBackgroundVideo()) {
      return;
    }
    const videoEl = this.heroVideoEl?.nativeElement;
    if (!videoEl) {
      return;
    }
    videoEl.muted = true;
    videoEl.defaultMuted = true;
    videoEl.playsInline = true;
    videoEl.loop = true;
    videoEl.load();
    const playPromise = videoEl.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay blocked by browser policy or power-saving mode: keep static fallback visible
      });
    }
  }

  private checkConstrainedConnection(): void {
    const nav = navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    };
    if (nav.connection) {
      const { saveData, effectiveType } = nav.connection;
      if (saveData || effectiveType === 'slow-2g' || effectiveType === '2g') {
        this.videoFailedOrConstrained.set(true);
      }
    }
  }

  ngOnDestroy(): void {
    if (this.mobileMediaQuery) {
      this.mobileMediaQuery.removeEventListener('change', this.onViewportBreakpointChange);
    }
    this.gsapCtx?.revert();
  }
}
