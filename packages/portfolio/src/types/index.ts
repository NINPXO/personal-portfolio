// Profile
export interface Profile {
  name: string;
  tagline: string;
  bio: string;
  avatarUrl: string;
  location: string;
  resumeUrl: string;
  social: {
    github: string;
    linkedin: string;
    twitter: string;
    email: string;
  };
}

// Projects
export type ProjectStatus = 'live' | 'complete' | 'wip' | 'archived' | string;

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  techStack: string[];
  tags: string[];
  liveUrl?: string;
  repoUrl?: string;
  imageUrl?: string;
  featured: boolean;
  status: ProjectStatus;
  year: number;
}

// Skills
export type SkillLevel = 'expert' | 'proficient' | 'learning' | 'familiar' | string;

export interface Skill {
  name: string;
  level: SkillLevel;
}

export interface SkillCategory {
  id: string;
  name: string;
  skills: Skill[];
}

export interface SkillsData {
  categories: SkillCategory[];
}

// Experience
export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  location: string;
  description: string;
  highlights: string[];
  techStack: string[];
}

// Blog
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  updatedAt?: string;
  tags: string[];
  published: boolean;
  readingTimeMinutes: number;
  externalUrl?: string;
}

// Contact
export interface Contact {
  email: string;
  formEnabled: boolean;
  formspreeEndpoint: string;
  availableForWork: boolean;
  availabilityNote: string;
  preferredContact: string;
  calendlyUrl: string;
}
