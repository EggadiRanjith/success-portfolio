"use client";

import { Container, Heading, Text } from "@/components/ui";
import { Award, Code2, Cloud, Database, Server, Badge as BadgeIcon, ExternalLink, User, GraduationCap, MapPin, Calendar } from "lucide-react";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { getPortfolioData, clearCache, type Skill, type Certification, type Education } from "@/lib/adminData";
import { useTheme } from "@/context/ThemeContext";
import Beams from "@/components/backgrounds/Beams";

// Icon mapping for skills
const skillIcons: Record<string, React.ReactElement> = {
  "Programming Languages": <Code2 className="w-6 h-6" />,
  "Backend Development": <Server className="w-6 h-6" />,
  "Frontend Development": <Code2 className="w-6 h-6" />,
  "Databases": <Database className="w-6 h-6" />,
  "Cloud & DevOps": <Cloud className="w-6 h-6" />,
};

// Icon mapping for certifications
const certIcons: Record<string, React.ReactElement> = {
  "AWS": <Cloud className="w-8 h-8" />,
  "Java": <Code2 className="w-8 h-8" />,
  "Python": <Code2 className="w-8 h-8" />,
  "default": <Award className="w-8 h-8" />,
};

export default function AboutPage() {
  const { theme } = useTheme();
  const [aboutData, setAboutData] = useState({
    personalInfo: {
      name: "",
      description: "",
      title: "",
      profileImage: "/profile.png",
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
  });

  // Load about data from admin
  useEffect(() => {
    if (typeof window === "undefined") return;

    const loadAboutData = async (force: boolean = false) => {
      try {
        const data = await getPortfolioData(force);
        
        // Get profile image from personalInfo or use default
        let profileImage = data?.personalInfo?.profileImage || "/profile.png";
        if (profileImage === "/profile.jpg") {
          profileImage = "/profile.png";
        }
        
        setAboutData({
          personalInfo: {
            name: data?.personalInfo?.name || "",
            description: data?.personalInfo?.description || "",
            title: data?.personalInfo?.title || "",
            profileImage: profileImage,
          },
          skills: data?.skills || [],
          certifications: data?.certifications || [],
          education: data?.education || [],
          stats: {
            productionAPIs: (data?.stats?.productionAPIs !== undefined && data?.stats?.productionAPIs !== null) 
              ? String(data.stats.productionAPIs) 
              : "10+",
            yearsExperience: (data?.stats?.yearsExperience !== undefined && data?.stats?.yearsExperience !== null) 
              ? String(data.stats.yearsExperience) 
              : "3+",
            cloudDeployments: (data?.stats?.cloudDeployments !== undefined && data?.stats?.cloudDeployments !== null) 
              ? String(data.stats.cloudDeployments) 
              : "5+",
            leetcodeSolved: (data?.stats?.leetcodeSolved !== undefined && data?.stats?.leetcodeSolved !== null) 
              ? String(data.stats.leetcodeSolved) 
              : "150+",
          },
        });
      } catch (error) {
        // Keep default values on error
        console.error("Error loading about data:", error);
      }
    };

    // Initial load - always fetch fresh data
    loadAboutData(true);

    // Listen for updates from admin panel
    const handlePortfolioUpdate = async () => {
      // Clear cache and force fresh data fetch
      clearCache();
      // Add a small delay to ensure server has finished writing
      await new Promise(resolve => setTimeout(resolve, 100));
      // Force refresh to get latest data from server
      loadAboutData(true);
    };

    window.addEventListener("portfolio-data-updated", handlePortfolioUpdate);

    return () => {
      window.removeEventListener("portfolio-data-updated", handlePortfolioUpdate);
    };
  }, []);

  return (
    <main role="main" className="min-h-screen bg-primary">
      {/* Hero Section with Beams Background */}
      <section 
        className="relative py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32 overflow-hidden px-4 sm:px-6" 
        style={{ 
          backgroundColor: "var(--color-bg-primary)",
          isolation: "isolate",
          position: "relative",
        }}
      >
        {/* Beams Background */}
        <div 
          className="absolute inset-0 overflow-hidden pointer-events-none" 
          style={{ 
            zIndex: 2,
            backgroundColor: "transparent",
          }}
        >
          <Beams
            beamWidth={2}
            beamHeight={15}
            beamNumber={12}
            lightColor="#ffffff"
            speed={2}
            noiseIntensity={1.75}
            scale={0.2}
            rotation={0}
          />
        </div>

        {/* Background gradient orbs - Reduced opacity to work with Beams, hidden in light mode */}
        {theme === "dark" && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1, opacity: 0.2 }}>
            <div className="absolute top-1/3 -right-1/4 w-48 sm:w-64 md:w-96 h-48 sm:h-64 md:h-96 bg-orb-cyan rounded-full blur-3xl" />
            <div className="absolute bottom-1/3 -left-1/4 w-48 sm:w-64 md:w-96 h-48 sm:h-64 md:h-96 bg-orb-blue rounded-full blur-3xl" />
          </div>
        )}

        <Container size="lg" className="relative px-4 sm:px-6" style={{ zIndex: 3, backgroundColor: "transparent" }}>
          {/* Hero Section - Pure Hero Design with Profile Image */}
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 lg:gap-16 items-center mb-8 sm:mb-12 md:mb-16">
            {/* Content Side - Left on desktop, top on mobile */}
            <div className="space-y-4 sm:space-y-5 md:space-y-6 order-2 lg:order-1">
              {/* Label */}
              <div>
                <Text size="body-sm" className="font-semibold uppercase tracking-wider mb-3 sm:mb-4 text-xs sm:text-sm" style={{ color: "#FFFFFF" }}>
                  About Me
                </Text>
              </div>

              {/* Title */}
              <div>
                <Heading
                  as="h1"
                  size="h1"
                  className="mb-4 sm:mb-5 md:mb-6"
                  style={{
                    fontSize: "clamp(1.5rem, 8vw, 3.5rem)",
                    lineHeight: "1.1",
                    color: "#FFFFFF",
                    }}
                  >
                    {aboutData.personalInfo.title || "Backend & Full-Stack Developer"}
                </Heading>
              </div>

              {/* Description */}
              {aboutData.personalInfo.description ? (
                <div>
                  <Text size="body-lg" className="leading-relaxed whitespace-pre-line" style={{
                    fontSize: "clamp(0.875rem, 2vw + 0.5rem, 1.25rem)",
                    lineHeight: 1.6,
                    color: "#FFFFFF",
                  }}>
                    {aboutData.personalInfo.description}
                  </Text>
                </div>
              ) : (
                <>
                  <div>
                    <Text size="body-lg" className="leading-relaxed" style={{
                      fontSize: "clamp(0.875rem, 2vw + 0.5rem, 1.25rem)",
                      lineHeight: 1.6,
                      color: "#FFFFFF",
                    }}>
                      I&apos;m <strong>Ranjith Eggadi</strong>, a Computer Science graduate from Kamala Institute of Technology and Science, 
                      based in Hyderabad, Telangana. I specialize in backend and full-stack development with strong experience in 
                      Java, Python, and JavaScript.
                    </Text>
                  </div>

                  <div>
                    <Text size="body" className="leading-relaxed mt-3 sm:mt-4" style={{
                      fontSize: "clamp(0.8125rem, 1.8vw + 0.4rem, 1.125rem)",
                      lineHeight: 1.6,
                      color: "#FFFFFF",
                    }}>
                      My expertise spans <strong>Spring Boot</strong>, <strong>Django</strong>, <strong>Node.js</strong>, and <strong>FastAPI</strong>, 
                      with hands-on experience in Microservices, REST APIs, and AWS (EC2, S3). I&apos;m skilled in building scalable, 
                      secure, and performance-optimized applications.
                    </Text>
                  </div>

                  <div>
                    <Text size="body" className="leading-relaxed mt-3 sm:mt-4" style={{
                      fontSize: "clamp(0.8125rem, 1.8vw + 0.4rem, 1.125rem)",
                      lineHeight: 1.6,
                      color: "#FFFFFF",
                    }}>
                      I work with Agile methodologies, debugging, CI/CD pipelines, and cloud deployments. My focus is on delivering 
                      reliable, high-quality solutions with strong problem-solving skills and attention to detail.
                    </Text>
                  </div>
                </>
              )}
            </div>

            {/* Profile Image Side - Right on desktop, top on mobile */}
            <div className="relative flex justify-center lg:justify-end order-1 lg:order-2 mb-6 sm:mb-8 lg:mb-0">
              <div 
                className="relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-[380px] lg:max-w-[450px]"
                style={{
                  aspectRatio: "1 / 1",
                }}
              >
                <Image
                  src={aboutData.personalInfo.profileImage}
                  alt="Profile Picture"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 280px, (max-width: 768px) 320px, (max-width: 1024px) 380px, 450px"
                  priority
                  style={{
                    objectFit: "cover",
                  }}
                  onError={(e) => {
                    // Fallback to a placeholder if image doesn't exist
                    const target = e.target as HTMLImageElement;
                    target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='450' height='450'%3E%3Crect fill='%23ddd' width='450' height='450'/%3E%3Ctext fill='%23999' font-family='sans-serif' font-size='24' dy='10.5' font-weight='bold' x='50%25' y='50%25' text-anchor='middle'%3EProfile%3C/text%3E%3C/svg%3E";
                  }}
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Key Highlights Section */}
            {aboutData.certifications.length > 0 && (
        <section className="relative py-12 sm:py-16 md:py-20 overflow-hidden px-4 sm:px-6">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/2 -right-1/4 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-orb-purple rounded-full blur-3xl" />
            <div className="absolute bottom-1/2 -left-1/4 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-orb-cyan rounded-full blur-3xl" />
          </div>

          <Container size="lg" className="relative z-10 px-4 sm:px-6">
            <div className="mb-8 sm:mb-12 md:mb-16">
              <Heading 
                as="h2" 
                size="h2" 
                className="mb-6 sm:mb-8 text-center px-2"
                style={{
                  fontSize: "clamp(1.5rem, 5vw + 0.5rem, 2.5rem)",
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
                  }}
                >
                  Key Highlights
                </span>
              </Heading>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                {aboutData.certifications.slice(0, 4).map((cert, index) => {
                  const certIcon = cert.name.toLowerCase().includes("aws") 
                    ? <Cloud className="w-5 h-5 sm:w-6 sm:h-6" />
                    : cert.name.toLowerCase().includes("java") || cert.name.toLowerCase().includes("python")
                    ? <Code2 className="w-5 h-5 sm:w-6 sm:h-6" />
                    : <Award className="w-5 h-5 sm:w-6 sm:h-6" />;
                  
                  return (
                    <div
                      key={cert.credentialId || cert.name || `cert-${index}`}
                      className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 md:p-6 glass-base rounded-xl border border-border-primary/50"
                    >
                      <div className="p-2 rounded-lg bg-primary/10 text-fg-primary flex-shrink-0">
                        {certIcon}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-semibold text-fg-primary mb-1 text-sm sm:text-base break-words">
                          {cert.name}
                        </h4>
                        <p className="text-xs sm:text-sm text-fg-secondary break-words">
                          {cert.issuer} • {cert.date}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Container>
        </section>
            )}

      {/* Skills Section */}
            {aboutData.skills.length > 0 && (
        <section className="relative py-12 sm:py-16 md:py-20 overflow-hidden px-4 sm:px-6">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/2 -right-1/4 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-orb-blue rounded-full blur-3xl" />
            <div className="absolute bottom-1/2 -left-1/4 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-orb-green rounded-full blur-3xl" />
          </div>

          <Container size="lg" className="relative z-10 px-4 sm:px-6">
            <div>
              <Heading 
                as="h2" 
                size="h2" 
                className="mb-6 sm:mb-8 text-center px-2"
                style={{
                  fontSize: "clamp(1.5rem, 5vw + 0.5rem, 2.5rem)",
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
                  }}
                >
                  Technical Skills
                </span>
              </Heading>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                {aboutData.skills.map((skill, index) => (
                  <div
                    key={skill.category}
                    className="glass-card p-4 sm:p-5 md:p-6 rounded-xl border border-border-primary/50"
                  >
                    <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                      <div className="p-2 rounded-lg bg-primary/10 text-fg-primary flex-shrink-0">
                        {skillIcons[skill.category] || <Code2 className="w-5 h-5 sm:w-6 sm:h-6" />}
                      </div>
                      <Heading as="h3" size="h4" className="text-base sm:text-lg md:text-xl">
                        {skill.category}
                      </Heading>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {skill.items.map((item) => (
                        <span
                          key={item}
                          className="px-2.5 sm:px-3 py-1 rounded-full text-xs sm:text-sm bg-secondary border border-border-primary/50 text-fg-secondary"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
        </Container>
      </section>
      )}

      {/* Education Section */}
      <section className="relative py-12 sm:py-16 md:py-20 overflow-hidden px-4 sm:px-6">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 -right-1/4 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-orb-green rounded-full blur-3xl" />
          <div className="absolute bottom-1/2 -left-1/4 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-orb-blue rounded-full blur-3xl" />
        </div>

        <Container size="lg" className="relative z-10 px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-10 md:mb-12 px-2">
            <Text size="body-sm" color="primary" className="font-semibold uppercase tracking-wider mb-3 sm:mb-4 text-xs sm:text-sm">
              Education
            </Text>
            <Heading
              as="h2"
              size="h2"
              className="mb-3 sm:mb-4 text-shadow-theme"
              style={{
                fontSize: "clamp(1.5rem, 5vw + 0.5rem, 2.5rem)",
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
                }}
              >
                Academic Background
              </span>
            </Heading>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Timeline line */}
            <div 
              className="absolute left-4 sm:left-6 md:left-8 top-0 bottom-0 w-0.5 hidden md:block"
              style={{
                background: theme === "dark"
                  ? "linear-gradient(to bottom, rgba(59, 130, 246, 0.3), rgba(6, 182, 212, 0.3), rgba(16, 185, 129, 0.3))"
                  : "linear-gradient(to bottom, rgba(30, 64, 175, 0.2), rgba(8, 145, 178, 0.2), rgba(5, 150, 105, 0.2))",
              }}
            />
            
            <div className="space-y-6 sm:space-y-8">
            {aboutData.education.length > 0 ? (
              aboutData.education.map((edu, index) => (
                  <div 
                    key={index} 
                    className="relative"
                  >
                    {/* Timeline dot */}
                    <div 
                      className="absolute left-0 top-4 sm:top-6 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-lg z-10 hidden md:flex"
                      style={{
                        background: theme === "dark"
                          ? "linear-gradient(135deg, #3B82F6, #06B6D4)"
                          : "linear-gradient(135deg, #1E40AF, #0891B2)",
                      }}
                    >
                      <GraduationCap className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                      </div>
                    
                    <div className="ml-0 md:ml-20">
                      <div className="glass-card p-4 sm:p-5 md:p-6 lg:p-8 rounded-xl sm:rounded-2xl border border-border-primary/50 relative overflow-hidden">
                          
                          <div className="relative z-10">
                            {/* Degree Badge */}
                            <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="flex-1">
                                <div 
                                  className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full border mb-2 sm:mb-3"
                                  style={{
                                    background: theme === "dark"
                                      ? "linear-gradient(to right, rgba(59, 130, 246, 0.2), rgba(6, 182, 212, 0.2))"
                                      : "linear-gradient(to right, rgba(30, 64, 175, 0.15), rgba(8, 145, 178, 0.15))",
                                    borderColor: theme === "dark" ? "rgba(59, 130, 246, 0.3)" : "rgba(30, 64, 175, 0.25)",
                                  }}
                                >
                                  <GraduationCap 
                                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0"
                                    style={{ color: theme === "dark" ? "#3B82F6" : "#1E40AF" }}
                                  />
                                  <Text 
                                    size="body-sm" 
                                    className="font-semibold text-xs sm:text-sm"
                                    style={{ color: theme === "dark" ? "#3B82F6" : "#1E40AF" }}
                                  >
                            {edu.degree}
                                  </Text>
                                </div>
                                <Heading as="h3" size="h3" className="mb-2 sm:mb-3 mt-1 sm:mt-2 text-lg sm:text-xl md:text-2xl break-words">
                            {edu.institution}
                                </Heading>
                              </div>
                            </div>
                            
                            {/* Details Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-4 sm:mt-5 md:mt-6">
                              <div className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-lg bg-primary/5 border border-border-primary/30">
                                <div 
                                  className="p-1.5 sm:p-2 rounded-lg flex-shrink-0"
                                  style={{
                                    backgroundColor: theme === "dark" ? "rgba(59, 130, 246, 0.1)" : "rgba(30, 64, 175, 0.1)",
                                  }}
                                >
                                  <MapPin 
                                    className="w-4 h-4 sm:w-5 sm:h-5"
                                    style={{ color: theme === "dark" ? "#3B82F6" : "#1E40AF" }}
                                  />
                                </div>
                                <div className="min-w-0">
                                  <Text size="body-sm" color="tertiary" className="text-xs uppercase tracking-wide">
                                    Location
                          </Text>
                                  <Text size="body" color="primary" className="font-medium text-sm sm:text-base break-words">
                            {edu.location}
                          </Text>
                          </div>
                        </div>
                              
                              <div className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-lg bg-primary/5 border border-border-primary/30">
                                <div 
                                  className="p-1.5 sm:p-2 rounded-lg flex-shrink-0"
                                  style={{
                                    backgroundColor: theme === "dark" ? "rgba(6, 182, 212, 0.1)" : "rgba(8, 145, 178, 0.1)",
                                  }}
                                >
                                  <Calendar 
                                    className="w-4 h-4 sm:w-5 sm:h-5"
                                    style={{ color: theme === "dark" ? "#06B6D4" : "#0891B2" }}
                                  />
                                </div>
                                <div className="min-w-0">
                                  <Text size="body-sm" color="tertiary" className="text-xs uppercase tracking-wide">
                                    Duration
                                  </Text>
                                  <Text size="body" color="primary" className="font-medium text-sm sm:text-base break-words">
                                    {edu.startDate} – {edu.endDate}
                                  </Text>
                                </div>
                              </div>
                            </div>
                          </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                  <div className="relative">
                    {/* Timeline dot */}
                    <div 
                      className="absolute left-0 top-4 sm:top-6 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-lg z-10 hidden md:flex"
                      style={{
                        background: theme === "dark"
                          ? "linear-gradient(135deg, #3B82F6, #06B6D4)"
                          : "linear-gradient(135deg, #1E40AF, #0891B2)",
                      }}
                    >
                      <GraduationCap className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                      </div>
                    
                    <div className="ml-0 md:ml-20">
                      <div className="glass-card p-4 sm:p-5 md:p-6 lg:p-8 rounded-xl sm:rounded-2xl border border-border-primary/50 relative overflow-hidden">
                        
                        <div className="relative z-10">
                          {/* Degree Badge */}
                          <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex-1">
                              <div 
                                className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full border mb-2 sm:mb-3"
                                style={{
                                  background: theme === "dark"
                                    ? "linear-gradient(to right, rgba(59, 130, 246, 0.2), rgba(6, 182, 212, 0.2))"
                                    : "linear-gradient(to right, rgba(30, 64, 175, 0.15), rgba(8, 145, 178, 0.15))",
                                  borderColor: theme === "dark" ? "rgba(59, 130, 246, 0.3)" : "rgba(30, 64, 175, 0.25)",
                                }}
                              >
                                <GraduationCap 
                                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0"
                                  style={{ color: theme === "dark" ? "#3B82F6" : "#1E40AF" }}
                                />
                                <Text 
                                  size="body-sm" 
                                  className="font-semibold text-xs sm:text-sm"
                                  style={{ color: theme === "dark" ? "#3B82F6" : "#1E40AF" }}
                                >
                                  Bachelor of Technology
                                </Text>
                              </div>
                              <Heading as="h3" size="h3" className="mb-2 sm:mb-3 mt-1 sm:mt-2 text-lg sm:text-xl md:text-2xl break-words">
                          Kamala Institute of Technology and Science
                              </Heading>
                            </div>
                          </div>
                          
                          {/* Details Grid */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-4 sm:mt-5 md:mt-6">
                            <div className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-lg bg-primary/5 border border-border-primary/30">
                              <div 
                                className="p-1.5 sm:p-2 rounded-lg flex-shrink-0"
                                style={{
                                  backgroundColor: theme === "dark" ? "rgba(59, 130, 246, 0.1)" : "rgba(30, 64, 175, 0.1)",
                                }}
                              >
                                <MapPin 
                                  className="w-4 h-4 sm:w-5 sm:h-5"
                                  style={{ color: theme === "dark" ? "#3B82F6" : "#1E40AF" }}
                                />
                              </div>
                              <div className="min-w-0">
                                <Text size="body-sm" color="tertiary" className="text-xs uppercase tracking-wide">
                                  Location
                        </Text>
                                <Text size="body" color="primary" className="font-medium text-sm sm:text-base break-words">
                          Karimnagar, Telangana
                        </Text>
                        </div>
                      </div>
                            
                            <div className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-lg bg-primary/5 border border-border-primary/30">
                              <div 
                                className="p-1.5 sm:p-2 rounded-lg flex-shrink-0"
                                style={{
                                  backgroundColor: theme === "dark" ? "rgba(6, 182, 212, 0.1)" : "rgba(8, 145, 178, 0.1)",
                                }}
                              >
                                <Calendar 
                                  className="w-4 h-4 sm:w-5 sm:h-5"
                                  style={{ color: theme === "dark" ? "#06B6D4" : "#0891B2" }}
                                />
                              </div>
                              <div className="min-w-0">
                                <Text size="body-sm" color="tertiary" className="text-xs uppercase tracking-wide">
                                  Duration
                                </Text>
                                <Text size="body" color="primary" className="font-medium text-sm sm:text-base break-words">
                                  Sep. 2020 – Jun. 2024
                                </Text>
                              </div>
                            </div>
                          </div>
                        </div>
                    </div>
                  </div>
                </div>
              )}
              </div>
            </div>
        </Container>
      </section>

      {/* Certifications Section */}
      <section className="relative py-12 sm:py-16 md:py-20 overflow-hidden px-4 sm:px-6">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 -right-1/4 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-orb-purple rounded-full blur-3xl" />
          <div className="absolute bottom-1/2 -left-1/4 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-orb-cyan rounded-full blur-3xl" />
        </div>

        <Container size="lg" className="relative z-10 px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-10 md:mb-12 px-2">
            <Text size="body-sm" color="primary" className="font-semibold uppercase tracking-wider mb-3 sm:mb-4 text-xs sm:text-sm">
              Certifications
            </Text>
            <Heading
              as="h2"
              size="h2"
              className="mb-3 sm:mb-4 text-shadow-theme"
              style={{
                fontSize: "clamp(1.5rem, 5vw + 0.5rem, 2.5rem)",
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
                }}
              >
                Professional Certifications
              </span>
            </Heading>
            <Text size="body" color="secondary" className="max-w-2xl mx-auto text-sm sm:text-base px-2">
              Validated expertise through industry-recognized certifications
            </Text>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3 md:gap-4 lg:gap-5">
            {aboutData.certifications.length > 0 ? (
              aboutData.certifications.map((cert, index) => {
                const certIcon = cert.name.toLowerCase().includes("aws")
                  ? <Cloud className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />
                  : cert.name.toLowerCase().includes("java") || cert.name.toLowerCase().includes("python")
                  ? <Code2 className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />
                  : <Award className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />;
                
                return (
                  <div
                    key={cert.credentialId || cert.name}
                    className="glass-card p-0 rounded-lg sm:rounded-xl border border-border-primary/50 overflow-hidden flex flex-col"
                  >
                      {/* Certificate Image */}
                      <div className="relative w-full h-28 sm:h-32 md:h-36 lg:h-40 overflow-hidden bg-gradient-to-br from-primary/20 via-secondary to-primary/10">
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
                        <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 md:top-3 md:right-3">
                          <div className="p-1 sm:p-1.5 md:p-2 rounded-lg bg-primary/90 backdrop-blur-sm">
                            {certIcon}
                          </div>
                        </div>
                        {/* Fallback gradient pattern */}
                        <div className="absolute inset-0 opacity-30">
                          <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'linear-gradient(45deg, transparent 25%, var(--color-text-primary) 25%, var(--color-text-primary) 50%, transparent 50%, transparent 75%, var(--color-text-primary) 75%, var(--color-text-primary))', backgroundSize: '20px 20px', opacity: 0.05 }} />
                        </div>
                      </div>

                      {/* Certificate Details */}
                      <div className="p-2.5 sm:p-3 md:p-4 lg:p-5 flex-1 flex flex-col">
                        <div className="mb-2 sm:mb-2.5 md:mb-3 flex-1">
                          <Heading as="h3" size="h4" className="mb-1 sm:mb-1.5 md:mb-2 text-xs sm:text-sm md:text-base lg:text-lg line-clamp-2">
                            {cert.name}
                          </Heading>
                          <Text size="body-sm" color="secondary" className="mb-1 sm:mb-1.5 md:mb-2 text-[10px] sm:text-xs md:text-sm line-clamp-1">
                            {cert.issuer}
                          </Text>
                          <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2 mb-1 sm:mb-1.5 md:mb-2">
                            <User className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-fg-tertiary flex-shrink-0" />
                            <Text size="body-sm" color="tertiary" className="text-[10px] sm:text-xs md:text-sm break-words line-clamp-1">
                              {aboutData.personalInfo.name || "Ranjith Eggadi"}
                            </Text>
                          </div>
                          <Text size="body-sm" color="tertiary" className="mb-2 sm:mb-2.5 md:mb-3 text-[10px] sm:text-xs md:text-sm">
                            Issued: {cert.date}
                          </Text>
                        </div>

                        <div className="pt-2 sm:pt-2.5 md:pt-3 border-t border-border-primary/50 space-y-1.5 sm:space-y-2">
                          <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2">
                            <BadgeIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-fg-tertiary flex-shrink-0" />
                            <Text size="body-sm" color="tertiary" className="font-mono text-[9px] sm:text-[10px] md:text-xs lg:text-sm break-all line-clamp-1">
                              {cert.credentialId}
                            </Text>
                          </div>
                          <a
                            href={cert.verificationLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 sm:gap-1.5 md:gap-2 text-[10px] sm:text-xs md:text-sm text-fg-primary hover:text-gradient-silver transition-colors group/link"
                          >
                            <span className="font-semibold">Verify</span>
                            <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform flex-shrink-0" />
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="col-span-full text-center py-8 px-4">
                  <Text size="body" color="secondary" className="text-sm sm:text-base">
                    No certifications available. Please add certifications in the admin panel.
                  </Text>
                </div>
              )}
            </div>
        </Container>
      </section>

    </main>
  );
}

