export interface FeatureBentoItem {
  id: string;
  number: string;
  title: string;
  description: string;
  tag: string;
  gridSpan: 'span-7' | 'span-5' | 'span-4' | 'span-6' | 'span-8';
  visualType: 'waveform-call' | 'opportunity-radar' | 'faq-matrix' | 'calendar-sync' | 'after-hours-moon' | 'automation-filter' | 'structured-cards' | 'adaptive-nodes';
}

export const FEATURES_CONFIG: FeatureBentoItem[] = [
  {
    id: 'answer-customer-calls',
    number: '01',
    title: 'Answer Customer Calls',
    description:
      'Greet callers with a calm, natural-sounding AI receptionist designed to respond promptly when lines are busy or team members are assisting customers in person.',
    tag: 'Instant Voice Reception',
    gridSpan: 'span-7',
    visualType: 'waveform-call'
  },
  {
    id: 'capture-missed-opportunities',
    number: '02',
    title: 'Help Capture Missed Opportunities',
    description:
      'Instead of sending prospective customers to an unanswered ring or generic voicemail box, engage callers in a helpful two-way conversation that records their intent.',
    tag: 'Lead & Inquiry Intake',
    gridSpan: 'span-5',
    visualType: 'opportunity-radar'
  },
  {
    id: 'handle-routine-questions',
    number: '03',
    title: 'Handle Routine Customer Questions',
    description:
      'Provide clear answers to common questions about business hours, directions, service offerings, preparation guidelines, and general policies.',
    tag: 'Guided Knowledge Base',
    gridSpan: 'span-4',
    visualType: 'faq-matrix'
  },
  {
    id: 'assist-appointment-scheduling',
    number: '04',
    title: 'Assist with Appointment Scheduling',
    description:
      'Gather preferred dates, times, service types, and caller contact information to streamline booking workflows and consultation requests.',
    tag: 'Scheduling Intake',
    gridSpan: 'span-4',
    visualType: 'calendar-sync'
  },
  {
    id: 'support-after-hours',
    number: '05',
    title: 'Support After-Hours Inquiries',
    description:
      'Maintain a professional front-desk presence during evenings, weekends, and holidays so customers can share requests whenever it is convenient for them.',
    tag: '24/7 Availability',
    gridSpan: 'span-4',
    visualType: 'after-hours-moon'
  },
  {
    id: 'reduce-repetitive-phone-work',
    number: '06',
    title: 'Reduce Repetitive Phone Work',
    description:
      'Help front-desk teams stay focused on high-touch, in-person service by handling recurring informational calls and initial intake steps.',
    tag: 'Team Focus',
    gridSpan: 'span-5',
    visualType: 'automation-filter'
  },
  {
    id: 'organize-customer-requests',
    number: '07',
    title: 'Organize Customer Requests',
    description:
      'Structure caller names, contact details, service needs, and conversation notes into clear summaries so staff can review and follow up efficiently.',
    tag: 'Structured Summaries',
    gridSpan: 'span-7',
    visualType: 'structured-cards'
  },
  {
    id: 'adapt-to-business-needs',
    number: '08',
    title: 'Adapt to Different Business Needs',
    description:
      'Tailor greeting style, qualification questions, industry terminology, and escalation rules around the specific way your organization operates.',
    tag: 'Custom Voice Workflows',
    gridSpan: 'span-8',
    visualType: 'adaptive-nodes'
  }
];
