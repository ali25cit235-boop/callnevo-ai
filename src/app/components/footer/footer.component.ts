import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BRAND_CONFIG } from '../../config/brand.config';
import { UiStateService } from '../../services/ui-state.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  readonly uiState = inject(UiStateService);
  readonly brand = BRAND_CONFIG;
  readonly currentYear = new Date().getFullYear();

  scrollTo(sectionId: string, event: Event): void {
    event.preventDefault();
    this.uiState.scrollToSection(sectionId);
  }
}
