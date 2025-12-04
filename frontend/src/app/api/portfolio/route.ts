import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import type { PortfolioData } from "@/lib/adminData";

// Path to the data file
const DATA_FILE_PATH = path.join(process.cwd(), "data", "portfolio.json");

// Default data (same as in adminData.ts)
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

// Helper function to read data file
async function readDataFile(): Promise<PortfolioData> {
  try {
    const dataDir = path.dirname(DATA_FILE_PATH);
    await fs.mkdir(dataDir, { recursive: true });
    
    const fileContent = await fs.readFile(DATA_FILE_PATH, "utf-8");
    const data = JSON.parse(fileContent) as PortfolioData;
    
    // Ensure hero field exists (migration)
    if (!data.hero) {
      data.hero = defaultData.hero;
      await writeDataFile(data);
    }
    
    // Migrate profile.jpg to profile.png if needed
    if (data.personalInfo?.profileImage === "/profile.jpg") {
      data.personalInfo.profileImage = "/profile.png";
      await writeDataFile(data);
    } else if (!data.personalInfo?.profileImage) {
      data.personalInfo.profileImage = "/profile.png";
      await writeDataFile(data);
    }
    
    return data;
  } catch (error) {
    // If file doesn't exist, return default data and create file
    await writeDataFile(defaultData);
    return defaultData;
  }
}

// Helper function to write data file
async function writeDataFile(data: PortfolioData): Promise<void> {
  try {
    const dataDir = path.dirname(DATA_FILE_PATH);
    await fs.mkdir(dataDir, { recursive: true });
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing portfolio data:", error);
    throw error;
  }
}

// GET - Fetch portfolio data
export async function GET() {
  try {
    const data = await readDataFile();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error reading portfolio data:", error);
    return NextResponse.json(
      { error: "Failed to fetch portfolio data" },
      { status: 500 }
    );
  }
}

// POST - Save portfolio data (admin only - should add auth check)
export async function POST(request: NextRequest) {
  try {
    // TODO: Add authentication check here
    // const authHeader = request.headers.get("authorization");
    // if (!isValidAdminToken(authHeader)) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }

    const body = await request.json();
    const data = body as PortfolioData;

    // Validate data structure (basic validation)
    if (!data || typeof data !== "object") {
      return NextResponse.json(
        { error: "Invalid data format" },
        { status: 400 }
      );
    }

    await writeDataFile(data);
    
    return NextResponse.json(
      { message: "Portfolio data saved successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving portfolio data:", error);
    return NextResponse.json(
      { error: "Failed to save portfolio data" },
      { status: 500 }
    );
  }
}

