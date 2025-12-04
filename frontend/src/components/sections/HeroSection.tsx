/**
 * Hero Component - PREMIUM PROFESSIONAL DESIGN
 * Performance optimized, accessibility first, professional aesthetic
 * 
 * Phase 1 & 2 Enhancements:
 * - Constants extracted for easy maintenance
 * - Error handling and navigation guards
 * - Reduced motion support
 */

"use client";

import React, { useMemo, useRef, useState, useEffect } from "react";
import { Container, Button, AnimatedCounter } from "@/components/ui";
import { useRouter } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";
import { Download } from "lucide-react";
import {
  HERO_STATS,
  HERO_SOCIAL_LINKS,
  HERO_CTA_BUTTONS,
  HERO_CONTENT,
} from "@/constants/heroSection";
import { getPortfolioData } from "@/lib/adminData";
import { LiquidChrome } from "@/components/LiquidChrome";
import { heroHeadingFont, monoFont } from "@/styles/fonts";

export function HeroSection() {
  const router = useRouter();
  const { theme } = useTheme();
  const [isNavigating, setIsNavigating] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
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
      const loadHeroData = async () => {
        try {
          const data = await getPortfolioData();
          
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
      
      return () => {
        window.removeEventListener("portfolio-data-updated", handlePortfolioUpdate);
      };
    }
  }, []);
  
  // Main hero section ref
  const sectionRef = useRef<HTMLElement>(null);
  
  // Set mounted state on client side
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Check if mobile for responsive text
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 360);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  
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

  // Handle resume download
  const handleResumeDownload = () => {
    try {
      // Try to download resume from public folder
      const resumeUrl = "/RanjithREsume.pdf";
      const link = document.createElement("a");
      link.href = resumeUrl;
      link.download = "Ranjith_Eggadi_Resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading resume:", error);
      // Fallback: open in new tab
      window.open("/resume.pdf", "_blank");
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

  return (
    <section
      ref={sectionRef}
      className="relative flex items-center justify-center overflow-hidden bg-primary"
      style={{
        height: "100dvh", // Use dvh for better mobile support (accounts for browser chrome)
        maxHeight: "100dvh",
        minHeight: "100dvh",
        paddingTop: "clamp(4rem, 6vh + 2.5rem, 6.5rem)", // Optimized for all resolutions
        paddingBottom: "clamp(1rem, 2.5vh, 2rem)", // Optimized for all resolutions
        paddingLeft: "clamp(0.5rem, 2vw, 1rem)", // Side padding for very small screens
        paddingRight: "clamp(0.5rem, 2vw, 1rem)", // Side padding for very small screens
        transition: "background-color 0.3s ease-in-out, padding 0.3s ease-in-out",
        overflow: "hidden",
      }}
      suppressHydrationWarning
    >
      {/* LiquidChrome Background - Method 2: Multi-Palette Weighted Blending */}
      <div 
        className="absolute inset-0 w-full h-full" 
        style={{ 
          zIndex: 0,
          backgroundColor: 'transparent',
          pointerEvents: 'none'
        }}
      >
        <LiquidChrome
          key={`liquid-${theme}`}
          theme={theme}
          speed={1}
          amplitude={0.7}
          frequencyX={3}
          frequencyY={2}
          interactive={true}
        />
      </div>

      {/* Luxury vignette overlay - Black Gold Royal System */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{ 
          zIndex: 1,
          background: theme === "dark"
            ? "radial-gradient(ellipse 70% 50% at 50% 40%, rgba(0, 0, 0, 0.60) 0%, rgba(0, 0, 0, 0.80) 60%, rgba(0, 0, 0, 0.92) 100%)"
            : "radial-gradient(ellipse 70% 50% at 50% 40%, rgba(247, 247, 245, 0.40) 0%, rgba(247, 247, 245, 0.60) 60%, rgba(247, 247, 245, 0.75) 100%)",
          pointerEvents: "none",
          transition: "background 0.6s ease-in-out",
        }}
        suppressHydrationWarning
      />

      {/* Professional content container - Fits in one viewport */}
      <Container 
        size="lg" 
        className="relative z-10 w-full h-full flex items-center justify-center overflow-hidden"
        style={{
          paddingTop: 0,
          paddingBottom: 0,
          position: "relative",
          maxHeight: "100%",
        }}
      >
        <div
          className="w-full mx-auto h-full flex flex-col justify-center overflow-hidden"
          style={{
            maxWidth: "clamp(18rem, 90vw, 72rem)", // Wider range for better responsiveness
            paddingLeft: "clamp(0.75rem, 3vw, 2rem)", // Optimized padding for all resolutions
            paddingRight: "clamp(0.75rem, 3vw, 2rem)", // Optimized padding for all resolutions
            maxHeight: "calc(100dvh - clamp(4rem, 6vh + 2.5rem, 6.5rem) - clamp(1rem, 2.5vh, 2rem))",
            gap: "clamp(0.5rem, 1.5vh, 1rem)", // Consistent gap between elements
          }}
        >
          {/* Professional Main Headline - Highly responsive across all resolutions */}
          <div
            style={{
              marginBottom: "clamp(0.375rem, 1.25vh, 1rem)", // Optimized spacing
              flexShrink: 1,
              minHeight: 0,
            }}
          >
            <h1 
              suppressHydrationWarning
              className={`leading-[1.08] tracking-tight ${heroHeadingFont.className}`}
              style={{
                // Optimized for: very small phones (280px), small (320px), medium (375px), large (414px), tablets (768px), laptops (1024px), desktops (1440px+), ultrawide (2560px+)
                fontSize: "clamp(1.5rem, 3.5vw + 0.5rem, 4rem)", // Better scaling across all resolutions
                fontWeight: 700,
                letterSpacing: "clamp(-0.03em, -0.02vw, -0.02em)", // Responsive letter spacing
                color: "var(--hero-text-color)",
                textShadow: "var(--hero-text-shadow)",
                transition: "color 0.3s ease-in-out, text-shadow 0.3s ease-in-out, font-size 0.3s ease-in-out",
                wordBreak: "break-word",
                overflowWrap: "break-word",
                lineHeight: 1.1, // Fixed line height for consistency
              }}
            >
              <span
                className="block"
                style={{
                  marginBottom: "clamp(0.25rem, 0.75vh, 0.5rem)",
                }}
              >
                {heroData.title.line1}
              </span>
              <span
                className="block"
                style={{
                  lineHeight: "inherit",
                }}
              >
                <span 
                  suppressHydrationWarning
                  style={{ 
                    fontWeight: 400,
                    color: "var(--hero-text-color)",
                    transition: "color 0.3s ease-in-out",
                  }}
                >
                  {heroData.title.line2.prefix}
                </span>
                {" "}
                <span 
                  className="gradient-text"
                  suppressHydrationWarning
                  style={{ 
                    fontWeight: 700,
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
                  {heroData.title.line2.highlight}
                </span>
              </span>
            </h1>
          </div>

          {/* Professional Subheadline - Highly responsive across all resolutions */}
          <p
            style={{
              // Optimized font size for all screen sizes
              fontSize: "clamp(0.75rem, 1.2vw + 0.25rem, 1.125rem)", // Better scaling
              marginBottom: "clamp(0.625rem, 1.75vh, 1.5rem)", // Optimized spacing
              maxWidth: "clamp(18rem, 75vw, 42rem)", // Better width scaling
              letterSpacing: "clamp(0.005em, 0.01vw, 0.015em)", // Responsive letter spacing
              fontWeight: 400,
              lineHeight: 1.45, // Fixed line height for consistency
              color: theme === "dark" ? "rgba(255, 255, 255, 0.85)" : "rgba(0, 0, 0, 0.85)",
              textShadow: theme === "dark"
                ? "0 1px 10px rgba(0, 0, 0, 0.7)"
                : "0 1px 12px rgba(255, 255, 255, 1), 0 1px 3px rgba(0, 0, 0, 0.12)",
              transition: "color 0.4s ease-in-out, text-shadow 0.4s ease-in-out, font-size 0.3s ease-in-out",
              wordBreak: "break-word",
              overflowWrap: "break-word",
              flexShrink: 1,
              minHeight: 0,
              overflow: "hidden",
            }}
          >
            {heroData.description}
          </p>

          {/* Professional CTA Buttons - Highly responsive across all resolutions */}
          <div
            className="flex flex-row items-start"
            style={{
              gap: "clamp(0.375rem, 1vw, 1rem)", // Optimized gap for all resolutions
              marginBottom: "clamp(0.75rem, 2vh, 1.5rem)", // Optimized spacing
              flexShrink: 0,
              flexWrap: "nowrap",
              overflow: "hidden",
            }}
          >
            {HERO_CTA_BUTTONS.map((button, index) => (
              <Button
                key={button.text}
                size="lg"
                variant={button.variant}
                onClick={() => handleCTAClick(button.href)}
                disabled={isNavigating}
                className="transition-all duration-300 hover:opacity-90 touch-manipulation"
                suppressHydrationWarning
                style={{
                  paddingLeft: "clamp(0.5rem, 1.75vw, 1.75rem)", // Optimized for all resolutions
                  paddingRight: "clamp(0.5rem, 1.75vw, 1.75rem)", // Optimized for all resolutions
                  paddingTop: "clamp(0.5rem, 1.25vh, 0.75rem)", // Optimized vertical padding
                  paddingBottom: "clamp(0.5rem, 1.25vh, 0.75rem)", // Optimized vertical padding
                  fontSize: "clamp(0.6875rem, 0.9vw + 0.2rem, 1rem)", // Better scaling across resolutions
                  fontWeight: 500,
                  flex: "1 1 0",
                  minWidth: 0,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  minHeight: "clamp(2.25rem, 5vh, 2.75rem)", // Consistent button height
                  ...(isMounted && button.variant === "primary"
                    ? {
                        background: theme === "dark"
                          ? "linear-gradient(135deg, rgba(96,165,250,0.1), rgba(167,139,250,0.1))"
                          : "linear-gradient(135deg, rgba(59,130,246,0.08), rgba(139,92,246,0.08))",
                        border: theme === "dark"
                          ? "1px solid rgba(96,165,250,0.2)"
                          : "1px solid rgba(59,130,246,0.2)",
                        color: theme === "dark" ? "rgba(96,165,250,0.9)" : "rgba(59,130,246,0.9)",
                        transition: "background 0.4s ease-in-out, border-color 0.4s ease-in-out, color 0.4s ease-in-out",
                      }
                    : isMounted && {
                        borderColor: theme === "dark" ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)",
                        transition: "border-color 0.4s ease-in-out",
                      }),
                  borderRadius: "0.375rem",
                }}
              >
                {button.text}
              </Button>
            ))}
            {/* Download Resume Button - Mobile responsive */}
            <Button
              size="lg"
              variant="secondary"
              onClick={handleResumeDownload}
              className="transition-all duration-300 hover:opacity-90 touch-manipulation"
              suppressHydrationWarning
              style={{
                paddingLeft: "clamp(0.5rem, 1.5vw, 1.75rem)", // Optimized for all resolutions
                paddingRight: "clamp(0.5rem, 1.5vw, 1.75rem)", // Optimized for all resolutions
                paddingTop: "clamp(0.5rem, 1.25vh, 0.75rem)", // Optimized vertical padding
                paddingBottom: "clamp(0.5rem, 1.25vh, 0.75rem)", // Optimized vertical padding
                fontSize: "clamp(0.6875rem, 0.9vw + 0.2rem, 1rem)", // Better scaling across resolutions
                fontWeight: 500,
                flex: "1 1 0", // Equal flex with other buttons
                minWidth: 0,
                maxWidth: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "clamp(0.25rem, 0.5vw, 0.625rem)", // Optimized gap
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                minHeight: "clamp(2.25rem, 5vh, 2.75rem)", // Consistent button height
                ...(isMounted && {
                  borderColor: theme === "dark" ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)",
                  transition: "border-color 0.4s ease-in-out",
                }),
                borderRadius: "0.375rem",
              }}
            >
              <Download 
                className="flex-shrink-0" 
                style={{ 
                  width: "clamp(12px, 1.25vw, 18px)", // Better icon scaling
                  height: "clamp(12px, 1.25vw, 18px)", // Better icon scaling
                  minWidth: "12px",
                }} 
              />
              <span 
                style={{ 
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: isMobile ? "none" : "inline",
                }}
              >
                Resume
              </span>
            </Button>
          </div>

          {/* Professional Stats Display - Highly responsive across all resolutions */}
          <div
            className="flex items-center border-t border-b justify-between"
            style={{
              gap: "clamp(0.5rem, 2vw, 2rem)", // Optimized gap for all resolutions
              paddingTop: "clamp(0.625rem, 1.5vh, 1.25rem)", // Optimized padding
              paddingBottom: "clamp(0.625rem, 1.5vh, 1.25rem)", // Optimized padding
              paddingLeft: "clamp(0rem, 1vw, 0.5rem)", // Small side padding for very small screens
              paddingRight: "clamp(0rem, 1vw, 0.5rem)", // Small side padding for very small screens
              borderColor: theme === "dark" ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.08)",
              transition: "border-color 0.4s ease-in-out",
              flexShrink: 0,
              flexWrap: "nowrap",
              overflow: "hidden",
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
                    className="flex-shrink-0"
                    style={{
                      width: "1px",
                      height: "clamp(1.25rem, 3vh, 3rem)", // Better height scaling
                      backgroundColor: isMounted 
                        ? (theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)")
                        : "rgba(255, 255, 255, 0.1)",
                      transition: "background-color 0.4s ease-in-out",
                    }}
                  />
                )}
                <div className="text-left flex-1" style={{ minWidth: 0 }}>
                  <div 
                    className="font-bold"
                    style={{
                      fontSize: "clamp(1.25rem, 3vw + 0.4rem, 2.25rem)", // Better scaling across resolutions
                      marginBottom: "clamp(0.125rem, 0.35vh, 0.375rem)", // Optimized spacing
                      fontWeight: 700,
                      letterSpacing: "clamp(-0.025em, -0.015vw, -0.015em)", // Responsive letter spacing
                      lineHeight: 1.1, // Fixed line height for consistency
                      color: theme === "dark" ? "#FFFFFF" : "#000000",
                      textShadow: theme === "dark"
                        ? "0 1px 20px rgba(0, 0, 0, 0.8)"
                        : "0 2px 20px rgba(255, 255, 255, 1), 0 1px 3px rgba(0, 0, 0, 0.15)",
                      transition: "color 0.4s ease-in-out, text-shadow 0.4s ease-in-out, font-size 0.3s ease-in-out",
                    }}
                  >
                    <AnimatedCounter 
                      key={`counter-${stat.label}-${numValue}-${suffixValue}`}
                      value={numValue}
                      suffix={suffixValue}
                      duration={2}
                      className={monoFont.className}
                    />
                  </div>
                  <div 
                    className="text-fg-tertiary"
                    style={{
                      fontSize: "clamp(0.625rem, 1vw + 0.2rem, 0.875rem)", // Better scaling
                      fontWeight: 400,
                      letterSpacing: "clamp(0.01em, 0.015vw, 0.02em)", // Responsive letter spacing
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

          {/* Professional Social Links - Highly responsive across all resolutions */}
          <div
            className="flex flex-wrap"
            style={{
              gap: "clamp(0.875rem, 2.5vw, 2rem)", // Optimized gap for all resolutions
              marginTop: "clamp(0.75rem, 2vh, 1.75rem)", // Optimized spacing
              flexShrink: 0,
            }}
          >
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => handleSocialClick(link.href, e)}
                className="hover:opacity-80 transition-opacity duration-300 touch-manipulation"
                style={{
                  fontSize: "clamp(0.6875rem, 1vw + 0.2rem, 0.9375rem)", // Better scaling across resolutions
                  fontWeight: 500,
                  letterSpacing: "clamp(0.015em, 0.02vw, 0.025em)", // Responsive letter spacing
                  textTransform: "uppercase",
                  color: theme === "dark" ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.7)",
                  textShadow: theme === "dark"
                    ? "0 1px 8px rgba(0, 0, 0, 0.6)"
                    : "0 1px 12px rgba(255, 255, 255, 1)",
                  transition: "color 0.4s ease-in-out, text-shadow 0.4s ease-in-out, font-size 0.3s ease-in-out",
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

