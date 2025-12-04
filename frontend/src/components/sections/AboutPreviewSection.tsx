/**
 * About Preview Component
 * Professional layout with error handling
 */

"use client";

import React, { useEffect, useState } from "react";
import { Container, Heading, Text, Button } from "@/components/ui";
import { useRouter } from "next/navigation";
import { ArrowRight, Award, Code2, Cloud } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import Image from "next/image";
import {
  ABOUT_CONTENT,
} from "@/constants/aboutPreview";
import { getPortfolioData, clearCache } from "@/lib/adminData";

// Icon mapping
const iconMap = {
  Award: Award,
  Code2: Code2,
  Cloud: Cloud,
};

export function AboutPreviewSection() {
  const router = useRouter();
  const { theme } = useTheme();
  const [aboutData, setAboutData] = useState({
    description: "",
    highlights: [] as Array<{ iconName: keyof typeof iconMap; title: string; description: string }>,
    profileImage: "/profile.png", // Default profile image path
  });
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  // Load about data from admin - Server-side data
  useEffect(() => {
    if (typeof window === "undefined") return;

    const loadAboutData = async (force: boolean = false) => {
      setIsLoading(true);
      setHasError(false);
      
      try {
        // Fetch from server-side API
        // Force refresh when update event is triggered, otherwise use cache
        const data = await getPortfolioData(force);
        
        if (!data) {
          throw new Error("No data received from server");
        }
        
        // Get description from personalInfo - ALWAYS use server data, no fallback
        // This ensures we show what's actually saved in the admin panel
        const description = data?.personalInfo?.description?.trim() || "";
        
        // Get profile image from personalInfo or use default
        // Also handle legacy profile.jpg path and convert to profile.png
        let profileImage = data?.personalInfo?.profileImage || "/profile.png";
        if (profileImage === "/profile.jpg") {
          profileImage = "/profile.png";
        }

        // Generate highlights from certifications and skills
        const highlights = [];
        if (data?.certifications && data.certifications.length > 0) {
          const awsCert = data.certifications.find(c => c.name.toLowerCase().includes("aws"));
          if (awsCert) {
            highlights.push({
              iconName: "Award" as keyof typeof iconMap,
              title: awsCert.name,
              description: `Validated ${awsCert.issuer} expertise`,
            });
          }
        }
        
        if (data?.skills && data.skills.length > 0) {
          const langSkill = data.skills.find(s => s.category.toLowerCase().includes("programming"));
          if (langSkill) {
            highlights.push({
              iconName: "Code2" as keyof typeof iconMap,
              title: "Multi-Language Proficiency",
              description: langSkill.items.slice(0, 3).join(", ") + " with strong foundation",
            });
          }
          
          const cloudSkill = data.skills.find(s => s.category.toLowerCase().includes("cloud"));
          if (cloudSkill) {
            highlights.push({
              iconName: "Cloud" as keyof typeof iconMap,
              title: "Cloud & DevOps Expertise",
              description: cloudSkill.items.slice(0, 4).join(", "),
            });
          }
        }

        setAboutData({ description, highlights, profileImage });
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading about data from server:", error);
        setHasError(true);
        setIsLoading(false);
        // Keep default values on error
      }
    };

    // Initial load - always fetch fresh data to ensure we get latest from admin
    loadAboutData(true);

    // Listen for updates from admin panel
    const handlePortfolioUpdate = async () => {
      // Clear cache first
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
  }, [refreshKey]); // Add refreshKey as dependency to allow manual refresh

  // Error handling for navigation
  const handleCTAClick = async () => {
    try {
      await router.push(ABOUT_CONTENT.ctaHref);
    } catch (error) {
      if (typeof window !== "undefined") {
        window.location.href = ABOUT_CONTENT.ctaHref;
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
        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="text-fg-secondary" style={{ fontSize: "clamp(0.875rem, 1.5vw, 1rem)" }}>
              Loading...
            </div>
          </div>
        )}

        {/* Error State */}
        {hasError && !isLoading && (
          <div className="text-center py-8">
            <Text color="secondary" style={{ fontSize: "clamp(0.875rem, 1.5vw, 1rem)" }}>
              Unable to load data. Please refresh the page.
            </Text>
      </div>
        )}

        {/* Main Content - Redesigned for all resolutions */}
        {!isLoading && !hasError && (
        <div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center"
          style={{
              gap: "clamp(2rem, 5vw + 1rem, 4rem)", // Responsive gap
          }}
        >
            {/* Content Side - Left on desktop, bottom on mobile */}
            <div className="w-full order-2 lg:order-1 flex flex-col justify-center">
            <Text
              size="body-sm"
              color="primary"
              className="font-semibold uppercase tracking-wider"
              style={{
                fontSize: "clamp(0.6875rem, 1.25vw + 0.2rem, 0.9375rem)", // Better scaling
                marginBottom: "clamp(0.75rem, 1.5vh, 1rem)", // Optimized spacing
                letterSpacing: "clamp(0.05em, 0.1vw, 0.15em)", // Responsive letter spacing
              }}
            >
              {ABOUT_CONTENT.label}
            </Text>

            <Heading
              as="h2"
              size="h2"
              className="text-shadow-theme"
              style={{
                fontSize: "clamp(1.75rem, 4.5vw + 0.75rem, 3.5rem)", // Better scaling across resolutions
                lineHeight: "1.15",
                letterSpacing: "clamp(-0.025em, -0.015vw, -0.01em)", // Responsive letter spacing
                marginBottom: "clamp(1rem, 2vh, 1.5rem)", // Optimized spacing
              }}
            >
              {ABOUT_CONTENT.title.prefix}
              {" "}
              <span
                style={{
                  backgroundImage: theme === "dark"
                    ? "linear-gradient(135deg, #60A5FA, #A78BFA, #22D3EE)"
                    : "linear-gradient(135deg, #1E40AF, #5B21B6, #0C4A6E)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  MozBackgroundClip: "text" as any,
                  MozTextFillColor: "transparent" as any,
                  boxDecorationBreak: "clone",
                  WebkitBoxDecorationBreak: "clone",
                  transition: "background-image 0.4s ease-in-out",
                }}
              >
                {ABOUT_CONTENT.title.highlight}
              </span>
            </Heading>

            <div 
              className="space-y-3 sm:space-y-4"
            style={{
                marginBottom: "clamp(1.25rem, 3vh, 2.5rem)", // Optimized spacing
              }}
            >
              {aboutData.description ? (
                <Text
                  size="body-lg"
                  color="primary"
                  className="leading-relaxed"
                  style={{
                    fontSize: "clamp(0.875rem, 1.5vw + 0.4rem, 1.25rem)", // Better scaling
                    lineHeight: 1.7, // Better readability
                    letterSpacing: "clamp(0.005em, 0.01vw, 0.015em)", // Responsive letter spacing
                    maxWidth: "100%",
                  }}
                >
                  {aboutData.description}
                </Text>
              ) : (
                ABOUT_CONTENT.paragraphs.map((paragraph, index) => (
                  <Text
                    key={index}
                  size={index === 0 ? "body-lg" : "body"}
                  color={index === 0 ? "primary" : "secondary"}
                  className="leading-relaxed"
                  style={{
                    fontSize: index === 0 
                        ? "clamp(0.875rem, 1.5vw + 0.4rem, 1.25rem)" // Better scaling
                        : "clamp(0.8125rem, 1.3vw + 0.3rem, 1.125rem)", // Better scaling
                      lineHeight: 1.7, // Better readability
                      letterSpacing: "clamp(0.005em, 0.01vw, 0.015em)", // Responsive letter spacing
                  }}
                  dangerouslySetInnerHTML={{ __html: paragraph }}
                />
                ))
              )}
            </div>

            {/* Highlights - Modern mobile layout */}
            <div 
              className="space-y-2 sm:space-y-3"
            style={{
                marginBottom: "clamp(1rem, 2.5vh, 2rem)", // Optimized spacing
              }}
            >
              {(aboutData.highlights.length > 0 ? aboutData.highlights : [
                { iconName: "Award" as keyof typeof iconMap, title: "AWS Certified", description: "Cloud expertise" },
                { iconName: "Code2" as keyof typeof iconMap, title: "Multi-Language", description: "Java, Python, JavaScript" },
                { iconName: "Cloud" as keyof typeof iconMap, title: "Cloud & DevOps", description: "AWS, CI/CD, Git" },
              ]).map((highlight, index) => {
                const IconComponent = iconMap[highlight.iconName];
                return (
                  <div
                    key={highlight.title}
                    className="flex items-start glass-base rounded-xl border border-border-primary/50 hover:border-border-primary/80 transition-all duration-300 p-3 sm:p-4"
                  >
                    <div 
                      className="rounded-lg bg-primary/10 text-fg-primary flex-shrink-0 p-2 sm:p-2.5"
                    >
                      <IconComponent 
                        className="w-5 h-5 sm:w-6 sm:h-6"
                      />
                    </div>
                    <div className="ml-3 sm:ml-4 flex-1 min-w-0">
                      <h4 
                        className="font-semibold text-fg-primary mb-1 sm:mb-1.5"
                        style={{
                          fontSize: "clamp(0.875rem, 2vw, 1rem)",
                        }}
                      >
                        {highlight.title}
                      </h4>
                      <p 
                        className="text-fg-secondary text-sm sm:text-base"
                        style={{
                          fontSize: "clamp(0.75rem, 1.5vw, 0.875rem)",
                          lineHeight: "1.5",
                        }}
                      >
                        {highlight.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA Button - Highly responsive across all resolutions */}
            <div className="w-full sm:w-auto">
              <Button
                size="lg"
                onClick={handleCTAClick}
                className="group transition-all duration-300 hover:opacity-90 active:scale-95 touch-manipulation w-full sm:w-auto flex items-center justify-center"
                style={{
                  fontSize: "clamp(0.8125rem, 1.5vw + 0.4rem, 1.125rem)", // Better scaling
                  paddingTop: "clamp(0.75rem, 1.75vh, 1.125rem)", // Optimized vertical padding
                  paddingBottom: "clamp(0.75rem, 1.75vh, 1.125rem)", // Optimized vertical padding
                  paddingLeft: "clamp(1.25rem, 3.5vw + 0.5rem, 2.75rem)", // Optimized horizontal padding
                  paddingRight: "clamp(1.25rem, 3.5vw + 0.5rem, 2.75rem)", // Optimized horizontal padding
                  minHeight: "clamp(2.75rem, 5.5vh, 3.5rem)", // Consistent button height
                  gap: "clamp(0.375rem, 0.75vw, 0.625rem)", // Responsive gap
                }}
              >
                <span>{ABOUT_CONTENT.ctaText}</span>
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
          </div>

            {/* Profile Image - Right on desktop, top on mobile - Clean Design */}
            <div className="w-full flex justify-center lg:justify-end order-1 lg:order-2">
              <div 
                className="relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-[380px] lg:max-w-[450px]"
                style={{
                  aspectRatio: "1 / 1",
                }}
              >
                <Image
                  src={aboutData.profileImage}
                  alt="Profile Picture"
                  fill
                  className="object-cover rounded-lg sm:rounded-xl"
                  sizes="(max-width: 640px) 280px, (max-width: 768px) 320px, (max-width: 1024px) 380px, 450px"
                  priority
                  style={{
                    objectFit: "cover",
                    filter: "brightness(1.02) contrast(1.05)",
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
        )}
      </Container>
    </section>
  );
}

