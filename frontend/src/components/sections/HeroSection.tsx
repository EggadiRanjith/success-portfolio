/**
 * Hero Component - PREMIUM PROFESSIONAL DESIGN WITH GSAP
 * Best practices: GSAP animations, CSS-first approach, ScrollTrigger
 * Performance optimized, accessibility first, professional aesthetic
 * 
 * Phase 1 & 2 Enhancements:
 * - Constants extracted for easy maintenance
 * - Lazy-loading for below-fold content (stats & social links)
 * - Error handling and navigation guards
 * - Reduced motion support
 * - GSAP premium animations
 */

"use client";

import React, { useMemo, useRef, useState, useEffect } from "react";
import { Container, Button, AnimatedCounter } from "@/components/ui";
import { useRouter } from "next/navigation";
import { useReducedMotion } from "framer-motion";
import { useTheme } from "@/hooks/use-theme";
import {
  HERO_STATS,
  HERO_SOCIAL_LINKS,
  HERO_CTA_BUTTONS,
  HERO_CONTENT,
} from "@/constants/heroSection";
import { getPortfolioData } from "@/lib/adminData";
import { motion as framerMotion } from "framer-motion";
import {
  animateFadeInUp,
  animateStagger,
  animateScrollFadeIn,
  animateCounter,
  animateMagneticButton,
  cleanupGSAP,
  prefersReducedMotion as checkReducedMotion,
} from "@/lib/gsapAnimations";

export function HeroSection() {
  const router = useRouter();
  const { theme } = useTheme();
  const prefersReducedMotion = useReducedMotion();
  const [isNavigating, setIsNavigating] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  // Load hero data from admin
  const [heroData, setHeroData] = useState({
    title: HERO_CONTENT.title,
    description: HERO_CONTENT.description,
  });

  // Load stats from main stats form
  const [heroStats, setHeroStats] = useState<Array<{ label: string; value: string }>>([
    { label: "Production APIs", value: "10+" },
    { label: "Years Experience", value: "3+" },
    { label: "Cloud Deployments", value: "5+" },
  ]);

  // Load social links from personalInfo
  const [socialLinks, setSocialLinks] = useState(HERO_SOCIAL_LINKS);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const loadHeroData = () => {
        try {
          const data = getPortfolioData();
          
          // Load hero title and description
          if (data?.hero && data.hero.title && data.hero.title.line1) {
            setHeroData({
              title: data.hero.title,
              description: data.hero.description || HERO_CONTENT.description,
            });
          }
          
          // Always load stats from admin data - force load from data.stats
          if (data?.stats) {
            const productionAPIs = String(data.stats.productionAPIs || "10+");
            const yearsExperience = String(data.stats.yearsExperience || "3+");
            const cloudDeployments = String(data.stats.cloudDeployments || "5+");
            
            const statsFromAdmin = [
              { 
                label: "Production APIs", 
                value: productionAPIs
              },
              { 
                label: "Years Experience", 
                value: yearsExperience
              },
              { 
                label: "Cloud Deployments", 
                value: cloudDeployments
              },
            ];
            
            // Force update by creating new array reference
            setHeroStats([...statsFromAdmin]);
          } else {
            setHeroStats([...HERO_STATS]);
          }
          
          // Use social links from personalInfo
          if (data?.personalInfo?.links) {
            const links = [];
            if (data.personalInfo.links.github) {
              links.push({ href: data.personalInfo.links.github, label: "GitHub" });
            }
            if (data.personalInfo.links.linkedin) {
              links.push({ href: data.personalInfo.links.linkedin, label: "LinkedIn" });
            }
            if (data.personalInfo.links.leetcode) {
              links.push({ href: data.personalInfo.links.leetcode, label: "LeetCode" });
            }
            if (links.length > 0) {
              setSocialLinks(links);
            }
          }
        } catch (error) {
          // Keep default values on error
        }
      };
      
      loadHeroData();
      
      // Listen for updates
      const handlePortfolioUpdate = () => {
        loadHeroData();
      };
      
      window.addEventListener("portfolio-data-updated", handlePortfolioUpdate);
      
      // Listen for storage events (cross-tab updates)
      const handleStorageChange = (e: StorageEvent) => {
        if (e.key === "portfolio_admin_data" || e.key === null) {
          loadHeroData();
        }
      };
      window.addEventListener("storage", handleStorageChange);
      
      return () => {
        window.removeEventListener("portfolio-data-updated", handlePortfolioUpdate);
        window.removeEventListener("storage", handleStorageChange);
      };
    }
  }, []);
  
  // Main hero section ref (above fold)
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaContainerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  
  // Lazy-load refs for below-fold content
  const statsRef = useRef<HTMLDivElement>(null);
  const statValueRefs = useRef<(HTMLDivElement | null)[]>([]);
  const socialRef = useRef<HTMLDivElement>(null);
  
  // Track if animations have been initialized
  const animationsInitializedRef = useRef(false);
  
  // Initialize GSAP animations - Wait for page fully loaded
  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return;
    
    // Prevent re-triggering
    if (animationsInitializedRef.current) return;
    
    setIsMounted(true);
    
    if (prefersReducedMotion || checkReducedMotion()) {
      // Set all elements to visible state immediately
      if (line1Ref.current) line1Ref.current.style.opacity = "1";
      if (line2Ref.current) line2Ref.current.style.opacity = "1";
      if (subheadlineRef.current) subheadlineRef.current.style.opacity = "1";
      if (ctaContainerRef.current) ctaContainerRef.current.style.opacity = "1";
      return;
    }
    
    const cleanupFunctions: Array<() => void> = [];
    
    // Wait for page to fully load before starting animations
    const startAnimations = () => {
      // Prevent re-triggering
      if (animationsInitializedRef.current) return;
      animationsInitializedRef.current = true;
      // Ensure all refs are ready
      if (!line1Ref.current || !line2Ref.current || !subheadlineRef.current || !ctaContainerRef.current) {
        return;
      }

      // Premium headline animation - Luxury timing
      if (line1Ref.current) {
        animateFadeInUp(line1Ref.current, { 
          delay: 0.3, 
          duration: 1.6,
          y: 60 
        });
      }
      
      if (line2Ref.current) {
        animateFadeInUp(line2Ref.current, { 
          delay: 0.6, 
          duration: 1.6,
          y: 60 
        });
      }
      
      // Premium subheadline - Refined timing
      if (subheadlineRef.current) {
        animateFadeInUp(subheadlineRef.current, { 
          delay: 1.0, 
          duration: 1.4, 
          y: 50 
        });
      }
      
      // Premium CTA buttons - Luxury stagger
      if (ctaContainerRef.current && buttonRefs.current.length > 0) {
        const buttons = buttonRefs.current.filter(Boolean) as HTMLElement[];
        if (buttons.length > 0) {
          animateStagger(buttons, { 
            delay: 1.4, 
            duration: 1.3, 
            stagger: 0.2,
            y: 40 
          });
          
          // Add magnetic effect to primary button after animation completes
          setTimeout(() => {
            if (buttons[0]) {
              const cleanup = animateMagneticButton(buttons[0]);
              if (cleanup) cleanupFunctions.push(cleanup);
            }
          }, 2800);
        }
      }
      
      // Scroll-triggered animations for stats - Premium timing
      if (statsRef.current) {
        const cleanup = animateScrollFadeIn(statsRef.current, {
          start: "top 75%",
          end: "top 45%",
          y: 60,
        });
        if (cleanup) cleanupFunctions.push(cleanup);
        
        // Animate stat counters - Wait for element to be visible
        const counterTimeout = setTimeout(() => {
          statValueRefs.current.forEach((ref, index) => {
            if (ref && ref.textContent) {
              animateCounter(ref, ref.textContent || "", {
                delay: index * 0.25,
                duration: 2.2,
              });
            }
          });
        }, 1500);
        
        cleanupFunctions.push(() => clearTimeout(counterTimeout));
      }
      
      // Scroll-triggered animations for social links - Premium timing
      if (socialRef.current) {
        const cleanup = animateScrollFadeIn(socialRef.current, {
          start: "top 80%",
          end: "top 55%",
          y: 50,
        });
        if (cleanup) cleanupFunctions.push(cleanup);
      }
    };

    // Wait for page to be fully loaded
    if (document.readyState === "complete") {
      // Page already loaded, wait a bit for fonts and images
      setTimeout(startAnimations, 300);
    } else {
      // Wait for load event
      window.addEventListener("load", () => {
        setTimeout(startAnimations, 300);
      }, { once: true });
    }
    
    return () => {
      cleanupGSAP(cleanupFunctions);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount
  
  // Error handling for navigation
  const handleCTAClick = async (href: string) => {
    try {
      setIsNavigating(true);
      
      // Verify href is valid
      if (!href || !href.startsWith("/")) {
        return;
      }
      
      // Navigate
      await router.push(href);
    } catch (error) {
      // Navigation failed silently
      
      // Fallback: Open in same tab
      if (typeof window !== "undefined") {
        window.location.href = href;
      }
    } finally {
      setIsNavigating(false);
    }
  };
  
  // Error handling for social links
  const handleSocialClick = (url: string, e: React.MouseEvent<HTMLAnchorElement>) => {
    try {
      // Verify URL is valid
      new URL(url);
      // Link will open naturally, but we can add analytics here if needed
    } catch (error) {
      e.preventDefault();
    }
  };

  // Optimized: Animated background gradients using CSS
  const backgroundGradient = useMemo(() => {
    // Use default dark theme during SSR to prevent hydration mismatch
    const currentTheme = isMounted ? theme : "dark";
    if (currentTheme === "dark") {
      return {
        background: `
          linear-gradient(-45deg, rgba(96,165,250,0.08), rgba(167,139,250,0.08), rgba(34,211,238,0.06), rgba(96,165,250,0.08)),
          var(--color-bg-primary)
        `,
      };
    }
    return {
      background: `
        linear-gradient(-45deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1), rgba(6,182,212,0.08), rgba(59,130,246,0.1)),
        var(--color-bg-primary)
      `,
    };
  }, [theme, isMounted]);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen flex items-center justify-center overflow-hidden gradient-animated"
      style={backgroundGradient}
      suppressHydrationWarning
    >
      {/* Professional content container - Fits in one viewport */}
      <Container 
        size="lg" 
        className="relative z-10 w-full h-full flex items-center justify-center"
        style={{
          paddingTop: "clamp(4.5rem, 7vh + 2.5rem, 5.5rem)", // Header spacing
          paddingBottom: "clamp(1.5rem, 3vh, 2rem)",
        }}
      >
        <div
          className="w-full mx-auto"
          style={{
            maxWidth: "clamp(20rem, 82vw, 60rem)",
            paddingLeft: "clamp(1rem, 3.5vw, 1.75rem)",
            paddingRight: "clamp(1rem, 3.5vw, 1.75rem)",
          }}
        >
          {/* Professional Main Headline - GSAP Premium Animation */}
          <div
            ref={headlineRef}
            style={{
              marginBottom: "clamp(0.875rem, 2vh, 1.25rem)",
            }}
          >
            <h1 
              className="leading-[1.08] tracking-tight text-fg-primary"
              style={{
                fontSize: "clamp(2rem, 5vw + 0.75rem, 4.5rem)",
                fontWeight: 700,
                letterSpacing: "-0.025em",
              }}
            >
              <span
                ref={line1Ref}
                className="block"
                style={{
                  marginBottom: "clamp(0.25rem, 0.75vh, 0.5rem)",
                }}
              >
                {heroData.title.line1}
              </span>
              <span
                ref={line2Ref}
                className="block"
              >
                <span className="text-fg-primary" style={{ fontWeight: 400 }}>{heroData.title.line2.prefix}</span>
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 dark:from-blue-400 dark:via-purple-400 dark:to-cyan-400 bg-clip-text text-transparent" style={{ fontWeight: 700 }}>
                  {heroData.title.line2.highlight}
                </span>
              </span>
            </h1>
          </div>

          {/* Professional Subheadline - GSAP Premium Animation */}
          <p
            ref={subheadlineRef}
            className="text-fg-secondary"
            style={{
              fontSize: "clamp(0.875rem, 1.5vw + 0.25rem, 1.125rem)",
              marginBottom: "clamp(1.25rem, 3vh, 2rem)",
              maxWidth: "clamp(20rem, 68vw, 38rem)",
              letterSpacing: "0.01em",
              fontWeight: 400,
              lineHeight: 1.65,
            }}
          >
            {heroData.description}
          </p>

          {/* Professional CTA Buttons - GSAP Premium Animation */}
          <div
            ref={ctaContainerRef}
            className="flex flex-col sm:flex-row items-start"
            style={{
              gap: "clamp(0.75rem, 1.75vw, 1rem)",
              marginBottom: "clamp(1.25rem, 3vh, 2rem)",
            }}
          >
            {HERO_CTA_BUTTONS.map((button, index) => (
              <Button
                key={button.text}
                ref={(el) => {
                  buttonRefs.current[index] = el;
                }}
                size="lg"
                variant={button.variant}
                onClick={() => handleCTAClick(button.href)}
                disabled={isNavigating}
                className="transition-all duration-300 hover:opacity-90"
                suppressHydrationWarning
                style={{
                  paddingLeft: "clamp(1.25rem, 3.5vw, 1.875rem)",
                  paddingRight: "clamp(1.25rem, 3.5vw, 1.875rem)",
                  paddingTop: "clamp(0.5rem, 1.25vh, 0.75rem)",
                  paddingBottom: "clamp(0.5rem, 1.25vh, 0.75rem)",
                  fontSize: "clamp(0.8125rem, 1.25vw + 0.125rem, 0.9375rem)",
                  fontWeight: 500,
                  ...(isMounted && button.variant === "primary"
                    ? {
                        background: theme === "dark"
                          ? "linear-gradient(135deg, rgba(96,165,250,0.1), rgba(167,139,250,0.1))"
                          : "linear-gradient(135deg, rgba(59,130,246,0.08), rgba(139,92,246,0.08))",
                        border: theme === "dark"
                          ? "1px solid rgba(96,165,250,0.2)"
                          : "1px solid rgba(59,130,246,0.2)",
                        color: theme === "dark" ? "rgba(96,165,250,0.9)" : "rgba(59,130,246,0.9)",
                      }
                    : isMounted && {
                        borderColor: theme === "dark" ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)",
                      }),
                  borderRadius: "0.375rem",
                }}
              >
                {button.text}
              </Button>
            ))}
          </div>

          {/* Professional Stats Display - GSAP Scroll-Triggered Animation */}
          <div
            ref={statsRef}
            className="inline-flex items-center border-t border-b"
            style={{
              gap: "clamp(1.75rem, 4.5vw, 2.5rem)",
              paddingTop: "clamp(0.875rem, 2vh, 1.25rem)",
              paddingBottom: "clamp(0.875rem, 2vh, 1.25rem)",
              paddingLeft: 0,
              paddingRight: 0,
              borderColor: theme === "dark" ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.08)",
              opacity: prefersReducedMotion ? 1 : 0,
            }}
          >
          {heroStats.length > 0 ? heroStats.map((stat, index) => {
            const numValue = parseInt(stat.value.replace(/[^0-9]/g, '')) || 0;
            const suffixValue = stat.value.replace(/\d+/g, '');
            
            return (
              <React.Fragment key={`${stat.label}-${stat.value}-${index}`}>
                {index > 0 && (
                  <div 
                    suppressHydrationWarning
                    style={{
                      width: "1px",
                      height: "clamp(1.75rem, 4vh, 2.5rem)",
                      backgroundColor: isMounted 
                        ? (theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)")
                        : "rgba(255, 255, 255, 0.1)", // Default to dark during SSR
                    }}
                  />
                )}
                <div className="text-left">
                  <div 
                    ref={(el) => {
                      statValueRefs.current[index] = el;
                    }}
                    className="font-bold text-fg-primary"
                    style={{
                      fontSize: "clamp(1.625rem, 4vw + 0.25rem, 2.5rem)",
                      marginBottom: "clamp(0.1875rem, 0.4vh, 0.375rem)",
                      fontWeight: 700,
                      letterSpacing: "-0.02em",
                      lineHeight: 1.1,
                    }}
                  >
                    <AnimatedCounter 
                      key={`counter-${stat.label}-${numValue}-${suffixValue}`}
                      value={numValue}
                      suffix={suffixValue}
                      duration={2}
                    />
                  </div>
                  <div 
                    className="text-fg-tertiary"
                    style={{
                      fontSize: "clamp(0.6875rem, 1.1vw + 0.125rem, 0.875rem)",
                      fontWeight: 400,
                      letterSpacing: "0.015em",
                      textTransform: "uppercase",
                      opacity: 0.65,
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              </React.Fragment>
            );
          }) : null}
          </div>

          {/* Professional Social Links - GSAP Scroll-Triggered Animation */}
          <div
            ref={socialRef}
            className="flex"
            style={{
              gap: "clamp(1.25rem, 3.5vw, 2rem)",
              marginTop: "clamp(1.25rem, 3vh, 2rem)",
              opacity: prefersReducedMotion ? 1 : 0,
            }}
          >
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => handleSocialClick(link.href, e)}
                className="text-fg-secondary hover:text-fg-primary transition-colors duration-300"
                style={{
                  fontSize: "clamp(0.75rem, 1.25vw + 0.125rem, 0.875rem)",
                  fontWeight: 500,
                  letterSpacing: "0.02em",
                  textTransform: "uppercase",
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

