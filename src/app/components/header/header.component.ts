import { Component, HostListener, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BRAND_CONFIG, NavItem } from '../../config/brand.config';
import { UiStateService } from '../../services/ui-state.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  readonly uiState = inject(UiStateService);
  readonly brand = BRAND_CONFIG;

  readonly isScrolled = signal<boolean>(false);
  readonly mobileMenuOpen = signal<boolean>(false);

  @HostListener('window:scroll')
  onWindowScroll(): void {
    if (typeof window === 'undefined') {
      return;
    }
    this.isScrolled.set(window.scrollY > 28);
    this.updateActiveSectionOnScroll();
  }

  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    if (this.mobileMenuOpen()) {
      this.mobileMenuOpen.set(false);
    }
  }

  navigateTo(item: NavItem, event: Event): void {
    event.preventDefault();
    this.mobileMenuOpen.set(false);
    this.uiState.scrollToSection(item.sectionId);
  }

  goToLiveDemo(event: Event): void {
    event.preventDefault();
    this.mobileMenuOpen.set(false);
    this.uiState.scrollToSection('live-demo');
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen.update((open) => !open);
  }

  private updateActiveSectionOnScroll(): void {
    const scrollPos = window.scrollY + 180;
    for (let i = this.brand.navItems.length - 1; i >= 0; i--) {
      const sectionId = this.brand.navItems[i].sectionId;
      const el = document.getElementById(sectionId);
      if (el && el.offsetTop <= scrollPos) {
        this.uiState.activeSection.set(sectionId);
        return;
      }
    }
  }
}
