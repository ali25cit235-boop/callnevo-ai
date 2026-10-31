# CALLNIVO AI — AI Receptionists & Voice AI Agency Website

> **"Every Call Counts. Make Every Conversation Matter."**

A futuristic, static-first **Angular 19** SaaS & AI Agency website built for **CALLNIVO AI**. Designed with standalone Angular components, GSAP & ScrollTrigger motion choreography, an interactive SVG/CSS `AiOrbComponent`, industry-specific scripted conversation previews, an ElevenLabs Conversational AI integration-ready demo console, and Cloudflare Pages deployment configuration.

---

## Table of Contents

1. [How to Run the Website Locally](#1-how-to-run-the-website-locally)
2. [Project Architecture & Configuration Files](#2-project-architecture--configuration-files)
3. [How to Replace the Logo and Brand Assets](#3-how-to-replace-the-logo-and-brand-assets)
4. [How to Add or Replace Background & Explainer Videos](#4-how-to-add-or-replace-background--explainer-videos)
5. [How to Add an ElevenLabs Agent ID (Live Voice Demo)](#5-how-to-add-an-elevenlabs-agent-id-live-voice-demo)
6. [How to Connect a Cal.com Booking Link](#6-how-to-connect-a-calcom-booking-link)
7. [How to Connect a Contact Form Backend](#7-how-to-connect-a-contact-form-backend)
8. [How to Deploy to Cloudflare Pages](#8-how-to-deploy-to-cloudflare-pages)
9. [How to Connect a Custom Domain on Cloudflare Pages](#9-how-to-connect-a-custom-domain-on-cloudflare-pages)

---

## 1. How to Run the Website Locally

### Prerequisites
- **Node.js**: v20 LTS or v22 LTS (Node v22.14.0 LTS is pre-configured on this machine)
- **npm**: v10+

### Install Dependencies
Open a terminal in the project root directory and run:

```bash
npm install
```

### Start the Local Development Server
```bash
npm start
```
Then open **`http://localhost:4200/`** in your browser. The app will automatically reload whenever you edit any source file under `src/`.

### Run a Production Build Locally
```bash
npm run build
```
This compiles and optimizes the static application into **`dist/callnivo-ai/browser`**.

---

## 2. Project Architecture & Configuration Files

All customizable brand details, external integration IDs, video paths, industry scripts, and FAQ items are cleanly separated under `src/app/config/`:

| Configuration File | Purpose |
| :--- | :--- |
| `src/app/config/brand.config.ts` | Brand name, tagline, hero headlines, canonical domain, and navbar links. |
| `src/app/config/integrations.config.ts` | **ElevenLabs Agent ID**, **Cal.com URL**, **Contact Form Endpoint**, and **Video Asset Paths**. |
| `src/app/config/industries.config.ts` | All 8 industry cards, sample caller questions, AI responses, and scripted multi-turn conversations. |
| `src/app/config/features.config.ts` | All 8 bento-grid capability cards and custom visual illustration types. |
| `src/app/config/faq.config.ts` | All 7 FAQ items and the 5 "Why CALLNIVO AI" differentiation pillars. |

---

## 3. How to Replace the Logo and Brand Assets

1. **Favicon / App Icon**:
   - Replace `public/favicon.svg` and `public/favicon.ico` with your custom vector/icon files.
2. **Header & Footer Brand Mark**:
   - Edit `src/app/components/header/header.component.html` and `src/app/components/footer/footer.component.html` to swap the inline `<svg>` mark with your custom SVG or `<img src="assets/logo.svg" alt="CALLNIVO AI">`.
3. **Brand Text & Tagline**:
   - Open `src/app/config/brand.config.ts` and update `name`, `tagline`, or `domain`.

---

## 4. How to Add or Replace Background & Explainer Videos

### Included Hero Background Video & License Record
- **Files**:
  - `public/assets/videos/hero-bg.mp4`
  - `public/assets/videos/hero-bg.webm`
  - `public/assets/videos/hero-poster.jpg`
- **Source & License**: Original procedural neural wave visual generated specifically for CALLNIVO AI (`#050816`, `#3B82F6`, `#22D3EE`, `#8B5CF6`). 100% owned and authorized for commercial reuse with zero third-party copyright restrictions.

### Replacing the Hero Background Video
1. Place your optimized silent `.mp4`, `.webm`, and poster `.jpg` inside `public/assets/videos/`.
2. Open `src/app/config/integrations.config.ts` and update `heroVideo`:
   ```ts
   heroVideo: {
     enabled: true,
     mp4Url: 'assets/videos/your-video.mp4',
     webmUrl: 'assets/videos/your-video.webm',
     posterUrl: 'assets/videos/your-poster.jpg',
     attribution: 'Your license/source note'
   }
   ```
3. To use only the animated CSS/SVG aurora background without a video file, set `enabled: false`.

### Connecting a Narrated Explainer Video (`See CALLNIVO AI in Action`)
By default, the Explainer Video section uses an interactive 5-step illustrated walkthrough (`mode: 'walkthrough'`).
- **To use a self-hosted MP4 file**: Put the video in `public/assets/videos/explainer.mp4` and set `mode: 'video'` and `mp4Url: 'assets/videos/explainer.mp4'` in `src/app/config/integrations.config.ts`.
- **To use an authorized YouTube embed**: Set `mode: 'youtube'` and `youtubeEmbedUrl: 'https://www.youtube-nocookie.com/embed/YOUR_VIDEO_ID'` in `src/app/config/integrations.config.ts`.

---

## 5. How to Add an ElevenLabs Agent ID (Live Voice Demo)

The `VoiceDemoComponent` (`src/app/components/voice-demo/`) is ready for the official ElevenLabs Conversational AI widget (`<elevenlabs-convai>`).

1. Sign in to your ElevenLabs dashboard and create/select your **Conversational AI Agent**.
2. Make sure your agent is configured for public web embedding and add your website domain (e.g., `localhost`, `*.pages.dev`, `callnivo.ai`) to the ElevenLabs **Allowed Domains** list.
3. Copy your public **Agent ID** (do **NOT** copy your secret ElevenLabs API key into browser code).
4. Open `src/app/config/integrations.config.ts` and paste your Agent ID:
   ```ts
   elevenLabsAgentId: 'your_public_agent_id_here',
   ```
5. Save and rebuild. When visitors click **"Start Live Demo"**, the website will dynamically load `https://elevenlabs.io/convai-widget/index.js` and mount the live voice widget. When left empty (`''`), the site displays an honest **"Live Demo Coming Soon"** preview state.

---

## 6. How to Connect a Cal.com Booking Link

1. Copy your public Cal.com scheduling link (for example, `https://cal.com/callnivo/consultation`).
2. Open `src/app/config/integrations.config.ts` and update:
   ```ts
   calComBookingUrl: 'https://cal.com/your-handle/consultation',
   ```
3. Once set, clicking **"Book a Consultation"** in the Final CTA section will open your Cal.com scheduling page in a new tab. When left empty (`''`), clicking the button opens a transparent setup status modal instead of a broken link.

---

## 7. How to Connect a Contact Form Backend

The Contact section uses Angular Reactive Forms with field validation and never displays a fake submission success message.

1. Deploy a Cloudflare Worker, Formspree endpoint, or webhook route that accepts `POST` JSON requests (`name`, `businessName`, `email`, `phone`, `businessType`, `message`).
2. Open `src/app/config/integrations.config.ts` and set:
   ```ts
   contactEndpointUrl: 'https://your-worker.your-subdomain.workers.dev/contact',
   ```
3. Once configured, submitting the form will send an HTTP `POST` request with loading, success, and error states.

---

## 8. How to Deploy to Cloudflare Pages

This Angular 19 project is built as a static Single-Page Application (SPA) with a `public/_redirects` fallback file already included.

### Step 1: Push Your Project to GitHub
```bash
git init
git add .
git commit -m "Initial commit: CALLNIVO AI Angular website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/callnivo-ai-website.git
git push -u origin main
```

### Step 2: Create a Cloudflare Pages Project
1. Log in to the [Cloudflare Dashboard](https://dash.cloudflare.com/) and go to **Workers & Pages** -> **Create application** -> **Pages** -> **Connect to Git**.
2. Select your `callnivo-ai-website` GitHub repository.
3. Configure the **Build settings**:
   - **Framework preset**: `Angular` (or `None`)
   - **Build command**: `npm run build`
   - **Build output directory**: `dist/callnivo-ai/browser`
   - **Environment variables**: Add `NODE_VERSION` = `22`
4. Click **Save and Deploy**.
5. Cloudflare Pages will install dependencies, run `npm run build`, and publish your site to a free `*.pages.dev` subdomain.

---

## 9. How to Connect a Custom Domain on Cloudflare Pages

1. Inside your Cloudflare Pages project dashboard, open the **Custom domains** tab.
2. Click **Set up a custom domain**.
3. Enter your domain (e.g., `callnivo.ai` or `www.callnivo.ai`) and click **Continue**.
4. If your domain DNS is already managed in Cloudflare, Cloudflare will automatically add the required `CNAME` record and issue an SSL/TLS certificate.
5. Once live, update the canonical URL in `src/index.html`, `public/sitemap.xml`, `public/robots.txt`, and `src/app/config/brand.config.ts` to match your production domain.
