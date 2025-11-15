"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Container, Heading, Text, Button, Input, FrostedCard } from "@/components/ui";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff, Shield } from "lucide-react";
import { useAdminAuth } from "@/context/AdminContext";
import "./admin-input.css";

export default function AdminLoginPage() {
  const router = useRouter();
  const { login } = useAdminAuth();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Default admin password - Change this in production!
  const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin123";

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (password === ADMIN_PASSWORD) {
      login();
      router.push("/admin/dashboard");
    } else {
      setError("Incorrect password. Please try again.");
      setPassword("");
    }

    setIsLoading(false);
  };

  return (
    <main className="min-h-screen bg-primary luxury-gradient-bg flex items-center justify-center p-4">
      <Container size="md" className="max-w-md w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <FrostedCard intensity="medium" className="p-8 glass-frosted border border-primary shadow-2xl">
            {/* Header Section */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="inline-flex items-center justify-center w-20 h-20 rounded-full glass-base mb-6 shadow-lg relative"
              >
                <Lock className="w-10 h-10 text-primary" />
                <div className="absolute -top-1 -right-1">
                  <Shield className="w-6 h-6 text-primary/60" />
                </div>
              </motion.div>
              <Heading as="h1" size="h1" className="mb-3 text-primary">
                Admin Access
              </Heading>
              <Text size="body" color="secondary" className="text-secondary max-w-sm mx-auto">
                Enter your password to access the admin dashboard
              </Text>
            </div>

            {/* Form Section */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label 
                  htmlFor="admin-password" 
                  className="block text-sm font-semibold text-primary mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="admin-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin password"
                    className="w-full px-4 py-3 pr-12 rounded-lg border border-primary bg-primary text-primary transition-smooth disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary/20"
                    required
                    autoFocus
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-tertiary hover:text-primary transition-colors p-1 rounded hover:bg-secondary/50"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2"
                  >
                    <Text size="body-sm" className="text-red-500 dark:text-red-400 flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-red-500"></span>
                      {error}
                    </Text>
                  </motion.div>
                )}
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full glass-base hover:glass-frosted shadow-lg transition-all duration-300"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
                    />
                    Verifying...
                  </span>
                ) : (
                  "Access Dashboard"
                )}
              </Button>
            </form>

            {/* Footer Note */}
            <div className="mt-8 pt-6 border-t border-primary">
              <Text size="body-sm" color="tertiary" className="text-center text-tertiary">
                <span className="inline-flex items-center gap-1">
                  <Lock className="w-3 h-3" />
                  This page is not linked from the main site
                </span>
                <br />
                <span className="text-xs mt-1 block">Only accessible via direct URL</span>
              </Text>
            </div>
          </FrostedCard>
        </motion.div>
      </Container>
    </main>
  );
}

