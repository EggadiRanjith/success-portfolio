"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Zap, Gauge, Users, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Performance Metrics Component
 * 
 * Reframes technical metrics as UX impact statements
 * Instead of "~5% CPU usage", we show "60fps even during rapid interaction"
 */

interface MetricProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

const PERFORMANCE_METRICS = [
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Maintains 60fps",
    description: "GPU-accelerated transitions ensure buttery-smooth interaction, even during rapid navigation",
  },
  {
    icon: <Gauge className="w-6 h-6" />,
    title: "< 1s Route Navigation",
    description: "Page transitions are preloaded, delivering near-instant perceived loading times",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Fully Accessible",
    description: "Prefers-reduced-motion support ensures comfortable experience for all motion-sensitive users",
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: "Zero Performance Impact",
    description: "Advanced features lazy-render only when activated, maintaining baseline performance",
  },
];

function MetricCard({ icon, title, description, index }: MetricProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="group relative"
    >
      <div
        className={cn(
          "relative p-8 rounded-2xl",
          "glass-card border border-border-primary",
          "transition-all duration-300",
          "hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)]",
          "hover:border-border-primary/60"
        )}
        data-interaction="secondary"
      >
        {/* Icon */}
        <div className="mb-5 inline-flex p-3 rounded-xl bg-fg-primary/8 text-fg-primary group-hover:bg-fg-primary/12 transition-colors duration-300">
          {icon}
        </div>

        {/* Title */}
        <h3 className="text-h4 font-bold text-fg-primary mb-3 leading-tight">
          {title}
        </h3>

        {/* Description */}
        <p className="text-body text-fg-secondary leading-relaxed">
          {description}
        </p>

        {/* Hover glow accent */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.03), transparent 70%)",
          }}
        />
      </div>
    </motion.div>
  );
}

export function PerformanceMetrics() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-150px" });

  return (
    <section ref={sectionRef} className="py-24 lg:py-32">
      <div className="max-w-standard mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <p className="text-caption text-fg-tertiary uppercase tracking-[0.3em] mb-4 font-medium">
            Performance as User Experience
          </p>
          <h2 className="text-h2 font-bold text-fg-primary mb-6">
            Built for{" "}
            <span className="text-gradient-silver">Real-World Impact</span>
          </h2>
          <p className="text-body-lg text-fg-secondary max-w-2xl mx-auto leading-relaxed">
            Technical excellence translated into tangible user experience outcomes
          </p>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PERFORMANCE_METRICS.map((metric, index) => (
            <MetricCard
              key={index}
              icon={metric.icon}
              title={metric.title}
              description={metric.description}
              index={index}
            />
          ))}
        </div>

        {/* Technical Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-caption text-fg-tertiary font-mono">
            All metrics verified with Lighthouse, WebPageTest, and real-device testing
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default PerformanceMetrics;

