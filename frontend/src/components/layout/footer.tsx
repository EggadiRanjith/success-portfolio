"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Link, Input, Button, Heading, Text } from "@/components/ui";
import { Github, Linkedin, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-primary bg-secondary">
      <div className="max-w-standard mx-auto px-6 py-16">
        <div className={cn("grid gap-10", "grid-cols-1 md:grid-cols-2 lg:grid-cols-4")}>
          {/* Brand */}
          <div>
            <Heading as="h3" size="h4" className="mb-4">
              Your Name
            </Heading>
            <Text size="body" color="tertiary" className="mb-6">
              Crafting luxury digital experiences.
            </Text>
            <div className="flex items-center gap-3">
              <Link href="#" variant="ghost" aria-label="GitHub">
                <Github className="h-5 w-5" />
              </Link>
              <Link href="#" variant="ghost" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link href="#" variant="ghost" aria-label="Twitter/X">
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <Heading as="h3" size="h4" className="mb-4">
              Quick Links
            </Heading>
            <ul className="space-y-3">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/projects">Projects</Link></li>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <Heading as="h3" size="h4" className="mb-4">
              Services
            </Heading>
            <ul className="space-y-3 text-secondary">
              <li>Web Development</li>
              <li>UI/UX Design</li>
              <li>3D Interfaces</li>
              <li>Consulting</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <Heading as="h3" size="h4" className="mb-4">
              Stay Updated
            </Heading>
            <Text size="body" color="tertiary" className="mb-4">
              Subscribe to updates. (Coming soon)
            </Text>
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-3">
              <Input placeholder="your@email.com" className="flex-1" disabled />
              <Button disabled>Subscribe</Button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col md:flex-row items-center gap-3 md:gap-6">
            <Text size="body-sm" color="tertiary">
              © {new Date().getFullYear()} Your Name. All rights reserved.
            </Text>
            <Text size="caption" color="tertiary" className="flex items-center gap-2 font-mono">
              <span className="opacity-60">💡</span>
              <span>Press <kbd className="px-1.5 py-0.5 rounded bg-fg-primary/10 border border-border-primary/30">M</kbd> for a tribute to where it all began.</span>
            </Text>
          </div>
          <div className="flex items-center gap-6 text-body-sm text-secondary">
            <Link href="#">Privacy</Link>
            <Link href="#">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
