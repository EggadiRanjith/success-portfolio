/**
 * Site Configuration
 */
export const SITE_CONFIG = {
  name: "Ranjith Eggadi",
  title: "Backend & Full-Stack Developer | AWS Certified",
  description: "Computer Science graduate specializing in backend and full-stack development. Experienced in Java, Python, JavaScript, Microservices, REST APIs, and AWS (EC2, S3). Building scalable, secure, and performance-optimized applications.",
  url: "https://ranjitheggadi.dev",
  ogImage: "/og-image.png",
  links: {
    github: "https://github.com/EggadiRanjith",
    linkedin: "https://linkedin.com/in/ranjitheggadi",
    twitter: "",
    email: "ranjitheggadi4@gmail.com",
  },
} as const;

/**
 * Navigation Links
 */
export const NAV_LINKS = [
  { href: "/home", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

/**
 * Tech Stack Categories
 */
export const TECH_STACK = {
  frontend: [
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
  ],
  animation: [
    "GSAP",
    "Framer Motion",
    "Three.js",
    "React Three Fiber",
  ],
  tools: [
    "Git",
    "Figma",
    "VS Code",
    "Vercel",
  ],
  design: [
    "UI/UX Design",
    "Design Systems",
    "Accessibility",
    "Responsive Design",
  ],
} as const;

/**
 * Project Categories for Filtering
 */
export const PROJECT_CATEGORIES = [
  "All",
  "React",
  "Next.js",
  "3D/WebGL",
  "Animation",
  "SaaS",
  "E-commerce",
] as const;

/**
 * Animation Easing
 */
export const EASINGS = {
  smooth: [0.25, 0.46, 0.45, 0.94],
  spring: [0.43, 0.13, 0.23, 0.96],
  elastic: [0.68, -0.55, 0.265, 1.55],
} as const;

/**
 * Breakpoints (matches Tailwind)
 */
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

/**
 * Featured Projects (Phase 5)
 */
export const FEATURED_PROJECTS = [
  {
    id: '1',
    slug: 'luxury-portfolio',
    title: 'Premium Portfolio Experience',
    description:
      'Award-winning portfolio showcasing glassmorphism design, advanced animations, and 3D elements.',
    image: '/projects/project-1.jpg',
    tags: ['Next.js', 'TypeScript', 'GSAP', 'Three.js'],
  },
  {
    id: '2',
    slug: 'saas-dashboard',
    title: 'SaaS Dashboard Platform',
    description:
      'Real-time analytics dashboard with data visualization and interactive charts.',
    image: '/projects/project-2.jpg',
    tags: ['React', 'Tailwind CSS', 'Chart.js', 'API Integration'],
  },
  {
    id: '3',
    slug: 'ecommerce-store',
    title: 'E-Commerce Store',
    description:
      'Full-featured e-commerce platform with payment integration and product catalog.',
    image: '/projects/project-3.jpg',
    tags: ['Next.js', 'Stripe', 'PostgreSQL', 'Vercel'],
  },
] as const;

/**
 * About Stats (Phase 5)
 */
export const ABOUT_STATS = [
  { label: 'Years', value: '3+', icon: 'calendar' },
  { label: 'Projects', value: '15+', icon: 'briefcase' },
  { label: 'Clients', value: '10+', icon: 'users' },
] as const;

/**
 * Projects (Phase 6)
 */
export const PROJECTS = [
  {
    id: '1',
    slug: 'luxury-portfolio',
    title: 'Premium Portfolio Experience',
    description: 'Award-winning portfolio with glassmorphism and 3D.',
    image: '/projects/project-1.jpg',
    tags: ['Next.js', 'TypeScript', 'GSAP'],
    category: 'Next.js',
  },
  {
    id: '2',
    slug: 'saas-dashboard',
    title: 'SaaS Dashboard Platform',
    description: 'Real-time analytics with data visualization.',
    image: '/projects/project-2.jpg',
    tags: ['React', 'Tailwind CSS', 'API'],
    category: 'React',
  },
  {
    id: '3',
    slug: '3d-landing',
    title: '3D Interactive Landing',
    description: 'Immersive experience with Three.js.',
    image: '/projects/project-3.jpg',
    tags: ['Three.js', 'GSAP', 'WebGL'],
    category: '3D/WebGL',
  },
  {
    id: '4',
    slug: 'motion-ui',
    title: 'Motion Design System',
    description: 'Component library with advanced animations.',
    image: '/projects/project-4.jpg',
    tags: ['Framer Motion', 'React', 'Design'],
    category: 'Animation',
  },
  {
    id: '5',
    slug: 'fintech-app',
    title: 'FinTech SaaS Platform',
    description: 'Complete financial dashboard application.',
    image: '/projects/project-5.jpg',
    tags: ['Next.js', 'TypeScript', 'PostgreSQL'],
    category: 'SaaS',
  },
  {
    id: '6',
    slug: 'ecommerce-store',
    title: 'E-Commerce Store',
    description: 'Full-featured online retail platform.',
    image: '/projects/project-6.jpg',
    tags: ['Next.js', 'Stripe', 'Database'],
    category: 'E-commerce',
  },
  {
    id: '7',
    slug: 'react-components',
    title: 'Reusable React Components',
    description: 'Professional component library.',
    image: '/projects/project-7.jpg',
    tags: ['React', 'TypeScript', 'Storybook'],
    category: 'React',
  },
  {
    id: '8',
    slug: 'next-fullstack',
    title: 'Next.js Full Stack App',
    description: 'Complete end-to-end application.',
    image: '/projects/project-8.jpg',
    tags: ['Next.js', 'PostgreSQL', 'Auth'],
    category: 'Next.js',
  },
  {
    id: '9',
    slug: 'animation-showcase',
    title: 'Animation Showcase',
    description: 'Advanced motion graphics portfolio.',
    image: '/projects/project-9.jpg',
    tags: ['GSAP', 'Three.js', 'Canvas'],
    category: 'Animation',
  },
  {
    id: '10',
    slug: 'webgl-experiment',
    title: 'WebGL Experiment',
    description: 'Cutting-edge 3D web experience.',
    image: '/projects/project-10.jpg',
    tags: ['WebGL', 'GLSL', 'JavaScript'],
    category: '3D/WebGL',
  },
  {
    id: '11',
    slug: 'saas-platform',
    title: 'SaaS Booking Platform',
    description: 'Modern booking and scheduling app.',
    image: '/projects/project-11.jpg',
    tags: ['Next.js', 'Calendar', 'Payments'],
    category: 'SaaS',
  },
  {
    id: '12',
    slug: 'ecommerce-luxury',
    title: 'Luxury E-Commerce Site',
    description: 'Premium retail experience.',
    image: '/projects/project-12.jpg',
    tags: ['Next.js', 'Commerce', 'Premium UI'],
    category: 'E-commerce',
  },
] as const;

