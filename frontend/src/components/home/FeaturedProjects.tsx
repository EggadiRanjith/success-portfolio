"use client";

import React from "react";
import { Container, Card, Badge, Link, Heading, Text } from "@/components/ui";
import { FEATURED_PROJECTS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function FeaturedProjects() {
  return (
    <section className="py-24">
      <Container variant="standard" size="lg">
        <div className="mb-16 reveal-on-scroll">
          <p className="text-caption text-tertiary mb-3">SELECTED WORK</p>
          <Heading as="h2" size="h2">Featured Projects</Heading>
        </div>

        <div className="projects-grid grid grid-cols-1 md:grid-cols-3 gap-6 overflow-visible">
          {FEATURED_PROJECTS.map((project, i) => (
            <Card
              key={project.id}
              variant="hover"
              className={cn("relative z-10 overflow-visible reveal-on-scroll hover-glow", i < 2 ? "md:col-span-2" : "md:col-span-1")}
            >
              <div className="parallax-wrap relative aspect-video overflow-hidden bg-rich-slate">
                <div className="parallax-inner absolute inset-0 bg-gradient-to-br from-pure-white/10 to-transparent flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-body text-secondary">{project.title}</p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <Badge key={tag} size="sm">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <h3 className="text-h4 text-primary mb-2">{project.title}</h3>
                <Text size="body-sm" color="tertiary" className="mb-6 line-clamp-2">
                  {project.description}
                </Text>

                <Link href="/projects" variant="underline" showArrow className="underline-sweep">
                  View Project
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
