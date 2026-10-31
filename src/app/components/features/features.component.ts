import {
  Component,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  inject,
  PLATFORM_ID
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FEATURES_CONFIG, FeatureBentoItem } from '../../config/features.config';
import { UiStateService } from '../../services/ui-state.service';

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './features.component.html',
  styleUrl: './features.component.scss'
})
export class FeaturesComponent implements AfterViewInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  readonly uiState = inject(UiStateService);

  @ViewChild('featuresSection', { static: true }) featuresSection!: ElementRef<HTMLElement>;

  readonly features: FeatureBentoItem[] = FEATURES_CONFIG;
  private gsapCtx?: gsap.Context;

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    if (this.uiState.prefersReducedMotion()) {
      return;
    }

    this.gsapCtx = gsap.context(() => {
      gsap.from('.features-header-reveal', {
        scrollTrigger: {
          trigger: this.featuresSection.nativeElement,
          start: 'top 80%'
        },
        y: 28,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out'
      });

      gsap.from('.bento-card', {
        scrollTrigger: {
          trigger: '.bento-grid',
          start: 'top 82%'
        },
        y: 34,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power3.out'
      });
    }, this.featuresSection.nativeElement);
  }

  onCardMouseMove(event: MouseEvent, cardEl: HTMLElement): void {
    const rect = cardEl.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    cardEl.style.setProperty('--mouse-x', `${x}px`);
    cardEl.style.setProperty('--mouse-y', `${y}px`);
  }

  ngOnDestroy(): void {
    this.gsapCtx?.revert();
  }
}
