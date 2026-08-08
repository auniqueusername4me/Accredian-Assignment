import { StatItem, FeatureItem, TestimonialItem } from '../types';

export const statsData: StatItem[] = [
  {
    id: 'stat-1',
    value: '10,000+',
    description: 'Professionals Trained'
  },
  {
    id: 'stat-2',
    value: '200+',
    description: 'Sessions Delivered'
  },
  {
    id: 'stat-3',
    value: '5,000+',
    description: 'Active Learners'
  }
];

export const featuresData: FeatureItem[] = [
  {
    id: 'feat-1',
    title: 'Precision Learning',
    description: 'Targeted curriculum designed to bridge specific skill gaps in your workforce.'
  },
  {
    id: 'feat-2',
    title: 'Accelerated Upskilling',
    description: 'Fast-track your teams capabilities with intensive, hands-on training modules.'
  },
  {
    id: 'feat-3',
    title: 'ROI Dashboards',
    description: 'Track progress and measure the direct business impact of your training investments.'
  },
  {
    id: 'feat-4',
    title: 'Enterprise Grade Security',
    description: 'Bank-level encryption and compliance to ensure your corporate data remains protected.'
  }
];

export const testimonialsData: TestimonialItem[] = [
  {
    id: 'review-1',
    clientName: 'Sarah Jenkins',
    company: 'Microsoft',
    role: 'Director of Engineering',
    content: 'The enterprise upskilling program completely transformed our cloud infrastructure team. The ROI was visible within a single quarter.'
  },
  {
    id: 'review-2',
    clientName: 'Rajesh Kumar',
    company: 'TCS',
    role: 'VP of Operations',
    content: 'Unmatched precision in learning paths. We successfully onboarded 500+ engineers onto the new tech stack flawlessly.'
  }
];

export const enterpriseLogos = [
  { id: 'logo-amazon', name: 'Amazon', url: '/logos/amazon.svg' },
  { id: 'logo-google', name: 'Google', url: '/logos/google.svg' },
  { id: 'logo-microsoft', name: 'Microsoft', url: '/logos/microsoft.svg' },
  { id: 'logo-tcs', name: 'TCS', url: '/logos/tcs.svg' },
  { id: 'logo-accenture', name: 'Accenture', url: '/logos/accenture.svg' },
  { id: 'logo-meta', name: 'Meta', url: '/logos/meta.svg' }
];
