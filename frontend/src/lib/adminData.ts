/**
 * Admin Data Management
 * Handles reading and writing portfolio data from/to API (server-side storage)
 * Falls back to localStorage for backward compatibility
 */

export interface PersonalInfo {
  name: string;
  title: string;
  description: string;
  email: string;
  phone: string;
  location: string;
  url: string;
  profileImage?: string;
  links: {
    github: string;
    linkedin: string;
    leetcode: string;
    twitter?: string;
  };
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  credentialId: string;
  verificationLink: string;
}

export interface Skill {
  category: string;
  items: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  tags: string[];
  category: string;
  year: string;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  technologies?: string[];
  features?: string[];
  challenges?: string[];
  solutions?: string[];
  results?: { metric: string; label: string }[];
  role?: string;
  timeline?: string;
  images?: string[];
}

export interface HeroData {
  title: {
    line1: string;
    line2: {
      prefix: string;
      highlight: string;
    };
  };
  description: string;
  stats: Array<{
    label: string;
    value: string;
  }>;
  socialLinks: Array<{
    href: string;
    label: string;
  }>;
  ctaButtons: Array<{
    text: string;
    href: string;
    variant: "primary" | "secondary";
  }>;
}

export interface PortfolioData {
  personalInfo: PersonalInfo;
  education: Education[];
  certifications: Certification[];
  skills: Skill[];
  projects: Project[];
  stats: {
    productionAPIs: string;
    yearsExperience: string;
    cloudDeployments: string;
    leetcodeSolved: string;
  };
  hero: HeroData;
}

const STORAGE_KEY = "portfolio_admin_data";

// Default data structure
const defaultData: PortfolioData = {
  personalInfo: {
    name: "Ranjith Eggadi",
    title: "Backend & Full-Stack Developer | AWS Certified",
    description: "Computer Science graduate specializing in backend and full-stack development. Experienced in Java, Python, JavaScript, Microservices, REST APIs, and AWS (EC2, S3). Building scalable, secure, and performance-optimized applications.",
    email: "ranjitheggadi4@gmail.com",
    phone: "+91-6301945962",
    location: "Hyderabad, Telangana, India",
    url: "https://ranjitheggadi.dev",
    profileImage: "/profile.png",
    links: {
      github: "https://github.com/EggadiRanjith",
      linkedin: "https://linkedin.com/in/ranjitheggadi",
      leetcode: "https://leetcode.com/ranjitheggadi",
    },
  },
  education: [
    {
      degree: "Bachelor of Technology in Computer Science",
      institution: "Kamala Institute of Technology and Science",
      location: "Karimnagar, Telangana",
      startDate: "Sep. 2020",
      endDate: "Jun. 2024",
    },
  ],
  certifications: [
    {
      name: "AWS Certified Cloud Practitioner",
      issuer: "Amazon Web Services",
      date: "2024",
      credentialId: "AWS-CP",
      verificationLink: "https://www.credly.com",
    },
    {
      name: "Java (Basic) Certification",
      issuer: "HackerRank",
      date: "2024",
      credentialId: "HACKERRANK-JAVA",
      verificationLink: "https://www.hackerrank.com",
    },
    {
      name: "Python Programming Workshop",
      issuer: "Workshop",
      date: "2023",
      credentialId: "PYTHON-WORKSHOP",
      verificationLink: "#",
    },
    {
      name: "Java Programming",
      issuer: "LinkedIn Learning",
      date: "2023",
      credentialId: "LINKEDIN-JAVA",
      verificationLink: "https://www.linkedin.com/learning",
    },
  ],
  skills: [
    {
      category: "Programming Languages",
      items: ["Java", "Python", "JavaScript", "TypeScript", "SQL"],
    },
    {
      category: "Backend Development",
      items: ["Spring Boot", "Django", "Node.js", "Express.js", "FastAPI", "REST APIs", "Microservices"],
    },
    {
      category: "Frontend Development",
      items: ["React Native", "Next.js", "HTML5", "CSS3", "Bootstrap"],
    },
    {
      category: "Databases",
      items: ["MySQL", "MongoDB", "Redis"],
    },
    {
      category: "Cloud & DevOps",
      items: ["AWS EC2", "AWS S3", "Git", "GitHub", "CI/CD", "GitHub Actions", "WebSockets"],
    },
  ],
  projects: [
    {
      id: "1",
      title: "CareerPilot AI",
      description: "Designed and developed backend services to automate job tracking and resume analysis. Integrated natural language processing using LangChain and OpenAI API. Improved response time by 25% with Redis caching and asynchronous I/O.",
      longDescription: "CareerPilot AI is a comprehensive backend system that revolutionizes job application management through intelligent automation. The platform leverages advanced AI technologies to help job seekers track applications, analyze resumes, and optimize their career search process.",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200&h=800&fit=crop&q=80",
      tags: ["FastAPI", "Next.js", "MongoDB", "Redis", "AWS"],
      category: "AI/Backend",
      year: "2024",
      githubUrl: "https://github.com/EggadiRanjith/careerpilot-ai",
      liveUrl: "https://careerpilot-ai-demo.vercel.app",
      featured: true,
      technologies: ["FastAPI", "Python", "MongoDB", "Redis", "AWS EC2/S3", "LangChain", "OpenAI API", "Next.js", "Docker"],
      features: [
        "Automated job posting aggregation from multiple sources",
        "AI-powered resume analysis and optimization suggestions",
        "Real-time application tracking dashboard",
        "Intelligent job matching algorithm",
      ],
      challenges: [
        "Handling high-volume data processing from multiple job boards",
        "Reducing API response times for real-time recommendations",
      ],
      solutions: [
        "Implemented Redis caching layer reducing response time by 25%",
        "Used asynchronous I/O with FastAPI for concurrent request handling",
      ],
      results: [
        { metric: "25%", label: "Response Time Improvement" },
        { metric: "10K+", label: "Daily Job Postings Processed" },
      ],
    },
    {
      id: "2",
      title: "FranchiseConnect App",
      description: "Built real-time APIs enabling instant messaging and data synchronization. Implemented event-driven backend architecture with scalable socket connections. Reduced onboarding latency by optimizing query execution and data flow.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop&q=80",
      tags: ["Node.js", "React Native", "MySQL", "WebSockets"],
      category: "Backend/API",
      year: "2024",
      githubUrl: "https://github.com/EggadiRanjith/franchiseconnect",
      liveUrl: "https://franchiseconnect-demo.vercel.app",
      featured: true,
    },
    {
      id: "3",
      title: "Library Management System",
      description: "Developed REST APIs with authentication, role-based access, and logging. Deployed production environment on AWS EC2 with CI/CD automation. Ensured 99% uptime with monitored health checks and backups.",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop&q=80",
      tags: ["Spring Boot", "Django", "MySQL", "AWS EC2"],
      category: "Backend",
      year: "2023",
      githubUrl: "https://github.com/EggadiRanjith/library-management",
      featured: false,
    },
  ],
  stats: {
    productionAPIs: "10+",
    yearsExperience: "3+",
    cloudDeployments: "5+",
    leetcodeSolved: "150+",
  },
  hero: {
    title: {
      line1: "Backend & Full-Stack",
      line2: {
        prefix: "Developer ",
        highlight: "Building Scalable Systems",
      },
    },
    description:
      "Computer Science graduate specializing in backend and full-stack development. Experienced in Java, Python, JavaScript, Microservices, REST APIs, and AWS. Building scalable, secure, and performance-optimized applications.",
    stats: [
      {
        label: "Production APIs",
        value: "10+",
      },
      {
        label: "Years Experience",
        value: "3+",
      },
      {
        label: "Cloud Deployments",
        value: "5+",
      },
    ],
    socialLinks: [
      {
        href: "https://github.com/EggadiRanjith",
        label: "GitHub",
      },
      {
        href: "https://linkedin.com/in/ranjitheggadi",
        label: "LinkedIn",
      },
      {
        href: "https://leetcode.com/ranjitheggadi",
        label: "LeetCode",
      },
    ],
    ctaButtons: [
      {
        text: "View Projects",
        href: "/projects",
        variant: "primary",
      },
      {
        text: "Get in Touch",
        href: "/contact",
        variant: "secondary",
      },
    ],
  },
};

// Cache for client-side data to avoid repeated API calls
let cachedData: PortfolioData | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 60000; // 1 minute cache

/**
 * Fetch portfolio data from API (server-side storage)
 * Falls back to localStorage for backward compatibility
 * @param forceRefresh - If true, bypasses cache and forces fresh fetch from API
 */
export async function getPortfolioData(forceRefresh: boolean = false): Promise<PortfolioData> {
  // Server-side: return default data
  if (typeof window === "undefined") {
    return defaultData;
  }

  // Check cache first (unless forcing refresh)
  const now = Date.now();
  if (!forceRefresh && cachedData && (now - cacheTimestamp) < CACHE_DURATION) {
    return cachedData;
  }

  try {
    // Try to fetch from API first
    // Add cache-busting parameter when forcing refresh
    const url = forceRefresh 
      ? `/api/portfolio?t=${Date.now()}` 
      : "/api/portfolio";
    
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Pragma": "no-cache",
      },
      cache: "no-store", // Always fetch fresh data
    });

    if (response.ok) {
      const data = await response.json() as PortfolioData;
      // Ensure hero field exists (migration)
      if (!data.hero) {
        data.hero = defaultData.hero;
        await savePortfolioData(data);
      }
      cachedData = data;
      cacheTimestamp = now;
      return data;
    } else {
      console.warn(`API returned status ${response.status}: ${response.statusText}`);
    }
  } catch (error) {
    console.warn("Failed to fetch from API, falling back to localStorage:", error);
  }

  // Fallback to localStorage for backward compatibility
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      const data = JSON.parse(stored) as PortfolioData;
      // Migration: Ensure hero field exists
      if (!data.hero) {
        data.hero = defaultData.hero;
        await savePortfolioData(data);
      }
      cachedData = data;
      cacheTimestamp = now;
      return data;
    } catch (e) {
      console.error("Error parsing localStorage data:", e);
    }
  }

  // Initialize with default data if nothing exists
  await savePortfolioData(defaultData);
  return defaultData;
}

/**
 * Synchronous version for backward compatibility (uses cache or localStorage)
 * Use this only when you need synchronous access (e.g., in SSR)
 */
export function getPortfolioDataSync(): PortfolioData {
  if (typeof window === "undefined") {
    return defaultData;
  }

  // Return cached data if available
  if (cachedData) {
    return cachedData;
  }

  // Fallback to localStorage
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      const data = JSON.parse(stored) as PortfolioData;
      if (!data.hero) {
        data.hero = defaultData.hero;
      }
      cachedData = data;
      return data;
    } catch (e) {
      console.error("Error parsing localStorage data:", e);
    }
  }

  return defaultData;
}

/**
 * Save portfolio data to API (server-side storage)
 * Also saves to localStorage as backup
 */
export async function savePortfolioData(data: PortfolioData): Promise<void> {
  if (typeof window === "undefined") return;

  try {
    // Save to API (server-side storage)
    const response = await fetch("/api/portfolio", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`API save failed: ${response.statusText}`);
    }

    // Clear cache first to force fresh fetch
    cachedData = null;
    cacheTimestamp = 0;

    // Also save to localStorage as backup
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

    // Dispatch custom event to notify components of data update
    // Use a small delay to ensure server write is complete
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent("portfolio-data-updated", { 
        detail: { timestamp: Date.now() } 
      }));
    }, 50);
  } catch (error) {
    console.error("Error saving to API, saving to localStorage only:", error);
    
    // Fallback to localStorage only
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      // Clear cache to force fresh fetch
      cachedData = null;
      cacheTimestamp = 0;
      // Dispatch event with delay
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent("portfolio-data-updated", { 
          detail: { timestamp: Date.now() } 
        }));
      }, 50);
    } catch (e) {
      console.error("Error saving to localStorage:", e);
    }
  }
}

/**
 * Reset portfolio data to defaults
 */
export async function resetToDefaults(): Promise<void> {
  if (typeof window === "undefined") return;
  await savePortfolioData(defaultData);
}

/**
 * Clear cache (useful for forcing refresh)
 */
export function clearCache(): void {
  cachedData = null;
  cacheTimestamp = 0;
}

