import {
  Component,
  Input,
  HostListener,
  inject,
  signal,
  computed
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiStateService } from '../../services/ui-state.service';

export type OrbState = 'idle' | 'active' | 'reduced-motion';
export type OrbSize = 'sm' | 'md' | 'lg' | 'hero';

@Component({
  selector: 'app-ai-orb',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ai-orb.component.html',
  styleUrl: './ai-orb.component.scss'
})
export class AiOrbComponent {
  private readonly uiState = inject(UiStateService);

  @Input() state: OrbState = 'idle';
  @Input() size: OrbSize = 'hero';
  @Input() statusText = 'AI Receptionist Ready';
  @Input() enableParallax = true;
  @Input() showStatusPill = true;

  readonly offsetX = signal<number>(0);
  readonly offsetY = signal<number>(0);

  readonly effectiveState = computed<OrbState>(() => {
    if (this.uiState.prefersReducedMotion() || this.state === 'reduced-motion') {
      return 'reduced-motion';
    }
    return this.state;
  });

  readonly transformStyle = computed<string>(() => {
    if (this.effectiveState() === 'reduced-motion' || !this.enableParallax) {
      return 'translate3d(0px, 0px, 0px)';
    }
    return `translate3d(${this.offsetX()}px, ${this.offsetY()}px, 0px)`;
  });

  readonly waveformBars = [
    { delay: '0s', height: 28 },
    { delay: '0.12s', height: 48 },
    { delay: '0.24s', height: 74 },
    { delay: '0.08s', height: 60 },
    { delay: '0.32s', height: 92 },
    { delay: '0.18s', height: 100 },
    { delay: '0.28s', height: 84 },
    { delay: '0.15s', height: 64 },
    { delay: '0.36s', height: 46 },
    { delay: '0.05s', height: 30 }
  ];

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (
      !this.enableParallax ||
      this.effectiveState() === 'reduced-motion' ||
      typeof window === 'undefined' ||
      window.innerWidth < 1024
    ) {
      return;
    }
    const normX = (event.clientX / window.innerWidth - 0.5) * 2;
    const normY = (event.clientY / window.innerHeight - 0.5) * 2;
    this.offsetX.set(Math.round(normX * 14 * 10) / 10);
    this.offsetY.set(Math.round(normY * 14 * 10) / 10);
  }
}
