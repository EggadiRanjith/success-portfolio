# Portfolio Frontend

This is the Next.js frontend application for the Success Portfolio project.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion, GSAP
- **3D Graphics**: React Three Fiber
- **Analytics**: Vercel Analytics

## Getting Started

### Prerequisites

- Node.js 20 or higher
- npm, yarn, pnpm, or bun

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Development Scripts

```bash
npm run dev          # Start development server
npm run dev:network  # Start dev server accessible on network
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## Project Structure

```
frontend/
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── (root)/       # Root layout group
│   │   ├── about/        # About page
│   │   ├── contact/      # Contact page
│   │   └── projects/     # Projects pages
│   ├── components/       # React components
│   │   ├── animations/   # Animation components
│   │   ├── effects/      # Visual effects
│   │   ├── layout/       # Layout components
│   │   ├── sections/     # Page sections
│   │   └── ui/           # UI components
│   ├── constants/        # Application constants
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions
│   ├── styles/           # Global styles
│   └── types/            # TypeScript types
├── public/               # Static assets
└── [config files]        # Configuration files
```

## Configuration

- `next.config.ts` - Next.js configuration
- `tsconfig.json` - TypeScript configuration
- `tailwind.config.ts` - Tailwind CSS configuration
- `eslint.config.mjs` - ESLint rules
- `postcss.config.mjs` - PostCSS configuration

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)

## Deployment

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import your repository in Vercel
3. Vercel will automatically detect Next.js and configure the build

For more details, see the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).
