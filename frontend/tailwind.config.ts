import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class", "class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			'pure-white': '#FFFFFF',
  			'pure-black': '#000000',
  			snow: '#FAFAFA',
  			mist: '#F5F5F5',
  			'silver-highlight': '#E8E8E8',
  			'medium-gray': '#A0A0A0',
  			charcoal: '#2A2A2A',
  			'deep-black': '#0A0A0A',
  			'void-black': '#000000',
  			'deep-space': '#0A0A0A',
  			'dark-charcoal': '#141414',
  			'rich-slate': '#1F1F1F',
  			'silver-gray': '#8B8B8B',
  			'light-silver': '#CFCFCF',
  			platinum: '#C0C0C0',
  			chrome: '#E5E5E5',
  			graphite: '#464646',
  			'bg-primary': 'var(--color-bg-primary)',
  			'bg-secondary': 'var(--color-bg-secondary)',
  			'bg-tertiary': 'var(--color-bg-tertiary)',
  			'fg-primary': 'var(--color-text-primary)',
  			'fg-secondary': 'var(--color-text-secondary)',
  			'fg-tertiary': 'var(--color-text-tertiary)',
  			'border-primary': 'var(--color-border)',
  			overlay: 'var(--overlay)',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		spacing: {
  			'13': '52px',
  			'15': '60px',
  			'18': '72px',
  			'20': '80px',
  			'24': '96px',
  			'32': '128px',
  			'40': '160px',
  			'48': '192px'
  		},
  		fontSize: {
  			display: 'clamp(4rem, 10vw, 9rem)',
  			h1: 'clamp(3rem, 7vw, 6rem)',
  			h2: 'clamp(2.25rem, 5vw, 4rem)',
  			h3: 'clamp(1.75rem, 4vw, 3rem)',
  			h4: 'clamp(1.375rem, 3vw, 2rem)',
  			'body-xl': '1.25rem',
  			'body-lg': '1.125rem',
  			body: '1rem',
  			'body-sm': '0.875rem',
  			caption: '0.75rem'
  		},
  		lineHeight: {
  			display: '1.05',
  			heading: '1.15',
  			relaxed: '1.65'
  		},
  		letterSpacing: {
  			tighter: '-0.03em',
  			tight: '-0.02em',
  			wide: '0.01em',
  			wider: '0.05em'
  		},
  		borderRadius: {
  			sm: 'calc(var(--radius) - 4px)',
  			md: 'calc(var(--radius) - 2px)',
  			lg: 'var(--radius)',
  			xl: '32px',
  			'2xl': '40px'
  		},
  		boxShadow: {
  			'glass-sm': '0 2px 8px rgba(0, 0, 0, 0.4)',
  			'glass-md': '0 4px 16px rgba(0, 0, 0, 0.5)',
  			'glass-lg': '0 8px 32px rgba(0, 0, 0, 0.6)',
  			'glass-xl': '0 16px 56px rgba(0, 0, 0, 0.7)',
  			'glass-2xl': '0 32px 96px rgba(0, 0, 0, 0.8)',
  			glow: '0 0 40px rgba(255, 255, 255, 0.1)',
  			'glow-strong': '0 0 40px rgba(255, 255, 255, 0.3)'
  		},
  		backdropBlur: {
  			xs: '20px',
  			glass: '40px',
  			heavy: '60px'
  		},
  		maxWidth: {
  			content: '1440px',
  			standard: '1280px',
  			text: '768px',
  			narrow: '640px'
  		},
  		transitionDuration: {
  			'400': '400ms',
  			'600': '600ms'
  		},
  		zIndex: {
  			cursor: '9999',
  			modal: '1050',
  			nav: '1020',
  			dropdown: '1030'
  		},
  		backgroundImage: {
  			'gradient-radial': 'radial-gradient(circle, var(--tw-gradient-stops))'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;

