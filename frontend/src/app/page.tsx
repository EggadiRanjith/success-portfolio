import { Hero } from "@/components/home/Hero";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { AboutPreview } from "@/components/home/AboutPreview";
import { TechStack } from "@/components/home/TechStack";
import {
  Button,
  Card,
  Badge,
  Link,
  Heading,
  Text,
  Container,
  Input,
  Label,
} from "@/components/ui";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";

export const metadata = {
  title: "Home",
  description: "Premium frontend portfolio with glassmorphism, animation, and 3D.",
};

export default function Home() {
  return (
    <main role="main" className="min-h-screen bg-primary" aria-label="Main content">
      <Hero />
      <FeaturedProjects />
      <AboutPreview />
      <TechStack />
    </main>
  );
}
