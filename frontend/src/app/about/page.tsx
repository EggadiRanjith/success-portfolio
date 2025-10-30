"use client";

import React, { useRef, useEffect } from "react";
import { Container, Heading, Text, Badge } from "@/components/ui";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { Code2, Palette, Rocket, Award } from "lucide-react";
import { PerformanceMetrics } from "@/components/PerformanceMetrics";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(SplitText);
}

const SKILLS = [
  {
    category: "Frontend Development",
    icon: Code2,
    skills: ["React", "Next.js", "TypeScript", "Vue.js", "Tailwind CSS", "Sass/SCSS"],
    level: 95,
  },
  {
    category: "3D & Animation",
    icon: Palette,
    skills: ["Three.js", "GSAP", "Framer Motion", "WebGL", "Lottie", "Spline"],
    level: 90,
  },
  {
    category: "Backend & Database",
    icon: Rocket,
    skills: ["Node.js", "PostgreSQL", "MongoDB", "Prisma", "GraphQL", "REST APIs"],
    level: 85,
  },
  {
    category: "Tools & Platforms",
    icon: Award,
    skills: ["Git", "Docker", "Vercel", "AWS", "Figma", "VS Code"],
    level: 92,
  },
];

const TIMELINE = [
  {
    year: "2024",
    title: "Senior Frontend Developer",
    company: "Tech Innovations Inc.",
    description: "Leading the development of cutting-edge web applications with focus on performance and user experience.",
  },
  {
    year: "2022",
    title: "Frontend Developer",
    company: "Digital Solutions Co.",
    description: "Built responsive web applications and implemented advanced animations and 3D features.",
  },
  {
    year: "2020",
    title: "Junior Developer",
    company: "StartUp Labs",
    description: "Started my professional journey, learning modern web technologies and best practices.",
  },
  {
    year: "2019",
    title: "Computer Science Degree",
    company: "University",
    description: "Graduated with honors, specializing in web development and software engineering.",
  },
];

export default function AboutPage() {
  const heroRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(heroRef, { once: true, margin: "-100px" });

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

      // Split text animation
      if (headingRef.current) {
        const split = new SplitText(headingRef.current, { type: "chars,words" });
        
        gsap.from(split.chars, {
          opacity: 0,
          y: 60,
          rotateX: -90,
          stagger: 0.025,
          duration: 0.9,
          ease: "back.out(1.7)",
          delay: 0.2,
        });

        gsap.to(split.chars, {
          y: -2,
          stagger: {
            each: 0.03,
            repeat: -1,
            yoyo: true,
          },
          duration: 2.8,
          ease: "sine.inOut",
          delay: 1.2,
        });
      }

      // Description
      if (descriptionRef.current) {
        const paragraphs = descriptionRef.current.querySelectorAll("p");
        gsap.from(paragraphs, {
          opacity: 0,
          y: 30,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.5,
        });
      }

      // Image
      if (imageRef.current) {
        gsap.from(imageRef.current, {
          opacity: 0,
          scale: 0.95,
          duration: 1,
          ease: "power3.out",
          delay: 0.3,
        });
      }

      // Skills cards
      if (skillsRef.current) {
        const cards = skillsRef.current.querySelectorAll(".skill-card");
        gsap.from(cards, {
          opacity: 0,
          y: 60,
          scale: 0.95,
          stagger: 0.1,
          duration: 0.8,
          ease: "back.out(1.5)",
        });
      }

      // Timeline
      if (timelineRef.current) {
        const items = timelineRef.current.querySelectorAll(".timeline-item");
        gsap.from(items, {
          opacity: 0,
          x: -40,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, [isInView]);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative py-32 lg:py-40 overflow-hidden border-b border-border-primary/20 bg-gradient-to-bl from-slate-100 via-white to-slate-50 dark:from-black dark:via-zinc-950 dark:to-zinc-900"
      >
        {/* Gradient Orbs */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[15%] right-[5%] w-[650px] h-[650px] bg-gradient-radial from-emerald-100/35 via-teal-100/18 to-transparent dark:from-emerald-500/18 dark:via-teal-500/9 dark:to-transparent blur-3xl" />
          <div className="absolute bottom-[25%] left-[5%] w-[700px] h-[700px] bg-gradient-radial from-cyan-100/30 via-blue-100/15 to-transparent dark:from-cyan-500/15 dark:via-blue-500/8 dark:to-transparent blur-3xl" />
        </div>

        <Container variant="standard" size="xl" className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: Content */}
            <div>
              <p 
                ref={eyebrowRef}
                className="text-caption text-fg-tertiary uppercase tracking-[0.3em] mb-6 font-medium"
              >
                ✦ About Me ✦
              </p>
              
              <h1 
                ref={headingRef}
                className="text-[clamp(2.5rem,6vw,5rem)] leading-[1.1] tracking-tight font-bold text-fg-primary mb-8"
                style={{ 
                  fontFamily: "var(--font-sans)",
                  textShadow: "0 2px 30px rgba(0,0,0,0.2)",
                }}
              >
                Crafting Digital
                <br />
                <span className="text-gradient-silver inline-block">Experiences</span>
              </h1>

              <div ref={descriptionRef} className="space-y-4">
                <Text size="body-lg" color="primary" className="leading-relaxed">
                  I'm a passionate frontend developer with 5+ years of experience creating{" "}
                  <span className="font-semibold">exceptional digital experiences</span> that blend
                  cutting-edge technology with beautiful design.
                </Text>

                <Text size="body" color="secondary" className="leading-relaxed">
                  My journey in web development started with a simple curiosity about how websites work,
                  and has evolved into a deep passion for creating immersive, performant, and accessible
                  web applications that delight users.
                </Text>

                <Text size="body" color="secondary" className="leading-relaxed">
                  I specialize in React, Next.js, and modern web technologies, with a particular love for
                  3D graphics, advanced animations, and creating pixel-perfect interfaces. When I'm not
                  coding, you'll find me exploring new technologies, contributing to open source, or
                  mentoring aspiring developers.
                </Text>
              </div>
            </div>

            {/* Right: Image */}
            <div ref={imageRef} className="relative">
              <div className="relative aspect-square max-w-lg mx-auto lg:ml-auto">
                <div className="absolute inset-0 rounded-3xl glass-base border-2 border-border-primary p-2">
                  <div className="relative w-full h-full rounded-2xl overflow-hidden bg-secondary">
                    <Image
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop&crop=faces"
                      alt="Profile"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-bg-primary/20" />
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full glass-frosted border border-border-primary blur-xl opacity-60" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 rounded-full glass-frosted border border-border-primary blur-xl opacity-60" />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Skills Section */}
      <section className="relative py-24 lg:py-32 bg-secondary">
        <Container variant="standard" size="xl">
          <div className="text-center mb-16">
            <Heading as="h2" size="h1" className="text-fg-primary mb-4">
              Skills & Expertise
            </Heading>
            <Text size="body-xl" color="secondary">
              Technologies I've mastered over the years
            </Text>
          </div>

          <div ref={skillsRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {SKILLS.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <motion.div
                  key={skill.category}
                  className="skill-card glass-card p-8 rounded-2xl border border-border-primary"
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className="p-3 rounded-xl bg-primary/10">
                      <Icon className="w-6 h-6 text-fg-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-h4 font-bold text-fg-primary mb-2">{skill.category}</h3>
                      <div className="w-full bg-secondary rounded-full h-2 mb-4">
                        <motion.div
                          className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                          viewport={{ once: true }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skill.skills.map((s) => (
                      <Badge key={s} variant="glass" size="md">
                        {s}
                      </Badge>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Timeline Section */}
      <section className="relative py-24 lg:py-32 bg-primary">
        <Container variant="standard" size="xl">
          <div className="text-center mb-16">
            <Heading as="h2" size="h1" className="text-fg-primary mb-4">
              My Journey
            </Heading>
            <Text size="body-xl" color="secondary">
              The path that led me here
            </Text>
          </div>

          <div ref={timelineRef} className="max-w-3xl mx-auto">
            {TIMELINE.map((item, index) => (
              <div
                key={index}
                className="timeline-item relative pl-8 pb-12 last:pb-0 border-l-2 border-border-primary"
              >
                <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-primary border-2 border-bg-primary" />
                <div className="glass-card p-6 rounded-xl border border-border-primary">
                  <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-fg-primary text-sm font-semibold mb-2">
                    {item.year}
                  </span>
                  <h3 className="text-h4 font-bold text-fg-primary mb-1">{item.title}</h3>
                  <p className="text-body text-fg-secondary font-medium mb-2">{item.company}</p>
                  <p className="text-body-sm text-fg-tertiary">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Performance Metrics Section */}
      <PerformanceMetrics />
    </main>
  );
}
