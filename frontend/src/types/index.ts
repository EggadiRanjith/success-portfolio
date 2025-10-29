/**
 * Project Type Definition
 */
export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  images?: string[];
  tags: string[];
  category: string;
  featured: boolean;
  link?: string;
  github?: string;
  client?: string;
  timeline?: string;
  role?: string;
  technologies?: string[];
  challenge?: string;
  solution?: string;
  results?: {
    metric: string;
    value: string;
    label: string;
  }[];
}

/**
 * Navigation Link Type
 */
export interface NavLink {
  href: string;
  label: string;
}

/**
 * Social Link Type
 */
export interface SocialLink {
  name: string;
  href: string;
  icon: string;
}

/**
 * Skill Type
 */
export interface Skill {
  name: string;
  level: number; // 0-100
  category: string;
}

/**
 * Timeline Event Type
 */
export interface TimelineEvent {
  year: string;
  title: string;
  company: string;
  description: string;
  current?: boolean;
}

/**
 * Contact Form Data Type
 */
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  budget?: string;
}

/**
 * Theme Type
 */
export type Theme = "light" | "dark";

/**
 * Component Props Type Helpers
 */
export type WithClassName<T = {}> = T & {
  className?: string;
};

export type WithChildren<T = {}> = T & {
  children: React.ReactNode;
};

