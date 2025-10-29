"use client";

import React from "react";
import { Button, Heading, Text, Container } from "@/components/ui";
import { Calendar, Briefcase, Users } from "lucide-react";

const ABOUT_STATS = [
  { label: "Years", value: "3+", icon: Calendar },
  { label: "Projects", value: "15+", icon: Briefcase },
  { label: "Clients", value: "10+", icon: Users },
];

export function AboutPreview() {
  return (
    <section className="py-24 gradient-mesh-dark">
      <Container variant="standard" size="lg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="order-2 lg:order-1 reveal-on-scroll">
            <div className="rounded-2xl glass-frosted p-1 overflow-hidden">
              <div className="aspect-square rounded-xl glass-frosted flex items-center justify-center">
                <div className="text-center">
                  <Users className="h-12 w-12 text-secondary mx-auto mb-2" />
                  <p className="text-caption text-tertiary">Portrait coming soon</p>
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <p className="text-caption text-tertiary mb-4 reveal-on-scroll">ABOUT ME</p>
            <Heading as="h2" size="h2" className="mb-6 reveal-on-scroll">
              Pushing Boundaries Through Code & Design
            </Heading>
            <div className="space-y-4 mb-8">
              <Text size="body" color="secondary" className="reveal-on-scroll">
                I'm a frontend developer passionate about creating premium digital experiences. With expertise in modern web technologies, 3D graphics, and sophisticated animations, I bring design visions to life.
              </Text>
              <Text size="body" color="secondary" className="reveal-on-scroll">
                Every project is an opportunity to push boundaries and establish new standards for what's possible on the web.
              </Text>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
              {ABOUT_STATS.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="text-center reveal-on-scroll">
                    <Icon className="h-5 w-5 text-secondary mx-auto mb-2" />
                    <p className="text-display text-primary font-bold">{stat.value}</p>
                    <p className="text-caption text-tertiary">{stat.label}</p>
                  </div>
                );
              })}
            </div>

            <Button variant="primary" size="lg" onClick={() => (window.location.href = "/about")} className="reveal-on-scroll hover-glow pressable">More About Me</Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
