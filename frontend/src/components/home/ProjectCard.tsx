"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui";
import { cn } from "@/lib/utils";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, ExternalLink, Github } from "lucide-react";

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
  tags,
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

  // Advanced mouse tracking for 3D tilt effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), {
    stiffness: 300,
    damping: 30,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
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
      className={cn(featured ? "lg:col-span-2 lg:row-span-2" : "")}
    >
      <div
        className={cn(
          "group relative block overflow-hidden rounded-2xl",
          "glass-card border border-border-primary",
          "transition-all duration-500 ease-out",
          "hover:shadow-[0_20px_80px_rgba(0,0,0,0.6)]",
          "cursor-pointer"
        )}
        onClick={() => window.location.href = href}
      >
        {/* Image Container */}
        <div
          className={cn(
            "relative overflow-hidden bg-secondary",
            featured ? "aspect-[16/10]" : "aspect-[4/3]"
          )}
        >
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
              sizes={featured ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
              priority={index < 2}
            />
          </motion.div>
          
          {/* Enhanced Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/60 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-90" />
          
          {/* Radial Glow on Hover */}
          <motion.div
            className="absolute inset-0 opacity-0 pointer-events-none"
            animate={{ opacity: isHovered ? 0.2 : 0 }}
            transition={{ duration: 0.4 }}
            style={{
              background: `radial-gradient(circle at ${(mouseX.get() + 0.5) * 100}% ${(mouseY.get() + 0.5) * 100}%, rgba(255,255,255,0.3), transparent 60%)`,
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
                className="p-3 rounded-xl glass-base border border-border-primary hover:bg-white/20 hover:scale-110 transition-all duration-300 backdrop-blur-xl shadow-lg"
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
                className="p-3 rounded-xl glass-base border border-border-primary hover:bg-white/20 hover:scale-110 transition-all duration-300 backdrop-blur-xl shadow-lg"
                aria-label="View live project"
              >
                <ExternalLink className="w-5 h-5 text-fg-primary" />
              </button>
            )}
          </motion.div>
        </div>

        {/* Content */}
        <div className="relative p-8 lg:p-10">
          {/* Tags with stagger animation */}
          <div className="flex flex-wrap gap-2.5 mb-6">
            {tags.slice(0, featured ? 4 : 3).map((tag, tagIndex) => (
              <motion.div
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.15 + tagIndex * 0.05 + 0.5,
                }}
              >
                <Badge variant="glass" size="sm" className="backdrop-blur-md">
                  {tag}
                </Badge>
              </motion.div>
            ))}
            {tags.length > (featured ? 4 : 3) && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.15 + 0.8,
                }}
              >
                <Badge variant="glass" size="sm">
                  +{tags.length - (featured ? 4 : 3)}
                </Badge>
              </motion.div>
            )}
          </div>

          {/* Title with Gradient on Hover */}
          <motion.h3
            className={cn(
              "font-bold mb-4 transition-all duration-300 leading-tight",
              featured ? "text-h3" : "text-h4",
              isHovered ? "text-gradient-silver" : "text-primary"
            )}
            animate={{
              y: isHovered ? -2 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            {title}
          </motion.h3>

          {/* Description */}
          <p
            className={cn(
              "text-secondary mb-8 leading-relaxed",
              featured ? "text-body-lg line-clamp-3" : "text-body line-clamp-2"
            )}
          >
            {description}
          </p>

          {/* View Link with Enhanced Animation */}
          <motion.div
            className="flex items-center justify-between pt-4 border-t border-border-primary/30"
            animate={{
              x: isHovered ? 4 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-3 text-fg-primary font-bold group/link">
              <span className="underline-sweep text-sm uppercase tracking-widest">View Case Study</span>
              <motion.div
                animate={{
                  x: isHovered ? 4 : 0,
                  y: isHovered ? -4 : 0,
                }}
                transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
              >
                <ArrowUpRight className="w-5 h-5" strokeWidth={2.5} />
              </motion.div>
            </div>

            {/* Tech Count Indicator */}
            <div className="text-caption text-fg-tertiary font-medium">
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
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
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

        {/* Border Glow on Hover */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          animate={{
            boxShadow: isHovered
              ? "0 0 0 2px rgba(255,255,255,0.2), 0 0 40px rgba(255,255,255,0.1)"
              : "0 0 0 0px rgba(255,255,255,0)",
          }}
          transition={{ duration: 0.4 }}
        />
      </div>
    </motion.div>
  );
}

export default ProjectCard;
