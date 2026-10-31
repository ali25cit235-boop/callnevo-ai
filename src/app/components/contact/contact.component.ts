import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { BRAND_CONFIG } from '../../config/brand.config';
import { INTEGRATIONS_CONFIG } from '../../config/integrations.config';

export type SubmissionState = 'idle' | 'submitting' | 'success' | 'error' | 'unconfigured';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  private readonly fb = inject(FormBuilder);
  private readonly http = inject(HttpClient);

  readonly whatsapp = BRAND_CONFIG.whatsapp;
  readonly endpointUrl = INTEGRATIONS_CONFIG.contactEndpointUrl.trim();
  readonly isBackendConfigured = computed<boolean>(() => this.endpointUrl.length > 0);

  readonly submissionState = signal<SubmissionState>('idle');
  readonly errorMessage = signal<string>('');

  readonly businessTypes = [
    'Dental Clinic',
    'Salon or Spa',
    'Restaurant or Hospitality',
    'Real Estate',
    'Home Services (HVAC, Plumbing, Electrical)',
    'Car Dealership or Automotive',
    'Medical Office',
    'Professional Services (Legal, Accounting, Advisory)',
    'Other Business'
  ];

  readonly contactForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    businessName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.pattern(/^[0-9+\-() .\s]{7,22}$/)]],
    businessType: ['', [Validators.required]],
    message: ['', [Validators.required, Validators.minLength(12)]]
  });

  isFieldInvalid(fieldName: keyof typeof this.contactForm.controls): boolean {
    const control = this.contactForm.controls[fieldName];
    return control.invalid && (control.dirty || control.touched);
  }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    if (!this.isBackendConfigured()) {
      // Honest state: never fake a form submission success when no backend endpoint is configured
      this.submissionState.set('unconfigured');
      return;
    }

    this.submissionState.set('submitting');
    this.errorMessage.set('');

    const payload = {
      ...this.contactForm.getRawValue(),
      submittedAt: new Date().toISOString(),
      source: 'CALLNIVO AI Website'
    };

    this.http.post(this.endpointUrl, payload).subscribe({
      next: () => {
        this.submissionState.set('success');
        this.contactForm.reset();
      },
      error: () => {
        this.submissionState.set('error');
        this.errorMessage.set(
          'Your inquiry could not be delivered to the configured endpoint. Please check your connection or try again later.'
        );
      }
    });
  }
}
