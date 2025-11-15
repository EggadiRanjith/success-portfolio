"use client";

import { Container, Heading, Text, FrostedCard, AnimatedCounter, GlowOnHover } from "@/components/ui";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedSection } from "@/components/animations/AnimatedSection";
import { fadeInUp, staggerContainer } from "@/lib/motionVariants";
import { Award, Code2, Cloud, Database, Server, Zap, Badge as BadgeIcon, ExternalLink, User, GraduationCap } from "lucide-react";
import { LeetCodeStats } from "@/components/sections/LeetCodeStats";
import { GithubStats } from "@/components/sections/GithubStats";
import { useState, useEffect } from "react";
import Image from "next/image";
import { trackEvent } from "@/components/Analytics";
import { getPortfolioData, type Skill, type Certification, type Education } from "@/lib/adminData";

// Icon mapping for skills
const skillIcons: Record<string, JSX.Element> = {
  "Programming Languages": <Code2 className="w-6 h-6" />,
  "Backend Development": <Server className="w-6 h-6" />,
  "Frontend Development": <Code2 className="w-6 h-6" />,
  "Databases": <Database className="w-6 h-6" />,
  "Cloud & DevOps": <Cloud className="w-6 h-6" />,
};

// Icon mapping for certifications
const certIcons: Record<string, JSX.Element> = {
  "AWS": <Cloud className="w-8 h-8" />,
  "Java": <Code2 className="w-8 h-8" />,
  "Python": <Code2 className="w-8 h-8" />,
  "default": <Award className="w-8 h-8" />,
};

export default function AboutPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [aboutData, setAboutData] = useState({
    personalInfo: {
      name: "",
      description: "",
      title: "",
    },
    skills: [] as Skill[],
    certifications: [] as Certification[],
    education: [] as Education[],
    stats: {
      productionAPIs: "10+",
      yearsExperience: "3+",
      cloudDeployments: "5+",
      leetcodeSolved: "150+",
    },
    leetcodeData: {
      username: "ranjitheggadi",
      profileUrl: "https://leetcode.com/ranjitheggadi",
      stats: {
        problemsSolved: "150+",
        acceptanceRate: "85%",
        contestRating: "1650",
        badges: ["Problem Solver", "Algorithm Master"],
        topics: ["Arrays", "Dynamic Programming", "Trees", "Graphs", "Data Structures"],
      },
    },
    githubData: {
      username: "EggadiRanjith",
      profileUrl: "https://github.com/EggadiRanjith",
      stats: {
        contributions: "500+",
        repositories: "25+",
        stars: "100+",
        languages: ["Python", "JavaScript", "TypeScript", "Java"],
        topRepos: [
          { name: "careerpilot-ai", stars: 15, description: "AI-powered job application tracker" },
          { name: "franchiseconnect", stars: 8, description: "Franchise management app" },
          { name: "library-management", stars: 12, description: "Library management system" },
        ],
      },
    },
  });

  // Load about data from admin
  useEffect(() => {
    if (typeof window === "undefined") return;

    const loadAboutData = () => {
      try {
        const data = getPortfolioData();
        
        setAboutData({
          personalInfo: {
            name: data?.personalInfo?.name || "",
            description: data?.personalInfo?.description || "",
            title: data?.personalInfo?.title || "",
          },
          skills: data?.skills || [],
          certifications: data?.certifications || [],
          education: data?.education || [],
          stats: {
            productionAPIs: data?.stats?.productionAPIs || "10+",
            yearsExperience: data?.stats?.yearsExperience || "3+",
            cloudDeployments: data?.stats?.cloudDeployments || "5+",
            leetcodeSolved: data?.stats?.leetcodeSolved || "150+",
          },
          leetcodeData: {
            username: "ranjitheggadi",
            profileUrl: data?.personalInfo?.links?.leetcode || "https://leetcode.com/ranjitheggadi",
            stats: {
              problemsSolved: data?.stats?.leetcodeSolved || "150+",
              acceptanceRate: "85%",
              contestRating: "1650",
              badges: ["Problem Solver", "Algorithm Master"],
              topics: ["Arrays", "Dynamic Programming", "Trees", "Graphs", "Data Structures"],
            },
          },
          githubData: {
            username: "EggadiRanjith",
            profileUrl: data?.personalInfo?.links?.github || "https://github.com/EggadiRanjith",
            stats: {
              contributions: "500+",
              repositories: "25+",
              stars: "100+",
              languages: ["Python", "JavaScript", "TypeScript", "Java"],
              topRepos: [
                { name: "careerpilot-ai", stars: 15, description: "AI-powered job application tracker" },
                { name: "franchiseconnect", stars: 8, description: "Franchise management app" },
                { name: "library-management", stars: 12, description: "Library management system" },
              ],
            },
          },
        });
      } catch (error) {
        // Keep default values on error
      }
    };

    loadAboutData();

    // Listen for updates
    const handlePortfolioUpdate = () => {
      loadAboutData();
    };

    window.addEventListener("portfolio-data-updated", handlePortfolioUpdate);
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "portfolio_admin_data" || e.key === null) {
        loadAboutData();
      }
    };
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("portfolio-data-updated", handlePortfolioUpdate);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const slides = [
    {
      id: "leetcode",
      title: "LeetCode Dashboard",
      component: <LeetCodeStats {...aboutData.leetcodeData} />,
    },
    {
      id: "github",
      title: "GitHub Dashboard",
      component: <GithubStats {...aboutData.githubData} />,
    },
  ];

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <main role="main" className="min-h-screen bg-primary">
      <section className="relative py-32 overflow-hidden">
        {/* Background gradient orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 -right-1/4 w-96 h-96 bg-cyan-500/20 dark:bg-cyan-400/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 -left-1/4 w-96 h-96 bg-blue-500/20 dark:bg-blue-400/10 rounded-full blur-3xl" />
        </div>

        <Container size="lg" className="relative z-10">
          <AnimatedSection variant="stagger">
            {/* Header */}
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <Text size="body-sm" color="primary" className="font-semibold uppercase tracking-wider mb-4">
                About Me
              </Text>
              <Heading
                as="h1"
                size="h1"
                className="mb-6 dark:[text-shadow:0_2px_30px_rgba(255,255,255,0.1)]"
                style={{ textShadow: "0 2px 30px rgba(0,0,0,0.2)" }}
              >
                {aboutData.personalInfo.title || "Backend & Full-Stack Developer"}
              </Heading>
            </motion.div>

            {/* Main Content */}
            <div className="grid lg:grid-cols-2 gap-16 items-start mb-16">
              {/* Content Side */}
              <motion.div variants={staggerContainer} className="space-y-6">
                {aboutData.personalInfo.description ? (
                  <motion.div variants={fadeInUp}>
                    <Text size="body-lg" color="primary" className="leading-relaxed whitespace-pre-line">
                      {aboutData.personalInfo.description}
                    </Text>
                  </motion.div>
                ) : (
                  <>
                    <motion.div variants={fadeInUp}>
                      <Text size="body-lg" color="primary" className="leading-relaxed">
                        I'm <strong>Ranjith Eggadi</strong>, a Computer Science graduate from Kamala Institute of Technology and Science, 
                        based in Hyderabad, Telangana. I specialize in backend and full-stack development with strong experience in 
                        Java, Python, and JavaScript.
                      </Text>
                    </motion.div>

                    <motion.div variants={fadeInUp}>
                      <Text size="body" color="secondary" className="leading-relaxed">
                        My expertise spans <strong>Spring Boot</strong>, <strong>Django</strong>, <strong>Node.js</strong>, and <strong>FastAPI</strong>, 
                        with hands-on experience in Microservices, REST APIs, and AWS (EC2, S3). I'm skilled in building scalable, 
                        secure, and performance-optimized applications.
                      </Text>
                    </motion.div>

                    <motion.div variants={fadeInUp}>
                      <Text size="body" color="secondary" className="leading-relaxed">
                        I work with Agile methodologies, debugging, CI/CD pipelines, and cloud deployments. My focus is on delivering 
                        reliable, high-quality solutions with strong problem-solving skills and attention to detail.
                      </Text>
                    </motion.div>
                  </>
                )}
              </motion.div>

              {/* Stats Side with FrostedCard and AnimatedCounter */}
              <motion.div variants={fadeInUp} className="relative">
                <div className="grid grid-cols-2 gap-6">
                  <motion.div whileHover={{ y: -8, scale: 1.02 }}>
                    <GlowOnHover color="blue" intensity="medium">
                      <FrostedCard intensity="medium" glow shimmer className="p-8">
                        <div className="text-4xl font-bold text-fg-primary mb-2">
                          <AnimatedCounter 
                            key={`api-${aboutData.stats.productionAPIs}`}
                            value={parseInt(aboutData.stats.productionAPIs.replace(/[^0-9]/g, '')) || 10} 
                            suffix={aboutData.stats.productionAPIs.replace(/\d+/g, '') || "+"} 
                            duration={2} 
                          />
                        </div>
                        <div className="text-fg-secondary">Production APIs</div>
                      </FrostedCard>
                    </GlowOnHover>
                  </motion.div>

                  <motion.div whileHover={{ y: -8, scale: 1.02 }}>
                    <GlowOnHover color="purple" intensity="medium">
                      <FrostedCard intensity="medium" glow shimmer className="p-8">
                        <div className="text-4xl font-bold text-fg-primary mb-2">
                          <AnimatedCounter 
                            key={`years-${aboutData.stats.yearsExperience}`}
                            value={parseInt(aboutData.stats.yearsExperience.replace(/[^0-9]/g, '')) || 3} 
                            suffix={aboutData.stats.yearsExperience.replace(/\d+/g, '') || "+"} 
                            duration={2} 
                          />
                        </div>
                        <div className="text-fg-secondary">Years Experience</div>
                      </FrostedCard>
                    </GlowOnHover>
                  </motion.div>

                  <motion.div whileHover={{ y: -8, scale: 1.02 }}>
                    <GlowOnHover color="cyan" intensity="medium">
                      <FrostedCard intensity="medium" glow shimmer className="p-8">
                        <div className="text-4xl font-bold text-fg-primary mb-2">
                          <AnimatedCounter 
                            key={`cloud-${aboutData.stats.cloudDeployments}`}
                            value={parseInt(aboutData.stats.cloudDeployments.replace(/[^0-9]/g, '')) || 5} 
                            suffix={aboutData.stats.cloudDeployments.replace(/\d+/g, '') || "+"} 
                            duration={2} 
                          />
                        </div>
                        <div className="text-fg-secondary">Cloud Deployments</div>
                      </FrostedCard>
                    </GlowOnHover>
                  </motion.div>

                  <motion.div whileHover={{ y: -8, scale: 1.02 }}>
                    <GlowOnHover color="gold" intensity="medium">
                      <FrostedCard intensity="medium" glow shimmer className="p-8">
                        <div className="text-4xl font-bold text-fg-primary mb-2">
                          <AnimatedCounter 
                            key={`leetcode-${aboutData.stats.leetcodeSolved}`}
                            value={parseInt(aboutData.stats.leetcodeSolved.replace(/[^0-9]/g, '')) || 150} 
                            suffix={aboutData.stats.leetcodeSolved.replace(/\d+/g, '') || "+"} 
                            duration={2} 
                          />
                        </div>
                        <div className="text-fg-secondary">LeetCode Solved</div>
                      </FrostedCard>
                    </GlowOnHover>
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* Highlights - Generated from certifications and skills */}
            {aboutData.certifications.length > 0 && (
              <motion.div variants={staggerContainer} className="mb-16">
                <Heading as="h2" size="h2" className="mb-8 text-center">
                  Key Highlights
                </Heading>
                <div className="grid md:grid-cols-2 gap-6">
                  {aboutData.certifications.slice(0, 4).map((cert, index) => {
                    const certIcon = cert.name.toLowerCase().includes("aws") 
                      ? <Cloud className="w-6 h-6" />
                      : cert.name.toLowerCase().includes("java") || cert.name.toLowerCase().includes("python")
                      ? <Code2 className="w-6 h-6" />
                      : <Award className="w-6 h-6" />;
                    
                    return (
                      <motion.div
                        key={cert.id || cert.name}
                        variants={fadeInUp}
                        custom={index}
                        className="flex items-start gap-4 p-6 glass-base rounded-xl border border-border-primary/50"
                      >
                        <div className="p-2 rounded-lg bg-primary/10 text-fg-primary">
                          {certIcon}
                        </div>
                        <div>
                          <h4 className="font-semibold text-fg-primary mb-1">
                            {cert.name}
                          </h4>
                          <p className="text-sm text-fg-secondary">
                            {cert.issuer} • {cert.date}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Skills */}
            {aboutData.skills.length > 0 && (
              <motion.div variants={staggerContainer}>
                <Heading as="h2" size="h2" className="mb-8 text-center">
                  Technical Skills
                </Heading>
                <div className="grid md:grid-cols-2 gap-6">
                  {aboutData.skills.map((skill, index) => (
                    <motion.div
                      key={skill.category}
                      variants={fadeInUp}
                      custom={index}
                      className="glass-card p-6 rounded-xl border border-border-primary/50"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-primary/10 text-fg-primary">
                          {skillIcons[skill.category] || <Code2 className="w-6 h-6" />}
                        </div>
                        <Heading as="h3" size="h4">
                          {skill.category}
                        </Heading>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {skill.items.map((item) => (
                          <span
                            key={item}
                            className="px-3 py-1 rounded-full text-sm bg-secondary border border-border-primary/50 text-fg-secondary"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatedSection>
        </Container>
      </section>

      {/* Education Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 -right-1/4 w-96 h-96 bg-green-500/20 dark:bg-green-400/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/2 -left-1/4 w-96 h-96 bg-blue-500/20 dark:bg-blue-400/10 rounded-full blur-3xl" />
        </div>

        <Container size="lg" className="relative z-10">
          <AnimatedSection variant="stagger">
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <Text size="body-sm" color="primary" className="font-semibold uppercase tracking-wider mb-4">
                Education
              </Text>
              <Heading
                as="h2"
                size="h2"
                className="mb-4 dark:[text-shadow:0_2px_30px_rgba(255,255,255,0.1)]"
                style={{ textShadow: "0 2px 30px rgba(0,0,0,0.2)" }}
              >
                Academic{" "}
                <span className="bg-gradient-to-r from-green-600 via-blue-600 to-cyan-600 dark:from-green-400 dark:via-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
                  Background
                </span>
              </Heading>
            </motion.div>

            <div className="space-y-6">
              {aboutData.education.length > 0 ? (
                aboutData.education.map((edu, index) => (
                  <motion.div key={index} variants={fadeInUp} custom={index} className="max-w-3xl mx-auto">
                    <div className="glass-card p-8 rounded-xl border border-border-primary/50">
                      <div className="flex items-start gap-6">
                        <div className="p-4 rounded-xl bg-primary/10 text-fg-primary">
                          <GraduationCap className="w-8 h-8" />
                        </div>
                        <div className="flex-1">
                          <Heading as="h3" size="h3" className="mb-2">
                            {edu.degree}
                          </Heading>
                          <Text size="body-lg" color="primary" className="font-semibold mb-2">
                            {edu.institution}
                          </Text>
                          <Text size="body" color="secondary" className="mb-4">
                            {edu.location}
                          </Text>
                          <div className="flex items-center gap-2 text-fg-tertiary">
                            <span>{edu.startDate} – {edu.endDate}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div variants={fadeInUp} className="max-w-3xl mx-auto">
                  <div className="glass-card p-8 rounded-xl border border-border-primary/50">
                    <div className="flex items-start gap-6">
                      <div className="p-4 rounded-xl bg-primary/10 text-fg-primary">
                        <GraduationCap className="w-8 h-8" />
                      </div>
                      <div className="flex-1">
                        <Heading as="h3" size="h3" className="mb-2">
                          Bachelor of Technology in Computer Science
                        </Heading>
                        <Text size="body-lg" color="primary" className="font-semibold mb-2">
                          Kamala Institute of Technology and Science
                        </Text>
                        <Text size="body" color="secondary" className="mb-4">
                          Karimnagar, Telangana
                        </Text>
                        <div className="flex items-center gap-2 text-fg-tertiary">
                          <span>Sep. 2020 – Jun. 2024</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </AnimatedSection>
        </Container>
      </section>

      {/* Certifications Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 -right-1/4 w-96 h-96 bg-purple-500/20 dark:bg-purple-400/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/2 -left-1/4 w-96 h-96 bg-cyan-500/20 dark:bg-cyan-400/10 rounded-full blur-3xl" />
        </div>

        <Container size="lg" className="relative z-10">
          <AnimatedSection variant="stagger">
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <Text size="body-sm" color="primary" className="font-semibold uppercase tracking-wider mb-4">
                Certifications
              </Text>
              <Heading
                as="h2"
                size="h2"
                className="mb-4 dark:[text-shadow:0_2px_30px_rgba(255,255,255,0.1)]"
                style={{ textShadow: "0 2px 30px rgba(0,0,0,0.2)" }}
              >
                Professional{" "}
                <span className="bg-gradient-to-r from-purple-600 via-cyan-600 to-blue-600 dark:from-purple-400 dark:via-cyan-400 dark:to-blue-400 bg-clip-text text-transparent">
                  Certifications
                </span>
              </Heading>
              <Text size="body" color="secondary" className="max-w-2xl mx-auto">
                Validated expertise through industry-recognized certifications
              </Text>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {aboutData.certifications.length > 0 ? (
                aboutData.certifications.map((cert, index) => {
                  const certIcon = cert.name.toLowerCase().includes("aws")
                    ? <Cloud className="w-8 h-8" />
                    : cert.name.toLowerCase().includes("java") || cert.name.toLowerCase().includes("python")
                    ? <Code2 className="w-8 h-8" />
                    : <Award className="w-8 h-8" />;
                  
                  return (
                    <motion.div
                      key={cert.credentialId || cert.name}
                      variants={fadeInUp}
                      custom={index}
                      className="glass-card p-0 rounded-xl border border-border-primary/50 hover:border-border-primary hover:shadow-xl transition-all duration-500 group overflow-hidden"
                      whileHover={{ y: -8, scale: 1.02 }}
                    >
                      {/* Certificate Image */}
                      <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-primary/20 via-secondary to-primary/10">
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
                        <div className="absolute top-3 right-3">
                          <div className="p-2 rounded-lg bg-primary/90 backdrop-blur-sm">
                            {certIcon}
                          </div>
                        </div>
                        {/* Fallback gradient pattern */}
                        <div className="absolute inset-0 opacity-30">
                          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,.05)_25%,rgba(255,255,255,.05)_50%,transparent_50%,transparent_75%,rgba(255,255,255,.05)_75%,rgba(255,255,255,.05))] bg-[length:20px_20px]" />
                        </div>
                      </div>

                      {/* Certificate Details */}
                      <div className="p-6">
                        <div className="mb-4">
                          <Heading as="h3" size="h4" className="mb-2">
                            {cert.name}
                          </Heading>
                          <Text size="body-sm" color="secondary" className="mb-2">
                            {cert.issuer}
                          </Text>
                          <div className="flex items-center gap-2 mb-2">
                            <User className="w-4 h-4 text-fg-tertiary" />
                            <Text size="body-sm" color="tertiary">
                              {aboutData.personalInfo.name || "Ranjith Eggadi"}
                            </Text>
                          </div>
                          <Text size="body-sm" color="tertiary" className="mb-3">
                            Issued: {cert.date}
                          </Text>
                        </div>

                        <div className="pt-4 border-t border-border-primary/50 space-y-3">
                          <div className="flex items-center gap-2">
                            <BadgeIcon className="w-4 h-4 text-fg-tertiary" />
                            <Text size="body-sm" color="tertiary" className="font-mono">
                              {cert.credentialId}
                            </Text>
                          </div>
                          <a
                            href={cert.verificationLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm text-fg-primary hover:text-gradient-silver transition-colors group/link"
                          >
                            <span className="font-semibold">Verify Certificate</span>
                            <ExternalLink className="w-4 h-4 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              ) : (
                <div className="col-span-full text-center py-8">
                  <Text size="body" color="secondary">
                    No certifications available. Please add certifications in the admin panel.
                  </Text>
                </div>
              )}
            </div>
          </AnimatedSection>
        </Container>
      </section>

      {/* LeetCode & GitHub Dashboard Carousel */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 -right-1/4 w-96 h-96 bg-blue-500/20 dark:bg-blue-400/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 -left-1/4 w-96 h-96 bg-green-500/20 dark:bg-green-400/10 rounded-full blur-3xl" />
        </div>

        <Container size="lg" className="relative z-10">
          <AnimatedSection variant="stagger">
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <Text size="body-sm" color="primary" className="font-semibold uppercase tracking-wider mb-4">
                Coding Activity
              </Text>
              <Heading
                as="h2"
                size="h2"
                className="mb-4 dark:[text-shadow:0_2px_30px_rgba(255,255,255,0.1)]"
                style={{ textShadow: "0 2px 30px rgba(0,0,0,0.2)" }}
              >
                Platform{" "}
                <span className="bg-gradient-to-r from-blue-600 via-green-600 to-cyan-600 dark:from-blue-400 dark:via-green-400 dark:to-cyan-400 bg-clip-text text-transparent">
                  Dashboards
                </span>
              </Heading>
              <Text size="body" color="secondary" className="max-w-2xl mx-auto">
                Track my coding progress and contributions across platforms
              </Text>
            </motion.div>

            {/* Carousel */}
            <motion.div variants={fadeInUp} className="relative">
              <div className="relative overflow-hidden rounded-2xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  >
                    {slides[currentSlide].component}
                  </motion.div>
                </AnimatePresence>

                {/* Slide Indicators - Non-interactive */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                  {slides.map((_, index) => (
                    <div
                      key={index}
                      className={`h-2 rounded-full transition-all duration-500 ${
                        index === currentSlide
                          ? "w-8 bg-fg-primary"
                          : "w-2 bg-fg-tertiary/30"
                      }`}
                      aria-label={`Slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatedSection>
        </Container>
      </section>
    </main>
  );
}

