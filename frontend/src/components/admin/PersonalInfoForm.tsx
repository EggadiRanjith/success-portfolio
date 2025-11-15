"use client";

import { Container, Heading, Text, FormField, FrostedCard } from "@/components/ui";
import { type PersonalInfo } from "@/lib/adminData";

interface PersonalInfoFormProps {
  data: PersonalInfo;
  onChange: (data: PersonalInfo) => void;
}

export function PersonalInfoForm({ data, onChange }: PersonalInfoFormProps) {
  const updateField = (field: keyof PersonalInfo, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const updateLinks = (field: keyof PersonalInfo["links"], value: string) => {
    onChange({
      ...data,
      links: { ...data.links, [field]: value },
    });
  };

  return (
    <FrostedCard intensity="medium" className="p-8 glass-frosted border border-primary shadow-lg">
      <Heading as="h2" size="h2" className="mb-6 text-primary">
        Personal Information
      </Heading>

      <div className="space-y-6">
        <FormField
          label="Full Name"
          value={data.name}
          onChange={(value) => updateField("name", value)}
          type="text"
          placeholder="Your full name"
        />

        <FormField
          label="Professional Title"
          value={data.title}
          onChange={(value) => updateField("title", value)}
          type="text"
          placeholder="e.g., Backend & Full-Stack Developer | AWS Certified"
        />

        <FormField
          label="Description"
          value={data.description}
          onChange={(value) => updateField("description", value)}
          type="textarea"
          rows={4}
          placeholder="Professional summary"
        />

        <div className="grid md:grid-cols-2 gap-6">
          <FormField
            label="Email"
            value={data.email}
            onChange={(value) => updateField("email", value)}
            type="email"
            placeholder="your.email@example.com"
          />

          <FormField
            label="Phone"
            value={data.phone}
            onChange={(value) => updateField("phone", value)}
            type="text"
            placeholder="+91-XXXXXXXXXX"
          />
        </div>

        <FormField
          label="Location"
          value={data.location}
          onChange={(value) => updateField("location", value)}
          type="text"
          placeholder="City, State, Country"
        />

        <FormField
          label="Portfolio URL"
          value={data.url}
          onChange={(value) => updateField("url", value)}
          type="url"
          placeholder="https://yourportfolio.com"
        />

        <div className="pt-6 border-t border-primary">
          <Heading as="h3" size="h3" className="mb-4 text-primary">
            Social Links
          </Heading>
          <div className="space-y-4">
            <FormField
              label="GitHub"
              value={data.links.github}
              onChange={(value) => updateLinks("github", value)}
              type="url"
              placeholder="https://github.com/username"
            />

            <FormField
              label="LinkedIn"
              value={data.links.linkedin}
              onChange={(value) => updateLinks("linkedin", value)}
              type="url"
              placeholder="https://linkedin.com/in/username"
            />

            <FormField
              label="LeetCode"
              value={data.links.leetcode}
              onChange={(value) => updateLinks("leetcode", value)}
              type="url"
              placeholder="https://leetcode.com/username"
            />

            {data.links.twitter && (
              <FormField
                label="Twitter/X"
                value={data.links.twitter}
                onChange={(value) => updateLinks("twitter", value)}
                type="url"
                placeholder="https://twitter.com/username"
              />
            )}
          </div>
        </div>
      </div>
    </FrostedCard>
  );
}

