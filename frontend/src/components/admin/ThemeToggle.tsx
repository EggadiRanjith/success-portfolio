"use client";

import { Button } from "@/components/ui";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Button
      variant="glass"
      aria-label="Toggle theme"
      onClick={toggleTheme}
      className="glass-frosted hover:glass-base transition-smooth p-3 rounded-full"
    >
      {mounted ? (
        <AnimatePresence mode="wait">
          <motion.div
            key={theme}
            initial={{ rotate: -180, scale: 0.9 }}
            animate={{ rotate: 0, scale: 1 }}
            exit={{ rotate: 180, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 180, damping: 18 }}
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5 text-fg-primary" />
            ) : (
              <Moon className="h-5 w-5 text-fg-primary" />
            )}
          </motion.div>
        </AnimatePresence>
      ) : (
        <div className="h-5 w-5" />
      )}
    </Button>
  );
}

