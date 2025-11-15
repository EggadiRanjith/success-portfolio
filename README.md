# Success Portfolio

Ultra‑premium, mobile‑first frontend portfolio built with Next.js, TypeScript, Tailwind, Framer Motion, and GSAP.

## 🚀 Quick Start

```bash
# Install dependencies
cd frontend
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## ✨ Features

- **Theme System**: Light/dark mode without FOUC (Flash of Unstyled Content)
- **Glassmorphism**: Modern frosted glass UI effects
- **Smooth Transitions**: Narrative route transitions with Framer Motion
- **Matrix Mode**: Interactive Matrix rain effect (press `M`)
- **Accessibility**: Full support for `prefers-reduced-motion`
- **Performance**: Optimized with Next.js 16 and React 19
- **Type Safety**: Full TypeScript coverage

## 📁 Project Structure

```
success-portfolio/
├── .github/          # GitHub workflows and CI/CD
├── docs/             # Project documentation
├── frontend/         # Next.js application
│   ├── src/
│   │   ├── app/      # App router pages
│   │   ├── components/  # React components
│   │   ├── hooks/    # Custom hooks
│   │   ├── lib/      # Utilities
│   │   └── styles/   # Global styles
│   └── public/       # Static assets
├── scripts/          # Project scripts
└── [config files]    # Configuration files
```

For detailed structure information, see [docs/PROJECT_STRUCTURE.md](docs/PROJECT_STRUCTURE.md).

## 🛠️ Development

### Prerequisites

- Node.js 20+ 
- npm or yarn

### Available Scripts

```bash
# Development
npm run dev          # Start dev server
npm run dev:network  # Start dev server on network

# Production
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
```

### Environment Variables

Copy `.env.example` to `.env.local` and configure your environment variables.

## 📚 Documentation

- [Project Structure](docs/PROJECT_STRUCTURE.md) - Detailed file structure
- [Contributing Guidelines](CONTRIBUTING.md) - How to contribute
- [Security Policy](docs/SECURITY.md) - Security reporting

## 🔒 Security

See [docs/SECURITY.md](docs/SECURITY.md) for how to report vulnerabilities.

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.
