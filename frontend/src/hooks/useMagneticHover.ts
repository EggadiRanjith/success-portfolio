"use client";

import { useEffect, useRef } from "react";

interface UseMagneticHoverOptions {
  strength?: number;
  max?: number;
}

export function useMagneticHover<T extends HTMLElement>(
  options: UseMagneticHoverOptions = {}
) {
  const ref = useRef<T>(null);
  const { strength = 0.15, max = 10 } = options;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Skip on touch devices or reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;

    if (prefersReducedMotion || isTouch) return;

    let x = 0;
    let y = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      targetX = Math.max(-max, Math.min(max, deltaX));
      targetY = Math.max(-max, Math.min(max, deltaY));
    };

    const handleMouseLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    const animate = () => {
      x += (targetX - x) * 0.15;
      y += (targetY - y) * 0.15;

      if (Math.abs(targetX - x) > 0.01 || Math.abs(targetY - y) > 0.01) {
        element.style.transform = `translate(${x}px, ${y}px)`;
        requestAnimationFrame(animate);
      } else {
        element.style.transform = `translate(0, 0)`;
      }
    };

    const startAnimation = () => {
      const loop = () => {
        animate();
        if (Math.abs(x) > 0.01 || Math.abs(y) > 0.01) {
          requestAnimationFrame(loop);
        }
      };
      requestAnimationFrame(loop);
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);
    startAnimation();

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
      element.style.transform = "";
    };
  }, [strength, max]);

  return ref;
}

