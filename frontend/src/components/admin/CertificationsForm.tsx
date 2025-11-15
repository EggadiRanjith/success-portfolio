"use client";

import { Container, Heading, Text, FormField, FrostedCard, Button } from "@/components/ui";
import { type Certification } from "@/lib/adminData";
import { Plus, Trash2 } from "lucide-react";

interface CertificationsFormProps {
  data: Certification[];
  onChange: (data: Certification[]) => void;
}

export function CertificationsForm({ data, onChange }: CertificationsFormProps) {
  const addCertification = () => {
    onChange([
      ...data,
      {
        name: "",
        issuer: "",
        date: "",
        credentialId: "",
        verificationLink: "",
      },
    ]);
  };

  const updateCertification = (index: number, field: keyof Certification, value: string) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const removeCertification = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
  };

  return (
    <FrostedCard intensity="medium" className="p-8 glass-frosted border border-primary shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <Heading as="h2" size="h2" className="text-primary">
          Certifications
        </Heading>
        <Button variant="primary" onClick={addCertification} className="glass-base hover:glass-frosted">
          <Plus className="w-4 h-4 mr-2" />
          Add Certification
        </Button>
      </div>

      <div className="space-y-6">
        {data.map((cert, index) => (
          <div key={index} className="glass-frosted p-6 rounded-xl border border-primary shadow-md mb-4">
            <div className="flex items-center justify-between mb-4">
              <Text size="body-lg" color="primary" className="font-semibold text-primary">
                Certification #{index + 1}
              </Text>
              <Button variant="ghost" size="sm" onClick={() => removeCertification(index)} className="hover:bg-red-500/10">
                <Trash2 className="w-4 h-4 text-red-500 dark:text-red-400" />
              </Button>
            </div>

            <div className="space-y-4">
              <FormField
                label="Certification Name"
                value={cert.name}
                onChange={(value) => updateCertification(index, "name", value)}
                type="text"
                placeholder="e.g., AWS Certified Cloud Practitioner"
              />

              <FormField
                label="Issuer"
                value={cert.issuer}
                onChange={(value) => updateCertification(index, "issuer", value)}
                type="text"
                placeholder="e.g., Amazon Web Services"
              />

              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  label="Date"
                  value={cert.date}
                  onChange={(value) => updateCertification(index, "date", value)}
                  type="text"
                  placeholder="e.g., 2024"
                />

                <FormField
                  label="Credential ID"
                  value={cert.credentialId}
                  onChange={(value) => updateCertification(index, "credentialId", value)}
                  type="text"
                  placeholder="e.g., AWS-CP"
                />
              </div>

              <FormField
                label="Verification Link"
                value={cert.verificationLink}
                onChange={(value) => updateCertification(index, "verificationLink", value)}
                type="url"
                placeholder="https://credly.com/badges/..."
              />
            </div>
          </div>
        ))}
      </div>
    </FrostedCard>
  );
}

