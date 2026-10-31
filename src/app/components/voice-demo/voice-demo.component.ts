import {
  Component,
  AfterViewInit,
  OnDestroy,
  inject,
  signal,
  computed,
  PLATFORM_ID
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { INTEGRATIONS_CONFIG } from '../../config/integrations.config';
import { UiStateService } from '../../services/ui-state.service';
import { AiOrbComponent } from '../ai-orb/ai-orb.component';

export interface SamplePromptCard {
  id: string;
  category: string;
  prompt: string;
  hint: string;
}

@Component({
  selector: 'app-voice-demo',
  standalone: true,
  imports: [CommonModule, AiOrbComponent],
  templateUrl: './voice-demo.component.html',
  styleUrl: './voice-demo.component.scss'
})
export class VoiceDemoComponent implements AfterViewInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  readonly uiState = inject(UiStateService);

  readonly agentId = INTEGRATIONS_CONFIG.elevenLabsAgentId.trim();
  readonly shareableDemoUrl = INTEGRATIONS_CONFIG.elevenLabsShareableDemoUrl.trim();

  readonly isAgentConfigured = computed<boolean>(() => this.agentId.length > 0);
  readonly hasShareableBackupUrl = computed<boolean>(
    () => this.shareableDemoUrl.length > 0 && /^https?:\/\//i.test(this.shareableDemoUrl)
  );

  /** Tracks whether the global <elevenlabs-convai> widget in index.html initialized */
  readonly widgetReady = signal<boolean>(true);
  readonly widgetFailed = signal<boolean>(false);
  readonly launcherHighlighted = signal<boolean>(false);
  readonly copiedPromptFeedback = signal<boolean>(false);

  private checkTimer?: ReturnType<typeof setTimeout>;
  private highlightTimer?: ReturnType<typeof setTimeout>;

  readonly samplePrompts: SamplePromptCard[] = [
    {
      id: 'dental',
      category: 'Dental Clinic',
      prompt: 'Act like a dental receptionist.',
      hint: 'Test new-patient cleaning & exam intake'
    },
    {
      id: 'restaurant',
      category: 'Hospitality',
      prompt: "Pretend you're answering restaurant calls.",
      hint: 'Test party size, table bookings & dining questions'
    },
    {
      id: 'realestate',
      category: 'Real Estate',
      prompt: 'Handle a real estate customer inquiry.',
      hint: 'Test property tour scheduling & buyer qualification'
    },
    {
      id: 'callnivo',
      category: 'Product Overview',
      prompt: 'Tell me how CALLNIVO AI works.',
      hint: 'Learn how CALLNIVO AI supports businesses'
    }
  ];

  readonly visualizerBars = [32, 54, 78, 45, 92, 68, 88, 100, 74, 58, 82, 46, 64, 90, 52, 36];

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    // Verify that the single <elevenlabs-convai> element in index.html is present and defined
    this.checkTimer = setTimeout(() => {
      const widgetEl = document.querySelector('elevenlabs-convai');
      const isCustomElementDefined =
        typeof window.customElements !== 'undefined' &&
        Boolean(window.customElements.get('elevenlabs-convai'));

      if (!widgetEl) {
        this.widgetFailed.set(true);
        this.widgetReady.set(false);
      } else if (isCustomElementDefined) {
        this.widgetReady.set(true);
        this.widgetFailed.set(false);
      } else {
        // Wait for customElements.whenDefined if network is still fetching the script
        window.customElements
          ?.whenDefined('elevenlabs-convai')
          .then(() => {
            this.widgetReady.set(true);
            this.widgetFailed.set(false);
          })
          .catch(() => {
            this.widgetFailed.set(true);
            this.widgetReady.set(false);
          });
      }
    }, 3500);
  }

  selectSamplePrompt(prompt: string): void {
    this.uiState.selectedDemoPrompt.set(prompt);
    this.copiedPromptFeedback.set(false);
  }

  copySelectedPrompt(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    const text = this.uiState.selectedDemoPrompt();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        this.copiedPromptFeedback.set(true);
        setTimeout(() => this.copiedPromptFeedback.set(false), 2200);
      });
    }
  }

  /**
   * Guides the visitor directly to the official ElevenLabs native launcher
   * in the bottom-left corner without claiming an unsupported programmatic open method.
   */
  guideToNativeWidget(): void {
    this.launcherHighlighted.set(true);

    if (isPlatformBrowser(this.platformId)) {
      const widgetEl = document.querySelector('elevenlabs-convai') as HTMLElement | null;
      if (widgetEl) {
        widgetEl.classList.add('callnivo-widget-spotlight');
      }
      if (this.highlightTimer) {
        clearTimeout(this.highlightTimer);
      }
      this.highlightTimer = setTimeout(() => {
        this.launcherHighlighted.set(false);
        widgetEl?.classList.remove('callnivo-widget-spotlight');
      }, 6000);
    }
  }

  ngOnDestroy(): void {
    if (this.checkTimer) {
      clearTimeout(this.checkTimer);
    }
    if (this.highlightTimer) {
      clearTimeout(this.highlightTimer);
    }
  }
}
