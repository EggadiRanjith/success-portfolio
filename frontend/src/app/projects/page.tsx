"use client";

import { Container, Heading, Text, CardSkeleton } from "@/components/ui";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/animations/AnimatedSection";
import { fadeInUp, staggerContainer } from "@/lib/motionVariants";
import { Suspense, useEffect, useState } from "react";
import { getPortfolioData, type Project } from "@/lib/adminData";
import { useTheme } from "@/context/ThemeContext";

// Helper function to generate slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function ProjectsPage() {
  const { theme } = useTheme();
  const [projects, setProjects] = useState<Project[]>([]);

  // Load projects from admin data
  useEffect(() => {
    if (typeof window === "undefined") return;

    const loadProjects = async () => {
      try {
        const data = await getPortfolioData();
        if (data?.projects) {
          setProjects(data.projects);
        }
      } catch (error) {
        console.error("Error loading projects:", error);
        setProjects([]);
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
  return (
    <main role="main" className="min-h-screen bg-primary">
      <section className="relative py-20 sm:py-24 md:py-32 overflow-hidden bg-primary">
        {/* Background gradient orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 -left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-orb-blue rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 -right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-orb-purple rounded-full blur-3xl" />
        </div>

        <Container size="lg" className="relative z-10">
          <AnimatedSection variant="stagger">
            {/* Section Header */}
            <motion.div variants={fadeInUp} className="text-center mb-12 sm:mb-16 px-4">
              <Heading
                as="h1"
                size="h1"
                className="mb-4 sm:mb-6 text-shadow-theme"
                style={{
                  fontSize: "clamp(1.75rem, 7vw, 3.5rem)",
                  lineHeight: "1.15",
                  paddingLeft: "clamp(0.5rem, 2vw, 1rem)",
                  paddingRight: "clamp(0.5rem, 2vw, 1rem)",
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
                  All Projects
                </span>
              </Heading>
              <Text size="body-lg" color="secondary" className="max-w-2xl mx-auto px-2 sm:px-4 text-sm sm:text-base md:text-lg">
                Backend systems built with precision, deployed at scale, and proven in production
              </Text>
            </motion.div>

            {/* Projects Grid */}
            <Suspense
              fallback={
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <CardSkeleton key={i} />
                  ))}
                </div>
              }
            >
              <motion.div
                variants={staggerContainer}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
              >
                {projects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    variants={fadeInUp}
                    custom={index}
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
                  </motion.div>
                ))}
              </motion.div>
            </Suspense>
          </AnimatedSection>
        </Container>
      </section>
    </main>
  );
}

