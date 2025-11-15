/**
 * Featured Projects Component - PREMIUM GSAP ANIMATIONS
 * Professional animations with lazy-loading and error handling
 */

"use client";

import React, { useRef, useEffect, useState } from "react";
import { Container, Heading, Text, Button } from "@/components/ui";
import { ProjectCard } from "./ProjectCard";
import { useRouter } from "next/navigation";
import { useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import {
  FEATURED_PROJECTS_CONTENT,
} from "@/constants/featuredProjects";
import {
  animateFadeInUp,
  animateStagger,
  animateScrollFadeIn,
  cleanupGSAP,
  prefersReducedMotion as checkReducedMotion,
} from "@/lib/gsapAnimations";
import { getPortfolioData, type Project } from "@/lib/adminData";

// Helper function to generate slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function FeaturedProjectsSection() {
  const router = useRouter();
  const prefersReducedMotion = useReducedMotion();
  const [isMounted, setIsMounted] = useState(false);
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  
  // Refs for GSAP animations
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const projectsGridRef = useRef<HTMLDivElement>(null);
  const projectCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const ctaRef = useRef<HTMLDivElement>(null);

  // Load featured projects from admin data
  useEffect(() => {
    if (typeof window === "undefined") return;

    const loadProjects = () => {
      try {
        const data = getPortfolioData();
        if (data?.projects) {
          // Filter featured projects and limit to 3
          const featured = data.projects
            .filter((p) => p.featured)
            .slice(0, 3);
          setFeaturedProjects(featured);
        }
      } catch (error) {
        // Keep empty array on error
        setFeaturedProjects([]);
      }
    };

    loadProjects();

    // Listen for updates
    const handlePortfolioUpdate = () => {
      loadProjects();
    };

    window.addEventListener("portfolio-data-updated", handlePortfolioUpdate);
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "portfolio_admin_data" || e.key === null) {
        loadProjects();
      }
    };
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("portfolio-data-updated", handlePortfolioUpdate);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Error handling for navigation
  const handleCTAClick = async () => {
    try {
      await router.push(FEATURED_PROJECTS_CONTENT.ctaHref);
    } catch (error) {
      if (typeof window !== "undefined") {
        window.location.href = FEATURED_PROJECTS_CONTENT.ctaHref;
      }
    }
  };

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
      if (!headerRef.current || !titleRef.current || !descriptionRef.current) {
        return;
      }

      // Premium header animation
      if (titleRef.current) {
        animateFadeInUp(titleRef.current, {
          delay: 0.2,
          duration: 1.5,
          y: 50,
        });
      }

      if (descriptionRef.current) {
        animateFadeInUp(descriptionRef.current, {
          delay: 0.5,
          duration: 1.3,
          y: 40,
        });
      }

      // Premium projects grid - Scroll-triggered
      if (projectsGridRef.current) {
        const cleanup = animateScrollFadeIn(projectsGridRef.current, {
          start: "top 80%",
          end: "top 50%",
          y: 60,
        });
        if (cleanup) cleanupFunctions.push(cleanup);

        // Stagger project cards
        setTimeout(() => {
          const cards = projectCardRefs.current.filter(Boolean) as HTMLElement[];
          if (cards.length > 0) {
            animateStagger(cards, {
              delay: 0.2,
              duration: 1.2,
              stagger: 0.15,
              y: 50,
            });
          }
        }, 500);
      }

      // Premium CTA button - Scroll-triggered
      if (ctaRef.current) {
        const cleanup = animateScrollFadeIn(ctaRef.current, {
          start: "top 85%",
          end: "top 60%",
          y: 40,
        });
        if (cleanup) cleanupFunctions.push(cleanup);
      }
    };

    // Wait for page to be fully loaded
    if (document.readyState === "complete") {
      setTimeout(startAnimations, 400);
    } else {
      window.addEventListener("load", () => {
        setTimeout(startAnimations, 400);
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
      className="relative overflow-hidden bg-primary"
      style={{
        paddingTop: "clamp(1.5rem, 3vh + 0.5rem, 2.5rem)",
        paddingBottom: "clamp(1.5rem, 3vh + 0.5rem, 2.5rem)",
      }}
    >
      {/* Background gradient orbs - Responsive sizing */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-1/3 -left-1/4 bg-blue-500/20 dark:bg-blue-400/10 rounded-full blur-3xl"
          style={{
            width: "clamp(12rem, 30vw, 24rem)",
            height: "clamp(12rem, 30vw, 24rem)",
          }}
        />
        <div 
          className="absolute bottom-1/3 -right-1/4 bg-purple-500/20 dark:bg-purple-400/10 rounded-full blur-3xl"
          style={{
            width: "clamp(12rem, 30vw, 24rem)",
            height: "clamp(12rem, 30vw, 24rem)",
          }}
        />
      </div>

      <Container size="lg" className="relative z-10">
        <div 
          ref={headerRef} 
          className="text-center"
          style={{
            marginBottom: "clamp(1rem, 2.5vh + 0.5rem, 1.75rem)",
          }}
        >
          <Heading
            ref={titleRef}
            as="h2"
            size="h2"
            className="dark:[text-shadow:0_2px_30px_rgba(255,255,255,0.1)]"
            style={{ 
              textShadow: "0 2px 30px rgba(0,0,0,0.2)",
              marginBottom: "clamp(0.5rem, 1.5vh, 0.75rem)",
              fontSize: "clamp(1.75rem, 4vw + 0.5rem, 3rem)",
              lineHeight: "1.2",
            }}
          >
            {FEATURED_PROJECTS_CONTENT.title}
          </Heading>
          <Text
            ref={descriptionRef}
            size="body-lg"
            color="secondary"
            className="mx-auto"
            style={{
              maxWidth: "clamp(18rem, 85vw, 42rem)",
              fontSize: "clamp(0.875rem, 1.5vw + 0.5rem, 1.125rem)",
              lineHeight: "1.6",
            }}
          >
            {FEATURED_PROJECTS_CONTENT.description}
          </Text>
        </div>

        {/* Projects Grid - Professional responsive layout */}
        <div
          ref={projectsGridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          style={{
            gap: "clamp(0.75rem, 2.5vw, 1.25rem)",
            marginBottom: "clamp(1rem, 2.5vh, 1.5rem)",
          }}
        >
          {featuredProjects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => {
                projectCardRefs.current[index] = el;
              }}
            >
              <ProjectCard
                title={project.title}
                description={project.description}
                image={project.image}
                tags={project.tags}
                href={`/projects/${generateSlug(project.title)}`}
                featured={project.featured}
                index={index}
                category={project.category}
                year={project.year}
                githubUrl={project.githubUrl}
                liveUrl={project.liveUrl}
              />
            </div>
          ))}
        </div>

        {/* View All Button - Professional mobile sizing */}
        <div 
          ref={ctaRef} 
          className="text-center"
        >
          <Button
            size="lg"
            variant="secondary"
            onClick={handleCTAClick}
            className="group transition-all duration-300 hover:opacity-90 active:scale-95 touch-manipulation"
            style={{
              fontSize: "clamp(0.875rem, 1.2vw + 0.5rem, 1rem)",
              paddingTop: "clamp(0.75rem, 1.5vw + 0.5rem, 0.875rem)",
              paddingBottom: "clamp(0.75rem, 1.5vw + 0.5rem, 0.875rem)",
              paddingLeft: "clamp(1.5rem, 3vw + 0.75rem, 2rem)",
              paddingRight: "clamp(1.5rem, 3vw + 0.75rem, 2rem)",
              minHeight: "clamp(2.75rem, 5vw + 1.5rem, 3.5rem)",
            }}
          >
            {FEATURED_PROJECTS_CONTENT.ctaText}
            <ArrowRight 
              className="group-hover:translate-x-1 transition-transform" 
              style={{
                width: "clamp(1rem, 1.5vw + 0.5rem, 1.25rem)",
                height: "clamp(1rem, 1.5vw + 0.5rem, 1.25rem)",
                marginLeft: "clamp(0.375rem, 1vw, 0.5rem)",
              }}
            />
          </Button>
        </div>
      </Container>
    </section>
  );
}

