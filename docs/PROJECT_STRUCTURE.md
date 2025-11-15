# Project Structure

This document outlines the professional file structure of the portfolio project.

## Directory Overview

```
success-portfolio/
├── .github/                 # GitHub workflows and templates
│   └── workflows/           # CI/CD pipelines
├── docs/                    # Project documentation
├── frontend/                # Next.js application
│   ├── public/              # Static assets
│   ├── src/                 # Source code
│   │   ├── app/             # Next.js app router pages
│   │   ├── components/      # React components
│   │   ├── constants/       # Application constants
│   │   ├── hooks/           # Custom React hooks
│   │   ├── lib/             # Utility functions
│   │   ├── styles/          # Global styles
│   │   └── types/           # TypeScript type definitions
│   ├── scripts/             # Build and utility scripts
│   └── [config files]       # Next.js, TypeScript, Tailwind configs
├── scripts/                 # Project-level scripts
│   └── frontend/            # Frontend-specific scripts
├── .editorconfig            # Editor configuration
├── .gitignore              # Git ignore rules
├── .prettierrc             # Prettier configuration
├── .prettierignore         # Prettier ignore rules
├── CONTRIBUTING.md         # Contribution guidelines
├── LICENSE                 # License file
└── README.md               # Project README
```

## Frontend Structure

### `/src/app`
Next.js App Router directory containing all routes:
- `(root)/` - Root layout group
- `about/` - About page
- `contact/` - Contact page
- `projects/` - Projects listing and detail pages

### `/src/components`
React components organized by purpose:
- `animations/` - Animation-related components
- `effects/` - Visual effects (e.g., MatrixRain)
- `layout/` - Layout components (Header, Footer, etc.)
- `sections/` - Page sections (Hero, Projects, etc.)
- `ui/` - Reusable UI components

### `/src/hooks`
Custom React hooks for shared logic:
- Theme management
- Scroll handling
- Parallax effects
- Page transitions

### `/src/lib`
Utility functions and helpers:
- Animation utilities
- GSAP configurations
- Motion variants
- General utilities

### `/src/constants`
Application constants and configuration:
- Feature flags
- Content data
- API endpoints

### `/src/types`
TypeScript type definitions and interfaces.

## Best Practices

1. **Component Organization**: Group related components in subdirectories
2. **Naming Conventions**: Use PascalCase for components, camelCase for utilities
3. **File Structure**: One component per file, co-locate related files
4. **Imports**: Use absolute imports with path aliases (configured in tsconfig.json)
5. **Documentation**: Keep documentation in `/docs` folder

## Configuration Files

- `next.config.ts` - Next.js configuration
- `tsconfig.json` - TypeScript configuration
- `tailwind.config.ts` - Tailwind CSS configuration
- `eslint.config.mjs` - ESLint configuration
- `postcss.config.mjs` - PostCSS configuration

