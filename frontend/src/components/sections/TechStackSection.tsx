/**
 * Tech Stack Component - PREMIUM GSAP ANIMATIONS
 * Professional animations with lazy-loading and error handling
 */

"use client";

import React, { useRef, useEffect, useState } from "react";
import { Container, Heading, Text, Badge, Card } from "@/components/ui";
import { useReducedMotion } from "framer-motion";
import {
  TECH_STACK_CONTENT,
} from "@/constants/techStack";
import {
  animateFadeInUp,
  animateStagger,
  animateScrollFadeIn,
  cleanupGSAP,
  prefersReducedMotion as checkReducedMotion,
} from "@/lib/gsapAnimations";
import { getPortfolioData, type Skill } from "@/lib/adminData";

// Icon mapping for categories
const categoryIcons: Record<string, string> = {
  "Programming Languages": "💻",
  "Backend Development": "⚡",
  "Frontend Development": "🎨",
  "Databases": "🗄️",
  "Cloud & DevOps": "☁️",
  "AI & Automation": "🤖",
  "Languages": "💻",
};

export function TechStackSection() {
  const prefersReducedMotion = useReducedMotion();
  const [isMounted, setIsMounted] = useState(false);
  const [techCategories, setTechCategories] = useState<Array<{ title: string; icon: string; technologies: string[] }>>([]);
  
  // Refs for GSAP animations
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const techGridRef = useRef<HTMLDivElement>(null);
  const techCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const noteRef = useRef<HTMLDivElement>(null);

  // Load tech stack from admin data
  useEffect(() => {
    if (typeof window === "undefined") return;

    const loadTechStack = () => {
      try {
        const data = getPortfolioData();
        if (data?.skills) {
          const categories = data.skills.map((skill: Skill) => ({
            title: skill.category,
            icon: categoryIcons[skill.category] || "⚡",
            technologies: skill.items,
          }));
          setTechCategories(categories);
        }
      } catch (error) {
        setTechCategories([]);
      }
    };

    loadTechStack();

    // Listen for updates
    const handlePortfolioUpdate = () => {
      loadTechStack();
    };

    window.addEventListener("portfolio-data-updated", handlePortfolioUpdate);
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "portfolio_admin_data" || e.key === null) {
        loadTechStack();
      }
    };
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("portfolio-data-updated", handlePortfolioUpdate);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Track if animations have been initialized
  const animationsInitializedRef = useRef(false);
  
  // Initialize GSAP animations - Wait for page fully loaded
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    // Prevent re-triggering
    if (animationsInitializedRef.current) return;
    
    setIsMounted(true);
    
    if (prefersReducedMotion || checkReducedMotion()) {
      return;
    }
    
    const cleanupFunctions: Array<() => void> = [];
    
    // Wait for page to fully load before starting animations
    const startAnimations = () => {
      // Prevent re-triggering
      if (animationsInitializedRef.current) return;
      animationsInitializedRef.current = true;
      if (!headerRef.current || !labelRef.current || !titleRef.current || !descriptionRef.current) {
        return;
      }

      // Premium header animations
      if (labelRef.current) {
        animateFadeInUp(labelRef.current, {
          delay: 0.2,
          duration: 1.4,
          y: 40,
        });
      }

      if (titleRef.current) {
        animateFadeInUp(titleRef.current, {
          delay: 0.4,
          duration: 1.6,
          y: 50,
        });
      }

      if (descriptionRef.current) {
        animateFadeInUp(descriptionRef.current, {
          delay: 0.6,
          duration: 1.3,
          y: 40,
        });
      }

      // Premium tech grid - Scroll-triggered
      if (techGridRef.current) {
        const cleanup = animateScrollFadeIn(techGridRef.current, {
          start: "top 80%",
          end: "top 50%",
          y: 60,
        });
        if (cleanup) cleanupFunctions.push(cleanup);

        // Stagger tech cards
        setTimeout(() => {
          const cards = techCardRefs.current.filter(Boolean) as HTMLElement[];
          if (cards.length > 0) {
            animateStagger(cards, {
              delay: 0.2,
              duration: 1.2,
              stagger: 0.12,
              y: 50,
            });
          }
        }, 500);
      }

      // Premium note - Scroll-triggered
      if (noteRef.current) {
        const cleanup = animateScrollFadeIn(noteRef.current, {
          start: "top 85%",
          end: "top 60%",
          y: 40,
        });
        if (cleanup) cleanupFunctions.push(cleanup);
      }
    };

    // Wait for page to be fully loaded
    if (document.readyState === "complete") {
      setTimeout(startAnimations, 600);
    } else {
      window.addEventListener("load", () => {
        setTimeout(startAnimations, 600);
      }, { once: true });
    }
    
    return () => {
      cleanupGSAP(cleanupFunctions);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-secondary/30 dark:bg-secondary/10"
      style={{
        paddingTop: "clamp(1.5rem, 3vh + 0.5rem, 2.5rem)",
        paddingBottom: "clamp(1.5rem, 3vh + 0.5rem, 2.5rem)",
      }}
    >
      {/* Background gradient orbs - Responsive sizing */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-1/4 left-1/4 bg-purple-500/20 dark:bg-purple-400/10 rounded-full blur-3xl"
          style={{
            width: "clamp(12rem, 30vw, 24rem)",
            height: "clamp(12rem, 30vw, 24rem)",
          }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 bg-cyan-500/20 dark:bg-cyan-400/10 rounded-full blur-3xl"
          style={{
            width: "clamp(12rem, 30vw, 24rem)",
            height: "clamp(12rem, 30vw, 24rem)",
          }}
        />
      </div>

      <Container size="lg" className="relative z-10 px-4 sm:px-6">
        {/* Mobile-Optimized Header */}
        <div 
          ref={headerRef} 
          className="text-center mb-6 sm:mb-8"
        >
          <Text
            ref={labelRef}
            size="body-sm"
            color="primary"
            className="font-semibold uppercase tracking-wider mb-2 sm:mb-3"
            style={{
              fontSize: "clamp(0.75rem, 2vw, 0.875rem)",
            }}
          >
            {TECH_STACK_CONTENT.label}
          </Text>

          <Heading
            ref={titleRef}
            as="h2"
            size="h2"
            className="mb-4 sm:mb-6 dark:[text-shadow:0_2px_30px_rgba(255,255,255,0.1)]"
            style={{ 
              textShadow: "0 2px 30px rgba(0,0,0,0.2)",
              fontSize: "clamp(1.5rem, 6vw, 2.5rem)",
              lineHeight: "1.2",
            }}
          >
            {TECH_STACK_CONTENT.title.prefix}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 dark:from-blue-400 dark:via-purple-400 dark:to-cyan-400 bg-clip-text text-transparent">
              {TECH_STACK_CONTENT.title.highlight}
            </span>
          </Heading>

          <Text
            ref={descriptionRef}
            size="body-lg"
            color="secondary"
            className="mx-auto max-w-full sm:max-w-2xl px-2 sm:px-0"
            style={{
              fontSize: "clamp(0.9375rem, 2.5vw, 1.125rem)",
              lineHeight: "1.65",
            }}
          >
            {TECH_STACK_CONTENT.description}
          </Text>
        </div>

        {/* Mobile-Optimized Tech Grid - Single column on mobile */}
        <div
          ref={techGridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8"
        >
          {techCategories.length > 0 ? techCategories.map((category, index) => (
            <div
              key={category.title}
              ref={(el) => {
                techCardRefs.current[index] = el;
              }}
            >
              <Card
                variant="glass"
                hoverable
                animated={false}
                className="h-full active:scale-95 touch-manipulation p-5 sm:p-6 lg:p-8"
              >
                <div className="flex items-center mb-4 sm:mb-6 gap-3 sm:gap-4">
                  <div className="text-3xl sm:text-4xl lg:text-5xl">
                    {category.icon}
                  </div>
                  <h3 className="font-bold text-fg-primary group-hover:text-gradient-silver transition-all duration-300 text-lg sm:text-xl lg:text-2xl leading-tight">
                    {category.title}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2 sm:gap-2.5">
                  {category.technologies.map((tech) => (
                    <Badge
                      key={tech}
                      variant="outline"
                      className="group-hover:scale-105 transition-transform duration-300 text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-1.5"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </Card>
            </div>
          )) : (
            <div className="col-span-full text-center py-8">
              <Text size="body" color="secondary">
                No tech stack data available. Please add skills in the admin panel.
              </Text>
            </div>
          )}
        </div>

        {/* Mobile-Optimized Note */}
        <div
          ref={noteRef}
          className="text-center glass-base rounded-xl border border-border-primary/50 mx-auto p-4 sm:p-6 max-w-full sm:max-w-3xl px-4 sm:px-6"
        >
          <Text 
            size="body" 
            color="secondary" 
            className="leading-relaxed text-sm sm:text-base"
          >
            <span dangerouslySetInnerHTML={{ __html: TECH_STACK_CONTENT.note }} />
          </Text>
        </div>
      </Container>
    </section>
  );
}

