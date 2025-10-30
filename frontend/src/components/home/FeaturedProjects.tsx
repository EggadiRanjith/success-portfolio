"use client";

import React, { useRef, useEffect } from "react";
import { Container, Heading, Text, Button } from "@/components/ui";
import { ProjectCard } from "./ProjectCard";
import { useRouter } from "next/navigation";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(SplitText);
}

// Mock project data - replace with real data later
// Using placeholder service for demo images
const FEATURED_PROJECTS = [
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
    description: "Interactive 3D product customization tool with real-time rendering, AR preview capabilities, and photorealistic materials. Revolutionary shopping experience with immersive technology.",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&h=800&fit=crop&q=80",
    tags: ["Three.js", "React", "WebGL", "R3F", "GSAP", "TypeScript"],
    href: "/projects/3d-configurator",
    featured: true,
    category: "3D/WebGL",
    year: "2024",
    githubUrl: "https://github.com/yourusername/3d-configurator",
    liveUrl: "https://3d-configurator-demo.vercel.app",
  },
  {
    id: "3",
    title: "SaaS Analytics Dashboard",
    description: "Comprehensive analytics dashboard with real-time data visualization, advanced reporting capabilities, and interactive charts powered by D3.js.",
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
    description: "Premium portfolio website featuring advanced GSAP animations, 3D elements, and stunning glassmorphism design that won multiple design awards.",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop&q=80",
    tags: ["Next.js", "GSAP", "Framer Motion", "WebGL", "Tailwind"],
    href: "/projects/portfolio",
    category: "Portfolio",
    year: "2024",
    liveUrl: "https://portfolio-demo.vercel.app",
  },
];

export function FeaturedProjects() {
  const router = useRouter();
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-150px" });

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

      // CTA button animation
      if (ctaRef.current) {
        gsap.from(ctaRef.current, {
          opacity: 0,
          scale: 0.9,
          y: 20,
          duration: 0.8,
          ease: "back.out(1.7)",
          delay: 0.7,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isInView]);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 lg:py-40 overflow-hidden border-y border-border-primary/20 bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-zinc-950 dark:via-black dark:to-zinc-900"
    >
      {/* Large Visible Gradient Orbs */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[20%] left-[10%] w-[600px] h-[600px] bg-gradient-radial from-blue-100/40 via-purple-100/20 to-transparent dark:from-blue-500/20 dark:via-purple-500/10 dark:to-transparent blur-3xl" />
        <div className="absolute bottom-[20%] right-[10%] w-[700px] h-[700px] bg-gradient-radial from-purple-100/30 via-pink-100/15 to-transparent dark:from-purple-500/15 dark:via-pink-500/8 dark:to-transparent blur-3xl" />
        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-radial from-indigo-100/25 to-transparent dark:from-indigo-500/12 dark:to-transparent blur-3xl" />
      </div>
      
      {/* Edge highlights */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-white/20 to-transparent z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-white/15 to-transparent z-10" />

      <Container variant="standard" size="xl" className="relative z-10">
        {/* Section Header with GSAP animations */}
        <div className="text-center mb-16 lg:mb-20">
          <p 
            ref={eyebrowRef}
            className="text-caption text-tertiary uppercase tracking-[0.3em] mb-6 font-medium"
          >
            ✦ Featured Work ✦
          </p>
          <h2 
            ref={headingRef}
            className="text-[clamp(2.5rem,6vw,5rem)] leading-[1.1] tracking-tight font-bold text-primary mb-8"
            style={{ 
              fontFamily: "var(--font-sans)",
              textShadow: "0 2px 30px rgba(0,0,0,0.2)",
            }}
          >
            Projects That
            <br />
            <span className="text-gradient-silver inline-block">Define Excellence</span>
          </h2>
          <p 
            ref={descriptionRef}
            className="text-[clamp(1.125rem,1.8vw,1.375rem)] leading-relaxed text-secondary max-w-2xl mx-auto font-light"
          >
            A curated selection of my most impactful work, showcasing expertise in{" "}
            <span className="text-primary font-medium">modern web technologies</span>,{" "}
            <span className="text-primary font-medium">3D graphics</span>, and{" "}
            <span className="text-primary font-medium">premium user experiences</span>.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8 mb-12">
          {FEATURED_PROJECTS.map((project, index) => (
            <ProjectCard
              key={project.id}
              {...project}
              index={index}
            />
          ))}
        </div>

        {/* CTA with GSAP animation */}
        <div ref={ctaRef} className="text-center">
          <Button
            variant="secondary"
            size="lg"
            onClick={() => router.push("/projects")}
            className="hover-glow pressable group relative overflow-hidden px-10 py-5 text-lg font-semibold"
          >
            <span className="relative z-10 flex items-center gap-3">
              View All Projects
              <motion.svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                whileHover={{ x: 4, y: -4 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </motion.svg>
            </span>
            {/* Premium shine effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: "-100%" }}
              whileHover={{ x: "200%" }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              style={{ width: "50%", transform: "skewX(-20deg)" }}
            />
          </Button>
        </div>
      </Container>
    </section>
  );
}

export default FeaturedProjects;
