export interface ConversationTurn {
  speaker: 'customer' | 'ai';
  text: string;
  annotation?: string;
}

export interface IndustryExample {
  id: string;
  name: string;
  categoryTag: string;
  icon: 'dental' | 'salon' | 'restaurant' | 'realestate' | 'homeservices' | 'dealership' | 'medical' | 'professional';
  accentColor: string;
  summary: string;
  customerQuestion: string;
  aiResponse: string;
  samplePromptForDemo: string;
  conversation: ConversationTurn[];
  capturedSummary: {
    intent: string;
    callerStatus: string;
    requestedTiming: string;
    followUpNote: string;
  };
}

export const INDUSTRIES_CONFIG: IndustryExample[] = [
  {
    id: 'dental-clinics',
    name: 'Dental Clinics',
    categoryTag: 'Healthcare & Dental',
    icon: 'dental',
    accentColor: '#22D3EE',
    summary: 'Handle hygiene appointment requests, new-patient intake questions, and urgent dental inquiry routing while chairside teams stay focused on patients.',
    customerQuestion: "Hi, I'd like to schedule a cleaning.",
    aiResponse: 'Of course! Are you a new patient or have you visited us before?',
    samplePromptForDemo: 'Act like a dental receptionist and help me schedule a teeth cleaning.',
    conversation: [
      {
        speaker: 'customer',
        text: "Hi, I'd like to schedule a cleaning."
      },
      {
        speaker: 'ai',
        text: 'Of course! Are you a new patient or have you visited us before?',
        annotation: 'Identifies patient status'
      },
      {
        speaker: 'customer',
        text: "I'm a new patient. Do you have anything open next Tuesday afternoon?"
      },
      {
        speaker: 'ai',
        text: 'Welcome! I can note your preference for next Tuesday afternoon and gather your contact details so the front desk can confirm your new-patient exam and cleaning slot.',
        annotation: 'Captures preferred window & contact details'
      }
    ],
    capturedSummary: {
      intent: 'New Patient Routine Cleaning & Exam',
      callerStatus: 'First-time patient',
      requestedTiming: 'Next Tuesday Afternoon',
      followUpNote: 'Verify insurance carrier and confirm Tuesday afternoon hygiene slot.'
    }
  },
  {
    id: 'salons-and-spas',
    name: 'Salons and Spas',
    categoryTag: 'Beauty & Wellness',
    icon: 'salon',
    accentColor: '#8B5CF6',
    summary: 'Answer questions about styling services, treatments, stylist preferences, and appointment availability without interrupting active client sessions.',
    customerQuestion: 'Do you have availability for a balayage and trim this Friday?',
    aiResponse: "I'd love to help check on that for you. Do you have a preferred stylist, or would you like the first available specialist on Friday?",
    samplePromptForDemo: 'How would you answer calls for my hair salon and spa?',
    conversation: [
      {
        speaker: 'customer',
        text: 'Do you have availability for a balayage and trim this Friday?'
      },
      {
        speaker: 'ai',
        text: "I'd love to help check on that for you. Do you have a preferred stylist, or would you like the first available color specialist on Friday?",
        annotation: 'Clarifies service duration & stylist preference'
      },
      {
        speaker: 'customer',
        text: 'First available is great, ideally in the morning.'
      },
      {
        speaker: 'ai',
        text: 'Got it—balayage and trim for Friday morning with our first available colorist. May I get your name and best callback number to lock in the time?',
        annotation: 'Organizes booking request for salon coordinator'
      }
    ],
    capturedSummary: {
      intent: 'Full Balayage + Haircut & Blowout',
      callerStatus: 'Flexible on stylist',
      requestedTiming: 'Friday Morning',
      followUpNote: 'Confirm 3-hour color block availability and send booking confirmation.'
    }
  },
  {
    id: 'restaurants',
    name: 'Restaurants',
    categoryTag: 'Hospitality & Dining',
    icon: 'restaurant',
    accentColor: '#3B82F6',
    summary: 'Field table reservation requests, private dining inquiries, hours of operation, and dietary questions during peak kitchen and dinner rush hours.',
    customerQuestion: 'Hi, can I book a table for six people this Saturday around 7:30 PM?',
    aiResponse: 'I can certainly help with your Saturday evening request for six guests. Would you prefer indoor dining or our heated patio area?',
    samplePromptForDemo: 'Pretend I am booking a restaurant table for six guests this Saturday.',
    conversation: [
      {
        speaker: 'customer',
        text: 'Hi, can I book a table for six people this Saturday around 7:30 PM?'
      },
      {
        speaker: 'ai',
        text: 'I can certainly help with your Saturday evening request for six guests. Would you prefer indoor dining or our heated patio area?',
        annotation: 'Collects party size, time & seating preference'
      },
      {
        speaker: 'customer',
        text: 'Indoor dining please, and one guest is gluten-free.'
      },
      {
        speaker: 'ai',
        text: "Noted—six guests indoors around 7:30 PM this Saturday, with a gluten-free menu note for the kitchen. What name and phone number should we place on the request?",
        annotation: 'Logs dietary note for host stand'
      }
    ],
    capturedSummary: {
      intent: 'Dinner Reservation (Party of 6)',
      callerStatus: 'Indoor seating requested',
      requestedTiming: 'Saturday at 7:30 PM',
      followUpNote: '1 guest is gluten-free; host stand to confirm table assignment.'
    }
  },
  {
    id: 'real-estate',
    name: 'Real Estate',
    categoryTag: 'Property & Brokerages',
    icon: 'realestate',
    accentColor: '#22D3EE',
    summary: 'Capture buyer and renter inquiries from yard signs and listings, ask qualifying questions, and log showing requests while agents are in the field.',
    customerQuestion: "I'm calling about the three-bedroom home on Oak Avenue. Is it still available for a tour?",
    aiResponse: 'Yes, the Oak Avenue listing is currently active! Would you like to request a private showing this week, or do you have questions about the property details first?',
    samplePromptForDemo: 'Act like a real estate receptionist taking a showing inquiry for a home listing.',
    conversation: [
      {
        speaker: 'customer',
        text: "I'm calling about the three-bedroom home on Oak Avenue. Is it still available for a tour?"
      },
      {
        speaker: 'ai',
        text: 'Yes, the Oak Avenue listing is currently active! Would you like to request a private showing this week, or do you have questions about the property details first?',
        annotation: 'Engages prospective buyer immediately'
      },
      {
        speaker: 'customer',
        text: "We'd love to tour it Thursday evening if possible."
      },
      {
        speaker: 'ai',
        text: 'Wonderful. Are you currently working with an agent, or would you like the listing agent to coordinate Thursday evening directly with you?',
        annotation: 'Captures representation context & tour window'
      }
    ],
    capturedSummary: {
      intent: 'Private Showing — Oak Avenue 3BR Listing',
      callerStatus: 'Direct buyer inquiry',
      requestedTiming: 'Thursday Evening',
      followUpNote: 'Listing agent to confirm Thursday evening lockbox/showing schedule.'
    }
  },
  {
    id: 'home-services',
    name: 'Home Services',
    categoryTag: 'HVAC, Plumbing & Electrical',
    icon: 'homeservices',
    accentColor: '#3B82F6',
    summary: 'Triage urgent repair calls versus routine maintenance estimates, gather service addresses, and organize dispatch details for technicians on the road.',
    customerQuestion: 'Our AC unit stopped blowing cold air this afternoon. Can someone come take a look?',
    aiResponse: 'I understand how urgent that is. Let me gather your zip code and system details right away so our dispatch team can coordinate a service visit.',
    samplePromptForDemo: 'Act like a home services receptionist handling an AC repair call.',
    conversation: [
      {
        speaker: 'customer',
        text: 'Our AC unit stopped blowing cold air this afternoon. Can someone come take a look?'
      },
      {
        speaker: 'ai',
        text: 'I understand how urgent that is. Let me gather your zip code and system details right away so our dispatch team can coordinate a service visit.',
        annotation: 'Acknowledges urgency & starts service intake'
      },
      {
        speaker: 'customer',
        text: 'Our zip code is 78704. The fan runs, but the air is warm.'
      },
      {
        speaker: 'ai',
        text: 'Thank you—78704 is within our service area. May I get your street address and contact number so dispatch can follow up with the next available technician window?',
        annotation: 'Verifies service area & logs symptom'
      }
    ],
    capturedSummary: {
      intent: 'Residential AC Diagnostic & Repair',
      callerStatus: 'Service Area 78704 (Fan running, warm air)',
      requestedTiming: 'Next Available Dispatch Window',
      followUpNote: 'Priority cooling call — contact homeowner with technician ETA.'
    }
  },
  {
    id: 'car-dealerships',
    name: 'Car Dealerships',
    categoryTag: 'Automotive Sales & Service',
    icon: 'dealership',
    accentColor: '#8B5CF6',
    summary: 'Route callers between test-drive inquiries, service bay scheduling, and trade-in questions while recording vehicle interests cleanly.',
    customerQuestion: "Hi, I'm interested in test-driving the hybrid SUV I saw on your website.",
    aiResponse: "We'd be happy to set up a test drive for you! Which trim or model year caught your eye, and when were you hoping to visit the showroom?",
    samplePromptForDemo: 'Act like an automotive dealership receptionist scheduling a test drive.',
    conversation: [
      {
        speaker: 'customer',
        text: "Hi, I'm interested in test-driving the hybrid SUV I saw on your website."
      },
      {
        speaker: 'ai',
        text: "We'd be happy to set up a test drive for you! Which trim or model year caught your eye, and when were you hoping to visit the showroom?",
        annotation: 'Identifies vehicle interest & showroom timing'
      },
      {
        speaker: 'customer',
        text: 'The 2026 AWD Limited trim. Could I come by Saturday morning?'
      },
      {
        speaker: 'ai',
        text: 'Great choice. Will you also be bringing a vehicle for a trade-in appraisal during your Saturday morning visit?',
        annotation: 'Captures trade-in opportunity for sales desk'
      }
    ],
    capturedSummary: {
      intent: 'Showroom Test Drive — 2026 Hybrid SUV AWD Limited',
      callerStatus: 'Prospective buyer + potential trade-in',
      requestedTiming: 'Saturday Morning',
      followUpNote: 'Confirm vehicle stock availability on lot and assign sales specialist.'
    }
  },
  {
    id: 'medical-offices',
    name: 'Medical Offices',
    categoryTag: 'Outpatient & Specialty Practices',
    icon: 'medical',
    accentColor: '#22D3EE',
    summary: 'Support front-desk staff by answering clinic hour and location questions, organizing routine appointment requests, and flagging callback priorities.',
    customerQuestion: 'Hello, I need to schedule a follow-up consultation with Dr. Patel next month.',
    aiResponse: 'I can help organize your follow-up request for Dr. Patel. Do you prefer morning or afternoon appointments, and which days of the week work best for you?',
    samplePromptForDemo: 'Act like a medical office receptionist organizing a follow-up visit request.',
    conversation: [
      {
        speaker: 'customer',
        text: 'Hello, I need to schedule a follow-up consultation with Dr. Patel next month.'
      },
      {
        speaker: 'ai',
        text: 'I can help organize your follow-up request for Dr. Patel. Do you prefer morning or afternoon appointments, and which days of the week work best for you?',
        annotation: 'Collects provider & scheduling preferences'
      },
      {
        speaker: 'customer',
        text: 'Wednesday or Thursday mornings are easiest for me.'
      },
      {
        speaker: 'ai',
        text: 'Thank you. Let me take down your full name and phone number so our scheduling coordinator can review Dr. Patel’s Wednesday and Thursday morning calendar with you.',
        annotation: 'Structures patient callback record cleanly'
      }
    ],
    capturedSummary: {
      intent: 'Established Patient Follow-Up — Dr. Patel',
      callerStatus: 'Returning patient',
      requestedTiming: 'Next Month (Wed/Thu Mornings)',
      followUpNote: 'Scheduling desk to offer open morning slots on Dr. Patel’s calendar.'
    }
  },
  {
    id: 'professional-services',
    name: 'Professional Services',
    categoryTag: 'Legal, Accounting & Advisory',
    icon: 'professional',
    accentColor: '#3B82F6',
    summary: 'Provide a polished first impression for prospective clients, collect matter or project overviews, and organize consultation requests for partners.',
    customerQuestion: "Hi, I'm looking for an accounting firm to help with small-business tax planning.",
    aiResponse: "Thank you for reaching out. I'd be glad to gather a few details about your business so one of our advisory partners can prepare for an introductory consultation.",
    samplePromptForDemo: 'Act like a receptionist for a professional advisory firm taking a new client inquiry.',
    conversation: [
      {
        speaker: 'customer',
        text: "Hi, I'm looking for an accounting firm to help with small-business tax planning."
      },
      {
        speaker: 'ai',
        text: "Thank you for reaching out. I'd be glad to gather a few details about your business so one of our advisory partners can prepare for an introductory consultation.",
        annotation: 'Sets professional tone & initiates intake'
      },
      {
        speaker: 'customer',
        text: 'We are a 15-person software agency structured as an S-Corp.'
      },
      {
        speaker: 'ai',
        text: 'That context is very helpful. May I get your name, company name, and preferred contact method so our small-business advisory lead can reach out to schedule a discovery call?',
        annotation: 'Records entity type & size for partner review'
      }
    ],
    capturedSummary: {
      intent: 'New Client Discovery — Small-Business Tax Planning',
      callerStatus: '15-person Software Agency (S-Corp)',
      requestedTiming: 'Introductory Advisory Call',
      followUpNote: 'Route intake summary to Small-Business Tax Advisory Partner.'
    }
  }
];
