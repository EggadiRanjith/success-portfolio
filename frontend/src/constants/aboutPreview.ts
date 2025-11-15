/**
 * About Preview Section Constants
 * Centralized configuration for easy maintenance
 */

export const ABOUT_HIGHLIGHTS = [
  {
    iconName: "Award" as const,
    title: "AWS Cloud Practitioner Certified",
    description: "Validated cloud architecture expertise",
  },
  {
    iconName: "Code2" as const,
    title: "Multi-Language Proficiency",
    description: "Python, Java, JavaScript, TypeScript, SQL",
  },
  {
    iconName: "Cloud" as const,
    title: "Production DevOps",
    description: "Docker, Redis, AWS EC2 + S3, CI/CD",
  },
] as const;

export const ABOUT_STATS = [
  {
    value: "10+",
    label: "Production APIs",
  },
  {
    value: "3+",
    label: "Years Experience",
  },
  {
    value: "5+",
    label: "Cloud Deployments",
  },
  {
    value: "150+",
    label: "LeetCode Solved",
  },
] as const;

export const ABOUT_CONTENT = {
  label: "About Me",
  title: {
    prefix: "Backend & ",
    highlight: "Full-Stack Developer",
  },
  paragraphs: [
    "I'm <strong>Ranjith Eggadi</strong>, a Computer Science graduate from Kamala Institute of Technology and Science, based in Hyderabad, Telangana.",
    "I specialize in backend and full-stack development with strong experience in <strong>Java</strong>, <strong>Python</strong>, and <strong>JavaScript</strong>. My expertise spans <strong>Spring Boot</strong>, <strong>Django</strong>, <strong>Node.js</strong>, and <strong>FastAPI</strong>, with hands-on experience in Microservices, REST APIs, and AWS.",
    "I focus on building scalable, secure, and performance-optimized applications using Agile methodologies, CI/CD pipelines, and cloud deployments.",
  ],
  ctaText: "Learn More About Me",
  ctaHref: "/about",
} as const;

