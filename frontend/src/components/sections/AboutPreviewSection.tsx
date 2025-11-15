/**
 * About Preview Component - PREMIUM GSAP ANIMATIONS
 * Professional animations with lazy-loading and error handling
 */

"use client";

import React, { useRef, useEffect, useState } from "react";
import { Container, Heading, Text, Button } from "@/components/ui";
import { useRouter } from "next/navigation";
import { useReducedMotion } from "framer-motion";
import { ArrowRight, Award, Code2, Cloud } from "lucide-react";
import {
  ABOUT_CONTENT,
} from "@/constants/aboutPreview";
import {
  animateFadeInUp,
  animateStagger,
  animateScrollFadeIn,
  animateCounter,
  cleanupGSAP,
  prefersReducedMotion as checkReducedMotion,
} from "@/lib/gsapAnimations";
import { getPortfolioData } from "@/lib/adminData";

// Icon mapping
const iconMap = {
  Award: Award,
  Code2: Code2,
  Cloud: Cloud,
};

export function AboutPreviewSection() {
  const router = useRouter();
  const prefersReducedMotion = useReducedMotion();
  const [isMounted, setIsMounted] = useState(false);
  const [aboutData, setAboutData] = useState({
    description: "",
    stats: [] as Array<{ label: string; value: string }>,
    highlights: [] as Array<{ iconName: keyof typeof iconMap; title: string; description: string }>,
  });
  
  // Refs for GSAP animations - Content side
  const sectionRef = useRef<HTMLElement>(null);
  const contentSideRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const paragraphRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const highlightRefs = useRef<(HTMLDivElement | null)[]>([]);
  const ctaRef = useRef<HTMLDivElement>(null);
  
  // Refs for GSAP animations - Stats side
  const statsSideRef = useRef<HTMLDivElement>(null);
  const statCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const statValueRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Load about data from admin
  useEffect(() => {
    if (typeof window === "undefined") return;

    const loadAboutData = () => {
      try {
        const data = getPortfolioData();
        
        // Get description from personalInfo
        const description = data?.personalInfo?.description || "";
        
        // Get stats from admin data
        const stats = [
          {
            label: "Production APIs",
            value: data?.stats?.productionAPIs || "10+",
          },
          {
            label: "Years Experience",
            value: data?.stats?.yearsExperience || "3+",
          },
          {
            label: "Cloud Deployments",
            value: data?.stats?.cloudDeployments || "5+",
          },
        ];

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

        setAboutData({ description, stats, highlights });
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
      // Content side animations
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

      // Paragraphs stagger
      setTimeout(() => {
        const paragraphs = paragraphRefs.current.filter(Boolean) as HTMLElement[];
        if (paragraphs.length > 0) {
          animateStagger(paragraphs, {
            delay: 0.2,
            duration: 1.3,
            stagger: 0.15,
            y: 40,
          });
        }
      }, 800);

      // Highlights stagger - Scroll-triggered
      setTimeout(() => {
        const highlights = highlightRefs.current.filter(Boolean) as HTMLElement[];
        if (highlights.length > 0) {
          const cleanup = animateScrollFadeIn(highlights[0]?.parentElement || null, {
            start: "top 80%",
            end: "top 55%",
            y: 50,
          });
          if (cleanup) cleanupFunctions.push(cleanup);

          animateStagger(highlights, {
            delay: 0.3,
            duration: 1.2,
            stagger: 0.12,
            y: 40,
          });
        }
      }, 1000);

      // CTA button - Scroll-triggered
      if (ctaRef.current) {
        const cleanup = animateScrollFadeIn(ctaRef.current, {
          start: "top 85%",
          end: "top 60%",
          y: 40,
        });
        if (cleanup) cleanupFunctions.push(cleanup);
      }

      // Stats side - Scroll-triggered
      if (statsSideRef.current) {
        const cleanup = animateScrollFadeIn(statsSideRef.current, {
          start: "top 75%",
          end: "top 45%",
          y: 60,
        });
        if (cleanup) cleanupFunctions.push(cleanup);

        // Stagger stat cards
        setTimeout(() => {
          const cards = statCardRefs.current.filter(Boolean) as HTMLElement[];
          if (cards.length > 0) {
            animateStagger(cards, {
              delay: 0.2,
              duration: 1.2,
              stagger: 0.15,
              y: 50,
            });
          }

          // Animate stat counters
          statValueRefs.current.forEach((ref, index) => {
            if (ref && ref.textContent) {
              setTimeout(() => {
                animateCounter(ref, ref.textContent || "", {
                  delay: index * 0.2,
                  duration: 2.2,
                });
              }, 500);
            }
          });
        }, 600);
      }
    };

    // Wait for page to be fully loaded
    if (document.readyState === "complete") {
      setTimeout(startAnimations, 500);
    } else {
      window.addEventListener("load", () => {
        setTimeout(startAnimations, 500);
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
      className="relative overflow-hidden"
      style={{
        paddingTop: "clamp(1.5rem, 3vh + 0.5rem, 2.5rem)",
        paddingBottom: "clamp(1.5rem, 3vh + 0.5rem, 2.5rem)",
      }}
    >
      {/* Background gradient orbs - Responsive sizing */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-1/3 -right-1/4 bg-cyan-500/20 dark:bg-cyan-400/10 rounded-full blur-3xl"
          style={{
            width: "clamp(12rem, 30vw, 24rem)",
            height: "clamp(12rem, 30vw, 24rem)",
          }}
        />
        <div 
          className="absolute bottom-1/3 -left-1/4 bg-blue-500/20 dark:bg-blue-400/10 rounded-full blur-3xl"
          style={{
            width: "clamp(12rem, 30vw, 24rem)",
            height: "clamp(12rem, 30vw, 24rem)",
          }}
        />
      </div>

      <Container size="lg" className="relative z-10">
        <div 
          className="grid lg:grid-cols-2 items-center"
          style={{
            gap: "clamp(1rem, 3vw + 0.5rem, 2rem)",
          }}
        >
          {/* Content Side */}
          <div ref={contentSideRef}>
            <Text
              ref={labelRef}
              size="body-sm"
              color="primary"
              className="font-semibold uppercase tracking-wider"
              style={{
                marginBottom: "clamp(0.5rem, 1.5vh, 0.75rem)",
                fontSize: "clamp(0.75rem, 1vw + 0.5rem, 0.875rem)",
              }}
            >
              {ABOUT_CONTENT.label}
            </Text>

            <Heading
              ref={titleRef}
              as="h2"
              size="h2"
              className="dark:[text-shadow:0_2px_30px_rgba(255,255,255,0.1)]"
              style={{ 
                textShadow: "0 2px 30px rgba(0,0,0,0.2)",
                marginBottom: "clamp(0.75rem, 2vh, 1.25rem)",
                fontSize: "clamp(1.75rem, 4vw + 0.5rem, 3rem)",
                lineHeight: "1.2",
              }}
            >
              {ABOUT_CONTENT.title.prefix}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 dark:from-blue-400 dark:via-purple-400 dark:to-cyan-400 bg-clip-text text-transparent">
                {ABOUT_CONTENT.title.highlight}
              </span>
            </Heading>

            <div 
            className="mb-4"
            style={{
              gap: "clamp(0.5rem, 1.5vh, 1rem)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {aboutData.description ? (
                <Text
                  ref={(el) => {
                    paragraphRefs.current[0] = el;
                  }}
                  size="body-lg"
                  color="primary"
                  className="leading-relaxed"
                  style={{
                    fontSize: "clamp(1rem, 1.8vw + 0.5rem, 1.125rem)",
                    lineHeight: "1.7",
                  }}
                >
                  {aboutData.description}
                </Text>
              ) : (
                ABOUT_CONTENT.paragraphs.map((paragraph, index) => (
                  <Text
                    key={index}
                    ref={(el) => {
                      paragraphRefs.current[index] = el;
                  }}
                  size={index === 0 ? "body-lg" : "body"}
                  color={index === 0 ? "primary" : "secondary"}
                  className="leading-relaxed"
                  style={{
                    fontSize: index === 0 
                      ? "clamp(1rem, 1.8vw + 0.5rem, 1.125rem)"
                      : "clamp(0.875rem, 1.5vw + 0.5rem, 1rem)",
                    lineHeight: "1.7",
                  }}
                  dangerouslySetInnerHTML={{ __html: paragraph }}
                />
                ))
              )}
            </div>

            {/* Highlights - Professional mobile layout */}
            <div 
            className="mb-4"
            style={{
              gap: "clamp(0.375rem, 1.25vh, 0.625rem)",
                display: "flex",
                flexDirection: "column",
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
                    ref={(el) => {
                      highlightRefs.current[index] = el;
                    }}
                    className="flex items-start glass-base rounded-xl border border-border-primary/50"
                    style={{
                      gap: "clamp(0.75rem, 2vw, 1rem)",
                      padding: "clamp(0.875rem, 2vw, 1rem)",
                    }}
                  >
                    <div 
                      className="rounded-lg bg-primary/10 text-fg-primary flex-shrink-0"
                      style={{
                        padding: "clamp(0.5rem, 1.5vw, 0.625rem)",
                      }}
                    >
                      <IconComponent 
                        style={{
                          width: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                          height: "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
                        }}
                      />
                    </div>
                    <div>
                      <h4 
                        className="font-semibold text-fg-primary"
                        style={{
                          marginBottom: "clamp(0.25rem, 0.5vh, 0.375rem)",
                          fontSize: "clamp(0.875rem, 1.5vw + 0.5rem, 1rem)",
                        }}
                      >
                        {highlight.title}
                      </h4>
                      <p 
                        className="text-fg-secondary"
                        style={{
                          fontSize: "clamp(0.75rem, 1.2vw + 0.5rem, 0.875rem)",
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

            {/* CTA Button - Professional mobile sizing */}
            <div ref={ctaRef}>
              <Button
                size="lg"
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
                {ABOUT_CONTENT.ctaText}
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
          </div>

          {/* Stats Side - Professional responsive grid */}
          <div ref={statsSideRef} className="relative">
            {/* Stats Cards - Mobile-first responsive */}
            <div 
              className="grid grid-cols-2 sm:grid-cols-2"
              style={{
                gap: "clamp(0.75rem, 3vw, 1.5rem)",
              }}
            >
              {aboutData.stats.map((stat, index) => (
                <div
                  key={stat.label}
                  ref={(el) => {
                    statCardRefs.current[index] = el;
                  }}
                  className="glass-card rounded-2xl border-2 border-border-primary/50 hover:border-border-primary hover:shadow-xl transition-all duration-500 active:scale-95 touch-manipulation"
                  style={{
                    padding: "clamp(1.25rem, 3vw + 0.75rem, 2rem)",
                  }}
                >
                  <div
                    ref={(el) => {
                      statValueRefs.current[index] = el;
                    }}
                    className="font-bold text-fg-primary"
                    style={{
                      fontSize: "clamp(1.75rem, 4vw + 0.75rem, 2.25rem)",
                      marginBottom: "clamp(0.375rem, 1vh, 0.5rem)",
                      lineHeight: "1.2",
                    }}
                  >
                    {stat.value}
                  </div>
                  <div 
                    className="text-fg-secondary"
                    style={{
                      fontSize: "clamp(0.75rem, 1.2vw + 0.5rem, 0.875rem)",
                      lineHeight: "1.4",
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Decorative element - Static (no animation for performance) */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-400/5 dark:to-purple-400/5 rounded-full blur-3xl" />
          </div>
        </div>
      </Container>
    </section>
  );
}

