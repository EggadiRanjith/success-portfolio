"use client";

import { Container, Heading, Text, FormField, FrostedCard } from "@/components/ui";
import { type PortfolioData } from "@/lib/adminData";

interface StatsFormProps {
  data: PortfolioData["stats"];
  onChange: (data: PortfolioData["stats"]) => void;
}

export function StatsForm({ data, onChange }: StatsFormProps) {
  const updateField = (field: keyof PortfolioData["stats"], value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <FrostedCard intensity="medium" className="p-8 glass-frosted border border-primary shadow-lg">
      <Heading as="h2" size="h2" className="mb-6 text-primary">
        Statistics
      </Heading>

      <div className="grid md:grid-cols-2 gap-6">
        <FormField
          label="Production APIs"
          value={data.productionAPIs}
          onChange={(value) => updateField("productionAPIs", value)}
          type="text"
          placeholder="e.g., 10+"
        />

        <FormField
          label="Years Experience"
          value={data.yearsExperience}
          onChange={(value) => updateField("yearsExperience", value)}
          type="text"
          placeholder="e.g., 3+"
        />

        <FormField
          label="Cloud Deployments"
          value={data.cloudDeployments}
          onChange={(value) => updateField("cloudDeployments", value)}
          type="text"
          placeholder="e.g., 5+"
        />

        <FormField
          label="LeetCode Solved"
          value={data.leetcodeSolved}
          onChange={(value) => updateField("leetcodeSolved", value)}
          type="text"
          placeholder="e.g., 150+"
        />
      </div>
    </FrostedCard>
  );
}

