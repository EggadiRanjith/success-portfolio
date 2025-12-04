/**
 * Featured Projects Component
 * Professional layout with error handling
 */

"use client";

import React, { useEffect, useState } from "react";
import { Container, Heading, Text, Button } from "@/components/ui";
import { ProjectCard } from "./ProjectCard";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import {
  FEATURED_PROJECTS_CONTENT,
} from "@/constants/featuredProjects";
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
  const { theme } = useTheme();
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);

  // Load featured projects from admin data
  useEffect(() => {
    if (typeof window === "undefined") return;

    const loadProjects = async () => {
      try {
        const data = await getPortfolioData();
        if (data?.projects) {
          // Filter featured projects and limit to 3
          const featured = data.projects
            .filter((p) => p.featured)
            .slice(0, 3);
          setFeaturedProjects(featured);
        }
      } catch (error) {
        console.error("Error loading featured projects:", error);
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

    return () => {
      window.removeEventListener("portfolio-data-updated", handlePortfolioUpdate);
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


  return (
    <section
      className="relative overflow-hidden"
      style={{
        paddingTop: "clamp(2rem, 4vh + 1rem, 4rem)", // Optimized for all resolutions
        paddingBottom: "clamp(2rem, 4vh + 1rem, 4rem)", // Optimized for all resolutions
        paddingLeft: "clamp(0.5rem, 2vw, 1rem)", // Side padding for very small screens
        paddingRight: "clamp(0.5rem, 2vw, 1rem)", // Side padding for very small screens
        backgroundColor: theme === "dark" ? "var(--color-bg-primary)" : "#FAFAFA",
          }}
    >

      <Container size="lg" className="relative z-10" style={{ paddingLeft: "clamp(0.75rem, 3vw, 2rem)", paddingRight: "clamp(0.75rem, 3vw, 2rem)" }}>
        <div 
          className="text-center"
          style={{
            marginBottom: "clamp(1.5rem, 3.5vh + 0.75rem, 3rem)", // Optimized spacing
            paddingLeft: "clamp(0.25rem, 1.5vw, 0.5rem)", // Reduced padding
            paddingRight: "clamp(0.25rem, 1.5vw, 0.5rem)", // Reduced padding
          }}
        >
          <Heading
            as="h2"
            size="h2"
            className="text-shadow-theme"
            style={{
              marginBottom: "clamp(0.75rem, 1.75vh, 1.5rem)", // Optimized spacing
              fontSize: "clamp(1.75rem, 4.5vw + 0.75rem, 3.5rem)", // Better scaling across resolutions
              lineHeight: "1.15", // Tighter line height
              letterSpacing: "clamp(-0.02em, -0.015vw, -0.01em)", // Responsive letter spacing
            }}
          >
            <span
              style={{
                backgroundImage: theme === "dark"
                  ? "linear-gradient(135deg, #60A5FA, #A78BFA, #22D3EE)"
                  : "linear-gradient(135deg, #1E40AF, #5B21B6, #0C4A6E)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                // @ts-ignore - Mozilla-specific properties
                MozBackgroundClip: "text",
                // @ts-ignore - Mozilla-specific properties
                MozTextFillColor: "transparent",
                boxDecorationBreak: "clone",
                WebkitBoxDecorationBreak: "clone",
                transition: "background-image 0.4s ease-in-out",
            }}
          >
            {FEATURED_PROJECTS_CONTENT.title}
            </span>
          </Heading>
          <Text
            size="body-lg"
            color="secondary"
            className="mx-auto"
            style={{
              maxWidth: "clamp(18rem, 85vw, 48rem)", // Better width scaling
              fontSize: "clamp(0.8125rem, 1.5vw + 0.4rem, 1.25rem)", // Better scaling across resolutions
              lineHeight: 1.65, // Fixed line height for consistency
              letterSpacing: "clamp(0.005em, 0.01vw, 0.015em)", // Responsive letter spacing
              paddingLeft: "clamp(0.25rem, 1.5vw, 0)",
              paddingRight: "clamp(0.25rem, 1.5vw, 0)",
            }}
          >
            {FEATURED_PROJECTS_CONTENT.description}
          </Text>
        </div>


        {/* Projects Grid - Highly responsive across all resolutions */}
        <div
          className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3"
          style={{
            gap: "clamp(1rem, 2.5vw, 2rem)", // Optimized gap for all resolutions
            marginBottom: "clamp(1.5rem, 3.5vh, 3rem)", // Optimized spacing
            paddingLeft: "clamp(0rem, 1vw, 0.5rem)", // Minimal side padding
            paddingRight: "clamp(0rem, 1vw, 0.5rem)", // Minimal side padding
          }}
        >
          {featuredProjects.map((project, index) => (
            <div
              key={project.id}
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

        {/* View All Button - Highly responsive across all resolutions */}
        <div 
          className="text-center"
          style={{
            paddingLeft: "clamp(0.25rem, 1.5vw, 0)",
            paddingRight: "clamp(0.25rem, 1.5vw, 0)",
            marginTop: "clamp(0.75rem, 2.5vh, 2rem)", // Optimized spacing
          }}
        >
          <Button
            size="lg"
            variant="secondary"
            onClick={handleCTAClick}
            className="group transition-all duration-300 hover:opacity-90 active:scale-95 touch-manipulation w-full sm:w-auto"
            style={{
              fontSize: "clamp(0.8125rem, 1.5vw + 0.4rem, 1.125rem)", // Better scaling
              paddingTop: "clamp(0.75rem, 1.75vh, 1.125rem)", // Optimized vertical padding
              paddingBottom: "clamp(0.75rem, 1.75vh, 1.125rem)", // Optimized vertical padding
              paddingLeft: "clamp(1.25rem, 3.5vw + 0.5rem, 2.75rem)", // Optimized horizontal padding
              paddingRight: "clamp(1.25rem, 3.5vw + 0.5rem, 2.75rem)", // Optimized horizontal padding
              minHeight: "clamp(2.75rem, 5.5vh, 3.5rem)", // Consistent button height
              minWidth: "clamp(10rem, 25vw, 12rem)", // Better width scaling
              gap: "clamp(0.375rem, 0.75vw, 0.625rem)", // Responsive gap
            }}
          >
            {FEATURED_PROJECTS_CONTENT.ctaText}
            <ArrowRight 
              className="group-hover:translate-x-1 transition-transform flex-shrink-0" 
              style={{
                width: "clamp(0.875rem, 1.25vw + 0.25rem, 1.375rem)", // Better icon scaling
                height: "clamp(0.875rem, 1.25vw + 0.25rem, 1.375rem)", // Better icon scaling
                marginLeft: "clamp(0.375rem, 0.75vw, 0.625rem)", // Responsive margin
              }}
            />
          </Button>
        </div>
      </Container>
    </section>
  );
}

