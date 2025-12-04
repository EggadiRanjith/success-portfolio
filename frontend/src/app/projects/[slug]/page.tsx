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
import { useTheme } from "@/context/ThemeContext";

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
  const { theme } = useTheme();
  const [project, setProject] = useState<Project | null>(null);
  const [allProjects, setAllProjects] = useState<Project[]>([]);

  // Load project from admin data
  useEffect(() => {
    if (typeof window === "undefined") return;

    const loadProject = async () => {
      try {
        const data = await getPortfolioData();
        if (data?.projects) {
          setAllProjects(data.projects);
          const foundProject = findProjectBySlug(data.projects, slug);
          setProject(foundProject || null);
        }
      } catch (error) {
        console.error("Error loading project:", error);
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

    return () => {
      window.removeEventListener("portfolio-data-updated", handlePortfolioUpdate);
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
      <section className="relative pt-20 sm:pt-24 md:pt-32 pb-16 sm:pb-20 overflow-hidden">
        {/* Background gradient orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 -right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-orb-blue rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 -left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-orb-purple rounded-full blur-3xl" />
        </div>

        <Container size="lg" className="relative z-10">
          <AnimatedSection variant="stagger">
            {/* Back Button */}
            <motion.div variants={fadeInUp} className="mb-6 sm:mb-8 px-2">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-fg-secondary hover:text-fg-primary transition-colors group touch-manipulation py-2"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span className="font-medium text-sm sm:text-base">Back to Projects</span>
              </Link>
            </motion.div>

            {/* Project Header */}
            <motion.div variants={fadeInUp} className="mb-6 sm:mb-8 px-2">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
                <Badge variant="glass" size="sm" className="bg-primary/10 text-xs sm:text-sm">
                  {project.category}
                </Badge>
                <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-fg-tertiary">
                  <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>{project.year}</span>
                </div>
                {project.timeline && (
                  <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-fg-tertiary">
                    <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span>{project.timeline}</span>
                  </div>
                )}
              </div>
              <Heading
                as="h1"
                size="h1"
                className="mb-4 sm:mb-6 text-shadow-theme"
                style={{
                  fontSize: "clamp(1.5rem, 7vw, 3.5rem)",
                  lineHeight: "1.15",
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
                  {project.title}
                </span>
              </Heading>
              <Text size="body-lg" color="secondary" className="max-w-3xl mb-6 text-sm sm:text-base md:text-lg leading-relaxed">
                {project.description}
              </Text>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block w-full sm:w-auto"
                  >
                    <Button
                      variant="primary"
                      size="lg"
                      className="group w-full sm:w-auto touch-manipulation"
                    >
                      <ExternalLink className="w-4 h-4 mr-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      <span className="text-sm sm:text-base">View Live Demo</span>
                    </Button>
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block w-full sm:w-auto"
                  >
                    <Button
                      variant="glass"
                      size="lg"
                      className="group w-full sm:w-auto touch-manipulation"
                    >
                      <Github className="w-4 h-4 mr-2" />
                      <span className="text-sm sm:text-base">View on GitHub</span>
                    </Button>
                  </a>
                )}
              </div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              variants={fadeInUp}
              className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] rounded-xl sm:rounded-2xl overflow-hidden glass-card border border-border-primary/50 mx-2"
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
      <section className="relative py-12 sm:py-16 md:py-20">
        <Container size="lg" className="relative z-10">
          <div className="grid lg:grid-cols-3 gap-8 sm:gap-10 md:gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8 sm:space-y-10 md:space-y-12 px-2">
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
                          <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
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
                        <Zap className="w-5 h-5 text-warning" />
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
                        <Code className="w-5 h-5 text-accent-blue" />
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
                            <Text size="body-lg" color="primary" className="font-bold mb-1 text-gradient-primary">
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
            <div className="absolute top-1/2 -right-1/4 w-96 h-96 bg-orb-cyan rounded-full blur-3xl" />
            <div className="absolute bottom-1/2 -left-1/4 w-96 h-96 bg-orb-purple rounded-full blur-3xl" />
          </div>

          <Container size="lg" className="relative z-10">
            <AnimatedSection variant="stagger">
              <motion.div variants={fadeInUp} className="text-center mb-12">
                <Heading 
                  as="h2" 
                  size="h2" 
                  className="mb-4"
                  style={{
                    fontSize: "clamp(1.75rem, 4vw + 0.5rem, 2.5rem)",
                    lineHeight: "1.2",
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
                    Related Projects
                  </span>
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

