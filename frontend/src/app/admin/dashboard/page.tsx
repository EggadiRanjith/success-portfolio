"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "@/context/AdminContext";
import { Container, Heading, Text, Button } from "@/components/ui";
import { motion } from "framer-motion";
import { 
  Sparkles, User, GraduationCap, Award, Code2, FolderKanban, BarChart3, 
  LogOut, Save, RefreshCw, Plus, Trash2, Edit2 
} from "lucide-react";
import { 
  getPortfolioData, 
  savePortfolioData, 
  resetToDefaults,
  type PortfolioData 
} from "@/lib/adminData";
import { PersonalInfoForm } from "@/components/admin/PersonalInfoForm";
import { EducationForm } from "@/components/admin/EducationForm";
import { CertificationsForm } from "@/components/admin/CertificationsForm";
import { SkillsForm } from "@/components/admin/SkillsForm";
import { ProjectsForm } from "@/components/admin/ProjectsForm";
import { StatsForm } from "@/components/admin/StatsForm";
import { HeroForm } from "@/components/admin/HeroForm";

export default function AdminDashboard() {
  const router = useRouter();
  const { isAuthenticated, logout } = useAdminAuth();
  const [data, setData] = useState<PortfolioData | null>(null);
  const [activeTab, setActiveTab] = useState<string>("hero");
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/admin");
      return;
    }

    // Load data from API
    const loadData = async () => {
      try {
        const portfolioData = await getPortfolioData();
        // Ensure hero field exists
        if (!portfolioData.hero) {
          portfolioData.hero = {
            title: {
              line1: "Backend & Full-Stack",
              line2: {
                prefix: "Developer ",
                highlight: "Building Scalable Systems",
              },
            },
            description:
              "Computer Science graduate specializing in backend and full-stack development. Experienced in Java, Python, JavaScript, Microservices, REST APIs, and AWS. Building scalable, secure, and performance-optimized applications.",
            stats: [
              { label: "Production APIs", value: "10+" },
              { label: "Years Experience", value: "3+" },
              { label: "Cloud Deployments", value: "5+" },
            ],
            socialLinks: [
              { href: "https://github.com/EggadiRanjith", label: "GitHub" },
              { href: "https://linkedin.com/in/ranjitheggadi", label: "LinkedIn" },
              { href: "https://leetcode.com/ranjitheggadi", label: "LeetCode" },
            ],
            ctaButtons: [
              { text: "View Projects", href: "/projects", variant: "primary" },
              { text: "Get in Touch", href: "/contact", variant: "secondary" },
            ],
          };
          await savePortfolioData(portfolioData);
        }
        setData(portfolioData);
      } catch (error) {
        console.error("Error loading portfolio data:", error);
        // Fallback: try to get default data
        try {
          const fallbackData = await getPortfolioData();
          setData(fallbackData);
        } catch (fallbackError) {
          console.error("Error loading fallback data:", fallbackError);
          // If all else fails, set null and show error
          setData(null);
        }
      }
    };

    loadData();
  }, [isAuthenticated, router]);

  const handleSave = async () => {
    if (!data) return;

    setIsSaving(true);
    try {
      await savePortfolioData(data);
      setSaveMessage("Data saved successfully to server! All users will see the changes.");
      setTimeout(() => setSaveMessage(""), 3000);
    } catch (error) {
      console.error("Error saving data:", error);
      setSaveMessage("Error saving data. Please try again.");
      setTimeout(() => setSaveMessage(""), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = async () => {
    const confirmed = window.confirm(
      "⚠️ WARNING: This will reset ALL your portfolio data to the default values.\n\n" +
      "This includes:\n" +
      "• Personal Information\n" +
      "• Education\n" +
      "• Certifications\n" +
      "• Skills\n" +
      "• Projects\n" +
      "• Statistics\n\n" +
      "This action CANNOT be undone. Are you sure you want to continue?"
    );
    
    if (confirmed) {
      try {
        await resetToDefaults();
        const defaultData = await getPortfolioData();
        setData(defaultData);
        setSaveMessage("⚠️ Data reset to defaults - Remember to save!");
        setTimeout(() => setSaveMessage(""), 5000);
      } catch (error) {
        console.error("Error resetting data:", error);
        setSaveMessage("Error resetting data. Please try again.");
        setTimeout(() => setSaveMessage(""), 3000);
      }
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/admin");
  };

  if (!isAuthenticated || !data) {
    return null;
  }

  const tabs = [
    { id: "hero", label: "Hero", icon: Sparkles },
    { id: "personal", label: "Personal Info", icon: User },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "certifications", label: "Certifications", icon: Award },
    { id: "skills", label: "Skills", icon: Code2 },
    { id: "projects", label: "Projects", icon: FolderKanban },
    { id: "stats", label: "Statistics", icon: BarChart3 },
  ];

  return (
    <main className="min-h-screen bg-primary luxury-gradient-bg">
      {/* Header */}
      <div className="sticky top-0 z-40 glass-frosted border-b border-primary shadow-lg">
        <Container size="lg" className="py-4">
          <div className="flex items-center justify-between">
            <Heading as="h1" size="h2" className="text-primary">
              Admin Dashboard
            </Heading>
            <div className="flex items-center gap-4">
              {saveMessage && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                  <Text size="body-sm" className="text-success">
                    {saveMessage}
                  </Text>
                </motion.div>
              )}
              <Button 
                variant="primary" 
                onClick={handleSave} 
                disabled={isSaving}
                className="glass-base hover:glass-frosted"
              >
                <Save className="w-4 h-4 mr-2" />
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
              <Button 
                variant="glass" 
                onClick={handleReset}
                className="glass-frosted hover:glass-base border border-primary"
                title="Reset all data to default values (this will restore original portfolio data)"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Reset to Defaults
              </Button>
              <Button 
                variant="ghost" 
                onClick={handleLogout}
                className="hover:bg-secondary/50"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </Container>
      </div>

      <Container size="lg" className="py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="glass-frosted p-4 rounded-xl border border-primary sticky top-24 shadow-lg">
              <Text size="body-sm" color="tertiary" className="mb-4 uppercase tracking-wider font-semibold text-tertiary">
                Sections
              </Text>
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                        activeTab === tab.id
                          ? "glass-base text-primary border border-primary shadow-md"
                          : "text-secondary hover:bg-secondary/50 hover:text-primary"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === "hero" && (
                <HeroForm data={data.hero} onChange={(hero) => setData({ ...data, hero })} />
              )}
              {activeTab === "personal" && (
                <PersonalInfoForm data={data.personalInfo} onChange={(personalInfo) => setData({ ...data, personalInfo })} />
              )}
              {activeTab === "education" && (
                <EducationForm data={data.education} onChange={(education) => setData({ ...data, education })} />
              )}
              {activeTab === "certifications" && (
                <CertificationsForm data={data.certifications} onChange={(certifications) => setData({ ...data, certifications })} />
              )}
              {activeTab === "skills" && (
                <SkillsForm data={data.skills} onChange={(skills) => setData({ ...data, skills })} />
              )}
              {activeTab === "projects" && (
                <ProjectsForm data={data.projects} onChange={(projects) => setData({ ...data, projects })} />
              )}
              {activeTab === "stats" && (
                <StatsForm data={data.stats} onChange={(stats) => setData({ ...data, stats })} />
              )}
            </motion.div>
          </div>
        </div>
      </Container>
    </main>
  );
}

