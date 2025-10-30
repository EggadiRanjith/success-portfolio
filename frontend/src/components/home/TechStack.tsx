"use client";

import React, { useRef, useEffect } from "react";
import { Container, Heading, Text, Badge } from "@/components/ui";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(SplitText);
}

const TECH_CATEGORIES = [
  {
    title: "Frontend",
    icon: "⚡",
    technologies: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "GSAP",
    ],
  },
  {
    title: "3D & Animation",
    icon: "🎨",
    technologies: [
      "Three.js",
      "React Three Fiber",
      "WebGL",
      "GSAP",
      "Lottie",
      "Spline",
    ],
  },
  {
    title: "Backend & Database",
    icon: "🔧",
    technologies: [
      "Node.js",
      "PostgreSQL",
      "MongoDB",
      "Prisma",
      "GraphQL",
      "REST APIs",
    ],
  },
  {
    title: "Tools & Platform",
    icon: "🚀",
    technologies: [
      "Git",
      "Docker",
      "Vercel",
      "AWS",
      "Figma",
      "VS Code",
    ],
  },
];

export function TechStack() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const noteRef = useRef<HTMLDivElement>(null);
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
          y: 70,
          rotateX: -90,
          stagger: 0.028,
          duration: 0.95,
          ease: "back.out(1.7)",
          delay: 0.2,
        });

        // Subtle floating animation
        gsap.to(split.chars, {
          y: -3,
          stagger: {
            each: 0.035,
            repeat: -1,
            yoyo: true,
          },
          duration: 2.6,
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

      // Cards cascade animation
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll(".tech-card");
        gsap.from(cards, {
          opacity: 0,
          y: 80,
          scale: 0.9,
          rotateY: -15,
          stagger: 0.12,
          duration: 1,
          ease: "back.out(1.5)",
          delay: 0.6,
        });

        // Animate icons with bounce
        cards.forEach((card, index) => {
          const icon = card.querySelector(".tech-icon");
          if (icon) {
            gsap.from(icon, {
              scale: 0,
              rotation: 180,
              duration: 0.8,
              ease: "back.out(2)",
              delay: 0.7 + index * 0.12,
            });
          }
        });

        // Animate badges with stagger
        cards.forEach((card, cardIndex) => {
          const badges = card.querySelectorAll(".tech-badge");
          gsap.from(badges, {
            opacity: 0,
            scale: 0.8,
            stagger: 0.04,
            duration: 0.5,
            ease: "back.out(1.7)",
            delay: 0.9 + cardIndex * 0.12,
          });
        });
      }

      // Note animation
      if (noteRef.current) {
        gsap.from(noteRef.current, {
          opacity: 0,
          y: 20,
          duration: 0.8,
          ease: "power3.out",
          delay: 1.5,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isInView]);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 lg:py-40 overflow-hidden border-y border-border-primary/20 bg-gradient-to-tr from-slate-100 via-white to-slate-50 dark:from-zinc-900 dark:via-black dark:to-zinc-950"
    >
      {/* Large Visible Gradient Orbs - Different colors again */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[10%] left-[8%] w-[680px] h-[680px] bg-gradient-radial from-violet-100/38 via-purple-100/19 to-transparent dark:from-violet-500/19 dark:via-purple-500/10 dark:to-transparent blur-3xl" />
        <div className="absolute bottom-[15%] right-[8%] w-[720px] h-[720px] bg-gradient-radial from-fuchsia-100/32 via-pink-100/16 to-transparent dark:from-fuchsia-500/16 dark:via-pink-500/8 dark:to-transparent blur-3xl" />
        <div className="absolute top-[50%] right-[45%] w-[580px] h-[580px] bg-gradient-radial from-rose-100/30 to-transparent dark:from-rose-500/15 dark:to-transparent blur-3xl" />
      </div>
      
      {/* Edge highlights */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-400 dark:via-white/22 to-transparent z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-white/18 to-transparent z-10" />

      <Container variant="standard" size="xl" className="relative z-10">
        {/* Section Header with GSAP animations */}
        <div className="text-center mb-16 lg:mb-20">
          <p 
            ref={eyebrowRef}
            className="text-caption text-tertiary uppercase tracking-[0.3em] mb-6 font-medium"
          >
            ✦ Tech Stack ✦
          </p>
          <h2 
            ref={headingRef}
            className="text-[clamp(2.5rem,6vw,5rem)] leading-[1.1] tracking-tight font-bold text-primary mb-8"
            style={{ 
              fontFamily: "var(--font-sans)",
              textShadow: "0 2px 30px rgba(0,0,0,0.2)",
            }}
          >
            Technologies I
            <br />
            <span className="text-gradient-silver inline-block">Master</span>
          </h2>
          <p 
            ref={descriptionRef}
            className="text-[clamp(1.125rem,1.8vw,1.375rem)] leading-relaxed text-secondary max-w-2xl mx-auto font-light"
          >
            A comprehensive toolkit of{" "}
            <span className="text-primary font-medium">modern technologies</span>,{" "}
            <span className="text-primary font-medium">frameworks</span>, and{" "}
            <span className="text-primary font-medium">tools</span> to bring ideas to life with precision and performance.
          </p>
        </div>

        {/* Tech Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {TECH_CATEGORIES.map((category, categoryIndex) => (
            <div
              key={category.title}
              className="tech-card group relative"
            >
              {/* Card */}
              <div className="relative h-full p-8 rounded-2xl glass-card border border-border-primary transition-all duration-500 hover:scale-105 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
                {/* Icon & Title */}
                <div className="mb-6">
                  <div className="tech-icon text-5xl mb-4 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12">
                    {category.icon}
                  </div>
                  <h3 className="text-h4 font-bold text-primary group-hover:text-gradient-silver transition-all duration-300">
                    {category.title}
                  </h3>
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {category.technologies.map((tech) => (
                    <div key={tech} className="tech-badge">
                      <Badge variant="glass" size="md">
                        {tech}
                      </Badge>
                    </div>
                  ))}
                </div>

                {/* Hover shine effect */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden">
                  <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                </div>

                {/* Premium border glow on hover */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 rounded-2xl border-2 border-white/10 blur-sm" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div ref={noteRef} className="text-center mt-12">
          <Text size="body-sm" color="tertiary" className="italic">
            Always learning, always growing. Currently exploring{" "}
            <span className="text-primary font-medium">AI/ML integration</span> and{" "}
            <span className="text-primary font-medium">Web3 technologies</span>.
          </Text>
        </div>
      </Container>
    </section>
  );
}

export default TechStack;
