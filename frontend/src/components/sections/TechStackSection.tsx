/**
 * Tech Stack Component
 * Professional layout with error handling
 */

"use client";

import React, { useEffect, useState } from "react";
import { Container, Heading, Text, Badge, Card } from "@/components/ui";
import { useTheme } from "@/context/ThemeContext";
import {
  TECH_STACK_CONTENT,
} from "@/constants/techStack";
import { getPortfolioData, type Skill } from "@/lib/adminData";

// Icon mapping for categories
const categoryIcons: Record<string, string> = {
  "Programming Languages": "💻",
  "Backend Development": "⚡",
  "Frontend Development": "🎨",
  "Databases": "🗄️",
  "Cloud & DevOps": "☁️",
  "AI & Automation": "🤖",
  "Languages": "💻",
};

export function TechStackSection() {
  const { theme } = useTheme();
  const [techCategories, setTechCategories] = useState<Array<{ title: string; icon: string; technologies: string[] }>>([]);

  // Load tech stack from admin data
  useEffect(() => {
    if (typeof window === "undefined") return;

    const loadTechStack = async () => {
      try {
        const data = await getPortfolioData();
        if (data?.skills) {
          const categories = data.skills.map((skill: Skill) => ({
            title: skill.category,
            icon: categoryIcons[skill.category] || "⚡",
            technologies: skill.items,
          }));
          setTechCategories(categories);
        }
      } catch (error) {
        console.error("Error loading tech stack:", error);
        setTechCategories([]);
      }
    };

    loadTechStack();

    // Listen for updates
    const handlePortfolioUpdate = () => {
      loadTechStack();
    };

    window.addEventListener("portfolio-data-updated", handlePortfolioUpdate);

    return () => {
      window.removeEventListener("portfolio-data-updated", handlePortfolioUpdate);
    };
  }, []);


  return (
    <section
      className="relative overflow-hidden"
      style={{
        paddingTop: "clamp(1.5rem, 3vh + 0.5rem, 2.5rem)",
        paddingBottom: "clamp(1.5rem, 3vh + 0.5rem, 2.5rem)",
        backgroundColor: theme === "dark" ? "var(--color-bg-primary)" : "#FAFAFA",
      }}
    >

      <Container size="lg" className="relative z-10 px-4 sm:px-6">
        {/* Modern Mobile-Optimized Header */}
        <div 
          className="text-center mb-6 sm:mb-8 md:mb-10"
        >
          <Text
            size="body-sm"
            color="primary"
            className="font-semibold uppercase tracking-wider mb-3 sm:mb-4"
            style={{
              fontSize: "clamp(0.7rem, 1.5vw, 0.875rem)",
            }}
          >
            {TECH_STACK_CONTENT.label}
          </Text>

          <Heading
            as="h2"
            size="h2"
            className="mb-4 sm:mb-5 md:mb-6 text-shadow-theme"
            style={{
              fontSize: "clamp(1.5rem, 5vw + 0.5rem, 2.5rem)",
              lineHeight: "1.15",
              letterSpacing: "-0.02em",
            }}
          >
            {TECH_STACK_CONTENT.title.prefix}
            {" "}
            <span
              style={{
                backgroundImage: theme === "dark"
                  ? "linear-gradient(135deg, #60A5FA, #A78BFA, #22D3EE)"
                  : "linear-gradient(135deg, #1E40AF, #5B21B6, #0C4A6E)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                MozBackgroundClip: "text" as any,
                MozTextFillColor: "transparent" as any,
                boxDecorationBreak: "clone",
                WebkitBoxDecorationBreak: "clone",
                transition: "background-image 0.4s ease-in-out",
              }}
            >
              {TECH_STACK_CONTENT.title.highlight}
            </span>
          </Heading>

          <Text
            size="body-lg"
            color="secondary"
            className="mx-auto max-w-full sm:max-w-2xl px-2 sm:px-0"
            style={{
              fontSize: "clamp(0.9375rem, 2vw, 1.125rem)",
              lineHeight: "1.7",
            }}
          >
            {TECH_STACK_CONTENT.description}
          </Text>
        </div>

        {/* Modern Mobile-Optimized Tech Grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 mb-6 sm:mb-8 md:mb-10"
        >
          {techCategories.length > 0 ? techCategories.map((category, index) => (
            <div
              key={category.title}
              className="w-full"
            >
              <Card
                variant="glass"
                hoverable
                animated={false}
                className="h-full active:scale-95 touch-manipulation p-4 sm:p-5 md:p-6 lg:p-8 transition-all duration-300 hover:shadow-xl"
              >
                <div className="flex items-center mb-3 sm:mb-4 md:mb-5 gap-3 sm:gap-4">
                  <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl flex-shrink-0">
                    {category.icon}
                  </div>
                  <h3 
                    className="font-bold text-fg-primary group-hover:text-gradient-silver transition-all duration-300 leading-tight flex-1 min-w-0"
                    style={{
                      fontSize: "clamp(1rem, 2.5vw, 1.5rem)",
                    }}
                  >
                    {category.title}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2 sm:gap-2.5">
                  {category.technologies.map((tech) => (
                    <Badge
                      key={tech}
                      variant="outline"
                      className="group-hover:scale-105 transition-transform duration-300"
                      style={{
                        fontSize: "clamp(0.7rem, 1.5vw, 0.875rem)",
                        padding: "clamp(0.375rem, 1vw, 0.5rem) clamp(0.625rem, 1.5vw, 0.875rem)",
                      }}
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </Card>
            </div>
          )) : (
            <div className="col-span-full text-center py-8 sm:py-10">
              <Text 
                size="body" 
                color="secondary"
                style={{
                  fontSize: "clamp(0.875rem, 2vw, 1rem)",
                }}
              >
                No tech stack data available. Please add skills in the admin panel.
              </Text>
            </div>
          )}
        </div>

        {/* Modern Mobile-Optimized Note */}
        <div
          className="text-center glass-base rounded-xl border border-border-primary/50 mx-auto p-4 sm:p-5 md:p-6 max-w-full sm:max-w-3xl"
        >
          <Text 
            size="body" 
            color="secondary" 
            className="leading-relaxed"
            style={{
              fontSize: "clamp(0.875rem, 2vw, 1rem)",
              lineHeight: "1.7",
            }}
          >
            <span dangerouslySetInnerHTML={{ __html: TECH_STACK_CONTENT.note }} />
          </Text>
        </div>
      </Container>
    </section>
  );
}

