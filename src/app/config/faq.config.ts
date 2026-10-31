export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface WhyChooseItem {
  id: string;
  badge: string;
  title: string;
  description: string;
  icon: 'inquiries' | 'busy-periods' | 'consistency' | 'after-hours' | 'workflows';
}

export const WHY_CHOOSE_CONFIG: WhyChooseItem[] = [
  {
    id: 'reduce-missed-inquiries',
    badge: 'OPPORTUNITY CAPTURE',
    title: 'Help Reduce Missed Customer Inquiries',
    description:
      'When prospective customers reach a ring with no answer, many move on to the next option. CALLNIVO AI provides an attentive voice point of contact so callers can share what they need right away.',
    icon: 'inquiries'
  },
  {
    id: 'support-busy-periods',
    badge: 'PEAK HOUR RESILIENCE',
    title: 'Support Teams During Busy Periods',
    description:
      'Midday rushes, check-in queues, and active client sessions make it difficult to pick up every phone line. Your AI receptionist helps absorb call overflow while your team focuses on customers in the room.',
    icon: 'busy-periods'
  },
  {
    id: 'consistent-intake',
    badge: 'STRUCTURED CONVERSATIONS',
    title: 'Make Customer Intake More Consistent',
    description:
      'Every caller is greeted politely and asked the specific qualification questions your business relies on—capturing contact details, service preferences, and context in a predictable format.',
    icon: 'consistency'
  },
  {
    id: 'respond-beyond-hours',
    badge: 'EXTENDED COVERAGE',
    title: 'Help Businesses Respond Beyond Office Hours',
    description:
      'Customer questions and booking decisions frequently happen in the evening or on weekends. CALLNIVO AI keeps your phone line welcoming and helpful outside standard operating hours.',
    icon: 'after-hours'
  },
  {
    id: 'organized-workflows',
    badge: 'ACTIONABLE CLARITY',
    title: 'Create More Organized Communication Workflows',
    description:
      'Instead of piecing together rushed handwritten notes or unclear voicemails, your staff can review structured conversation details that make follow-ups faster and clearer.',
    icon: 'workflows'
  }
];

export const FAQ_CONFIG: FaqItem[] = [
  {
    id: 'what-is-ai-receptionist',
    question: 'What is an AI receptionist?',
    answer:
      'An AI receptionist is a conversational voice system designed to answer incoming business phone calls, greet callers naturally, answer common questions based on your business information, and gather structured details for requests or follow-ups.'
  },
  {
    id: 'how-can-callnivo-help',
    question: 'How can CALLNIVO AI help a business?',
    answer:
      'CALLNIVO AI helps businesses answer calls when staff are busy or unavailable, handle routine customer questions, collect intake information for new inquiries, and organize conversation summaries so teams can follow up with clarity.'
  },
  {
    id: 'handle-appointment-requests',
    question: 'Can the AI handle appointment requests?',
    answer:
      'Yes. CALLNIVO AI can ask callers what service they are looking for, collect their preferred dates and times, record their contact information, and support your scheduling workflow according to how your business manages bookings.'
  },
  {
    id: 'support-different-industries',
    question: 'Can it support different industries?',
    answer:
      'Yes. The receptionist’s greeting, knowledge base, and intake questions can be tailored for a wide range of businesses—including dental clinics, salons and spas, restaurants, real estate teams, home service providers, dealerships, medical offices, and professional firms.'
  },
  {
    id: 'after-hours-calls',
    question: 'Can it help with after-hours calls?',
    answer:
      'Yes. CALLNIVO AI can operate outside regular business hours—including evenings, weekends, and holidays—so callers can get answers to common questions and leave organized requests for your team to review.'
  },
  {
    id: 'test-before-getting-started',
    question: 'Can I test the AI before getting started?',
    answer:
      'Yes. You can explore industry conversation examples right on this page, use the Live AI Demo section when an active demo agent is enabled, or request a guided consultation to see how an agent can be tailored to your business.'
  },
  {
    id: 'work-alongside-staff',
    question: 'Can it work alongside existing staff?',
    answer:
      'Absolutely. CALLNIVO AI is designed to complement your human receptionists and team members—helping during peak call volume, lunch breaks, or after hours so your staff can dedicate more attention to in-person customers and complex tasks.'
  }
];
