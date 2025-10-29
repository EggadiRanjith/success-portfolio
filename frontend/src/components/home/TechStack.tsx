"use client";

import React from "react";
import { TECH_STACK } from "@/lib/constants";
import { Badge, Heading, Container } from "@/components/ui";
import { Code, Zap, Wrench, Palette } from "lucide-react";

const CATEGORY_ICONS = {
  frontend: Code,
  animation: Zap,
  tools: Wrench,
  design: Palette,
};

export function TechStack() {
  return (
    <section className="py-24">
      <Container variant="standard" size="lg">
        <div className="text-center mb-16 reveal-on-scroll">
          <p className="text-caption text-tertiary mb-4">EXPERTISE</p>
          <Heading as="h2" size="h2">Technologies I Master</Heading>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(TECH_STACK).map(([category, skills]) => {
            const Icon = CATEGORY_ICONS[category as keyof typeof CATEGORY_ICONS];
            return (
              <div key={category} className="glass-frosted p-6 rounded-lg hover:scale-105 hover:shadow-glow transition-all duration-300 reveal-on-scroll">
                {Icon && <Icon className="h-8 w-8 text-secondary mb-4" />}
                <h3 className="text-h4 text-primary mb-4 capitalize">
                  {category === "frontend" ? "Frontend" : category === "animation" ? "Animation & 3D" : category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {(skills as string[]).map((skill) => (
                    <Badge key={skill} size="sm" variant="outline">{skill}</Badge>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
