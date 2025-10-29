"use client";

import React, { useState } from "react";
import { Heading, Text, Input, Button, Link } from "@/components/ui";

export default function ContactClient() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(formData: FormData) {
    setIsSubmitting(true);
    setErrors({});
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const subject = String(formData.get("subject") || "").trim();
    const message = String(formData.get("message") || "").trim();

    const newErrors: Record<string, string> = {};
    if (name.length < 2) newErrors.name = "Name required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Valid email required";
    if (subject.length < 5) newErrors.subject = "Subject required";
    if (message.length < 10) newErrors.message = "Message required";

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    await new Promise((r) => setTimeout(r, 600));
    setSubmitted(true);
    setIsSubmitting(false);
    (document.getElementById("contact-form") as HTMLFormElement)?.reset();
    setTimeout(() => setSubmitted(false), 4000);
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
      <div className="lg:col-span-2">
        <form id="contact-form" action={onSubmit} className="space-y-6" noValidate>
          <div>
            <label className="block text-body font-medium mb-2">Name</label>
            <Input name="name" placeholder="Your name" aria-invalid={!!errors.name} aria-describedby={errors.name ? "error-name" : undefined} />
            {errors.name && <p id="error-name" className="text-sm text-red-500 mt-1">{errors.name}</p>}
          </div>
          <div>
            <label className="block text-body font-medium mb-2">Email</label>
            <Input name="email" type="email" placeholder="you@example.com" aria-invalid={!!errors.email} aria-describedby={errors.email ? "error-email" : undefined} />
            {errors.email && <p id="error-email" className="text-sm text-red-500 mt-1">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-body font-medium mb-2">Subject</label>
            <Input name="subject" placeholder="Project details" aria-invalid={!!errors.subject} aria-describedby={errors.subject ? "error-subject" : undefined} />
            {errors.subject && <p id="error-subject" className="text-sm text-red-500 mt-1">{errors.subject}</p>}
          </div>
          <div>
            <label className="block text-body font-medium mb-2">Message</label>
            <textarea
              name="message"
              placeholder="Tell me about your project..."
              className="w-full px-4 py-3 rounded-lg glass-base text-pure-white placeholder:text-medium-gray focus:outline-none focus:ring-2 focus:ring-pure-white/30 min-h-32"
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "error-message" : undefined}
            />
            {errors.message && <p id="error-message" className="text-sm text-red-500 mt-1">{errors.message}</p>}
          </div>
          <div>
            <label className="block text-body-sm text-medium-gray mb-2">Budget (optional)</label>
            <select
              name="budget"
              className="w-full px-4 py-3 rounded-lg glass-base text-pure-white focus:outline-none focus:ring-2 focus:ring-pure-white/30"
            >
              <option value="">Select budget range</option>
              <option value="<5k">Less than $5K</option>
              <option value="5k-10k">$5K - $10K</option>
              <option value="10k-25k">$10K - $25K</option>
              <option value=">25k">$25K+</option>
            </select>
          </div>
          <Button type="submit" size="lg" className="w-full hover-glow pressable" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
          {submitted && (
            <div className="p-4 rounded-lg glass-frosted border border-green-500/30" role="status" aria-live="polite">
              <Text size="body" color="primary">Message sent! I’ll get back to you soon.</Text>
            </div>
          )}
        </form>
      </div>
      <div className="lg:col-span-1">
        <div className="glass-frosted p-8 rounded-2xl sticky top-24 space-y-6" role="complementary" aria-label="Contact information">
          <Heading as="h3" size="h4">Contact Info</Heading>
          <div>
            <p className="text-body-sm text-medium-gray">Email</p>
            <a href="mailto:hello@yourname.com" className="text-body text-pure-white">hello@yourname.com</a>
          </div>
          <div>
            <p className="text-body-sm text-medium-gray">Location</p>
            <p className="text-body text-pure-white">Available Worldwide</p>
          </div>
          <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
            <p className="text-body-sm text-green-400">🟢 Available for new projects</p>
          </div>
          <div className="flex gap-3">
            <Link href="#" variant="ghost">GitHub</Link>
            <Link href="#" variant="ghost">LinkedIn</Link>
          </div>
        </div>
      </div>
    </div>
  );
}


