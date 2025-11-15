/**
 * Featured Projects Constants
 * Centralized configuration for easy maintenance
 */

export const FEATURED_PROJECTS = [
  {
    id: "1",
    title: "CareerPilot AI",
    description: "Designed and developed backend services to automate job tracking and resume analysis. Integrated natural language processing using LangChain and OpenAI API. Improved response time by 25% with Redis caching and asynchronous I/O.",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200&h=800&fit=crop&q=80",
    tags: ["FastAPI", "Next.js", "MongoDB", "Redis", "AWS"],
    href: "/projects/careerpilot-ai",
    featured: true,
    category: "AI/Backend",
    year: "2024",
    githubUrl: "https://github.com/EggadiRanjith/careerpilot-ai",
    liveUrl: "https://careerpilot-ai-demo.vercel.app",
  },
  {
    id: "2",
    title: "FranchiseConnect App",
    description: "Built real-time APIs enabling instant messaging and data synchronization. Implemented event-driven backend architecture with scalable socket connections. Reduced onboarding latency by optimizing query execution and data flow.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop&q=80",
    tags: ["Node.js", "React Native", "MySQL", "WebSockets"],
    href: "/projects/franchiseconnect",
    featured: true,
    category: "Backend/API",
    year: "2024",
    githubUrl: "https://github.com/EggadiRanjith/franchiseconnect",
    liveUrl: "https://franchiseconnect-demo.vercel.app",
  },
  {
    id: "3",
    title: "Library Management System",
    description: "Developed REST APIs with authentication, role-based access, and logging. Deployed production environment on AWS EC2 with CI/CD automation. Ensured 99% uptime with monitored health checks and backups.",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop&q=80",
    tags: ["Spring Boot", "Django", "MySQL", "AWS EC2"],
    href: "/projects/library-management",
    category: "Backend",
    year: "2023",
    githubUrl: "https://github.com/EggadiRanjith/library-management",
  },
] as const;

export const FEATURED_PROJECTS_CONTENT = {
  title: "Featured Projects",
  description: "Backend systems built with precision, deployed at scale, and proven in production",
  ctaText: "View All Projects",
  ctaHref: "/projects",
} as const;

