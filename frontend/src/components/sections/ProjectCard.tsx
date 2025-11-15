"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, ExternalLink, Github } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

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
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const reducedMotion = useReducedMotion();
  const { theme } = useTheme();

  // Advanced mouse tracking for 3D tilt effect (desktop only)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    setIsMobile(isMobileDevice());
  }, []);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], isMobile || reducedMotion ? [0, 0] : [5, -5]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], isMobile || reducedMotion ? [0, 0] : [-5, 5]), {
    stiffness: 300,
    damping: 30,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isMobile || reducedMotion) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="flex flex-col h-full"
    >
      <motion.div
        whileHover={!isMobile && !reducedMotion ? { y: -6, scale: 1.02 } : {}}
        transition={{ type: "spring", stiffness: 200, damping: 12 }}
        className={cn(
          "group relative flex flex-col justify-between h-full overflow-hidden rounded-2xl",
          "glass-card border border-border-primary",
          "transition-all duration-500 ease-out",
          theme === "dark" 
            ? "hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
            : "hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)]",
          "cursor-pointer"
        )}
        onClick={() => window.location.href = href}
      >
        {/* Image Container - Uniform aspect ratio */}
        <div className="relative overflow-hidden rounded-t-2xl bg-secondary aspect-[16/9]">
          <motion.div
            className="absolute inset-0"
            animate={{
              scale: isHovered ? 1.12 : 1,
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={index < 2}
              loading={index < 2 ? "eager" : "lazy"}
            />
          </motion.div>
          
          {/* Enhanced Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/60 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-90" />
          
          {/* Radial Glow on Hover - Theme Aware */}
          <motion.div
            className="absolute inset-0 opacity-0 pointer-events-none"
            animate={{ opacity: isHovered ? 0.2 : 0 }}
            transition={{ duration: 0.4 }}
            style={{
              background: theme === "dark"
                ? `radial-gradient(circle at ${(mouseX.get() + 0.5) * 100}% ${(mouseY.get() + 0.5) * 100}%, rgba(255,255,255,0.3), transparent 60%)`
                : `radial-gradient(circle at ${(mouseX.get() + 0.5) * 100}% ${(mouseY.get() + 0.5) * 100}%, rgba(59,130,246,0.2), transparent 60%)`,
            }}
          />

          {/* Category Badge (Top Left) */}
          {category && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.15 + 0.3 }}
              className="absolute top-4 left-4 z-10"
            >
              <Badge variant="glass" size="sm" className="backdrop-blur-xl">
                {category}
              </Badge>
            </motion.div>
          )}

          {/* Year Badge (Top Right) */}
          {year && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.15 + 0.4 }}
              className="absolute top-4 right-4 z-10"
            >
              <Badge variant="glass" size="sm" className="backdrop-blur-xl">
                {year}
              </Badge>
            </motion.div>
          )}

          {/* Quick Action Buttons (Bottom Right) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-6 right-6 z-10 flex gap-3"
          >
            {githubUrl && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(githubUrl, '_blank', 'noopener,noreferrer');
                }}
                className="p-3 rounded-xl glass-base border border-border-primary hover:bg-white/20 dark:hover:bg-white/10 hover:scale-110 transition-all duration-300 backdrop-blur-xl shadow-lg"
                aria-label="View GitHub repository"
              >
                <Github className="w-5 h-5 text-fg-primary" />
              </button>
            )}
            {liveUrl && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(liveUrl, '_blank', 'noopener,noreferrer');
                }}
                className="p-3 rounded-xl glass-base border border-border-primary hover:bg-white/20 dark:hover:bg-white/10 hover:scale-110 transition-all duration-300 backdrop-blur-xl shadow-lg"
                aria-label="View live project"
              >
                <ExternalLink className="w-5 h-5 text-fg-primary" />
              </button>
            )}
          </motion.div>
        </div>

        {/* Content */}
        <div className="relative flex flex-col flex-grow p-4 sm:p-6 lg:p-8">
          {/* Tags with stagger animation */}
          <div className="flex flex-wrap gap-2 sm:gap-2.5 mb-3 sm:mb-4">
            {tags.slice(0, 3).map((tag, tagIndex) => (
              <motion.div
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.15 + tagIndex * 0.05 + 0.5,
                }}
              >
                <Badge variant="glass" size="sm" className="backdrop-blur-md text-xs sm:text-sm">
                  {tag}
                </Badge>
              </motion.div>
            ))}
            {tags.length > 3 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.15 + 0.8,
                }}
              >
                <Badge variant="glass" size="sm" className="text-xs sm:text-sm">
                  +{tags.length - 3}
                </Badge>
              </motion.div>
            )}
          </div>

          {/* Title with Gradient on Hover */}
          <motion.h3
            className={cn(
              "font-bold mb-2 sm:mb-3 transition-all duration-300 leading-tight text-lg sm:text-h4",
              isHovered ? "text-gradient-silver" : "text-primary"
            )}
            animate={{
              y: isHovered ? -2 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            {title}
          </motion.h3>

          {/* Description - Clamped for consistent height */}
          <p className="text-sm sm:text-body text-secondary mb-4 sm:mb-6 leading-relaxed line-clamp-3">
            {description}
          </p>

          {/* View Link with Enhanced Animation - Locked to bottom */}
          <motion.div
            className="mt-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 pt-3 sm:pt-4 border-t border-border-primary/30"
            animate={{
              x: isHovered ? 4 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-2 sm:gap-3 text-fg-primary font-bold group/link">
              <span className="underline-sweep text-xs sm:text-sm uppercase tracking-widest">View Case Study</span>
              <motion.div
                animate={{
                  x: isHovered ? 4 : 0,
                  y: isHovered ? -4 : 0,
                }}
                transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
              >
                <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2.5} />
              </motion.div>
            </div>

            {/* Tech Count Indicator */}
            <div className="text-xs sm:text-caption text-fg-tertiary font-medium">
              {tags.length} {tags.length === 1 ? "tech" : "techs"}
            </div>
          </motion.div>
        </div>

        {/* Premium Shine Effect on Hover */}
        <motion.div
          className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl"
          animate={{
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-white/10 to-transparent"
            animate={{
              x: isHovered ? ["0%", "200%"] : "0%",
            }}
            transition={{
              duration: 1.5,
              ease: "easeInOut",
              repeat: isHovered ? Infinity : 0,
              repeatDelay: 0.5,
            }}
            style={{
              width: "50%",
              transform: "skewX(-20deg)",
            }}
          />
        </motion.div>

        {/* Border Glow on Hover - Light Mode */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none dark:hidden"
          animate={{
            boxShadow: isHovered
              ? "0 0 0 2px rgba(59,130,246,0.3), 0 0 40px rgba(59,130,246,0.15), 0 0 80px rgba(139,92,246,0.1)"
              : "0 0 0 0px rgba(59,130,246,0)",
          }}
          transition={{ duration: 0.4 }}
        />
        {/* Border Glow on Hover - Dark Mode */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none hidden dark:block"
          animate={{
            boxShadow: isHovered
              ? "0 0 0 2px rgba(96,165,250,0.4), 0 0 40px rgba(96,165,250,0.2), 0 0 80px rgba(167,139,250,0.15)"
              : "0 0 0 0px rgba(96,165,250,0)",
          }}
          transition={{ duration: 0.4 }}
        />
      </motion.div>
    </motion.div>
  );
}

export default ProjectCard;
