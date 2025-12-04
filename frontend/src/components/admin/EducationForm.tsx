"use client";

import { Container, Heading, Text, FormField, FrostedCard, Button } from "@/components/ui";
import { type Education } from "@/lib/adminData";
import { Plus, Trash2 } from "lucide-react";

interface EducationFormProps {
  data: Education[];
  onChange: (data: Education[]) => void;
}

export function EducationForm({ data, onChange }: EducationFormProps) {
  const addEducation = () => {
    onChange([
      ...data,
      {
        degree: "",
        institution: "",
        location: "",
        startDate: "",
        endDate: "",
      },
    ]);
  };

  const updateEducation = (index: number, field: keyof Education, value: string) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const removeEducation = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
  };

  return (
    <FrostedCard intensity="medium" className="p-8 glass-frosted border border-primary shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <Heading as="h2" size="h2" className="text-primary">
          Education
        </Heading>
        <Button variant="primary" onClick={addEducation} className="glass-base hover:glass-frosted">
          <Plus className="w-4 h-4 mr-2" />
          Add Education
        </Button>
      </div>

      <div className="space-y-6">
        {data.map((edu, index) => (
          <div key={index} className="glass-frosted p-6 rounded-xl border border-primary shadow-md mb-4">
            <div className="flex items-center justify-between mb-4">
              <Text size="body-lg" color="primary" className="font-semibold text-primary">
                Education #{index + 1}
              </Text>
              {data.length > 1 && (
                <Button variant="ghost" size="sm" onClick={() => removeEducation(index)} className="hover:bg-orb-red">
                  <Trash2 className="w-4 h-4 text-error" />
                </Button>
              )}
            </div>

            <div className="space-y-4">
              <FormField
                label="Degree"
                value={edu.degree}
                onChange={(value) => updateEducation(index, "degree", value)}
                type="text"
                placeholder="e.g., Bachelor of Technology in Computer Science"
              />

              <FormField
                label="Institution"
                value={edu.institution}
                onChange={(value) => updateEducation(index, "institution", value)}
                type="text"
                placeholder="University/College name"
              />

              <FormField
                label="Location"
                value={edu.location}
                onChange={(value) => updateEducation(index, "location", value)}
                type="text"
                placeholder="City, State, Country"
              />

              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  label="Start Date"
                  value={edu.startDate}
                  onChange={(value) => updateEducation(index, "startDate", value)}
                  type="text"
                  placeholder="e.g., Sep. 2020"
                />

                <FormField
                  label="End Date"
                  value={edu.endDate}
                  onChange={(value) => updateEducation(index, "endDate", value)}
                  type="text"
                  placeholder="e.g., Jun. 2024 or Present"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </FrostedCard>
  );
}

