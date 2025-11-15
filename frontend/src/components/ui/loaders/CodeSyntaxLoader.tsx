"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface CodeSyntaxLoaderProps {
  visible: boolean;
}

const codeLines = [
  "export const portfolio = {",
  "  skills: [",
  "    'TypeScript',",
  "    'React',",
  "    'Next.js',",
  "    'Node.js'",
  "  ],",
  "  status: 'Ready'",
  "};",
];

export function CodeSyntaxLoader({ visible }: CodeSyntaxLoaderProps) {
  const [currentLine, setCurrentLine] = useState(0);
  const [typingText, setTypingText] = useState("");
  const [mounted, setMounted] = useState(false);

  // All hooks must be called before any conditional returns
  useEffect(() => {
    setMounted(true);
  }, []);

  // Control body scroll during loading
  useEffect(() => {
    if (visible) {
      document.body.style.overflow = "hidden";
      document.documentElement.setAttribute("data-loader-active", "true");
    } else {
      document.body.style.overflow = "";
      document.documentElement.removeAttribute("data-loader-active");
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.removeAttribute("data-loader-active");
    };
  }, [visible]);

  // Typing animation effect
  useEffect(() => {
    if (!visible) {
      setCurrentLine(0);
      setTypingText("");
      return;
    }

    if (currentLine < codeLines.length) {
      const line = codeLines[currentLine];
      let charIndex = 0;

      const typingInterval = setInterval(() => {
        if (charIndex <= line.length) {
          setTypingText(line.slice(0, charIndex));
          charIndex++;
        } else {
          clearInterval(typingInterval);
          setTimeout(() => {
            setCurrentLine((prev) => prev + 1);
            setTypingText("");
          }, 200);
        }
      }, 40);

      return () => clearInterval(typingInterval);
    }
  }, [visible, currentLine]);

  // Conditional return after all hooks
  if (!mounted) return null;

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          className="fixed inset-0 z-[1100] flex items-center justify-center bg-primary"
          data-loader-container
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ 
            duration: 0.4,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          onAnimationComplete={(definition) => {
            // Ensure loader stays visible until fade out completes
            if (definition === "exit" && !visible) {
              // Fade out complete, but we keep it mounted until context updates
            }
          }}
          style={{
            willChange: "opacity",
            pointerEvents: visible ? "auto" : "none",
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{
              duration: 0.3,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="bg-fg-primary/5 backdrop-blur-xl border border-border-primary/50 rounded-lg p-6 max-w-md w-full mx-4 font-mono"
          >
            {/* File header */}
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border-primary/30">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <span className="text-body-sm text-fg-secondary ml-2">
                portfolio.ts
              </span>
            </div>

            {/* Code lines */}
            <div className="space-y-1">
              {codeLines.slice(0, currentLine).map((line, index) => (
                <motion.div
                  key={index}
                  className="text-body-sm text-fg-secondary"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <span className="text-fg-tertiary mr-2">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {line}
                </motion.div>
              ))}

              {currentLine < codeLines.length && (
                <div className="text-body-sm text-fg-secondary">
                  <span className="text-fg-tertiary mr-2">
                    {String(currentLine + 1).padStart(2, "0")}
                  </span>
                  {typingText}
                  <motion.span
                    className="inline-block w-0.5 h-4 bg-fg-primary ml-1"
                    animate={{ opacity: [1, 0] }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </div>
              )}

              {currentLine >= codeLines.length && (
                <motion.div
                  className="flex items-center gap-2 mt-4 pt-3 border-t border-border-primary/30"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <motion.div
                    className="w-2 h-2 rounded-full bg-green-500"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <span className="text-body-sm text-fg-secondary">
                    Compiled successfully
                  </span>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
