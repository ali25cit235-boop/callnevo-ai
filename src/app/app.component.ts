import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';
import { HowItWorksComponent } from './components/how-it-works/how-it-works.component';
import { FeaturesComponent } from './components/features/features.component';
import { IndustriesComponent } from './components/industries/industries.component';
import { VoiceDemoComponent } from './components/voice-demo/voice-demo.component';
import { ExplainerVideoComponent } from './components/explainer-video/explainer-video.component';
import { WhyChooseUsComponent } from './components/why-choose-us/why-choose-us.component';
import { FinalCtaComponent } from './components/final-cta/final-cta.component';
import { ContactComponent } from './components/contact/contact.component';
import { FaqComponent } from './components/faq/faq.component';
import { FooterComponent } from './components/footer/footer.component';
import { WhatsappButtonComponent } from './components/whatsapp-button/whatsapp-button.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    HeroComponent,
    HowItWorksComponent,
    FeaturesComponent,
    IndustriesComponent,
    VoiceDemoComponent,
    ExplainerVideoComponent,
    WhyChooseUsComponent,
    FinalCtaComponent,
    ContactComponent,
    FaqComponent,
    FooterComponent,
    WhatsappButtonComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'CALLNIVO AI';
}
