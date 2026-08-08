export interface NavItem {
  id: string;
  label: string;
  href: string;
  children?: NavItem[];
}

export interface StatItem {
  id: string;
  value: string;
  description: string;
  icon?: string;
}

export interface FeatureItem {
  id: string;
  title: string;
  description?: string;
  icon?: string;
}

export interface TestimonialItem {
  id: string;
  clientName: string;
  company: string;
  role: string;
  content: string;
  avatarUrl?: string;
}

export interface LeadFormData {
  fullName: string;
  workEmail: string;
  companyName: string;
  phoneNumber?: string;
  jobTitle?: string;
}
