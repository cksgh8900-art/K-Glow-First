export interface Inquiry {
  id: string;
  companyName: string;
  brandName: string;
  brandUrl?: string;
  contactName: string;
  email: string;
  phone: string;
  category: 'skincare' | 'makeup' | 'hairbody' | 'other';
  status: 'new' | 'reviewing' | 'processing' | 'done';
  message: string;
  createdAt: string;
  targetMarkets: {
    india: boolean;
    usa: boolean;
  };
}

export interface ProcessStep {
  id: number;
  stage: string;
  phaseTitle: string;
  actor: 'brand' | 'india_office' | 'korea_office';
  actorLabel: string;
  title: string;
  description: string;
  details: string[];
}

export interface ProblemSolutionItem {
  id: number;
  problemTitle: string;
  problemDesc: string;
  solutionTitle: string;
  solutionDesc: string;
  iconName: string;
}

export interface ServiceCapability {
  id: number;
  market: 'India' | 'USA';
  title: string;
  highlight: string;
  bgImageUrl?: string;
  benefits: {
    title: string;
    description: string;
    badge?: string;
  }[];
}

export interface FaqItem {
  question: string;
  answer: string;
}
