"use client";

import React, { useRef, useEffect } from "react";
import { Container, Heading, Text, Button } from "@/components/ui";
import { useRouter } from "next/navigation";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { Download } from "lucide-react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(SplitText);
}

const STATS = [
  { value: "5+", label: "Years Experience" },
  { value: "50+", label: "Projects Completed" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "20+", label: "Happy Clients" },
];

export function AboutPreview() {
  const router = useRouter();
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-150px" });

  useEffect(() => {
    if (!isInView || !headingRef.current) return;

    const ctx = gsap.context(() => {
      // Eyebrow animation
      if (eyebrowRef.current) {
        gsap.from(eyebrowRef.current, {
          opacity: 0,
          y: 20,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.1,
        });
      }

      // Split text animation for heading
      if (headingRef.current) {
        const split = new SplitText(headingRef.current, { type: "chars,words" });
        
        gsap.from(split.chars, {
          opacity: 0,
          y: 60,
          rotateX: -90,
          stagger: 0.025,
          duration: 0.9,
          ease: "back.out(1.7)",
          delay: 0.2,
        });

        // Subtle floating animation
        gsap.to(split.chars, {
          y: -2,
          stagger: {
            each: 0.03,
            repeat: -1,
            yoyo: true,
          },
          duration: 2.8,
          ease: "sine.inOut",
          delay: 1.2,
        });
      }

      // Image entrance with scale and rotation
      if (imageRef.current) {
        gsap.from(imageRef.current, {
          opacity: 0,
          scale: 0.9,
          rotateY: -15,
          duration: 1.2,
          ease: "power3.out",
          delay: 0.3,
        });
      }

      // Content paragraphs stagger
      if (contentRef.current) {
        const paragraphs = contentRef.current.querySelectorAll("p");
        gsap.from(paragraphs, {
          opacity: 0,
          y: 30,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.5,
        });
      }

      // Stats counter animation
      if (statsRef.current) {
        const statValues = statsRef.current.querySelectorAll(".stat-value");
        statValues.forEach((stat) => {
          const target = stat.textContent || "0";
          const numMatch = target.match(/\d+/);
          if (numMatch) {
            const num = parseInt(numMatch[0]);
            gsap.from(stat, {
              textContent: 0,
              duration: 2,
              ease: "power2.out",
              delay: 0.7,
              snap: { textContent: 1 },
              onUpdate: function() {
                const current = Math.round(gsap.getProperty(stat, "textContent") as number);
                stat.textContent = target.replace(/\d+/, current.toString());
              }
            });
          }
        });
      }

      // CTA buttons
      if (ctaRef.current) {
        const buttons = ctaRef.current.querySelectorAll("button");
        gsap.from(buttons, {
          opacity: 0,
          scale: 0.9,
          y: 20,
          stagger: 0.1,
          duration: 0.8,
          ease: "back.out(1.7)",
          delay: 0.9,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isInView]);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 lg:py-40 overflow-hidden border-y border-border-primary/20 bg-gradient-to-bl from-slate-100 via-white to-slate-50 dark:from-black dark:via-zinc-950 dark:to-zinc-900"
    >
      {/* Large Visible Gradient Orbs - Different colors */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[15%] right-[5%] w-[650px] h-[650px] bg-gradient-radial from-emerald-100/35 via-teal-100/18 to-transparent dark:from-emerald-500/18 dark:via-teal-500/9 dark:to-transparent blur-3xl" />
        <div className="absolute bottom-[25%] left-[5%] w-[700px] h-[700px] bg-gradient-radial from-cyan-100/30 via-blue-100/15 to-transparent dark:from-cyan-500/15 dark:via-blue-500/8 dark:to-transparent blur-3xl" />
        <div className="absolute top-[45%] left-[45%] w-[550px] h-[550px] bg-gradient-radial from-sky-100/28 to-transparent dark:from-sky-500/14 dark:to-transparent blur-3xl" />
      </div>
      
      {/* Edge highlights */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-400 to-slate-200 dark:via-white/20 dark:to-white/10 z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-slate-200 via-slate-300 to-transparent dark:from-white/12 dark:via-white/18 dark:to-transparent z-10" />
      <Container variant="standard" size="xl" className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Image */}
          <div ref={imageRef} className="relative">
            <div className="relative aspect-square max-w-lg mx-auto lg:mx-0">
              {/* Glass border frame */}
              <div className="absolute inset-0 rounded-3xl glass-base border-2 border-border-primary p-2">
                <div className="relative w-full h-full rounded-2xl overflow-hidden bg-secondary">
                  <Image
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop&crop=faces"
                    alt="Profile"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  
                  {/* Subtle gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-bg-primary/20" />
                </div>
              </div>

              {/* Floating accent */}
              <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full glass-frosted border border-border-primary blur-xl opacity-60" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 rounded-full glass-frosted border border-border-primary blur-xl opacity-60" />
            </div>
          </div>

          {/* Right: Content */}
          <div>
            <p 
              ref={eyebrowRef}
              className="text-caption text-tertiary uppercase tracking-[0.3em] mb-6 font-medium"
            >
              ✦ About Me ✦
            </p>
            
            <h2 
              ref={headingRef}
              className="text-[clamp(2.25rem,5vw,4rem)] leading-[1.1] tracking-tight font-bold text-primary mb-8"
              style={{ 
                fontFamily: "var(--font-sans)",
                textShadow: "0 2px 30px rgba(0,0,0,0.2)",
              }}
            >
              Pushing Boundaries
              <br />
              Through{" "}
              <span className="text-gradient-silver inline-block">Code & Design</span>
            </h2>

            <div ref={contentRef} className="space-y-4 mb-8">
              <Text size="body-lg" color="primary" className="leading-relaxed">
                I'm a frontend developer with a passion for creating{" "}
                <span className="font-semibold">exceptional digital experiences</span> that blend
                cutting-edge technology with beautiful design.
              </Text>

              <Text size="body" color="secondary" className="leading-relaxed">
                Specializing in React, Next.js, and modern web technologies, I transform complex
                challenges into elegant, performant solutions. My work spans from{" "}
                <span className="text-primary font-medium">3D web experiences</span> to{" "}
                <span className="text-primary font-medium">enterprise-scale applications</span>.
              </Text>

              <Text size="body" color="secondary" className="leading-relaxed">
                When I'm not coding, you'll find me exploring the latest in WebGL, contributing to
                open source, or mentoring aspiring developers.
              </Text>
            </div>

            {/* Stats Grid with Counter Animation */}
            <div ref={statsRef} className="grid grid-cols-2 gap-6 mb-8 py-8 border-y border-border-primary">
              {STATS.map((stat, index) => (
                <div
                  key={index}
                  className="text-center lg:text-left"
                >
                  <div className="stat-value text-h2 font-bold text-primary mb-1">{stat.value}</div>
                  <div className="text-caption text-tertiary uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="primary"
                size="lg"
                onClick={() => router.push("/about")}
                className="hover-glow pressable"
              >
                More About Me
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => window.open("/resume.pdf", "_blank")}
                className="hover-glow pressable group"
              >
                <span className="flex items-center gap-2">
                  <Download className="w-5 h-5 transition-transform group-hover:-translate-y-0.5" />
                  Download Resume
                </span>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default AboutPreview;
