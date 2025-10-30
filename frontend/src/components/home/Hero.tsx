"use client";

import React, { useState, useRef, useEffect } from "react";
import { Container, Button } from "@/components/ui";
import { useRouter } from "next/navigation";
import { useMagneticHover } from "@/hooks/useMagneticHover";
import LiquidChrome from "@/components/effects/LiquidChrome";
import { motion } from "framer-motion";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(SplitText);
}

export function Hero() {
  const router = useRouter();
  const primaryBtnRef = useMagneticHover<HTMLButtonElement>();
  const secondaryBtnRef = useMagneticHover<HTMLButtonElement>();
  
  // Refs for GSAP animations
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const sublineRef = useRef<HTMLParagraphElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current || !headlineRef.current) return;

    const ctx = gsap.context(() => {
      // Eyebrow animation
      if (eyebrowRef.current) {
        gsap.from(eyebrowRef.current, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.2,
        });
      }

      // Split text animation for headline - ONLY animate the main text, NOT the gradient word
      if (headlineRef.current) {
        const headlineMain = headlineRef.current.querySelector('.headline-main');
        const gradientWord = headlineRef.current.querySelector('.gradient-word');
        
        // Split ONLY the main headline text
        if (headlineMain) {
          const split = new SplitText(headlineMain, { type: "chars,words" });
          
          gsap.from(split.chars, {
            opacity: 0,
            y: 60,
            rotateX: -90,
            stagger: 0.008,
            duration: 0.6,
            ease: "back.out(1.7)",
            delay: 0.1,
          });

          // Continuous subtle animation
          gsap.to(split.chars, {
            y: -3,
            stagger: {
              each: 0.03,
              repeat: -1,
              yoyo: true,
            },
            duration: 2.5,
            ease: "sine.inOut",
            delay: 0.9,
          });
        }
        
        // Animate the gradient word separately (simple fade + slide, NO SplitText)
        if (gradientWord) {
          gsap.from(gradientWord, {
            opacity: 0,
            y: 60,
            duration: 0.8,
            ease: "power3.out",
            delay: 0.4,
          });
          
          // Subtle continuous animation for gradient word
          gsap.to(gradientWord, {
            y: -2,
            duration: 3,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            delay: 1,
          });
        }
      }

      // Subline animation
      if (sublineRef.current) {
        gsap.from(sublineRef.current, {
          opacity: 0,
          y: 40,
          duration: 1,
          ease: "power3.out",
          delay: 0.8,
        });
      }

      // CTA buttons animation
      if (ctaRef.current) {
        const buttons = ctaRef.current.querySelectorAll("button");
        gsap.from(buttons, {
          opacity: 0,
          scale: 0.8,
          y: 30,
          stagger: 0.15,
          duration: 0.8,
          ease: "back.out(1.7)",
          delay: 1,
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen bg-primary flex items-center justify-center px-6 pt-32 pb-24 overflow-hidden border-b border-border-primary/20">
      {/* Ultra-Subtle Premium Liquid Chrome Background */}
      <div className="absolute inset-0 z-0 opacity-20">
        <LiquidChrome 
          speed={0.15}
          amplitude={0.2}
          frequencyX={1.8}
          frequencyY={1.3}
          interactive 
        />
      </div>
      <Container variant="content" size="lg" className="relative z-10">
        <div className="flex flex-col items-center gap-10 max-w-5xl mx-auto text-center">
            {/* Purpose statement - No animation delay */}
            <p className="text-body text-fg-secondary font-light mb-6 opacity-100">
              Frontend Engineer
            </p>

            {/* Main Headline with premium font */}
            <h1 
              ref={headlineRef}
              className="text-[clamp(3rem,8vw,8rem)] leading-[1.05] tracking-tight font-bold text-fg-primary"
              style={{ 
                fontFamily: "var(--font-sans)",
                textShadow: "0 2px 40px rgba(0,0,0,0.3)",
              }}
            >
              <span className="headline-main">I Engineer Cinematic</span>
              <br />
              <span className="text-gradient-silver inline-block gradient-word">Interfaces</span>
            </h1>

            {/* Immediate clarity subtitle */}
            <p className="text-[clamp(1.25rem,2.5vw,2rem)] leading-tight text-fg-primary font-medium mb-8 opacity-100">
              That Turn Code Into Emotion
            </p>

            {/* Enhanced Subtext */}
            <p 
              ref={sublineRef}
              className="text-[clamp(1.125rem,2vw,1.5rem)] leading-relaxed text-fg-secondary max-w-2xl font-light"
            >
              Specializing in high-performance web experiences that{" "}
              <span className="text-fg-primary font-medium">feel alive</span>. Blending{" "}
              <span className="text-fg-primary font-medium">engineering precision</span> with{" "}
              <span className="text-fg-primary font-medium">cinematic motion</span>.
            </p>

          {/* Stats Bar - Measurable Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-8 md:gap-12 py-6"
          >
            {[
              { value: "100%", label: "Core Web Vitals" },
              { value: "50+", label: "Projects Shipped" },
              { value: "<2s", label: "Avg Load Time" },
            ].map((stat, index) => (
              <div key={index} className="flex flex-col items-center">
                <span className="text-h2 font-bold text-fg-primary">{stat.value}</span>
                <span className="text-caption text-fg-tertiary uppercase tracking-wider">{stat.label}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA cluster with enhanced design */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 items-center pt-4">
            <Button
              ref={primaryBtnRef}
              size="lg"
              onClick={() => router.push("/projects")}
              className="hover-glow pressable px-8 py-4 text-lg font-semibold group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                View My Work
                <svg 
                  className="w-5 h-5 transition-transform group-hover:translate-x-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Button>
            <Button
              ref={secondaryBtnRef}
              variant="secondary"
              size="lg"
              onClick={() => router.push("/contact")}
              className="hover-glow pressable px-8 py-4 text-lg font-semibold"
            >
              Let's Collaborate
            </Button>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="pt-12"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="flex flex-col items-center gap-2 text-fg-tertiary"
            >
              <span className="text-caption uppercase tracking-wider">Scroll to explore</span>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
