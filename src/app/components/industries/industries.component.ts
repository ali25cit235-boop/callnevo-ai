import {
  Component,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  inject,
  computed,
  PLATFORM_ID
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { INDUSTRIES_CONFIG, IndustryExample } from '../../config/industries.config';
import { UiStateService } from '../../services/ui-state.service';

@Component({
  selector: 'app-industries',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './industries.component.html',
  styleUrl: './industries.component.scss'
})
export class IndustriesComponent implements AfterViewInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  readonly uiState = inject(UiStateService);

  @ViewChild('industriesSection', { static: true }) industriesSection!: ElementRef<HTMLElement>;

  readonly industries: IndustryExample[] = INDUSTRIES_CONFIG;

  readonly selectedIndustry = computed<IndustryExample>(() => {
    const id = this.uiState.selectedIndustryId();
    return this.industries.find((item) => item.id === id) ?? this.industries[0];
  });

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
      gsap.from('.ind-header-reveal', {
        scrollTrigger: {
          trigger: this.industriesSection.nativeElement,
          start: 'top 80%'
        },
        y: 26,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out'
      });

      gsap.from('.industry-card', {
        scrollTrigger: {
          trigger: '.industries-cards-grid',
          start: 'top 84%'
        },
        y: 24,
        opacity: 0,
        duration: 0.6,
        stagger: 0.06,
        ease: 'power2.out'
      });
    }, this.industriesSection.nativeElement);
  }

  selectIndustry(industry: IndustryExample): void {
    this.uiState.selectedIndustryId.set(industry.id);
  }

  exploreInLiveDemo(industry: IndustryExample, event: Event): void {
    event.stopPropagation();
    this.uiState.selectedIndustryId.set(industry.id);
    this.uiState.launchDemoWithPrompt(industry.samplePromptForDemo);
  }

  ngOnDestroy(): void {
    this.gsapCtx?.revert();
  }
}
