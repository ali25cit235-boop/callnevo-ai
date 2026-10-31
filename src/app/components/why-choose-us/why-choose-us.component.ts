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
import { WHY_CHOOSE_CONFIG, WhyChooseItem } from '../../config/faq.config';
import { UiStateService } from '../../services/ui-state.service';

@Component({
  selector: 'app-why-choose-us',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './why-choose-us.component.html',
  styleUrl: './why-choose-us.component.scss'
})
export class WhyChooseUsComponent implements AfterViewInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  readonly uiState = inject(UiStateService);

  @ViewChild('whySection', { static: true }) whySection!: ElementRef<HTMLElement>;

  readonly pillars: WhyChooseItem[] = WHY_CHOOSE_CONFIG;
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
      gsap.from('.why-panel', {
        scrollTrigger: {
          trigger: '.why-panels-grid',
          start: 'top 84%'
        },
        y: 28,
        opacity: 0,
        duration: 0.65,
        stagger: 0.1,
        ease: 'power3.out'
      });
    }, this.whySection.nativeElement);
  }

  ngOnDestroy(): void {
    this.gsapCtx?.revert();
  }
}
