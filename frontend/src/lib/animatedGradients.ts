'use client';

/**
 * Animated Gradient System
 * Premium gradient backgrounds with smooth animations
 */

export const animatedGradients = {
  luxury: {
    light: `linear-gradient(-45deg, 
      var(--luxury-light-blue-start) 0%,
      var(--luxury-light-purple-start) 25%,
      var(--luxury-light-cyan-start) 50%,
      var(--luxury-light-gold-start) 75%,
      var(--luxury-light-blue-start) 100%
    )`,
    dark: `linear-gradient(-45deg,
      var(--luxury-dark-blue-start) 0%,
      var(--luxury-dark-purple-start) 25%,
      var(--luxury-dark-cyan-start) 50%,
      var(--luxury-dark-gold-start) 75%,
      var(--luxury-dark-blue-start) 100%
    )`,
  },
  hero: {
    light: `linear-gradient(135deg,
      var(--luxury-light-blue-start) 0%,
      var(--luxury-light-purple-start) 50%,
      var(--luxury-light-cyan-start) 100%
    )`,
    dark: `linear-gradient(135deg,
      var(--luxury-dark-blue-start) 0%,
      var(--luxury-dark-purple-start) 50%,
      var(--luxury-dark-cyan-start) 100%
    )`,
  },
  accent: {
    light: `linear-gradient(90deg,
      var(--luxury-light-purple-start) 0%,
      var(--luxury-light-rose-start) 100%
    )`,
    dark: `linear-gradient(90deg,
      var(--luxury-dark-purple-start) 0%,
      var(--luxury-dark-rose-start) 100%
    )`,
  },
  subtle: {
    light: `linear-gradient(180deg,
      var(--luxury-light-cyan-start) 0%,
      var(--luxury-light-blue-start) 100%
    )`,
    dark: `linear-gradient(180deg,
      var(--luxury-dark-cyan-start) 0%,
      var(--luxury-dark-blue-start) 100%
    )`,
  },
};

export const getAnimatedGradient = (
  type: keyof typeof animatedGradients,
  theme: 'light' | 'dark' = 'light'
) => {
  return animatedGradients[type][theme];
};

