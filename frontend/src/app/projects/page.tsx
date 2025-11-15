"use client";

import { Container, Heading, Text, CardSkeleton } from "@/components/ui";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/animations/AnimatedSection";
import { fadeInUp, staggerContainer } from "@/lib/motionVariants";
import { Suspense, useEffect, useState } from "react";
import { getPortfolioData, type Project } from "@/lib/adminData";

// Helper function to generate slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);

  // Load projects from admin data
  useEffect(() => {
    if (typeof window === "undefined") return;

    const loadProjects = () => {
      try {
        const data = getPortfolioData();
        if (data?.projects) {
          setProjects(data.projects);
        }
      } catch (error) {
        setProjects([]);
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
  return (
    <main role="main" className="min-h-screen bg-primary">
      <section className="relative py-32 overflow-hidden bg-primary">
        {/* Background gradient orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 -left-1/4 w-96 h-96 bg-blue-500/20 dark:bg-blue-400/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 -right-1/4 w-96 h-96 bg-purple-500/20 dark:bg-purple-400/10 rounded-full blur-3xl" />
        </div>

        <Container size="lg" className="relative z-10">
          <AnimatedSection variant="stagger">
            {/* Section Header */}
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <Heading
                as="h1"
                size="h1"
                className="mb-4 dark:[text-shadow:0_2px_30px_rgba(255,255,255,0.1)]"
                style={{ textShadow: "0 2px 30px rgba(0,0,0,0.2)" }}
              >
                All Projects
              </Heading>
              <Text size="body-lg" color="secondary" className="max-w-2xl mx-auto">
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

