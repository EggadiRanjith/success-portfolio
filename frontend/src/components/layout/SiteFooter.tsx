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
        paddingTop: "clamp(1.5rem, 3vh + 0.5rem, 2.5rem)",
        paddingBottom: "clamp(1rem, 2.5vh + 0.5rem, 1.5rem)",
        background: "var(--color-bg-secondary)",
      }}
    >
      {/* Subtle background gradient */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-blue-500/3 dark:bg-blue-400/2 rounded-full blur-3xl"
          style={{
            width: "clamp(8rem, 20vw, 16rem)",
            height: "clamp(8rem, 20vw, 16rem)",
          }}
        />
      </div>

      <Container size="lg" className="relative z-10 px-4 sm:px-6">
        {/* Mobile: 2 Columns, Desktop: 4 Columns - Content Adaptive */}
        <div 
          className="grid grid-cols-2 md:grid-cols-4"
          style={{
            gap: "clamp(1rem, 3vw + 0.5rem, 2rem)",
            marginBottom: "clamp(1rem, 3vh + 0.5rem, 1.5rem)",
          }}
        >
          {/* Brand Section - Full width on mobile */}
          <div 
            className="col-span-2 md:col-span-1"
            style={{
              marginBottom: "clamp(1rem, 2.5vh, 1.5rem)",
            }}
          >
            <h3 
              className="font-bold text-fg-primary leading-tight"
              style={{
                marginBottom: "clamp(0.75rem, 2vh, 1rem)",
                fontSize: "clamp(1rem, 2.5vw + 0.5rem, 1.25rem)",
              }}
            >
              Ranjith Eggadi
            </h3>
            <Text 
              size="body-sm" 
              color="secondary" 
              className="leading-relaxed"
              style={{
                marginBottom: "clamp(0.75rem, 2vh, 1rem)",
                fontSize: "clamp(0.8125rem, 2vw, 0.9375rem)",
                lineHeight: "1.65",
              }}
            >
              Backend-focused Full-Stack Developer building scalable systems and reliable APIs.
            </Text>
            <div 
              className="flex items-center"
              style={{
                gap: "clamp(0.5rem, 1.5vw, 0.75rem)",
              }}
            >
              <Link 
                href={HERO_SOCIAL_LINKS[0].href}
                variant="ghost" 
                aria-label="GitHub"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all duration-300 hover:opacity-80 active:scale-95 touch-manipulation"
                style={{
                  padding: "clamp(0.5rem, 1.5vw, 0.75rem)",
                  marginLeft: "clamp(-0.5rem, -1.5vw, -0.75rem)",
                }}
              >
                <Github 
                  style={{
                    width: "clamp(1rem, 2.5vw, 1.25rem)",
                    height: "clamp(1rem, 2.5vw, 1.25rem)",
                  }}
                />
              </Link>
              <Link 
                href={HERO_SOCIAL_LINKS[1].href}
                variant="ghost" 
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all duration-300 hover:opacity-80 active:scale-95 touch-manipulation"
                style={{
                  padding: "clamp(0.5rem, 1.5vw, 0.75rem)",
                }}
              >
                <Linkedin 
                  style={{
                    width: "clamp(1rem, 2.5vw, 1.25rem)",
                    height: "clamp(1rem, 2.5vw, 1.25rem)",
                  }}
                />
              </Link>
            </div>
          </div>

          {/* Quick Links - Content Adaptive */}
          <div>
            <h4 
              className="font-semibold text-fg-primary uppercase tracking-wider"
              style={{
                marginBottom: "clamp(0.75rem, 2vh, 1rem)",
                fontSize: "clamp(0.75rem, 1.8vw, 0.875rem)",
              }}
            >
              Quick Links
            </h4>
            <ul 
              style={{
                gap: "clamp(0.5rem, 1.5vh, 0.75rem)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <li>
                <Link 
                  href="/"
                  className="text-fg-secondary hover:text-fg-primary transition-colors duration-300 block touch-manipulation"
                  style={{
                    paddingTop: "clamp(0.5rem, 1.5vh, 0.75rem)",
                    paddingBottom: "clamp(0.5rem, 1.5vh, 0.75rem)",
                    fontSize: "clamp(0.8125rem, 2vw, 0.9375rem)",
                    minHeight: "clamp(2rem, 5vw, 2.5rem)",
                  }}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  href="/projects"
                  className="text-fg-secondary hover:text-fg-primary transition-colors duration-300 block touch-manipulation"
                  style={{
                    paddingTop: "clamp(0.5rem, 1.5vh, 0.75rem)",
                    paddingBottom: "clamp(0.5rem, 1.5vh, 0.75rem)",
                    fontSize: "clamp(0.8125rem, 2vw, 0.9375rem)",
                    minHeight: "clamp(2rem, 5vw, 2.5rem)",
                  }}
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link 
                  href="/about"
                  className="text-fg-secondary hover:text-fg-primary transition-colors duration-300 block touch-manipulation"
                  style={{
                    paddingTop: "clamp(0.5rem, 1.5vh, 0.75rem)",
                    paddingBottom: "clamp(0.5rem, 1.5vh, 0.75rem)",
                    fontSize: "clamp(0.8125rem, 2vw, 0.9375rem)",
                    minHeight: "clamp(2rem, 5vw, 2.5rem)",
                  }}
                >
                  About
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact"
                  className="text-fg-secondary hover:text-fg-primary transition-colors duration-300 block touch-manipulation"
                  style={{
                    paddingTop: "clamp(0.5rem, 1.5vh, 0.75rem)",
                    paddingBottom: "clamp(0.5rem, 1.5vh, 0.75rem)",
                    fontSize: "clamp(0.8125rem, 2vw, 0.9375rem)",
                    minHeight: "clamp(2rem, 5vw, 2.5rem)",
                  }}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services - Content Adaptive */}
          <div>
            <h4 
              className="font-semibold text-fg-primary uppercase tracking-wider"
              style={{
                marginBottom: "clamp(0.75rem, 2vh, 1rem)",
                fontSize: "clamp(0.75rem, 1.8vw, 0.875rem)",
              }}
            >
              Services
            </h4>
            <ul 
              className="text-fg-secondary"
              style={{
                gap: "clamp(0.5rem, 1.5vh, 0.75rem)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <li 
                style={{
                  fontSize: "clamp(0.8125rem, 2vw, 0.9375rem)",
                  lineHeight: "1.6",
                  paddingTop: "clamp(0.25rem, 0.75vh, 0.5rem)",
                  paddingBottom: "clamp(0.25rem, 0.75vh, 0.5rem)",
                }}
              >
                Backend Development
              </li>
              <li 
                style={{
                  fontSize: "clamp(0.8125rem, 2vw, 0.9375rem)",
                  lineHeight: "1.6",
                  paddingTop: "clamp(0.25rem, 0.75vh, 0.5rem)",
                  paddingBottom: "clamp(0.25rem, 0.75vh, 0.5rem)",
                }}
              >
                API Design & Integration
              </li>
              <li 
                style={{
                  fontSize: "clamp(0.8125rem, 2vw, 0.9375rem)",
                  lineHeight: "1.6",
                  paddingTop: "clamp(0.25rem, 0.75vh, 0.5rem)",
                  paddingBottom: "clamp(0.25rem, 0.75vh, 0.5rem)",
                }}
              >
                Cloud Architecture
              </li>
              <li 
                style={{
                  fontSize: "clamp(0.8125rem, 2vw, 0.9375rem)",
                  lineHeight: "1.6",
                  paddingTop: "clamp(0.25rem, 0.75vh, 0.5rem)",
                  paddingBottom: "clamp(0.25rem, 0.75vh, 0.5rem)",
                }}
              >
                AI Integration
              </li>
            </ul>
          </div>

          {/* Contact Info - Content Adaptive */}
          <div 
            className="col-span-2 md:col-span-1"
            style={{
              marginTop: "clamp(0.75rem, 2vh, 1rem)",
            }}
          >
            <h4 
              className="font-semibold text-fg-primary uppercase tracking-wider"
              style={{
                marginBottom: "clamp(0.75rem, 2vh, 1rem)",
                fontSize: "clamp(0.75rem, 1.8vw, 0.875rem)",
              }}
            >
              Get in Touch
            </h4>
            <Text 
              size="body-sm" 
              color="secondary"
              className="leading-relaxed"
              style={{
                fontSize: "clamp(0.8125rem, 2vw, 0.9375rem)",
                lineHeight: "1.65",
              }}
            >
              Open to new opportunities and collaborations. Let's build something great together.
            </Text>
          </div>
        </div>

        {/* Bottom Bar - Content Adaptive */}
        <div 
          className="border-t border-border-primary/20 flex flex-col sm:flex-row items-center justify-center sm:justify-between"
          style={{
            paddingTop: "clamp(0.75rem, 2vh + 0.25rem, 1.25rem)",
            gap: "clamp(0.75rem, 2vh, 1rem)",
          }}
        >
          <Text 
            size="body-sm" 
            color="tertiary"
            style={{
              fontSize: "clamp(0.75rem, 1.5vw, 0.875rem)",
            }}
          >
            © {currentYear} Ranjith Eggadi. All rights reserved.
          </Text>
          <div 
            className="flex items-center"
            style={{
              gap: "clamp(0.75rem, 2vw, 1rem)",
            }}
          >
            <Link 
              href="#" 
              className="text-fg-secondary hover:text-fg-primary transition-colors duration-300 touch-manipulation"
              style={{
                paddingTop: "clamp(0.25rem, 0.75vh, 0.5rem)",
                paddingBottom: "clamp(0.25rem, 0.75vh, 0.5rem)",
                fontSize: "clamp(0.75rem, 1.5vw, 0.875rem)",
              }}
            >
              Privacy
            </Link>
            <span 
              className="text-fg-tertiary"
              style={{
                fontSize: "clamp(0.75rem, 1.5vw, 0.875rem)",
              }}
            >
              •
            </span>
            <Link 
              href="#" 
              className="text-fg-secondary hover:text-fg-primary transition-colors duration-300 touch-manipulation"
              style={{
                paddingTop: "clamp(0.25rem, 0.75vh, 0.5rem)",
                paddingBottom: "clamp(0.25rem, 0.75vh, 0.5rem)",
                fontSize: "clamp(0.75rem, 1.5vw, 0.875rem)",
              }}
            >
              Terms
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
