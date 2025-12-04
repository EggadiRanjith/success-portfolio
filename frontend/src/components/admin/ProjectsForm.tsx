"use client";

import { Container, Heading, Text, FormField, FrostedCard, Button, Badge } from "@/components/ui";
import { type Project } from "@/lib/adminData";
import { Plus, Trash2, X, ChevronDown, ChevronUp, Upload, Image as ImageIcon } from "lucide-react";
import { useState } from "react";

interface ProjectsFormProps {
  data: Project[];
  onChange: (data: Project[]) => void;
}

export function ProjectsForm({ data, onChange }: ProjectsFormProps) {
  const [expandedProjects, setExpandedProjects] = useState<Set<string>>(new Set());

  const toggleExpand = (id: string) => {
    const newExpanded = new Set(expandedProjects);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedProjects(newExpanded);
  };

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      title: "",
      description: "",
      image: "",
      tags: [],
      category: "",
      year: new Date().getFullYear().toString(),
      featured: false,
    };
    onChange([...data, newProject]);
  };

  const updateProject = (id: string, field: keyof Project, value: any) => {
    onChange(
      data.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  const addTag = (id: string, tag: string) => {
    const project = data.find((p) => p.id === id);
    if (project && tag.trim()) {
      updateProject(id, "tags", [...project.tags, tag.trim()]);
    }
  };

  const removeTag = (id: string, tagIndex: number) => {
    const project = data.find((p) => p.id === id);
    if (project) {
      updateProject(id, "tags", project.tags.filter((_, i) => i !== tagIndex));
    }
  };

  const removeProject = (id: string) => {
    onChange(data.filter((p) => p.id !== id));
  };

  // Convert file to base64
  const handleImageUpload = async (id: string, file: File, isMainImage: boolean = true) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        if (isMainImage) {
          updateProject(id, "image", base64String);
        } else {
          const project = data.find((p) => p.id === id);
          if (project) {
            const images = project.images || [];
            updateProject(id, "images", [...images, base64String]);
          }
        }
        resolve(base64String);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // Remove uploaded image from gallery
  const removeGalleryImage = (id: string, index: number) => {
    const project = data.find((p) => p.id === id);
    if (project && project.images) {
      updateProject(id, "images", project.images.filter((_, i) => i !== index));
    }
  };

  return (
    <FrostedCard intensity="medium" className="p-8 glass-frosted border border-primary shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <Heading as="h2" size="h2" className="text-primary">
          Projects
        </Heading>
        <Button variant="primary" onClick={addProject} className="glass-base hover:glass-frosted">
          <Plus className="w-4 h-4 mr-2" />
          Add Project
        </Button>
      </div>

      <div className="space-y-6">
        {data.map((project) => {
          const isExpanded = expandedProjects.has(project.id);
          return (
            <div key={project.id} className="glass-frosted p-6 rounded-xl border border-primary shadow-md mb-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleExpand(project.id)}
                    className="p-1 hover:bg-secondary/50 rounded transition-colors text-primary"
                  >
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>
                  <Text size="body-lg" color="primary" className="font-semibold text-primary">
                    {project.title || "Untitled Project"}
                  </Text>
                  {project.featured && (
                    <Badge variant="glass" size="sm" className="bg-orb-blue text-accent-blue border border-accent-blue/30">
                      Featured
                    </Badge>
                  )}
                </div>
                <Button variant="ghost" size="sm" onClick={() => removeProject(project.id)} className="hover:bg-orb-red">
                  <Trash2 className="w-4 h-4 text-error" />
                </Button>
              </div>

              {isExpanded && (
                <div className="space-y-4 pt-4 border-t border-primary">
                  <FormField
                    label="Title"
                    value={project.title}
                    onChange={(value) => updateProject(project.id, "title", value)}
                    type="text"
                    placeholder="Project title"
                  />

                  <FormField
                    label="Short Description"
                    value={project.description}
                    onChange={(value) => updateProject(project.id, "description", value)}
                    type="textarea"
                    rows={3}
                    placeholder="Brief project description"
                  />

                  <FormField
                    label="Long Description (Optional)"
                    value={project.longDescription || ""}
                    onChange={(value) => updateProject(project.id, "longDescription", value)}
                    type="textarea"
                    rows={5}
                    placeholder="Detailed project description"
                  />

                  <div>
                    <Text size="body-sm" color="secondary" className="mb-2 font-medium">
                      Main Image
                    </Text>
                    <div className="space-y-3">
                      {/* Image Upload */}
                      <div>
                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-primary/50 rounded-lg cursor-pointer hover:border-primary transition-colors bg-secondary/50">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-8 h-8 mb-2 text-primary" />
                            <Text size="body-sm" color="secondary" className="mb-1">
                              <span className="font-semibold">Click to upload</span> or drag and drop
                            </Text>
                            <Text size="body-sm" color="tertiary">
                              PNG, JPG, GIF up to 10MB
                            </Text>
                          </div>
                          <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                if (file.size > 10 * 1024 * 1024) {
                                  alert("File size must be less than 10MB");
                                  return;
                                }
                                handleImageUpload(project.id, file, true);
                              }
                            }}
                          />
                        </label>
                      </div>
                      
                      {/* Current Image Preview */}
                      {project.image && (
                        <div className="relative">
                          <div className="relative w-full h-48 rounded-lg overflow-hidden border border-primary/50">
                            <img
                              src={project.image}
                              alt="Project preview"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <button
                            onClick={() => updateProject(project.id, "image", "")}
                            className="absolute top-2 right-2 p-1 bg-error/80 hover:bg-error rounded text-fg-primary"
                            type="button"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      )}

                      {/* Or use URL */}
                      <div className="pt-2 border-t border-primary/30">
                        <Text size="body-sm" color="tertiary" className="mb-2">
                          Or enter image URL:
                        </Text>
                        <FormField
                          label=""
                          value={project.image && !project.image.startsWith("data:") ? project.image : ""}
                          onChange={(value) => updateProject(project.id, "image", value)}
                          type="url"
                          placeholder="https://images.unsplash.com/..."
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <FormField
                      label="Category"
                      value={project.category}
                      onChange={(value) => updateProject(project.id, "category", value)}
                      type="text"
                      placeholder="e.g., AI/Backend"
                    />

                    <FormField
                      label="Year"
                      value={project.year}
                      onChange={(value) => updateProject(project.id, "year", value)}
                      type="text"
                      placeholder="2024"
                    />

                    <div className="flex items-end">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={project.featured}
                          onChange={(e) => updateProject(project.id, "featured", e.target.checked)}
                          className="w-4 h-4 rounded border-border-primary/50"
                        />
                        <Text size="body-sm" color="secondary">
                          Featured Project
                        </Text>
                      </label>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      label="GitHub URL (Optional)"
                      value={project.githubUrl || ""}
                      onChange={(value) => updateProject(project.id, "githubUrl", value)}
                      type="url"
                      placeholder="https://github.com/..."
                    />

                    <FormField
                      label="Live URL (Optional)"
                      value={project.liveUrl || ""}
                      onChange={(value) => updateProject(project.id, "liveUrl", value)}
                      type="url"
                      placeholder="https://project-demo.com"
                    />
                  </div>

                  <div>
                    <Text size="body-sm" color="secondary" className="mb-2 font-medium">
                      Tags
                    </Text>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {project.tags.map((tag, index) => (
                        <Badge key={index} variant="glass" className="flex items-center gap-1">
                          {tag}
                          <button
                            onClick={() => removeTag(project.id, index)}
                            className="ml-1 hover:text-error"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <input
                      type="text"
                      placeholder="Add tag and press Enter"
                      className="w-full px-3 py-2 rounded-lg text-sm bg-secondary border border-border-primary/50 text-fg-primary focus:outline-none focus:ring-2 focus:ring-accent-blue/50"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addTag(project.id, e.currentTarget.value);
                          e.currentTarget.value = "";
                        }
                      }}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      label="Role (Optional)"
                      value={project.role || ""}
                      onChange={(value) => updateProject(project.id, "role", value)}
                      type="text"
                      placeholder="e.g., Backend Developer"
                    />
                    <FormField
                      label="Timeline (Optional)"
                      value={project.timeline || ""}
                      onChange={(value) => updateProject(project.id, "timeline", value)}
                      type="text"
                      placeholder="e.g., 6 months"
                    />
                  </div>

                  <div>
                    <Text size="body-sm" color="secondary" className="mb-2 font-medium">
                      Technologies (Optional)
                    </Text>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {(project.technologies || []).map((tech, index) => (
                        <Badge key={index} variant="glass" className="flex items-center gap-1">
                          {tech}
                          <button
                            onClick={() => {
                              const techs = project.technologies || [];
                              updateProject(project.id, "technologies", techs.filter((_, i) => i !== index));
                            }}
                            className="ml-1 hover:text-error"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <input
                      type="text"
                      placeholder="Add technology and press Enter"
                      className="w-full px-3 py-2 rounded-lg text-sm bg-secondary border border-border-primary/50 text-fg-primary focus:outline-none focus:ring-2 focus:ring-accent-blue/50"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          const techs = project.technologies || [];
                          if (e.currentTarget.value.trim()) {
                            updateProject(project.id, "technologies", [...techs, e.currentTarget.value.trim()]);
                            e.currentTarget.value = "";
                          }
                        }
                      }}
                    />
                  </div>

                  <div>
                    <Text size="body-sm" color="secondary" className="mb-2 font-medium">
                      Features (Optional)
                    </Text>
                    <div className="space-y-2 mb-2">
                      {(project.features || []).map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={feature}
                            onChange={(e) => {
                              const features = project.features || [];
                              const updated = [...features];
                              updated[index] = e.target.value;
                              updateProject(project.id, "features", updated);
                            }}
                            className="flex-1 px-3 py-2 rounded-lg text-sm bg-secondary border border-border-primary/50 text-fg-primary focus:outline-none focus:ring-2 focus:ring-accent-blue/50"
                            placeholder="Feature description"
                          />
                          <button
                            onClick={() => {
                              const features = project.features || [];
                              updateProject(project.id, "features", features.filter((_, i) => i !== index));
                            }}
                            className="p-1 hover:text-error"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const features = project.features || [];
                        updateProject(project.id, "features", [...features, ""]);
                      }}
                      className="w-full"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Feature
                    </Button>
                  </div>

                  <div>
                    <Text size="body-sm" color="secondary" className="mb-2 font-medium">
                      Challenges (Optional)
                    </Text>
                    <div className="space-y-2 mb-2">
                      {(project.challenges || []).map((challenge, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={challenge}
                            onChange={(e) => {
                              const challenges = project.challenges || [];
                              const updated = [...challenges];
                              updated[index] = e.target.value;
                              updateProject(project.id, "challenges", updated);
                            }}
                            className="flex-1 px-3 py-2 rounded-lg text-sm bg-secondary border border-border-primary/50 text-fg-primary focus:outline-none focus:ring-2 focus:ring-accent-blue/50"
                            placeholder="Challenge description"
                          />
                          <button
                            onClick={() => {
                              const challenges = project.challenges || [];
                              updateProject(project.id, "challenges", challenges.filter((_, i) => i !== index));
                            }}
                            className="p-1 hover:text-error"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const challenges = project.challenges || [];
                        updateProject(project.id, "challenges", [...challenges, ""]);
                      }}
                      className="w-full"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Challenge
                    </Button>
                  </div>

                  <div>
                    <Text size="body-sm" color="secondary" className="mb-2 font-medium">
                      Solutions (Optional)
                    </Text>
                    <div className="space-y-2 mb-2">
                      {(project.solutions || []).map((solution, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={solution}
                            onChange={(e) => {
                              const solutions = project.solutions || [];
                              const updated = [...solutions];
                              updated[index] = e.target.value;
                              updateProject(project.id, "solutions", updated);
                            }}
                            className="flex-1 px-3 py-2 rounded-lg text-sm bg-secondary border border-border-primary/50 text-fg-primary focus:outline-none focus:ring-2 focus:ring-accent-blue/50"
                            placeholder="Solution description"
                          />
                          <button
                            onClick={() => {
                              const solutions = project.solutions || [];
                              updateProject(project.id, "solutions", solutions.filter((_, i) => i !== index));
                            }}
                            className="p-1 hover:text-error"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const solutions = project.solutions || [];
                        updateProject(project.id, "solutions", [...solutions, ""]);
                      }}
                      className="w-full"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Solution
                    </Button>
                  </div>

                  <div>
                    <Text size="body-sm" color="secondary" className="mb-2 font-medium">
                      Results (Optional) - Metric & Label pairs
                    </Text>
                    <div className="space-y-2 mb-2">
                      {(project.results || []).map((result, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={result.metric}
                            onChange={(e) => {
                              const results = project.results || [];
                              const updated = [...results];
                              updated[index] = { ...updated[index], metric: e.target.value };
                              updateProject(project.id, "results", updated);
                            }}
                            className="flex-1 px-3 py-2 rounded-lg text-sm bg-secondary border border-border-primary/50 text-fg-primary focus:outline-none focus:ring-2 focus:ring-accent-blue/50"
                            placeholder="Metric (e.g., 25%)"
                          />
                          <input
                            type="text"
                            value={result.label}
                            onChange={(e) => {
                              const results = project.results || [];
                              const updated = [...results];
                              updated[index] = { ...updated[index], label: e.target.value };
                              updateProject(project.id, "results", updated);
                            }}
                            className="flex-1 px-3 py-2 rounded-lg text-sm bg-secondary border border-border-primary/50 text-fg-primary focus:outline-none focus:ring-2 focus:ring-accent-blue/50"
                            placeholder="Label (e.g., Response Time Improvement)"
                          />
                          <button
                            onClick={() => {
                              const results = project.results || [];
                              updateProject(project.id, "results", results.filter((_, i) => i !== index));
                            }}
                            className="p-1 hover:text-error"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const results = project.results || [];
                        updateProject(project.id, "results", [...results, { metric: "", label: "" }]);
                      }}
                      className="w-full"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Result
                    </Button>
                  </div>

                  <div>
                    <Text size="body-sm" color="secondary" className="mb-2 font-medium">
                      Additional Images (Optional)
                    </Text>
                    <div className="space-y-3">
                      {/* Image Upload for Gallery */}
                      <div>
                        <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-primary/50 rounded-lg cursor-pointer hover:border-primary transition-colors bg-secondary/50">
                          <div className="flex flex-col items-center justify-center pt-3 pb-3">
                            <ImageIcon className="w-6 h-6 mb-1 text-primary" />
                            <Text size="body-sm" color="secondary">
                              <span className="font-semibold">Upload image</span> for gallery
                            </Text>
                          </div>
                          <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                if (file.size > 10 * 1024 * 1024) {
                                  alert("File size must be less than 10MB");
                                  return;
                                }
                                handleImageUpload(project.id, file, false);
                              }
                            }}
                          />
                        </label>
                      </div>

                      {/* Gallery Images Preview */}
                      {(project.images || []).length > 0 && (
                        <div className="grid grid-cols-2 gap-3">
                          {project.images.map((img, index) => (
                            <div key={index} className="relative">
                              <div className="relative w-full h-32 rounded-lg overflow-hidden border border-primary/50">
                                <img
                                  src={img}
                                  alt={`Gallery image ${index + 1}`}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <button
                                onClick={() => removeGalleryImage(project.id, index)}
                                className="absolute top-1 right-1 p-1 bg-error/80 hover:bg-error rounded text-fg-primary"
                                type="button"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Or use URLs */}
                      <div className="pt-2 border-t border-primary/30">
                        <Text size="body-sm" color="tertiary" className="mb-2">
                          Or enter image URLs (one per line):
                        </Text>
                        <FormField
                          label=""
                          value={(project.images || [])
                            .filter(img => !img.startsWith("data:"))
                            .join("\n")}
                          onChange={(value) => {
                            const existingBase64 = (project.images || []).filter(img => img.startsWith("data:"));
                            const newUrls = value.split("\n").filter(url => url.trim() && !url.startsWith("data:"));
                            updateProject(project.id, "images", [...existingBase64, ...newUrls]);
                          }}
                          type="textarea"
                          rows={3}
                          placeholder="https://images.unsplash.com/...&#10;https://images.unsplash.com/..."
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </FrostedCard>
  );
}

