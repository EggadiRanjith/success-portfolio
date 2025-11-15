/**
 * Tech Stack Section Constants
 * Centralized configuration for easy maintenance
 */

export const TECH_CATEGORIES = [
  {
    title: "Backend",
    icon: "⚡",
    technologies: [
      "FastAPI",
      "Node.js",
      "Django",
      "Spring Boot",
    ],
  },
  {
    title: "Frontend",
    icon: "🎨",
    technologies: [
      "Next.js",
      "React",
    ],
  },
  {
    title: "Databases",
    icon: "🗄️",
    technologies: [
      "MySQL",
      "MongoDB",
      "Redis",
      "PostgreSQL",
    ],
  },
  {
    title: "Cloud & DevOps",
    icon: "☁️",
    technologies: [
      "AWS (EC2, S3)",
      "Docker",
      "GitHub Actions",
    ],
  },
  {
    title: "AI & Automation",
    icon: "🤖",
    technologies: [
      "LangChain",
      "OpenAI API",
    ],
  },
  {
    title: "Languages",
    icon: "💻",
    technologies: [
      "Python",
      "Java",
      "JavaScript",
      "TypeScript",
      "SQL",
    ],
  },
] as const;

export const TECH_STACK_CONTENT = {
  label: "Technologies",
  title: {
    prefix: "Tech Stack & ",
    highlight: "Tools",
  },
  description: "Modern backend technologies and cloud infrastructure for building scalable applications",
  note: "<strong>Continuously learning</strong> and exploring new technologies to stay current with industry best practices and emerging backend frameworks.",
} as const;

