"use client";

import React, { useState, useRef, useEffect } from "react";
import { Container, Heading, Text, Button } from "@/components/ui";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { Mail, MapPin, Phone, Send, Check } from "lucide-react";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(SplitText);
}

const CONTACT_INFO = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@yourname.com",
    href: "mailto:hello@yourname.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+1 (555) 123-4567",
    href: "tel:+15551234567",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "San Francisco, CA",
    href: "https://maps.google.com",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const heroRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const contactInfoRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(heroRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView || !headingRef.current) return;

    const ctx = gsap.context(() => {
      // Eyebrow animation
      if (eyebrowRef.current) {
        gsap.from(eyebrowRef.current, {
          opacity: 0,
          y: 20,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.1,
        });
      }

      // Split text animation
      if (headingRef.current) {
        const split = new SplitText(headingRef.current, { type: "chars,words" });
        
        gsap.from(split.chars, {
          opacity: 0,
          y: 60,
          rotateX: -90,
          stagger: 0.025,
          duration: 0.9,
          ease: "back.out(1.7)",
          delay: 0.2,
        });

        gsap.to(split.chars, {
          y: -2,
          stagger: {
            each: 0.03,
            repeat: -1,
            yoyo: true,
          },
          duration: 2.8,
          ease: "sine.inOut",
          delay: 1.2,
        });
      }

      // Description
      if (descriptionRef.current) {
        gsap.from(descriptionRef.current, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.5,
        });
      }

      // Form animation
      if (formRef.current) {
        const fields = formRef.current.querySelectorAll(".form-field");
        gsap.from(fields, {
          opacity: 0,
          x: -30,
          stagger: 0.1,
          duration: 0.6,
          ease: "power3.out",
          delay: 0.7,
        });
      }

      // Contact info
      if (contactInfoRef.current) {
        const items = contactInfoRef.current.querySelectorAll(".contact-item");
        gsap.from(items, {
          opacity: 0,
          x: 30,
          stagger: 0.1,
          duration: 0.6,
          ease: "power3.out",
          delay: 0.7,
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, [isInView]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setStatus("success");
    setFormData({ name: "", email: "", subject: "", message: "" });

    setTimeout(() => setStatus("idle"), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative py-32 lg:py-40 overflow-hidden border-b border-border-primary/20 bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-zinc-950 dark:via-black dark:to-zinc-900"
      >
        {/* Gradient Orbs */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[20%] left-[10%] w-[600px] h-[600px] bg-gradient-radial from-blue-100/40 via-indigo-100/20 to-transparent dark:from-blue-500/20 dark:via-indigo-500/10 dark:to-transparent blur-3xl" />
          <div className="absolute bottom-[20%] right-[10%] w-[700px] h-[700px] bg-gradient-radial from-purple-100/30 via-violet-100/15 to-transparent dark:from-purple-500/15 dark:via-violet-500/8 dark:to-transparent blur-3xl" />
        </div>

        <Container variant="standard" size="xl" className="relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <p 
              ref={eyebrowRef}
              className="text-caption text-tertiary uppercase tracking-[0.3em] mb-6 font-medium"
            >
              ✦ Get In Touch ✦
            </p>
            
            <h1 
              ref={headingRef}
              className="text-[clamp(3rem,8vw,7rem)] leading-[1.05] tracking-tight font-bold text-primary mb-8"
              style={{ 
                fontFamily: "var(--font-sans)",
                textShadow: "0 2px 30px rgba(0,0,0,0.2)",
              }}
            >
              Let's Create{" "}
              <span className="text-gradient-silver inline-block">Something Amazing</span>
            </h1>

            <p 
              ref={descriptionRef}
              className="text-[clamp(1.125rem,1.8vw,1.375rem)] leading-relaxed text-secondary max-w-2xl mx-auto font-light"
            >
              Have a project in mind? Let's discuss how we can work together to bring your vision to life.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="form-field">
                    <label htmlFor="name" className="block text-sm font-medium text-primary mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl glass-card border border-border-primary bg-secondary text-primary placeholder:text-tertiary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor="email" className="block text-sm font-medium text-primary mb-2">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl glass-card border border-border-primary bg-secondary text-primary placeholder:text-tertiary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label htmlFor="subject" className="block text-sm font-medium text-primary mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl glass-card border border-border-primary bg-secondary text-primary placeholder:text-tertiary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    placeholder="Project Inquiry"
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="message" className="block text-sm font-medium text-primary mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl glass-card border border-border-primary bg-secondary text-primary placeholder:text-tertiary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={status === "submitting"}
                  className="w-full hover-glow pressable relative overflow-hidden"
                >
                  {status === "submitting" && (
                    <span className="flex items-center gap-2">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Send className="w-5 h-5" />
                      </motion.div>
                      Sending...
                    </span>
                  )}
                  {status === "success" && (
                    <span className="flex items-center gap-2">
                      <Check className="w-5 h-5" />
                      Message Sent!
                    </span>
                  )}
                  {status === "idle" && (
                    <span className="flex items-center gap-2">
                      <Send className="w-5 h-5" />
                      Send Message
                    </span>
                  )}
                  {status === "error" && "Try Again"}
                </Button>

                {status === "success" && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center text-sm text-green-600 dark:text-green-400"
                  >
                    Thank you! I'll get back to you soon.
                  </motion.p>
                )}
              </form>
            </div>

            {/* Contact Info */}
            <div ref={contactInfoRef} className="space-y-6">
              {CONTACT_INFO.map((info, index) => {
                const Icon = info.icon;
                return (
                  <a
                    key={index}
                    href={info.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-item block glass-card p-6 rounded-xl border border-border-primary hover:scale-105 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-primary/10">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-tertiary mb-1">{info.label}</p>
                        <p className="text-body font-semibold text-primary">{info.value}</p>
                      </div>
                    </div>
                  </a>
                );
              })}

              <div className="glass-card p-6 rounded-xl border border-border-primary">
                <h3 className="text-h5 font-bold text-primary mb-3">Working Hours</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-tertiary">Monday - Friday</span>
                    <span className="text-primary font-medium">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-tertiary">Weekend</span>
                    <span className="text-primary font-medium">By Appointment</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
