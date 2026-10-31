/**
 * CALLNIVO AI — External Integrations, Media Assets & Endpoint Configuration
 *
 * IMPORTANT SECURITY NOTE:
 * Never place secret API keys or private credentials in browser-side Angular code.
 * Only public widget identifiers (such as an ElevenLabs public Agent ID with domain allowlisting)
 * or public webhook/worker endpoints should be configured here.
 *
 * ELEVENLABS DASHBOARD REQUIREMENTS:
 * 1. Ensure the agent has public widget access enabled and authentication disabled for web embedding.
 * 2. Add your Cloudflare Pages hostname (*.pages.dev and your custom domain) to the ElevenLabs
 *    security allowlist in the agent's settings.
 * 3. Live voice conversations respect your ElevenLabs account usage and concurrency limits.
 */

export interface VideoAssetConfig {
  enabled: boolean;
  desktopMp4Url: string;
  mobileMp4Url: string;
  posterUrl: string;
  attribution: string;
}

export interface ExplainerVideoConfig {
  /**
   * Set mode to:
   * - 'walkthrough' (default when no external explainer video is configured)
   * - 'video' (when mp4Url is provided)
   * - 'youtube' (when youtubeEmbedUrl is provided, e.g. 'https://www.youtube-nocookie.com/embed/YOUR_VIDEO_ID')
   */
  mode: 'walkthrough' | 'video' | 'youtube';
  mp4Url: string;
  posterUrl: string;
  youtubeEmbedUrl: string;
  title: string;
}

export const INTEGRATIONS_CONFIG = {
  /**
   * 1. ELEVENLABS CONVERSATIONAL AI AGENT ID
   * Verified against the official ElevenLabs dashboard embed code.
   * Mounted once globally in src/index.html via <elevenlabs-convai>.
   */
  elevenLabsAgentId: 'agent_0601m68zdzdffeb8g65h4gk3jpf8',

  /**
   * Official ElevenLabs ConvAI widget embed script URL (loaded once in src/index.html).
   */
  elevenLabsWidgetScriptUrl: 'https://unpkg.com/@elevenlabs/convai-widget-embed',

  /**
   * Optional Backup Shareable Demo URL for the new ElevenLabs agent.
   * Paste your official ElevenLabs shareable page link here if you want a backup external link
   * displayed when an ad-blocker or firewall blocks the embedded widget script.
   * Leave empty ('') until provided — never use an old agent URL or invented link.
   */
  elevenLabsShareableDemoUrl: '',

  /**
   * 2. CAL.COM CONSULTATION BOOKING URL
   * Paste your public Cal.com scheduling link (e.g., 'https://cal.com/your-handle/consultation').
   * Leave empty ('') to display a transparent setup notice modal instead of a broken link.
   */
  calComBookingUrl: '',

  /**
   * 3. CONTACT FORM SUBMISSION ENDPOINT
   * Configure the URL of your Cloudflare Worker, Formspree endpoint, or backend API route
   * that accepts POST JSON requests from the contact form.
   * Leave empty ('') to keep the form in transparent preview/unconfigured mode.
   */
  contactEndpointUrl: '',

  /**
   * 4. HERO BACKGROUND VIDEO ASSETS
   * Responsive dual-source configuration:
   * - Desktop (> 767px): assets/videos/hero-desktop.mp4 (16:9)
   * - Mobile (<= 767px): assets/videos/hero-mobile.mp4 (9:16)
   */
  heroVideo: {
    enabled: true,
    desktopMp4Url: 'assets/videos/hero-desktop.mp4',
    mobileMp4Url: 'assets/videos/hero-mobile.mp4',
    posterUrl: 'assets/videos/hero-poster.svg',
    attribution: 'CALLNIVO AI responsive hero background video (16:9 desktop & 9:16 mobile).'
  } as VideoAssetConfig,

  /**
   * 5. EXPLAINER VIDEO SECTION CONFIGURATION
   * Configured with the final edited CALLNIVO AI cinematic explainer video (16:9 1080p MP4 with audio)
   * and extracted poster frame.
   */
  explainerVideo: {
    mode: 'video',
    mp4Url: 'assets/videos/callnivo-explainer.mp4',
    posterUrl: 'assets/images/callnivo-explainer-poster.jpg',
    youtubeEmbedUrl: '',
    title: 'See CALLNIVO AI in Action'
  } as ExplainerVideoConfig
};
