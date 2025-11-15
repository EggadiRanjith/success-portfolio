import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturedProjectsSection } from "@/components/sections/FeaturedProjectsSection";
import { AboutPreviewSection } from "@/components/sections/AboutPreviewSection";
import { TechStackSection } from "@/components/sections/TechStackSection";

export const metadata = {
  title: "Home",
  description: "Premium frontend portfolio with glassmorphism, animation, and 3D.",
};

export default function Home() {
  return (
    <main role="main" className="min-h-screen bg-primary" aria-label="Main content">
      <HeroSection />
      <FeaturedProjectsSection />
      <AboutPreviewSection />
      <TechStackSection />
    </main>
  );
}
