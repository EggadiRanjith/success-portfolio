"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui";
import { cn } from "@/lib/utils";
import { ArrowUpRight, ExternalLink, Github } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

// Detect mobile device
function isMobileDevice(): boolean {
  if (typeof window === "undefined") return false;
  return window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

export interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  href: string;
  featured?: boolean;
  index?: number;
  category?: string;
  year?: string;
  githubUrl?: string;
  liveUrl?: string;
}

export function ProjectCard({
  title,
  description,
  image,
  tags = [],
  href,
  featured = false,
  index = 0,
  category,
  year,
  githubUrl,
  liveUrl,
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [descriptionRef, setDescriptionRef] = useState<HTMLParagraphElement | null>(null);
  const { theme } = useTheme();

  // Auto-resize description text to fit container
  useEffect(() => {
    if (!descriptionRef) return;

    const resizeText = () => {
      const container = descriptionRef.parentElement;
      if (!container) return;

      const containerHeight = container.clientHeight;
      const containerWidth = container.clientWidth;
      
      // Start with base font size
      let fontSize = parseFloat(getComputedStyle(descriptionRef).fontSize);
      const minFontSize = 0.65; // Minimum font size in rem
      const maxFontSize = 1; // Maximum font size in rem
      
      // Reset to max and check if it fits
      descriptionRef.style.fontSize = `${maxFontSize}rem`;
      const textHeight = descriptionRef.scrollHeight;
      
      // If text doesn't fit, reduce font size
      if (textHeight > containerHeight) {
        const ratio = containerHeight / textHeight;
        fontSize = Math.max(minFontSize, maxFontSize * ratio * 0.95); // 0.95 for safety margin
        descriptionRef.style.fontSize = `${fontSize}rem`;
      } else {
        // If it fits, use responsive clamp
        descriptionRef.style.fontSize = '';
      }
    };

    // Initial resize
    resizeText();

    // Resize on window resize
    window.addEventListener('resize', resizeText);
    const resizeObserver = new ResizeObserver(resizeText);
    if (descriptionRef.parentElement) {
      resizeObserver.observe(descriptionRef.parentElement);
    }

    return () => {
      window.removeEventListener('resize', resizeText);
      resizeObserver.disconnect();
    };
  }, [descriptionRef, description]);

  return (
    <div
      className="flex flex-col h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={cn(
          "group relative flex flex-col justify-between overflow-hidden rounded-2xl",
          "transition-all duration-500 ease-out",
          "cursor-pointer touch-manipulation",
          "active:scale-[0.98] sm:active:scale-100"
        )}
        style={{
          height: "clamp(320px, 50vh, 550px)", // Smaller on mobile, larger on desktop
          minHeight: "clamp(320px, 50vh, 550px)",
          maxHeight: "clamp(320px, 50vh, 550px)",
          width: "100%",
          background: theme === "dark" 
            ? "rgba(10, 10, 13, 0.95)" 
            : "rgba(247, 247, 245, 0.98)",
          border: `0.75px solid ${theme === "dark" ? "rgba(212, 175, 55, 0.20)" : "rgba(147, 123, 66, 0.25)"}`,
          boxShadow: isHovered
            ? theme === "dark"
              ? "0 20px 60px rgba(76, 42, 255, 0.08), 0 0 0 0.75px rgba(212, 175, 55, 0.40)"
              : "0 20px 60px rgba(76, 42, 255, 0.06), 0 0 0 0.75px rgba(147, 123, 66, 0.45)"
            : theme === "dark"
              ? "0 8px 32px rgba(76, 42, 255, 0.06)"
              : "0 8px 32px rgba(76, 42, 255, 0.04)",
          transform: isHovered ? "translateY(-4px)" : "translateY(0)",
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
        onClick={() => window.location.href = href}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setTimeout(() => setIsHovered(false), 200)}
      >
        {/* Royal Violet Glow Overlay */}
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl"
          style={{
            background: theme === "dark"
              ? "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(76, 42, 255, 0.06) 0%, transparent 70%)"
              : "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(232, 230, 242, 0.05) 0%, transparent 70%)",
            opacity: isHovered ? (theme === "dark" ? 1 : 0.8) : (theme === "dark" ? 0.6 : 0.3),
            transition: "opacity 0.5s ease-out",
          }}
        />
        
        {/* Subtle Gold Shimmer on Hover */}
        {isHovered && (
          <div
            className="absolute inset-0 pointer-events-none rounded-2xl"
            style={{
              background: "linear-gradient(135deg, transparent 0%, rgba(212, 175, 55, 0.08) 50%, transparent 100%)",
              backgroundSize: "200% 100%",
              animation: "shimmer 2s ease-in-out infinite",
            }}
          />
        )}
        {/* Image Container - Fixed height */}
        <div 
          className="relative overflow-hidden rounded-t-2xl bg-secondary"
          style={{
            height: "clamp(140px, 22vh, 200px)", // Smaller image height on mobile
            minHeight: "clamp(140px, 22vh, 200px)",
            maxHeight: "clamp(140px, 22vh, 200px)",
            flexShrink: 0,
          }}
        >
          <div className="absolute inset-0">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={index < 2}
              loading={index < 2 ? "eager" : "lazy"}
            />
          </div>
          
          {/* Enhanced Gradient Overlay */}
          {theme === "dark" && (
            <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/60 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-90" />
          )}
          
          {/* Category Badge (Top Left) */}
          {category && (
            <div className="absolute z-10" style={{ top: "clamp(0.5rem, 1.5vh, 1rem)", left: "clamp(0.5rem, 1.5vw, 1rem)" }}>
              <Badge variant="glass" size="sm" className="backdrop-blur-xl" style={{
                fontSize: "clamp(0.625rem, 0.9vw + 0.2rem, 0.875rem)",
                paddingLeft: "clamp(0.5rem, 1vw, 0.75rem)",
                paddingRight: "clamp(0.5rem, 1vw, 0.75rem)",
                paddingTop: "clamp(0.25rem, 0.5vh, 0.5rem)",
                paddingBottom: "clamp(0.25rem, 0.5vh, 0.5rem)",
              }}>
                {category}
              </Badge>
            </div>
          )}

          {/* Year Badge (Top Right) */}
          {year && (
            <div className="absolute z-10" style={{ top: "clamp(0.5rem, 1.5vh, 1rem)", right: "clamp(0.5rem, 1.5vw, 1rem)" }}>
              <Badge variant="glass" size="sm" className="backdrop-blur-xl" style={{
                fontSize: "clamp(0.625rem, 0.9vw + 0.2rem, 0.875rem)",
                paddingLeft: "clamp(0.5rem, 1vw, 0.75rem)",
                paddingRight: "clamp(0.5rem, 1vw, 0.75rem)",
                paddingTop: "clamp(0.25rem, 0.5vh, 0.5rem)",
                paddingBottom: "clamp(0.25rem, 0.5vh, 0.5rem)",
              }}>
                {year}
              </Badge>
            </div>
          )}

          {/* Quick Action Buttons (Bottom Right) */}
          <div
            className={cn(
              "absolute z-10 flex transition-opacity duration-300",
              isHovered ? "opacity-100" : "opacity-0"
            )}
            style={{
              bottom: "clamp(0.75rem, 1.5vh, 1.5rem)",
              right: "clamp(0.75rem, 1.5vw, 1.5rem)",
              gap: "clamp(0.5rem, 1vw, 0.75rem)",
            }}
          >
            {githubUrl && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(githubUrl, '_blank', 'noopener,noreferrer');
                }}
                className="rounded-xl glass-base border border-border-primary hover:bg-[var(--glass-overlay-medium)] hover:scale-110 active:scale-95 transition-all duration-300 backdrop-blur-xl shadow-lg touch-manipulation flex items-center justify-center"
                style={{
                  padding: "clamp(0.5rem, 1vw, 0.75rem)",
                }}
                aria-label="View GitHub repository"
              >
                <Github className="text-fg-primary" style={{ width: "clamp(1rem, 1.25vw, 1.25rem)", height: "clamp(1rem, 1.25vw, 1.25rem)" }} />
              </button>
            )}
            {liveUrl && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(liveUrl, '_blank', 'noopener,noreferrer');
                }}
                className="rounded-xl glass-base border border-border-primary hover:bg-[var(--glass-overlay-medium)] hover:scale-110 active:scale-95 transition-all duration-300 backdrop-blur-xl shadow-lg touch-manipulation flex items-center justify-center"
                style={{
                  padding: "clamp(0.5rem, 1vw, 0.75rem)",
                }}
                aria-label="View live project"
              >
                <ExternalLink className="text-fg-primary" style={{ width: "clamp(1rem, 1.25vw, 1.25rem)", height: "clamp(1rem, 1.25vw, 1.25rem)" }} />
              </button>
            )}
          </div>
        </div>

        {/* Content - Adaptive container, no scroll */}
        <div 
          className="relative flex flex-col flex-grow overflow-hidden"
          style={{
            minHeight: 0,
            flex: "1 1 auto",
            padding: "clamp(0.625rem, 1.2vw, 1.25rem)", // Smaller padding on mobile
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Tags */}
          <div className="flex flex-wrap flex-shrink-0" style={{
            gap: "clamp(0.25rem, 0.6vw, 0.625rem)",
            marginBottom: "clamp(0.375rem, 0.8vh, 0.75rem)",
          }}>
            {tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="glass" size="sm" className="backdrop-blur-md" style={{
                fontSize: "clamp(0.625rem, 0.8vw + 0.2rem, 0.875rem)",
                paddingLeft: "clamp(0.375rem, 0.75vw, 0.625rem)",
                paddingRight: "clamp(0.375rem, 0.75vw, 0.625rem)",
                paddingTop: "clamp(0.25rem, 0.4vh, 0.375rem)",
                paddingBottom: "clamp(0.25rem, 0.4vh, 0.375rem)",
              }}>
                {tag}
              </Badge>
            ))}
            {tags.length > 3 && (
              <Badge variant="glass" size="sm" style={{
                fontSize: "clamp(0.625rem, 0.8vw + 0.2rem, 0.875rem)",
                paddingLeft: "clamp(0.375rem, 0.75vw, 0.625rem)",
                paddingRight: "clamp(0.375rem, 0.75vw, 0.625rem)",
                paddingTop: "clamp(0.25rem, 0.4vh, 0.375rem)",
                paddingBottom: "clamp(0.25rem, 0.4vh, 0.375rem)",
              }}>
                +{tags.length - 3}
              </Badge>
            )}
          </div>

          {/* Title with Gradient on Hover */}
          <h3
            className={cn(
              "font-bold transition-all duration-300 leading-tight flex-shrink-0",
              isHovered ? "text-gradient-silver" : "text-primary"
            )}
            style={{
              fontSize: "clamp(0.875rem, 1.3vw + 0.3rem, 1.5rem)", // Smaller on mobile
              marginBottom: "clamp(0.25rem, 0.6vh, 0.625rem)", // Smaller margin on mobile
              lineClamp: 2,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              letterSpacing: "clamp(-0.01em, -0.005vw, 0)",
            }}
          >
            {title}
          </h3>

          {/* Description - Adaptive font size to fit all content, no scroll, no cut */}
          <div 
            className="flex-1 min-h-0 overflow-hidden"
            style={{
              display: "flex",
              alignItems: "flex-start",
              minHeight: 0,
            }}
          >
            <p 
              ref={setDescriptionRef}
              className="text-secondary" 
              style={{
                fontSize: "clamp(0.65rem, 0.9vw + 0.25rem, 1rem)", // Base responsive size, will be adjusted by JS
                lineHeight: 1.4, // Tighter line height to fit more content
                letterSpacing: "clamp(0.005em, 0.01vw, 0.015em)", // Responsive letter spacing
                wordBreak: "break-word",
                overflowWrap: "break-word",
                flexShrink: 1,
                minHeight: 0,
                overflow: "hidden",
                display: "block",
                width: "100%",
                margin: 0,
              }}
            >
              {description}
            </p>
          </div>

          {/* View Link - Locked to bottom */}
          <div className="flex flex-col sm:flex-row items-center sm:items-center justify-center sm:justify-between flex-shrink-0 w-full border-t border-border-primary/30" style={{
            marginTop: "clamp(0.5rem, 1vh, 0.75rem)",
            paddingTop: "clamp(0.5rem, 1vh, 0.75rem)",
            gap: "clamp(0.5rem, 1vw, 0.75rem)",
          }}>
            <div className="flex items-center justify-center text-fg-primary font-bold group/link w-full sm:w-auto" style={{
              gap: "clamp(0.5rem, 1vw, 0.75rem)",
            }}>
              <span className="underline-sweep uppercase flex items-center" style={{
                fontSize: "clamp(0.6875rem, 0.9vw + 0.2rem, 0.875rem)",
                letterSpacing: "clamp(0.05em, 0.1vw, 0.15em)",
              }}>View Case Study</span>
              <span className="flex items-center justify-center">
                <ArrowUpRight 
                  className="transition-transform duration-300 group-hover/link:translate-x-1 group-hover/link:-translate-y-1" 
                  style={{
                    width: "clamp(1rem, 1.25vw, 1.25rem)",
                    height: "clamp(1rem, 1.25vw, 1.25rem)",
                  }}
                  strokeWidth={2.5}
                />
              </span>
            </div>

            {/* Tech Count Indicator */}
            <div className="text-fg-tertiary font-medium flex-shrink-0" style={{
              fontSize: "clamp(0.625rem, 0.8vw + 0.2rem, 0.8125rem)",
            }}>
              {tags.length} {tags.length === 1 ? "tech" : "techs"}
            </div>
          </div>
        </div>

        {/* Border Glow on Hover - Light Mode */}
        <div
          className={cn(
            "absolute inset-0 rounded-2xl pointer-events-none dark:hidden transition-all duration-400",
            isHovered
              ? "shadow-[0_0_0_2px_rgba(59,130,246,0.3),0_0_40px_rgba(59,130,246,0.15),0_0_80px_rgba(139,92,246,0.1)]"
              : "shadow-none"
          )}
        />
        {/* Border Glow on Hover - Dark Mode */}
        <div
          className={cn(
            "absolute inset-0 rounded-2xl pointer-events-none hidden dark:block transition-all duration-400",
            isHovered
              ? "shadow-[0_0_0_2px_rgba(96,165,250,0.4),0_0_40px_rgba(96,165,250,0.2),0_0_80px_rgba(167,139,250,0.15)]"
              : "shadow-none"
          )}
        />
      </div>
    </div>
  );
}

export default ProjectCard;
