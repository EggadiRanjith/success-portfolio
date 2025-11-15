"use client";

import { Container, Heading, Text, Button, Badge } from "@/components/ui";
import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/animations/AnimatedSection";
import { fadeInUp, staggerContainer } from "@/lib/motionVariants";
import { ArrowLeft, ExternalLink, Github, Calendar, Code, Users, Zap, CheckCircle2, Image as ImageIcon, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { use, useEffect, useState } from "react";
import { getPortfolioData, type Project } from "@/lib/adminData";

// Helper function to generate slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// Helper function to find project by slug
function findProjectBySlug(projects: Project[], slug: string): Project | undefined {
  return projects.find((p) => generateSlug(p.title) === slug);
}

export default function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [project, setProject] = useState<Project | null>(null);
  const [allProjects, setAllProjects] = useState<Project[]>([]);

  // Load project from admin data
  useEffect(() => {
    if (typeof window === "undefined") return;

    const loadProject = () => {
      try {
        const data = getPortfolioData();
        if (data?.projects) {
          setAllProjects(data.projects);
          const foundProject = findProjectBySlug(data.projects, slug);
          setProject(foundProject || null);
        }
      } catch (error) {
        setProject(null);
        setAllProjects([]);
      }
    };

    loadProject();

    // Listen for updates
    const handlePortfolioUpdate = () => {
      loadProject();
    };

    window.addEventListener("portfolio-data-updated", handlePortfolioUpdate);
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "portfolio_admin_data" || e.key === null) {
        loadProject();
      }
    };
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("portfolio-data-updated", handlePortfolioUpdate);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [slug]);

  if (!project) {
    return (
      <main role="main" className="min-h-screen bg-primary flex items-center justify-center">
        <Container size="lg" className="text-center">
          <Heading as="h1" size="h1" className="mb-4">
            Project Not Found
          </Heading>
          <Text size="body-lg" color="secondary" className="mb-8">
            The project you&apos;re looking for doesn&apos;t exist.
          </Text>
          <Link href="/projects">
            <Button variant="primary">Back to Projects</Button>
          </Link>
        </Container>
      </main>
    );
  }

  // Get related projects (exclude current project)
  const relatedProjects = allProjects
    .filter((p) => p.id !== project.id)
    .slice(0, 3);

  // Combine main image with additional images
  const allImages = project.image
    ? [project.image, ...(project.images || [])]
    : project.images || [];

  return (
    <main role="main" className="min-h-screen bg-primary">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background gradient orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 -right-1/4 w-96 h-96 bg-blue-500/20 dark:bg-blue-400/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 -left-1/4 w-96 h-96 bg-purple-500/20 dark:bg-purple-400/10 rounded-full blur-3xl" />
        </div>

        <Container size="lg" className="relative z-10">
          <AnimatedSection variant="stagger">
            {/* Back Button */}
            <motion.div variants={fadeInUp} className="mb-8">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-fg-secondary hover:text-fg-primary transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span className="font-medium">Back to Projects</span>
              </Link>
            </motion.div>

            {/* Project Header */}
            <motion.div variants={fadeInUp} className="mb-8">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <Badge variant="glass" size="sm" className="bg-primary/10">
                  {project.category}
                </Badge>
                <div className="flex items-center gap-2 text-sm text-fg-tertiary">
                  <Calendar className="w-4 h-4" />
                  <span>{project.year}</span>
                </div>
                {project.timeline && (
                  <div className="flex items-center gap-2 text-sm text-fg-tertiary">
                    <Clock className="w-4 h-4" />
                    <span>{project.timeline}</span>
                  </div>
                )}
              </div>
              <Heading
                as="h1"
                size="h1"
                className="mb-4 dark:[text-shadow:0_2px_30px_rgba(255,255,255,0.1)]"
                style={{ textShadow: "0 2px 30px rgba(0,0,0,0.2)" }}
              >
                {project.title}
              </Heading>
              <Text size="body-lg" color="secondary" className="max-w-3xl mb-6">
                {project.description}
              </Text>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block"
                  >
                    <Button
                      variant="primary"
                      size="lg"
                      className="group"
                    >
                      <ExternalLink className="w-4 h-4 mr-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      View Live Demo
                    </Button>
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block"
                  >
                    <Button
                      variant="glass"
                      size="lg"
                      className="group"
                    >
                      <Github className="w-4 h-4 mr-2" />
                      View on GitHub
                    </Button>
                  </a>
                )}
              </div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              variants={fadeInUp}
              className="relative w-full h-[500px] md:h-[600px] rounded-2xl overflow-hidden glass-card border border-border-primary/50"
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
                priority
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/20 to-transparent" />
            </motion.div>
          </AnimatedSection>
        </Container>
      </section>

      {/* Project Details */}
      <section className="relative py-20">
        <Container size="lg" className="relative z-10">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Overview */}
              <AnimatedSection variant="stagger">
                <motion.div variants={fadeInUp}>
                  <Heading as="h2" size="h2" className="mb-4">
                    Project Overview
                  </Heading>
                  <Text size="body" color="secondary" className="leading-relaxed whitespace-pre-line">
                    {project.longDescription || project.description}
                  </Text>
                </motion.div>
              </AnimatedSection>

              {/* Features */}
              {project.features && (
                <AnimatedSection variant="stagger">
                  <motion.div variants={fadeInUp}>
                    <Heading as="h2" size="h2" className="mb-6">
                      Key Features
                    </Heading>
                    <div className="grid md:grid-cols-2 gap-4">
                      {project.features.map((feature: string, index: number) => (
                        <motion.div
                          key={index}
                          variants={fadeInUp}
                          custom={index}
                          className="flex items-start gap-3 p-4 glass-card rounded-xl border border-border-primary/50"
                        >
                          <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <Text size="body" color="primary" className="font-medium">
                            {feature}
                          </Text>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatedSection>
              )}

              {/* Challenges & Solutions */}
              {project.challenges && project.solutions && (
                <AnimatedSection variant="stagger">
                  <div className="grid md:grid-cols-2 gap-8">
                    <motion.div variants={fadeInUp}>
                      <Heading as="h3" size="h3" className="mb-4 flex items-center gap-2">
                        <Zap className="w-5 h-5 text-yellow-500" />
                        Challenges
                      </Heading>
                      <ul className="space-y-3">
                        {project.challenges.map((challenge: string, index: number) => (
                          <li key={index} className="flex items-start gap-3">
                            <span className="text-fg-tertiary mt-1.5">•</span>
                            <Text size="body" color="secondary">
                              {challenge}
                            </Text>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                    <motion.div variants={fadeInUp}>
                      <Heading as="h3" size="h3" className="mb-4 flex items-center gap-2">
                        <Code className="w-5 h-5 text-blue-500" />
                        Solutions
                      </Heading>
                      <ul className="space-y-3">
                        {project.solutions.map((solution: string, index: number) => (
                          <li key={index} className="flex items-start gap-3">
                            <span className="text-fg-tertiary mt-1.5">•</span>
                            <Text size="body" color="secondary">
                              {solution}
                            </Text>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>
                </AnimatedSection>
              )}

              {/* Image Gallery */}
              {allImages.length > 1 && (
                <AnimatedSection variant="stagger">
                  <motion.div variants={fadeInUp}>
                    <Heading as="h2" size="h2" className="mb-6 flex items-center gap-2">
                      <ImageIcon className="w-6 h-6" />
                      Project Gallery
                    </Heading>
                    <div className="grid md:grid-cols-2 gap-4">
                      {allImages.slice(1).map((img: string, index: number) => (
                        <motion.div
                          key={index}
                          variants={fadeInUp}
                          custom={index}
                          className="relative aspect-video rounded-xl overflow-hidden glass-card border border-border-primary/50"
                        >
                          <Image
                            src={img}
                            alt={`${project.title} screenshot ${index + 1}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatedSection>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-8">
                {/* Project Info */}
                <AnimatedSection variant="stagger">
                  <motion.div variants={fadeInUp} className="glass-card p-6 rounded-xl border border-border-primary/50">
                    <Heading as="h3" size="h3" className="mb-6">
                      Project Details
                    </Heading>
                    <div className="space-y-4">
                      {project.role && (
                        <div>
                          <Text size="body-sm" color="tertiary" className="mb-1">
                            Role
                          </Text>
                          <Text size="body" color="primary" className="font-medium">
                            {project.role}
                          </Text>
                        </div>
                      )}
                      {project.timeline && (
                        <div>
                          <Text size="body-sm" color="tertiary" className="mb-1">
                            Timeline
                          </Text>
                          <Text size="body" color="primary" className="font-medium">
                            {project.timeline}
                          </Text>
                        </div>
                      )}
                      <div>
                        <Text size="body-sm" color="tertiary" className="mb-1">
                          Category
                        </Text>
                        <Badge variant="glass" size="sm">
                          {project.category}
                        </Badge>
                      </div>
                    </div>
                  </motion.div>
                </AnimatedSection>

                {/* Technologies */}
                {project.technologies && (
                  <AnimatedSection variant="stagger">
                    <motion.div variants={fadeInUp} className="glass-card p-6 rounded-xl border border-border-primary/50">
                      <Heading as="h3" size="h3" className="mb-6 flex items-center gap-2">
                        <Code className="w-5 h-5" />
                        Technologies
                      </Heading>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech: string, index: number) => (
                          <Badge key={index} variant="glass" size="sm">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </motion.div>
                  </AnimatedSection>
                )}

                {/* Results */}
                {project.results && (
                  <AnimatedSection variant="stagger">
                    <motion.div variants={fadeInUp} className="glass-card p-6 rounded-xl border border-border-primary/50">
                      <Heading as="h3" size="h3" className="mb-6 flex items-center gap-2">
                        <Users className="w-5 h-5" />
                        Results
                      </Heading>
                      <div className="grid grid-cols-2 gap-4">
                        {project.results.map((result: { metric: string; label: string }, index: number) => (
                          <div key={index} className="text-center">
                            <Text size="body-lg" color="primary" className="font-bold mb-1 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                              {result.metric}
                            </Text>
                            <Text size="body-sm" color="tertiary">
                              {result.label}
                            </Text>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </AnimatedSection>
                )}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/2 -right-1/4 w-96 h-96 bg-cyan-500/20 dark:bg-cyan-400/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/2 -left-1/4 w-96 h-96 bg-purple-500/20 dark:bg-purple-400/10 rounded-full blur-3xl" />
          </div>

          <Container size="lg" className="relative z-10">
            <AnimatedSection variant="stagger">
              <motion.div variants={fadeInUp} className="text-center mb-12">
                <Heading as="h2" size="h2" className="mb-4">
                  Related Projects
                </Heading>
                <Text size="body" color="secondary">
                  Explore more of my work
                </Text>
              </motion.div>

              <motion.div
                variants={staggerContainer}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {relatedProjects.map((relatedProject, index) => {
                  const relatedSlug = generateSlug(relatedProject.title);
                  return (
                    <motion.div key={relatedProject.id} variants={fadeInUp} custom={index}>
                      <ProjectCard
                        title={relatedProject.title}
                        description={relatedProject.description}
                        image={relatedProject.image}
                        tags={relatedProject.tags}
                        href={`/projects/${relatedSlug}`}
                        featured={relatedProject.featured}
                        index={index}
                        category={relatedProject.category}
                        year={relatedProject.year}
                        githubUrl={relatedProject.githubUrl}
                        liveUrl={relatedProject.liveUrl}
                      />
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatedSection>
          </Container>
        </section>
      )}
    </main>
  );
}

