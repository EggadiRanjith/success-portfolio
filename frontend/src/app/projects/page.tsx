"use client";

import React, { useState, useRef, useEffect } from "react";
import { Container, Heading, Text, Badge, Button } from "@/components/ui";
import { ProjectCard } from "@/components/home/ProjectCard";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(SplitText);
}

// Extended project data
const ALL_PROJECTS = [
  {
    id: "1",
    title: "E-Commerce Platform",
    description: "A modern, high-performance e-commerce platform with advanced filtering, real-time inventory management, and seamless checkout experience. Built with cutting-edge technologies for optimal performance.",
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=1200&h=800&fit=crop&q=80",
    tags: ["Next.js", "TypeScript", "Stripe", "Tailwind", "Framer Motion", "PostgreSQL"],
    href: "/projects/ecommerce",
    featured: true,
    category: "E-Commerce",
    year: "2024",
    githubUrl: "https://github.com/yourusername/ecommerce",
    liveUrl: "https://ecommerce-demo.vercel.app",
  },
  {
    id: "2",
    title: "3D Product Configurator",
    description: "Interactive 3D product customization tool with real-time rendering, AR preview capabilities, and photorealistic materials.",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&h=800&fit=crop&q=80",
    tags: ["Three.js", "React", "WebGL", "R3F", "GSAP"],
    href: "/projects/3d-configurator",
    category: "3D/WebGL",
    year: "2024",
    githubUrl: "https://github.com/yourusername/3d-configurator",
    liveUrl: "https://3d-configurator-demo.vercel.app",
  },
  {
    id: "3",
    title: "SaaS Analytics Dashboard",
    description: "Comprehensive analytics dashboard with real-time data visualization and advanced reporting capabilities.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80",
    tags: ["React", "D3.js", "Node.js", "PostgreSQL", "WebSocket"],
    href: "/projects/saas-dashboard",
    category: "SaaS",
    year: "2023",
    githubUrl: "https://github.com/yourusername/saas-dashboard",
  },
  {
    id: "4",
    title: "Award-Winning Portfolio",
    description: "Premium portfolio website featuring advanced GSAP animations and stunning glassmorphism design.",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop&q=80",
    tags: ["Next.js", "GSAP", "Framer Motion", "WebGL", "Tailwind"],
    href: "/projects/portfolio",
    category: "Portfolio",
    year: "2024",
    liveUrl: "https://portfolio-demo.vercel.app",
  },
  {
    id: "5",
    title: "AI Content Generator",
    description: "Advanced AI-powered content generation platform with GPT integration and real-time collaboration.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop&q=80",
    tags: ["Next.js", "OpenAI", "TypeScript", "Prisma", "Tailwind"],
    href: "/projects/ai-content",
    category: "AI/ML",
    year: "2024",
    githubUrl: "https://github.com/yourusername/ai-content",
    liveUrl: "https://ai-content-demo.vercel.app",
  },
  {
    id: "6",
    title: "Fitness Tracking App",
    description: "Mobile-first fitness tracking application with workout plans, progress tracking, and social features.",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop&q=80",
    tags: ["React Native", "Firebase", "Redux", "Expo"],
    href: "/projects/fitness-app",
    category: "Mobile",
    year: "2023",
    githubUrl: "https://github.com/yourusername/fitness-app",
  },
];

const CATEGORIES = ["All", "E-Commerce", "3D/WebGL", "SaaS", "Portfolio", "AI/ML", "Mobile"];

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const filteredProjects = selectedCategory === "All" 
    ? ALL_PROJECTS 
    : ALL_PROJECTS.filter(project => project.category === selectedCategory);

  useEffect(() => {
    if (!isInView || !headingRef.current) return;

    const ctx = gsap.context(() => {
      // Eyebrow animation
      if (eyebrowRef.current) {
        gsap.from(eyebrowRef.current, {
          opacity: 0,
          y: 20,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.1,
        });
      }

      // Split text animation for heading
      if (headingRef.current) {
        const split = new SplitText(headingRef.current, { type: "chars,words" });
        
        gsap.from(split.chars, {
          opacity: 0,
          y: 80,
          rotateX: -90,
          stagger: 0.03,
          duration: 1,
          ease: "back.out(1.7)",
          delay: 0.2,
        });

        // Subtle floating animation
        gsap.to(split.chars, {
          y: -3,
          stagger: {
            each: 0.04,
            repeat: -1,
            yoyo: true,
          },
          duration: 2.5,
          ease: "sine.inOut",
          delay: 1.3,
        });
      }

      // Description fade in
      if (descriptionRef.current) {
        gsap.from(descriptionRef.current, {
          opacity: 0,
          y: 30,
          duration: 1,
          ease: "power3.out",
          delay: 0.5,
        });
      }

      // Filters animation
      if (filtersRef.current) {
        const filters = filtersRef.current.querySelectorAll("button");
        gsap.from(filters, {
          opacity: 0,
          scale: 0.9,
          y: 20,
          stagger: 0.05,
          duration: 0.6,
          ease: "back.out(1.7)",
          delay: 0.7,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isInView]);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section
        ref={sectionRef}
        className="relative py-32 lg:py-40 overflow-hidden border-b border-border-primary/20 bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-zinc-950 dark:via-black dark:to-zinc-900"
      >
        {/* Gradient Orbs */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[20%] left-[10%] w-[600px] h-[600px] bg-gradient-radial from-amber-100/40 via-orange-100/20 to-transparent dark:from-amber-500/20 dark:via-orange-500/10 dark:to-transparent blur-3xl" />
          <div className="absolute bottom-[20%] right-[10%] w-[700px] h-[700px] bg-gradient-radial from-rose-100/30 via-red-100/15 to-transparent dark:from-rose-500/15 dark:via-red-500/8 dark:to-transparent blur-3xl" />
        </div>

        <Container variant="standard" size="xl" className="relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <p 
              ref={eyebrowRef}
              className="text-caption text-fg-tertiary uppercase tracking-[0.3em] mb-6 font-medium"
            >
              ✦ My Work ✦
            </p>
            
            <h1 
              ref={headingRef}
              className="text-[clamp(3rem,8vw,7rem)] leading-[1.05] tracking-tight font-bold text-fg-primary mb-8"
              style={{ 
                fontFamily: "var(--font-sans)",
                textShadow: "0 2px 30px rgba(0,0,0,0.2)",
              }}
            >
              Projects{" "}
              <span className="text-gradient-silver inline-block">Portfolio</span>
            </h1>

            <p 
              ref={descriptionRef}
              className="text-[clamp(1.125rem,1.8vw,1.375rem)] leading-relaxed text-fg-secondary max-w-2xl mx-auto font-light mb-12"
            >
              A showcase of my best work, from{" "}
              <span className="text-fg-primary font-medium">e-commerce platforms</span> to{" "}
              <span className="text-fg-primary font-medium">3D experiences</span> and{" "}
              <span className="text-fg-primary font-medium">AI-powered solutions</span>.
            </p>

            {/* Filter Buttons */}
            <div ref={filtersRef} className="flex flex-wrap items-center justify-center gap-3">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`
                    px-6 py-2.5 rounded-full font-medium text-sm transition-all duration-300
                    ${selectedCategory === category
                      ? "bg-fg-primary text-white shadow-lg scale-105"
                      : "bg-bg-secondary text-fg-secondary hover:bg-fg-primary/10 hover:text-fg-primary"
                    }
                  `}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Projects Grid */}
      <section className="relative py-24 lg:py-32 bg-primary">
        <Container variant="standard" size="xl">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <ProjectCard {...project} index={index} />
              </motion.div>
            ))}
          </motion.div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <Text size="body-xl" color="secondary">
                No projects found in this category.
              </Text>
            </div>
          )}
        </Container>
      </section>
    </main>
  );
}
