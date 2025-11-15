"use client";

import { Container, Heading, Text, FormField, FrostedCard } from "@/components/ui";
import { type HeroData } from "@/lib/adminData";

interface HeroFormProps {
  data: HeroData;
  onChange: (data: HeroData) => void;
}

export function HeroForm({ data, onChange }: HeroFormProps) {
  const updateTitle = (field: "line1" | "line2", subField?: "prefix" | "highlight", value?: string) => {
    if (field === "line1" && value !== undefined) {
      onChange({
        ...data,
        title: {
          ...data.title,
          line1: value,
        },
      });
    } else if (field === "line2" && subField && value !== undefined) {
      onChange({
        ...data,
        title: {
          ...data.title,
          line2: {
            ...data.title.line2,
            [subField]: value,
          },
        },
      });
    }
  };


  return (
    <div className="space-y-6">
      <FrostedCard intensity="medium" className="p-8 glass-frosted border border-primary shadow-lg">
        <Heading as="h2" size="h2" className="mb-6 text-primary">
          Hero Section Content
        </Heading>

        <div className="space-y-6">
          {/* Title Section */}
          <div>
            <Text size="body" className="mb-4 text-primary font-semibold">
              Hero Title
            </Text>
            <div className="space-y-4">
              <FormField
                label="Title Line 1"
                value={data.title.line1}
                onChange={(value) => updateTitle("line1", undefined, value)}
                type="text"
                placeholder="e.g., Backend & Full-Stack"
              />
              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  label="Title Line 2 - Prefix"
                  value={data.title.line2.prefix}
                  onChange={(value) => updateTitle("line2", "prefix", value)}
                  type="text"
                  placeholder="e.g., Developer "
                />
                <FormField
                  label="Title Line 2 - Highlight"
                  value={data.title.line2.highlight}
                  onChange={(value) => updateTitle("line2", "highlight", value)}
                  type="text"
                  placeholder="e.g., Building Scalable Systems"
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <FormField
            label="Hero Description"
            value={data.description}
            onChange={(value) => onChange({ ...data, description: value })}
            type="textarea"
            rows={4}
            placeholder="Professional summary for hero section"
          />
        </div>
      </FrostedCard>
    </div>
  );
}

