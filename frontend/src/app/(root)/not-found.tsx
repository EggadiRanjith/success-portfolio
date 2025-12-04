"use client";

import { motion } from "framer-motion";
import { Container, Heading, Text, Button } from "@/components/ui";
import { Home, ArrowLeft, Search, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react";

const floatingVariants = {
  animate: {
    y: [0, -20, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: [0.4, 0, 0.6, 1] as const,
    },
  },
};

const containerVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export default function NotFound() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main
      role="main"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-primary"
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-primary-orb opacity-50 animate-pulse" />
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {useMemo(() => {
          return [...Array(6)].map((_, i) => ({
            left: Math.random() * 100,
            top: Math.random() * 100,
            duration: 3 + Math.random() * 2,
            key: i,
          }));
        }, []).map((particle) => (
          <motion.div
            key={particle.key}
            className="absolute w-2 h-2 rounded-full bg-accent-blue opacity-20"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
            }}
            variants={floatingVariants}
            animate="animate"
            transition={{
              delay: particle.key * 0.5,
              duration: particle.duration,
            }}
          />
        ))}
      </div>

      <Container variant="standard" size="lg" className="relative z-10">
        <motion.div
          variants={containerVariants}
          initial="initial"
          animate="animate"
          className="text-center max-w-2xl mx-auto"
        >
          {/* Large 404 with gradient */}
          <motion.div variants={itemVariants} className="mb-8">
            <motion.h1
              className="text-[clamp(6rem,15vw,12rem)] font-bold leading-none text-gradient-primary"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                backgroundSize: "200% 200%",
              }}
            >
              404
            </motion.h1>
          </motion.div>

          {/* Icon */}
          <motion.div variants={itemVariants} className="mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-orb-blue border border-border-primary/50 backdrop-blur-sm">
              <AlertCircle className="w-10 h-10 text-fg-primary" />
            </div>
          </motion.div>

          {/* Heading */}
          <motion.div variants={itemVariants} className="mb-4">
            <Heading
              as="h2"
              size="h2"
              className="text-fg-primary mb-3"
            >
              Page Not Found
            </Heading>
          </motion.div>

          {/* Description */}
          <motion.div variants={itemVariants} className="mb-8">
            <Text size="body-lg" color="secondary" className="max-w-md mx-auto">
              The page you&apos;re looking for doesn&apos;t exist or has been moved to a
              different location. Let's get you back on track.
            </Text>
          </motion.div>

          {/* Action buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              variant="primary"
              onClick={() => router.push("/")}
              className="group relative overflow-hidden"
            >
              <Home className="w-4 h-4 mr-2 group-hover:translate-x-0.5 transition-transform" />
              Go Home
            </Button>
            <Button
              variant="secondary"
              onClick={() => router.back()}
              className="group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-0.5 transition-transform" />
              Go Back
            </Button>
            <Button
              variant="ghost"
              onClick={() => router.push("/projects")}
              className="group"
            >
              <Search className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
              Browse Projects
            </Button>
          </motion.div>

          {/* Helpful links */}
          <motion.div
            variants={itemVariants}
            className="mt-12 pt-8 border-t border-border-primary/30"
          >
            <Text size="body-sm" color="tertiary" className="mb-4">
              Quick Links
            </Text>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About" },
                { href: "/projects", label: "Projects" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <button
                  key={link.href}
                  onClick={() => router.push(link.href)}
                  className="text-body-sm text-fg-secondary hover:text-fg-primary transition-colors relative group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent-blue group-hover:w-full transition-all duration-300" />
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </main>
  );
}
