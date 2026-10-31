import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FAQ_CONFIG, FaqItem } from '../../config/faq.config';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss'
})
export class FaqComponent {
  readonly faqs: FaqItem[] = FAQ_CONFIG;
  readonly openId = signal<string | null>(FAQ_CONFIG[0]?.id ?? null);

  toggleItem(id: string): void {
    this.openId.update((current) => (current === id ? null : id));
  }
}
