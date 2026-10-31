import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { INTEGRATIONS_CONFIG } from '../../config/integrations.config';
import { UiStateService } from '../../services/ui-state.service';

@Component({
  selector: 'app-final-cta',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './final-cta.component.html',
  styleUrl: './final-cta.component.scss'
})
export class FinalCtaComponent {
  readonly uiState = inject(UiStateService);
  readonly calComBookingUrl = INTEGRATIONS_CONFIG.calComBookingUrl;

  onTestAi(event: Event): void {
    event.preventDefault();
    this.uiState.scrollToSection('live-demo');
  }

  onBookConsultation(event: Event): void {
    event.preventDefault();
    this.uiState.openBookingExperience(this.calComBookingUrl);
  }

  goToContactFromModal(event: Event): void {
    event.preventDefault();
    this.uiState.closeBookingModal();
    this.uiState.scrollToSection('contact');
  }
}
