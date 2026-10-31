import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BRAND_CONFIG } from '../../config/brand.config';

@Component({
  selector: 'app-whatsapp-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './whatsapp-button.component.html',
  styleUrl: './whatsapp-button.component.scss'
})
export class WhatsappButtonComponent {
  readonly whatsapp = BRAND_CONFIG.whatsapp;

  /**
   * The official ElevenLabs widget is positioned in the bottom-left corner,
   * while this WhatsApp button is positioned in the bottom-right corner
   * so they never overlap on desktop or mobile.
   */
  hasVoiceWidgetConfigured(): boolean {
    return false;
  }
}
