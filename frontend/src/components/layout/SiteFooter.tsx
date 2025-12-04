/**
 * Site Footer - Premium Mobile-First Design
 * Optimized for mobile with proper spacing, typography, and layout
 */

"use client";

import React from "react";
import { Link, Text, Container } from "@/components/ui";
import { Github, Linkedin } from "lucide-react";
import { HERO_SOCIAL_LINKS } from "@/constants/heroSection";

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      className="relative overflow-hidden border-t border-border-primary/20"
      style={{
        paddingTop: "clamp(2.5rem, 4vh + 0.5rem, 4rem)",
        paddingBottom: "clamp(1rem, 2vh + 0.5rem, 1.25rem)",
        background: "var(--color-bg-secondary)",
      }}
    >
      {/* Subtle background gradient */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-orb-blue rounded-full blur-3xl opacity-20"
          style={{
            width: "clamp(6rem, 15vw, 12rem)",
            height: "clamp(6rem, 15vw, 12rem)",
          }}
        />
      </div>

      <Container size="lg" className="relative z-10 px-4 sm:px-6 !py-0">
        {/* Clean Centered Layout - Mobile First */}
        <div 
          className="flex flex-col items-center text-center mb-3 sm:mb-4 md:mb-5"
        >
          {/* Brand Section */}
          <h3 
            className="font-bold text-fg-primary leading-tight mb-2 sm:mb-2.5"
            style={{
              fontSize: "clamp(1rem, 3vw, 1.5rem)",
              }}
            >
              Ranjith Eggadi
            </h3>
          
            <Text 
              size="body-sm" 
              color="secondary" 
            className="leading-relaxed mb-3 sm:mb-3.5 max-w-2xl mx-auto"
              style={{
              fontSize: "clamp(0.75rem, 1.8vw, 0.875rem)",
              lineHeight: "1.6",
              }}
            >
              Backend-focused Full-Stack Developer building scalable systems and reliable APIs.
            </Text>
          
          {/* Social Links */}
            <div 
            className="flex items-center justify-center gap-3 sm:gap-4"
            >
              <Link 
                href={HERO_SOCIAL_LINKS[0].href}
                variant="ghost" 
                aria-label="GitHub"
                target="_blank"
                rel="noopener noreferrer"
              className="transition-all duration-300 hover:opacity-80 active:scale-95 touch-manipulation p-2 sm:p-2.5"
              >
                <Github 
                className="w-4 h-4 sm:w-5 sm:h-5"
                />
              </Link>
              <Link 
                href={HERO_SOCIAL_LINKS[1].href}
                variant="ghost" 
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              className="transition-all duration-300 hover:opacity-80 active:scale-95 touch-manipulation p-2 sm:p-2.5"
              >
                <Linkedin 
                className="w-4 h-4 sm:w-5 sm:h-5"
                />
              </Link>
            </div>
          </div>

        {/* Bottom Bar - Clean Centered */}
        <div 
          className="border-t border-border-primary/20 flex flex-col items-center justify-center pt-2.5 sm:pt-3 md:pt-3.5 gap-1.5 sm:gap-2"
        >
          <Text 
            size="body-sm" 
            color="tertiary"
            className="text-center"
            style={{
              fontSize: "clamp(0.7rem, 1.5vw, 0.8rem)",
            }}
          >
            © {currentYear} Ranjith Eggadi. All rights reserved.
          </Text>
        </div>
      </Container>
    </footer>
  );
}
