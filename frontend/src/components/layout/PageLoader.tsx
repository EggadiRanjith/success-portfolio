"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const loaderVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const barVariants = {
  initial: { scaleX: 0, originX: 0 },
  animate: {
    scaleX: [0, 0.5, 0.8, 1],
    transition: {
      duration: 0.6,
      ease: [0.43, 0.13, 0.23, 0.96],
    },
  },
  exit: {
    scaleX: [1, 1.2, 0],
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

/**
 * PageLoader - Modern loading indicator for page transitions
 * Shows a sleek progress bar at the top during route changes
 */
export function PageLoader() {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    setProgress(0);

    // Simulate progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + Math.random() * 20;
      });
    }, 50);

    // Complete loading when pathname changes
    const timer = setTimeout(() => {
      setProgress(100);
      setTimeout(() => {
        setIsLoading(false);
        setProgress(0);
      }, 200);
    }, 300);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [pathname]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed top-0 left-0 right-0 z-[1000] h-1"
          variants={loaderVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <motion.div
            className="h-full bg-gradient-primary shadow-lg shadow-accent-purple/50"
            variants={barVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{
              scaleX: progress / 100,
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

