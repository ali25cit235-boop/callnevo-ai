import { Injectable, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UiStateService {
  private readonly platformId = inject(PLATFORM_ID);

  /** Currently active section ID in the viewport for navbar highlight */
  readonly activeSection = signal<string>('home');

  /** Selected prompt or industry context passed to the Live AI Demo section */
  readonly selectedDemoPrompt = signal<string>('Act like a dental receptionist.');

  /** Selected industry ID in the Industry Showcase */
  readonly selectedIndustryId = signal<string>('dental-clinics');

  /** Whether the user's OS/browser prefers reduced motion */
  readonly prefersReducedMotion = signal<boolean>(false);

  /** Whether the Cal.com consultation info modal is open (when booking URL is not yet configured) */
  readonly bookingModalOpen = signal<boolean>(false);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      this.prefersReducedMotion.set(mediaQuery.matches);
      mediaQuery.addEventListener('change', (event) => {
        this.prefersReducedMotion.set(event.matches);
      });
    }
  }

  scrollToSection(sectionId: string): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    const cleanId = sectionId.replace(/^#/, '');
    const element = document.getElementById(cleanId);
    if (element) {
      this.activeSection.set(cleanId);
      const behavior: ScrollBehavior = this.prefersReducedMotion() ? 'auto' : 'smooth';
      const headerOffset = 88;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = Math.max(0, elementPosition - headerOffset);

      window.scrollTo({
        top: cleanId === 'home' ? 0 : offsetPosition,
        behavior
      });
    }
  }

  launchDemoWithPrompt(prompt: string): void {
    this.selectedDemoPrompt.set(prompt);
    this.scrollToSection('live-demo');
  }

  openBookingExperience(calComUrl: string): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    const trimmed = calComUrl.trim();
    if (trimmed && /^https?:\/\//i.test(trimmed)) {
      window.open(trimmed, '_blank', 'noopener,noreferrer');
    } else {
      this.bookingModalOpen.set(true);
    }
  }

  closeBookingModal(): void {
    this.bookingModalOpen.set(false);
  }
}
