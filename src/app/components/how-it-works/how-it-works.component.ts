import {
  Component,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  inject,
  signal,
  PLATFORM_ID
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { UiStateService } from '../../services/ui-state.service';
import { AiOrbComponent } from '../ai-orb/ai-orb.component';

export interface ProcessStep {
  stepNumber: string;
  index: number;
  title: string;
  subtitle: string;
  description: string;
  visualBadge: string;
  detailPoints: string[];
}

@Component({
  selector: 'app-how-it-works',
  standalone: true,
  imports: [CommonModule, AiOrbComponent],
  templateUrl: './how-it-works.component.html',
  styleUrl: './how-it-works.component.scss'
})
export class HowItWorksComponent implements AfterViewInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  readonly uiState = inject(UiStateService);

  @ViewChild('howSection', { static: true }) howSection!: ElementRef<HTMLElement>;

  readonly activeStepIndex = signal<number>(0);

  readonly steps: ProcessStep[] = [
    {
      stepNumber: 'STEP 01',
      index: 0,
      title: 'A Customer Calls',
      subtitle: 'Daytime rush, busy lines, or after hours',
      description:
        'A prospective or returning customer dials your business number looking for answers, availability, or assistance.',
      visualBadge: 'INCOMING VOICE SIGNAL',
      detailPoints: [
        'Works during peak front-desk hours or outside operating hours',
        'Helps prevent callers from reaching an unanswered line'
      ]
    },
    {
      stepNumber: 'STEP 02',
      index: 1,
      title: 'Your AI Receptionist Answers',
      subtitle: 'Prompt, natural, brand-aligned greeting',
      description:
        'CALLNIVO AI answers with a calm, welcoming voice tailored to your business name, tone, and greeting guidelines.',
      visualBadge: 'AI VOICE RECEPTION ACTIVE',
      detailPoints: [
        'Custom business greeting and conversational persona',
        'Engages the caller immediately in natural spoken dialogue'
      ]
    },
    {
      stepNumber: 'STEP 03',
      index: 2,
      title: 'The AI Handles Questions and Requests',
      subtitle: 'Guided answers and structured intake',
      description:
        'The receptionist answers common questions about your services, hours, or location and gathers key details for appointments or callbacks.',
      visualBadge: 'INTENT & INTAKE DIALOGUE',
      detailPoints: [
        'Answers routine questions using your configured business info',
        'Asks relevant qualifying and scheduling intake questions'
      ]
    },
    {
      stepNumber: 'STEP 04',
      index: 3,
      title: 'Your Business Receives Organized Information',
      subtitle: 'Clear conversation details for your team',
      description:
        'Caller details, request context, and preferred timing are structured clearly so your staff can review and follow up with confidence.',
      visualBadge: 'STRUCTURED INQUIRY SUMMARY',
      detailPoints: [
        'Captures caller name, contact preference, and service intent',
        'Creates an organized record ready for staff follow-up'
      ]
    }
  ];

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
      gsap.from('.how-header-reveal', {
        scrollTrigger: {
          trigger: this.howSection.nativeElement,
          start: 'top 80%'
        },
        y: 28,
        opacity: 0,
        duration: 0.75,
        stagger: 0.12,
        ease: 'power3.out'
      });

      const stepCards = gsap.utils.toArray<HTMLElement>('.step-card');
      stepCards.forEach((card, idx) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 86%',
            onEnter: () => this.activeStepIndex.set(idx),
            onEnterBack: () => this.activeStepIndex.set(idx)
          },
          y: 26,
          opacity: 0,
          duration: 0.65,
          ease: 'power2.out'
        });
      });

      gsap.from('.pipeline-visualizer-card', {
        scrollTrigger: {
          trigger: '.pipeline-visualizer-card',
          start: 'top 82%'
        },
        scale: 0.96,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      });
    }, this.howSection.nativeElement);
  }

  selectStep(index: number): void {
    this.activeStepIndex.set(index);
  }

  ngOnDestroy(): void {
    this.gsapCtx?.revert();
  }
}
