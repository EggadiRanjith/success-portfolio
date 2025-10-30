"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function MatrixMode() {
  const [isActive, setIsActive] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "m" || e.key === "M") {
        setIsActive((prev) => !prev);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  useEffect(() => {
    if (!isActive || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }

    const characters = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";

    let animationFrameId: number;

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#0F0";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = characters[Math.floor(Math.random() * characters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [isActive]);

  return (
    <>
      {/* Matrix Rain Canvas */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[9998] pointer-events-none"
            style={{ mixBlendMode: "screen" }}
          >
            <canvas ref={canvasRef} className="w-full h-full" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Monochrome Filter */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9997] pointer-events-none"
            style={{
              backdropFilter: "saturate(0%) contrast(1.2) brightness(0.9)",
              WebkitBackdropFilter: "saturate(0%) contrast(1.2) brightness(0.9)",
            }}
          />
        )}
      </AnimatePresence>

      {/* Toast Notification with Narrative Context */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "backOut" }}
            className="fixed bottom-8 right-8 z-[10000] max-w-sm"
          >
            <div className="px-6 py-4 rounded-xl glass-card border border-border-primary shadow-2xl backdrop-blur-xl">
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0 mt-0.5">⚡</span>
                <div>
                  <p className="text-body font-semibold text-primary mb-1">
                    {isActive ? "Matrix Mode Activated" : "Matrix Mode Deactivated"}
                  </p>
                  {isActive && (
                    <p className="text-caption text-secondary leading-relaxed">
                      A nod to the roots of coding culture.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default MatrixMode;

