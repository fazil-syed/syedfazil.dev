export enum Language {
  En = 'en',
  Kn = 'kn',
  Hi = 'hi',
}

export enum Section {
  Home = 'home',
  About = 'about',
  Work = 'work',
  Experience = 'experience',
  Contact = 'contact',
}

export interface SocialLink {
  name: string;
  url: string;
}

export interface PersonalData {
  name: string;
  role: string;
  email: string;
  image?: string;
  social_links?: SocialLink[];
}

export interface NavData {
  about: string;
  work: string;
  experience: string;
  contact: string;
}

export interface AboutData {
  title: string;
  content: string;
}

export type WorkType = 'project' | 'blog';

export interface ProjectData {
  id: string;
  title: string;
  description: string;
  tags: string[];
  work_type?: WorkType;
  image?: string;
  open_link?: string;
  github_link?: string;
}

export interface ExperienceData {
  company: string;
  role: string;
  duration: string;
  highlights?: string[];
}

export interface ExperienceSection {
  title: string;
  experience: ExperienceData[];
}

export interface SettingsData {
  title: string;
  language: string;
  theme: string;
  dark: string;
  light: string;
}

export interface ContactData {
  title: string;
  headline: string;
  subtitle: string;
  email: string;
  phone?: string;
  message: string;
}

export interface PortfolioData {
  personal: PersonalData;
  nav: NavData;
  about: AboutData;
  work: ProjectData[];
  experience: ExperienceSection;
  contact: ContactData;
}
