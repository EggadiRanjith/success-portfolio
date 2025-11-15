"use client";

import { useLoader } from "@/context/LoaderContext";
import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PageGateProps {
  children: ReactNode;
}

/**
 * PageGate - Gate keeper component with smooth transitions
 * Hides page content while loader is visible (even during fade out)
 * Prevents flicker by waiting for loader to fully disappear
 */
export function PageGate({ children }: PageGateProps) {
  const { isLoaderVisible } = useLoader();

  return (
    <AnimatePresence mode="wait">
      {!isLoaderVisible && (
        <motion.div
          key="page-content"
          className="page-gate-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          style={{
            willChange: "opacity",
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
