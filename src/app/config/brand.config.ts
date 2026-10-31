export interface NavItem {
  label: string;
  sectionId: string;
}

export const BRAND_CONFIG = {
  name: 'CALLNIVO AI',
  shortName: 'CALLNIVO',
  badge: 'AI VOICE RECEPTIONIST PLATFORM',
  tagline: 'Every Call Counts. Make Every Conversation Matter.',
  heroHeadline: {
    line1Prefix: 'Your Business',
    line1Highlight: 'Never Stops.',
    line2Prefix: 'Neither Should Your',
    line2Highlight: 'Receptionist.'
  },
  heroSubheadline:
    'Meet the AI receptionist that helps your business answer calls, capture opportunities, and handle customer conversations around the clock.',
  domain: 'https://callnivo.ai',
  whatsapp: {
    displayNumber: '+92 310 6449454',
    baseUrl: 'https://wa.me/923106449454',
    chatUrl:
      'https://wa.me/923106449454?text=Hi%20CALLNIVO%20AI%2C%20I%27m%20interested%20in%20your%20AI%20receptionist%20services.'
  },
  navItems: [
    { label: 'Home', sectionId: 'home' },
    { label: 'How It Works', sectionId: 'how-it-works' },
    { label: 'Features', sectionId: 'features' },
    { label: 'Industries', sectionId: 'industries' },
    { label: 'Live Demo', sectionId: 'live-demo' },
    { label: 'Contact', sectionId: 'contact' }
  ] as NavItem[]
};
