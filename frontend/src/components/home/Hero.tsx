"use client";

import React from "react";
import { Container, Heading, Text, Button, Link } from "@/components/ui";
import { useRouter } from "next/navigation";
import { useMagneticHover } from "@/hooks/useMagneticHover";

export function Hero() {
  const router = useRouter();
  const primaryBtnRef = useMagneticHover<HTMLButtonElement>();
  const secondaryBtnRef = useMagneticHover<HTMLButtonElement>();

  return (
    <section className="relative min-h-screen bg-primary flex items-center justify-center px-6 py-16">
      <Container variant="content" size="lg" className="relative">
        <div className="flex flex-col items-center gap-8 max-w-3xl mx-auto text-center">
          {/* Eyebrow - hidden on mobile */}
          <p className="hidden sm:block text-caption text-tertiary reveal-on-scroll">
            Premium Frontend Experiences
          </p>

          {/* Heading (theme tokenized) */}
          <Heading as="h1" size="display" className="text-primary reveal-on-scroll">
            Crafting Luxury Digital Experiences
          </Heading>

          {/* Subtext */}
          <Text size="body-xl" color="secondary" className="max-w-xl reveal-on-scroll">
            Frontend developer specializing in premium web interfaces, 3D, and motion.
          </Text>

          {/* CTA cluster */}
          <div className="flex flex-col sm:flex-row gap-4 items-center pt-2 reveal-on-scroll">
            <Button
              ref={primaryBtnRef}
              size="lg"
              onClick={() => router.push("/projects")}
              className="hover-glow pressable"
            >
              View My Work
            </Button>
            <Button
              ref={secondaryBtnRef}
              variant="secondary"
              size="lg"
              onClick={() => router.push("/contact")}
              className="hover-glow pressable"
            >
              Get In Touch
            </Button>
          </div>

          {/* Tertiary link (optional) */}
          <div className="reveal-on-scroll">
            <Link href="#projects" variant="underline" showArrow className="underline-sweep">
              Or explore all work
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
