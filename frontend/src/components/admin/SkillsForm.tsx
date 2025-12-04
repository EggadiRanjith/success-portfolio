"use client";

import { Container, Heading, Text, FormField, FrostedCard, Button, Badge } from "@/components/ui";
import { type Skill } from "@/lib/adminData";
import { Plus, Trash2, X } from "lucide-react";

interface SkillsFormProps {
  data: Skill[];
  onChange: (data: Skill[]) => void;
}

export function SkillsForm({ data, onChange }: SkillsFormProps) {
  const addSkillCategory = () => {
    onChange([
      ...data,
      {
        category: "",
        items: [],
      },
    ]);
  };

  const updateCategory = (index: number, field: keyof Skill, value: any) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const addSkillItem = (categoryIndex: number) => {
    const updated = [...data];
    updated[categoryIndex].items.push("");
    onChange(updated);
  };

  const updateSkillItem = (categoryIndex: number, itemIndex: number, value: string) => {
    const updated = [...data];
    updated[categoryIndex].items[itemIndex] = value;
    onChange(updated);
  };

  const removeSkillItem = (categoryIndex: number, itemIndex: number) => {
    const updated = [...data];
    updated[categoryIndex].items = updated[categoryIndex].items.filter((_, i) => i !== itemIndex);
    onChange(updated);
  };

  const removeCategory = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
  };

  return (
    <FrostedCard intensity="medium" className="p-8 glass-frosted border border-primary shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <Heading as="h2" size="h2" className="text-primary">
          Skills
        </Heading>
        <Button variant="primary" onClick={addSkillCategory} className="glass-base hover:glass-frosted">
          <Plus className="w-4 h-4 mr-2" />
          Add Category
        </Button>
      </div>

      <div className="space-y-6">
        {data.map((skill, categoryIndex) => (
          <div key={categoryIndex} className="glass-frosted p-6 rounded-xl border border-primary shadow-md mb-4">
            <div className="flex items-center justify-between mb-4">
              <FormField
                label="Category Name"
                value={skill.category}
                onChange={(value) => updateCategory(categoryIndex, "category", value)}
                type="text"
                placeholder="e.g., Programming Languages"
                className="flex-1"
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeCategory(categoryIndex)}
                className="ml-4 hover:bg-orb-red"
              >
                <Trash2 className="w-4 h-4 text-error" />
              </Button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Text size="body-sm" color="secondary" className="font-medium">
                  Skills
                </Text>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => addSkillItem(categoryIndex)}
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Skill
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {skill.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => updateSkillItem(categoryIndex, itemIndex, e.target.value)}
                      placeholder="Skill name"
                      className="px-3 py-1.5 rounded-lg text-sm bg-secondary border border-border-primary/50 text-fg-primary focus:outline-none focus:ring-2 focus:ring-accent-blue/50"
                    />
                    <button
                      onClick={() => removeSkillItem(categoryIndex, itemIndex)}
                      className="p-1 hover:bg-orb-red rounded transition-colors"
                    >
                      <X className="w-4 h-4 text-error" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </FrostedCard>
  );
}

