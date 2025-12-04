"use client";

import { Container, Heading, Text, Button, FormField, FrostedCard } from "@/components/ui";
import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/animations/AnimatedSection";
import { fadeInUp, staggerContainer } from "@/lib/motionVariants";
import { Mail, Github, Linkedin, Code2, Send } from "lucide-react";
import { useState } from "react";
import { trackEvent } from "@/components/Analytics";
import { useTheme } from "@/context/ThemeContext";

const SOCIAL_LINKS = [
  {
    name: "GitHub",
    icon: <Github className="w-6 h-6" />,
    href: "https://github.com/EggadiRanjith",
    color: "hover:text-fg-primary",
  },
  {
    name: "LinkedIn",
    icon: <Linkedin className="w-6 h-6" />,
    href: "https://linkedin.com/in/ranjitheggadi",
    color: "hover:text-accent-blue",
  },
  {
    name: "LeetCode",
    icon: <Code2 className="w-6 h-6" />,
    href: "https://leetcode.com/ranjitheggadi",
    color: "hover:text-accent-orange",
  },
];

export default function ContactPage() {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({ name: "", email: "", message: "" });
  const [touched, setTouched] = useState({ name: false, email: false, message: false });

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateField = (field: string, value: string) => {
    switch (field) {
      case "name":
        return value.length < 2 ? "Name must be at least 2 characters" : "";
      case "email":
        return !validateEmail(value) ? "Please enter a valid email address" : "";
      case "message":
        return value.length < 10 ? "Message must be at least 10 characters" : "";
      default:
        return "";
    }
  };

  const handleBlur = (field: string) => {
    setTouched({ ...touched, [field]: true });
    const error = validateField(field, formData[field as keyof typeof formData]);
    setErrors({ ...errors, [field]: error });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const nameError = validateField("name", formData.name);
    const emailError = validateField("email", formData.email);
    const messageError = validateField("message", formData.message);
    
    if (nameError || emailError || messageError) {
      setErrors({ name: nameError, email: emailError, message: messageError });
      setTouched({ name: true, email: true, message: true });
      return;
    }
    
    setIsSubmitting(true);
    
    // Track form submission
    trackEvent("contact_form_submit", {
      form_name: "contact",
      has_message: formData.message.length > 0,
    });
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    alert("Thank you for your message! I'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
    setErrors({ name: "", email: "", message: "" });
    setTouched({ name: false, email: false, message: false });
  };

  return (
    <main role="main" className="min-h-screen bg-primary">
      <section className="relative py-20 sm:py-24 md:py-32 overflow-hidden">
        {/* Background gradient orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 -right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-orb-purple rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 -left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-orb-pink rounded-full blur-3xl" />
        </div>

        <Container size="lg" className="relative z-10">
          <AnimatedSection variant="stagger">
            {/* Header */}
            <motion.div variants={fadeInUp} className="text-center mb-12 sm:mb-16 px-4">
              <Text size="body-sm" color="primary" className="font-semibold uppercase tracking-wider mb-4 text-xs sm:text-sm">
                Get In Touch
              </Text>
              <Heading
                as="h1"
                size="h1"
                className="mb-6 text-shadow-theme"
                style={{
                  fontSize: "clamp(1.5rem, 6vw, 3.5rem)",
                  lineHeight: "1.15",
                  paddingLeft: "clamp(0.5rem, 2vw, 1rem)",
                  paddingRight: "clamp(0.5rem, 2vw, 1rem)",
                }}
              >
                <span
                  style={{
                    backgroundImage: theme === "dark"
                      ? "linear-gradient(135deg, #60A5FA, #A78BFA, #22D3EE)"
                      : "linear-gradient(135deg, #1E40AF, #5B21B6, #0C4A6E)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    // @ts-ignore - Mozilla-specific properties
                    MozBackgroundClip: "text",
                    // @ts-ignore - Mozilla-specific properties
                    MozTextFillColor: "transparent",
                    boxDecorationBreak: "clone",
                    WebkitBoxDecorationBreak: "clone",
                    transition: "background-image 0.4s ease-in-out",
                  }}
                >
                  Let's Build Something Amazing Together
                </span>
              </Heading>
              <Text size="body-lg" color="secondary" className="max-w-2xl mx-auto px-2 text-sm sm:text-base md:text-lg">
                Have a project in mind? Want to collaborate? I&apos;m always open to discussing new opportunities.
              </Text>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-start px-2">
              {/* Contact Info */}
              <motion.div variants={staggerContainer} className="space-y-6 sm:space-y-8">
                <motion.div variants={fadeInUp}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-xl glass-base border border-border-primary/50">
                      <Mail className="w-6 h-6 text-fg-primary" />
                    </div>
                    <div>
                      <Heading as="h3" size="h4" className="mb-1">
                        Email
                      </Heading>
                      <Text size="body" color="secondary">
                        <a href="mailto:ranjitheggadi4@gmail.com" className="hover:text-fg-primary transition-colors">
                          ranjitheggadi4@gmail.com
                        </a>
                      </Text>
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={fadeInUp}>
                  <Heading as="h3" size="h4" className="mb-4 sm:mb-6">
                    Connect With Me
                  </Heading>
                  <div className="flex gap-3 sm:gap-4">
                    {SOCIAL_LINKS.map((social, index) => (
                      <motion.a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        variants={fadeInUp}
                        custom={index}
                        className={`p-3 sm:p-4 rounded-xl glass-base border border-border-primary/50 text-fg-secondary transition-all ${social.color} touch-manipulation`}
                        whileHover={{ y: -4, scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label={social.name}
                      >
                        <div className="w-5 h-5 sm:w-6 sm:h-6">{social.icon}</div>
                      </motion.a>
                    ))}
                  </div>
                </motion.div>

                <motion.div variants={fadeInUp} className="glass-card p-6 rounded-xl border border-border-primary/50">
                  <Heading as="h3" size="h4" className="mb-4">
                    Response Time
                  </Heading>
                  <Text size="body" color="secondary">
                    I typically respond within 24-48 hours. For urgent matters, feel free to reach out via LinkedIn.
                  </Text>
                </motion.div>
              </motion.div>

              {/* Contact Form with FrostedCard */}
              <motion.div variants={fadeInUp}>
                <FrostedCard intensity="heavy" glow shimmer className="p-6 sm:p-8">
                  <form onSubmit={handleSubmit} className="space-y-2 sm:space-y-3">
                    <FormField
                      label="Name"
                      value={formData.name}
                      onChange={(value) => setFormData({ ...formData, name: value })}
                      onBlur={() => handleBlur("name")}
                      type="text"
                      error={touched.name ? errors.name : ""}
                      success={touched.name && !errors.name && formData.name.length > 0}
                      placeholder="Your name"
                      required
                    />

                    <FormField
                      label="Email"
                      value={formData.email}
                      onChange={(value) => setFormData({ ...formData, email: value })}
                      onBlur={() => handleBlur("email")}
                      type="email"
                      error={touched.email ? errors.email : ""}
                      success={touched.email && !errors.email && formData.email.length > 0}
                      placeholder="your.email@example.com"
                      required
                    />

                    <FormField
                      label="Message"
                      value={formData.message}
                      onChange={(value) => setFormData({ ...formData, message: value })}
                      onBlur={() => handleBlur("message")}
                      type="textarea"
                      error={touched.message ? errors.message : ""}
                      success={touched.message && !errors.message && formData.message.length > 0}
                      placeholder="Tell me about your project..."
                      rows={6}
                      required
                    />

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="pt-3 sm:pt-4"
                    >
                      <Button
                        type="submit"
                        size="lg"
                        disabled={isSubmitting}
                        className="w-full group touch-manipulation text-base sm:text-lg"
                      >
                        {isSubmitting ? (
                          "Sending..."
                        ) : (
                          <>
                            Send Message
                            <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </Button>
                    </motion.div>
                  </form>
                </FrostedCard>
              </motion.div>
            </div>
          </AnimatedSection>
        </Container>
      </section>
    </main>
  );
}

