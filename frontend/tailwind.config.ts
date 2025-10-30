import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // CUSTOM COLORS - Monochrome + Glass Palette
      colors: {
        // Pure Base Colors
        'pure-white': '#FFFFFF',
        'pure-black': '#000000',
        
        // Light Mode Grays
        'snow': '#FAFAFA',
        'mist': '#F5F5F5',
        'silver-highlight': '#E8E8E8',
        'medium-gray': '#A0A0A0',
        'charcoal': '#2A2A2A',
        'deep-black': '#0A0A0A',
        
        // Dark Mode Grays
        'void-black': '#000000',
        'deep-space': '#0A0A0A',
        'dark-charcoal': '#141414',
        'rich-slate': '#1F1F1F',
        'silver-gray': '#8B8B8B',
        'light-silver': '#CFCFCF',
        
        // Accent Colors
        'platinum': '#C0C0C0',
        'chrome': '#E5E5E5',
        'graphite': '#464646',
      },
      
      // CUSTOM SPACING (Base 4px)
      spacing: {
        '13': '52px',
        '15': '60px',
        '18': '72px',
        '20': '80px',
        '24': '96px',
        '32': '128px',
        '40': '160px',
        '48': '192px',
      },
      
      // TYPOGRAPHY SCALE
      fontSize: {
        'display': 'clamp(4rem, 10vw, 9rem)',
        'h1': 'clamp(3rem, 7vw, 6rem)',
        'h2': 'clamp(2.25rem, 5vw, 4rem)',
        'h3': 'clamp(1.75rem, 4vw, 3rem)',
        'h4': 'clamp(1.375rem, 3vw, 2rem)',
        'body-xl': '1.25rem',
        'body-lg': '1.125rem',
        'body': '1rem',
        'body-sm': '0.875rem',
        'caption': '0.75rem',
      },
      
      // LINE HEIGHTS
      lineHeight: {
        'display': '1.05',
        'heading': '1.15',
        'relaxed': '1.65',
      },
      
      // LETTER SPACING
      letterSpacing: {
        'tighter': '-0.03em',
        'tight': '-0.02em',
        'wide': '0.01em',
        'wider': '0.05em',
      },
      
      // BORDER RADIUS
      borderRadius: {
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
        '2xl': '40px',
      },
      
      // BOX SHADOWS (Dark Mode Optimized)
      boxShadow: {
        'glass-sm': '0 2px 8px rgba(0, 0, 0, 0.4)',
        'glass-md': '0 4px 16px rgba(0, 0, 0, 0.5)',
        'glass-lg': '0 8px 32px rgba(0, 0, 0, 0.6)',
        'glass-xl': '0 16px 56px rgba(0, 0, 0, 0.7)',
        'glass-2xl': '0 32px 96px rgba(0, 0, 0, 0.8)',
        'glow': '0 0 40px rgba(255, 255, 255, 0.1)',
        'glow-strong': '0 0 40px rgba(255, 255, 255, 0.3)',
      },
      
      // BACKDROP BLUR
      backdropBlur: {
        'xs': '20px',
        'glass': '40px',
        'heavy': '60px',
      },
      
      // CONTAINER WIDTHS
      maxWidth: {
        'content': '1440px',
        'standard': '1280px',
        'text': '768px',
        'narrow': '640px',
      },
      
      // ANIMATION DURATIONS
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
      },
      
      // Z-INDEX SCALE
      zIndex: {
        'cursor': '9999',
        'modal': '1050',
        'nav': '1020',
        'dropdown': '1030',
      },

      // BACKGROUND IMAGES
      backgroundImage: {
        'gradient-radial': 'radial-gradient(circle, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};

export default config;

