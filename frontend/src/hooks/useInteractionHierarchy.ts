"use client";

import { useEffect, RefObject } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Interaction Hierarchy System
 * 
 * Three-tier system for managing animation complexity:
 * - primary: Full animations (cursor glow, scale, magnetic effect)
 * - secondary: Subtle animations (cursor hint, hover state)
 * - ambient: Background motion only (no cursor interaction)
 * 
 * Usage:
 * <button data-interaction="primary">CTA Button</button>
 * <a data-interaction="secondary">Link</a>
 * <div data-interaction="ambient">Background Element</div>
 */

export type InteractionTier = "primary" | "secondary" | "ambient" | null;

interface InteractionConfig {
  cursor?: "default" | "pointer" | "glow" | "magnetic";
  animate?: boolean;
  intensity?: "high" | "medium" | "low";
}

const INTERACTION_CONFIG: Record<Exclude<InteractionTier, null>, InteractionConfig> = {
  primary: {
    cursor: "magnetic",
    animate: true,
    intensity: "high",
  },
  secondary: {
    cursor: "glow",
    animate: true,
    intensity: "medium",
  },
  ambient: {
    cursor: "default",
    animate: true,
    intensity: "low",
  },
};

/**
 * Hook to detect and return interaction tier from data attribute
 */
export function useInteractionTier<T extends HTMLElement>(
  ref: RefObject<T>
): InteractionTier {
  const tier = ref.current?.getAttribute("data-interaction") as InteractionTier;
  return tier;
}

/**
 * Hook to apply interaction hierarchy effects to an element
 */
export function useInteractionHierarchy<T extends HTMLElement>(
  ref: RefObject<T>,
  tier?: InteractionTier
) {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!ref.current || prefersReducedMotion) return;

    const element = ref.current;
    const interactionTier = tier || (element.getAttribute("data-interaction") as InteractionTier);

    if (!interactionTier) return;

    const config = INTERACTION_CONFIG[interactionTier];

    // Apply cursor style class
    element.classList.add(`cursor-${config.cursor}`);

    // Apply interaction tier class for CSS targeting
    element.classList.add(`interaction-${interactionTier}`);

    return () => {
      element.classList.remove(`cursor-${config.cursor}`);
      element.classList.remove(`interaction-${interactionTier}`);
    };
  }, [ref, tier, prefersReducedMotion]);
}

/**
 * Get interaction config for a given tier
 */
export function getInteractionConfig(tier: InteractionTier): InteractionConfig {
  if (!tier) return { cursor: "default", animate: false, intensity: "low" };
  return INTERACTION_CONFIG[tier];
}

/**
 * Check if an element should have animations based on tier and reduced motion preference
 */
export function shouldAnimate(tier: InteractionTier, prefersReducedMotion: boolean): boolean {
  if (prefersReducedMotion) return false;
  if (!tier) return false;
  return INTERACTION_CONFIG[tier].animate ?? false;
}

