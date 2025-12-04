"use client";

import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturedProjectsSection } from "@/components/sections/FeaturedProjectsSection";
import { AboutPreviewSection } from "@/components/sections/AboutPreviewSection";
import { TechStackSection } from "@/components/sections/TechStackSection";

export default function Home() {
  return (
    <main id="main-content" role="main" className="min-h-screen bg-primary" aria-label="Main content" tabIndex={-1}>
      <HeroSection />
      <FeaturedProjectsSection />
      <AboutPreviewSection />
      <TechStackSection />
    </main>
  );
}

