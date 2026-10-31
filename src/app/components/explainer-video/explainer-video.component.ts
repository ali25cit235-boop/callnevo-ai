import {
  Component,
  OnDestroy,
  ElementRef,
  ViewChild,
  inject,
  signal,
  computed,
  PLATFORM_ID
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { INTEGRATIONS_CONFIG } from '../../config/integrations.config';
import { UiStateService } from '../../services/ui-state.service';

export interface WalkthroughScene {
  step: number;
  badge: string;
  title: string;
  narration: string;
  callerLine?: string;
  aiLine?: string;
  systemNote: string;
}

@Component({
  selector: 'app-explainer-video',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './explainer-video.component.html',
  styleUrl: './explainer-video.component.scss'
})
export class ExplainerVideoComponent implements OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly sanitizer = inject(DomSanitizer);
  readonly uiState = inject(UiStateService);
  readonly config = INTEGRATIONS_CONFIG.explainerVideo;

  @ViewChild('explainerVideoEl', { static: false })
  explainerVideoEl?: ElementRef<HTMLVideoElement>;

  readonly isPlaying = signal<boolean>(false);
  readonly currentSceneIndex = signal<number>(0);
  readonly autoAdvancing = signal<boolean>(false);

  private walkthroughTimer?: ReturnType<typeof setInterval>;

  readonly scenes: WalkthroughScene[] = [
    {
      step: 1,
      badge: 'CHAPTER 01 • INCOMING CALL',
      title: '1. A Customer Calls a Business',
      narration:
        'A customer calls looking for an appointment or service information while the front desk is busy assisting guests in person.',
      callerLine: 'Dialing business main line...',
      systemNote: 'Incoming call detected • Zero hold music'
    },
    {
      step: 2,
      badge: 'CHAPTER 02 • INSTANT RECEPTION',
      title: '2. The AI Receptionist Answers',
      narration:
        'CALLNIVO AI answers promptly with a warm, natural greeting customized for the business.',
      aiLine: '“Thank you for calling! How can I help you today?”',
      systemNote: 'Natural voice reception active'
    },
    {
      step: 3,
      badge: 'CHAPTER 03 • INTENT UNDERSTANDING',
      title: '3. It Understands the Customer’s Request',
      narration:
        'The caller explains what they need in everyday language—no rigid phone trees or “press 1” menus required.',
      callerLine: '“Hi, I’d like to book a consultation for next week and check your parking options.”',
      systemNote: 'Identified dual intent: Consultation Request + Location FAQ'
    },
    {
      step: 4,
      badge: 'CHAPTER 04 • GUIDED INTAKE',
      title: '4. It Helps with Questions or Appointment Intake',
      narration:
        'The receptionist answers the parking question clearly and gathers preferred days, times, and contact details for the booking.',
      aiLine:
        '“We have free client parking right behind the building. Which day next week works best for your consultation, and what is the best number to reach you?”',
      systemNote: 'Answered routine question + collecting scheduling preferences'
    },
    {
      step: 5,
      badge: 'CHAPTER 05 • ORGANIZED HANDOFF',
      title: '5. It Organizes Useful Details for the Business',
      narration:
        'Once the call concludes, the business receives a structured summary with the caller’s name, phone number, service request, and preferred timing.',
      systemNote: 'Summary organized • Ready for staff follow-up'
    }
  ];

  readonly safeYoutubeUrl = computed<SafeResourceUrl | null>(() => {
    if (this.config.mode === 'youtube' && this.config.youtubeEmbedUrl.trim()) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(this.config.youtubeEmbedUrl.trim());
    }
    return null;
  });

  startExperience(): void {
    this.isPlaying.set(true);

    if (this.config.mode === 'video' && isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        const video = this.explainerVideoEl?.nativeElement;
        if (video) {
          video.muted = false;
          video.volume = 1.0;
          video.play().catch(() => {
            // Controls are visible so visitor can press play if browser requires second interaction
          });
        }
      }, 0);
      return;
    }

    if (this.config.mode === 'walkthrough' && !this.uiState.prefersReducedMotion()) {
      this.startAutoAdvance();
    }
  }

  selectScene(index: number): void {
    this.stopAutoAdvance();
    this.currentSceneIndex.set(index);
  }

  nextScene(): void {
    this.stopAutoAdvance();
    this.currentSceneIndex.update((i) => (i + 1) % this.scenes.length);
  }

  prevScene(): void {
    this.stopAutoAdvance();
    this.currentSceneIndex.update((i) => (i - 1 + this.scenes.length) % this.scenes.length);
  }

  toggleAutoAdvance(): void {
    if (this.autoAdvancing()) {
      this.stopAutoAdvance();
    } else {
      this.startAutoAdvance();
    }
  }

  private startAutoAdvance(): void {
    this.stopAutoAdvance();
    this.autoAdvancing.set(true);
    this.walkthroughTimer = setInterval(() => {
      this.currentSceneIndex.update((i) => (i + 1) % this.scenes.length);
    }, 4500);
  }

  private stopAutoAdvance(): void {
    this.autoAdvancing.set(false);
    if (this.walkthroughTimer) {
      clearInterval(this.walkthroughTimer);
      this.walkthroughTimer = undefined;
    }
  }

  ngOnDestroy(): void {
    this.stopAutoAdvance();
  }
}
