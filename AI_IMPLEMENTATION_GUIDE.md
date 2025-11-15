# AI Implementation Guide: World-Class Portfolio Codebase

## Document Purpose

This guide provides clear, actionable instructions for AI assistants to build, maintain, and improve this professional portfolio codebase. All instructions are derived from `COMPLETE_PROJECT_DOCUMENTATION.md` and enforce zero CSS conflicts, perfect toggle behavior, maximal code reuse, and maintainable architecture.

**Core Principle**: Use only what exists. No new features. Only optimal implementation of documented patterns.

---

## Quick Reference Card

```
✓ CSS Variables ONLY for theme/colors
✓ Class-based dark mode (.dark)
✓ Reuse components/classes everywhere
✓ SSR-safe theme initialization
✓ Zero inline styles (unless dynamic runtime)
✓ Framer Motion for transitions
✓ GSAP for scroll/counter animations
✓ Strict admin/public separation

✗ NO hardcoded colors
✗ NO duplicate CSS classes
✗ NO inline styles with theme values
✗ NO theme state outside use-theme hook
✗ NO mixing admin/public styles
✗ NO FOUC on theme toggle
✗ NO hydration mismatches
```

---

## Part 1: File Structure Rules

### Directory Organization

**Strict adherence required**. The structure in `COMPLETE_PROJECT_DOCUMENTATION.md` is canonical.

```
src/
├── app/                    # Next.js App Router ONLY
│   ├── layout.tsx          # Root layout - theme init script
│   ├── page.tsx            # Home page
│   ├── (root)/             # Public routes group
│   ├── admin/              # Admin routes - isolated
│   └── [other routes]/
├── components/
│   ├── admin/              # Admin components ONLY
│   ├── layout/             # Layout components
│   ├── sections/           # Page sections
│   ├── ui/                 # Reusable UI primitives
│   ├── animations/         # Animation wrappers
│   ├── effects/            # Visual effects
│   └── interactions/       # Interactive elements
├── hooks/                  # Custom React hooks
├── lib/                    # Utilities & helpers
├── styles/                 # Global CSS
│   ├── base.css            # Main stylesheet
│   ├── luxury-system.css   # Luxury theme
│   └── [no other CSS files]
├── context/                # React contexts
├── constants/              # Static data
└── types/                  # TypeScript types
```

### File Creation Rules

1. **Before creating a new file**: Check if similar functionality exists
2. **Before creating a new component**: Check `components/ui/` for reusable primitives
3. **Before writing CSS**: Check if class exists in `base.css` or `luxury-system.css`
4. **Admin components**: MUST be in `components/admin/` directory
5. **Public components**: NEVER in `components/admin/`

### Import Rules

```typescript
// ✓ CORRECT
import { Button } from "@/components/ui";
import { useTheme } from "@/hooks/use-theme";
import { SITE_CONFIG } from "@/lib/constants";

// ✗ WRONG - Don't import admin in public
import { AdminForm } from "@/components/admin/AdminForm";

// ✗ WRONG - Don't use relative paths
import { Button } from "../../../components/ui/button";
```

---

## Part 2: Theme System Implementation

### Theme Toggle Architecture

**Reference**: `COMPLETE_PROJECT_DOCUMENTATION.md` → Toggle System Documentation

### Critical Files (DO NOT MODIFY ARCHITECTURE)

1. `src/app/layout.tsx` - SSR-safe theme initialization script (lines 114-132)
2. `src/hooks/use-theme.ts` - Single source of truth for theme state
3. `src/components/admin/ThemeToggle.tsx` - Toggle button component
4. `src/styles/base.css` - Theme CSS variables (lines 12-58)
5. `src/styles/luxury-system.css` - Theme-specific luxury styles

### Theme Toggle Implementation Rules

#### Rule 1: SSR-Safe Initialization (NEVER MODIFY)

```typescript
// This script MUST run before React hydration
// Located in src/app/layout.tsx (lines 114-132)
<script dangerouslySetInnerHTML={{
  __html: `
    (function () {
      try {
        var stored = localStorage.getItem('theme');
        var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        var theme = stored || (systemDark ? 'dark' : 'light');
        document.documentElement.setAttribute('data-theme', theme);
        if (theme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      } catch (e) {}
    })();
  `,
}} />
```

**Why**: Prevents FOUC by applying theme before any React component renders.

#### Rule 2: Theme State Management (ONLY use-theme hook)

```typescript
// ✓ CORRECT - Use the hook
import { useTheme } from "@/hooks/use-theme";

function MyComponent() {
  const { theme, toggleTheme } = useTheme();
  // Use theme value or toggle function
}

// ✗ WRONG - Never manage theme state elsewhere
const [theme, setTheme] = useState('dark');
localStorage.setItem('theme', 'dark');
document.documentElement.classList.add('dark');
```

#### Rule 3: Theme-Aware Styling (CSS Variables ONLY)

```typescript
// ✓ CORRECT - Use CSS variables
<div style={{ 
  backgroundColor: 'var(--color-bg-primary)',
  color: 'var(--color-text-primary)'
}} />

// ✓ BETTER - Use CSS classes
<div className="bg-primary text-primary" />

// ✗ WRONG - Hardcoded colors
<div style={{ backgroundColor: '#ffffff' }} />
<div style={{ color: theme === 'dark' ? '#fff' : '#000' }} />
```

#### Rule 4: CSS Variable Usage

**All theme-dependent values MUST use these variables**:

```css
/* Background Colors */
var(--color-bg-primary)      /* Main background */
var(--color-bg-secondary)    /* Secondary background */
var(--color-bg-tertiary)     /* Tertiary background */

/* Text Colors */
var(--color-text-primary)    /* Main text */
var(--color-text-secondary)  /* Secondary text */
var(--color-text-tertiary)   /* Tertiary text */

/* Border Colors */
var(--color-border)          /* Borders */

/* Glass Effects */
var(--glass-bg)              /* Glass background */
var(--glass-border)          /* Glass border */
var(--glass-blur)            /* Glass blur amount */

/* Accent Colors */
var(--color-accent-blue)     /* Blue accent */
var(--color-accent-purple)   /* Purple accent */
var(--color-accent-cyan)     /* Cyan accent */
var(--color-accent-gold)     /* Gold accent */
```

#### Rule 5: Theme Transition Smoothness

**Global transitions are already configured** in `base.css` (lines 243-247):

```css
* {
  transition-property: background-color, border-color, color, fill, stroke, box-shadow, background-image, background;
  transition-duration: 300ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
```

**DO NOT OVERRIDE** these transitions unless absolutely necessary.

#### Rule 6: Preventing Hydration Mismatches

```typescript
// ✓ CORRECT - Wait for mount
const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true);
}, []);

if (!mounted) {
  return <div className="h-5 w-5" />; // Placeholder
}

return (
  <div className={theme === 'dark' ? 'dark-style' : 'light-style'}>
    {/* Theme-dependent content */}
  </div>
);

// ✗ WRONG - Direct theme usage without mounting check
return (
  <div className={theme === 'dark' ? 'dark-style' : 'light-style'}>
    {/* This will cause hydration mismatch */}
  </div>
);
```

---

## Part 3: CSS System Rules

### CSS File Hierarchy

```
base.css (1,616 lines total)
├── Imports luxury-system.css
├── CSS Variables (theme)
├── Semantic utilities
├── Glass effects
├── Gradients
├── Hover effects
├── Transitions
├── Resets
├── Animations
├── Mobile optimizations
├── Accessibility
└── Scrollbar

luxury-system.css
├── Light mode luxury variables
├── Dark mode luxury variables
├── Luxury gradients
├── Premium cards
├── Luxury buttons
├── Backdrop effects
├── Animation keyframes
└── Typography

admin-input.css (admin ONLY)
├── Form styles
├── Input fields
└── Validation states
```

### CSS Variable Rules

#### Rule 1: Never Define New Theme Variables

The theme system is complete. Use existing variables:

```css
/* ✓ CORRECT - Use existing variables */
.my-component {
  background: var(--color-bg-primary);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border);
}

/* ✗ WRONG - Creating new theme variables */
:root {
  --my-custom-bg: #ffffff;
  --my-custom-text: #000000;
}
```

#### Rule 2: Glass Effect Usage

**Always use predefined glass classes**:

```html
<!-- ✓ CORRECT -->
<div className="glass-card">Content</div>
<div className="glass-base">Content</div>
<div className="glass-frosted">Content</div>

<!-- ✗ WRONG - Custom glass styles -->
<div style="backdrop-filter: blur(20px); background: rgba(255,255,255,0.1)">
  Content
</div>
```

#### Rule 3: Gradient Usage

**Use predefined gradient classes**:

```html
<!-- ✓ CORRECT - Theme-aware gradients -->
<div className="luxury-gradient-bg">Content</div>
<h1 className="text-gradient-luxury">Heading</h1>

<!-- ✗ WRONG - Inline gradients -->
<div style="background: linear-gradient(to right, blue, purple)">
  Content
</div>
```

### Inline Style Elimination

**Current inline style violations** (from documentation):

| Component | Inline Styles | Action Required |
|-----------|---------------|-----------------|
| SiteHeader | 15+ | KEEP (dynamic mouse effects) |
| HeroSection | 15+ | MIGRATE to CSS classes |
| AboutPage | 15+ | MIGRATE to CSS classes |
| FormField | 2 | **FIX IMMEDIATELY** (hardcoded) |

#### Critical Fix: FormField.tsx

**Current (WRONG)**:
```typescript
// Lines 82-85, 99-103 in FormField.tsx
style={{
  backgroundColor: '#000000',  // ✗ HARDCODED
  color: '#FFFFFF',            // ✗ HARDCODED
  borderColor: 'rgba(255, 255, 255, 0.2)', // ✗ HARDCODED
}}
```

**Required Fix**:
```typescript
// ✓ CORRECT
style={{
  backgroundColor: 'var(--color-bg-primary)',
  color: 'var(--color-text-primary)',
  borderColor: 'var(--color-border)',
}}

// ✓ BETTER - No inline styles
className="bg-primary text-primary border border-primary"
```

#### Inline Style Decision Matrix

```
IS THE STYLE:
├── Theme-dependent color/background? → USE CSS VARIABLE or CLASS
├── Dynamic (mouse position, scroll)? → INLINE STYLE OK
├── Responsive size/spacing? → USE TAILWIND CLASSES
├── Animation property? → USE FRAMER MOTION PROPS
└── Static value? → USE CSS CLASS
```

### CSS Class Reuse Rules

**Before creating a new class**, check if these exist:

```css
/* Layout Classes */
.bg-primary, .bg-secondary, .bg-tertiary
.text-primary, .text-secondary, .text-tertiary
.border-primary

/* Glass Effects */
.glass-card, .glass-base, .glass-frosted
.backdrop-blur-luxury

/* Luxury Effects */
.luxury-gradient-bg
.luxury-card-base, .luxury-card-hover
.hover-glow, .pressable

/* Gradients */
.text-gradient-luxury, .text-gradient-gold, .text-gradient-silver

/* Animations */
.fade-up, .fade-in
.transition-smooth
.gradient-animated

/* Buttons */
.btn-luxury

/* Utilities */
.no-scrollbar
.shine-effect
```

**If a class exists, REUSE IT**. Do not duplicate functionality.

---

## Part 4: Component Development Rules

### Component Creation Checklist

Before creating any component:

1. ✓ Check if similar component exists in `components/ui/`
2. ✓ Determine if it's admin-only (→ `components/admin/`)
3. ✓ List all CSS classes it needs (must exist in base/luxury CSS)
4. ✓ Ensure no hardcoded colors
5. ✓ Plan for theme-awareness
6. ✓ Consider mobile responsiveness
7. ✓ Add accessibility attributes

### UI Component Template

```typescript
// src/components/ui/MyComponent.tsx

import React from "react";
import { cn } from "@/lib/utils";

export interface MyComponentProps 
  extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
}

const variantClasses = {
  primary: "glass-card text-primary",
  secondary: "glass-base text-secondary",
};

const sizeClasses = {
  sm: "px-4 py-2 text-body-sm",
  md: "px-6 py-3 text-body",
  lg: "px-8 py-4 text-body-lg",
};

export const MyComponent = React.forwardRef<
  HTMLDivElement,
  MyComponentProps
>(({ 
  className, 
  variant = "primary", 
  size = "md",
  children,
  ...props 
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "transition-smooth", // Base classes
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

MyComponent.displayName = "MyComponent";
```

### Theme-Aware Component Pattern

```typescript
// ✓ CORRECT - Theme-aware component
"use client";

import { useTheme } from "@/hooks/use-theme";
import { useState, useEffect } from "react";

export function ThemeAwareComponent() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch
  if (!mounted) {
    return <div className="h-10 w-10" />;
  }

  return (
    <div 
      className="bg-primary text-primary"
      // Only use inline styles for dynamic values
      style={{
        boxShadow: theme === 'dark' 
          ? 'var(--luxury-dark-shadow-lg)' 
          : 'var(--luxury-light-shadow-lg)',
      }}
    >
      Content
    </div>
  );
}
```

### Server Component Pattern

```typescript
// ✓ CORRECT - Server component (no theme hook)
import { Container, Heading } from "@/components/ui";

export function ServerComponent() {
  return (
    <Container>
      <Heading as="h1" className="text-primary">
        Title
      </Heading>
      {/* Use theme-aware CSS classes */}
      <div className="bg-primary text-secondary glass-card">
        Content
      </div>
    </Container>
  );
}
```

---

## Part 5: Mobile Menu Toggle

### Mobile Menu Rules

**All mobile menu logic is in** `src/components/layout/SiteHeader.tsx`

#### State Management

```typescript
// ✓ CORRECT - Local state in SiteHeader
const [open, setOpen] = useState(false);

// ✗ WRONG - Global state
const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // In Context
```

#### Scroll Lock Implementation

```typescript
// ✓ CORRECT - Use the hook
import { useScrollLock } from "@/hooks/useScrollLock";

function SiteHeader() {
  const [open, setOpen] = useState(false);
  useScrollLock(open); // Automatically locks/unlocks body scroll
  
  // ... rest of component
}
```

#### Click-Away Handler

```typescript
// ✓ CORRECT - Use react-use hook
import { useClickAway } from "react-use";

const menuPanelRef = useRef<HTMLDivElement>(null);

useClickAway(menuPanelRef, (e) => {
  if (open && menuPanelRef.current && !menuPanelRef.current.contains(e.target as Node)) {
    closeMenu();
  }
});
```

#### Focus Lock

```typescript
// ✓ CORRECT - Use react-focus-lock
import FocusLock from "react-focus-lock";

{open && createPortal(
  <FocusLock returnFocus disabled={!open}>
    <div className="menu-content">
      {/* Menu items */}
    </div>
  </FocusLock>,
  document.body
)}
```

#### Keyboard Handling

```typescript
// ✓ CORRECT - ESC key closes menu
const handleKeyDown = useCallback((e: KeyboardEvent) => {
  if (e.key === "Escape" && open) {
    setOpen(false);
  }
}, [open]);

useEffect(() => {
  document.addEventListener("keydown", handleKeyDown);
  return () => document.removeEventListener("keydown", handleKeyDown);
}, [handleKeyDown]);
```

---

## Part 6: Animation System

### Animation Library Usage

**Two animation systems - distinct purposes**:

1. **GSAP** (`src/lib/gsapAnimations.ts`)
   - Scroll-triggered animations
   - Counter animations
   - Complex sequences
   - Parallax effects

2. **Framer Motion**
   - Page transitions
   - Component mount/unmount
   - Hover effects
   - Layout animations

### GSAP Usage Rules

```typescript
// ✓ CORRECT - Import and use GSAP functions
import { 
  animateFadeInUp,
  animateStagger,
  animateScrollFadeIn,
  animateCounter,
  cleanupGSAP 
} from "@/lib/gsapAnimations";

export function MySection() {
  const elementRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const cleanups: Array<() => void> = [];
    
    // Fade in on mount
    if (elementRef.current) {
      animateFadeInUp(elementRef.current, {
        delay: 0.3,
        duration: 1.2,
        y: 40,
      });
    }
    
    return () => cleanupGSAP(cleanups);
  }, []);
  
  return <div ref={elementRef}>Content</div>;
}

// ✗ WRONG - Direct GSAP usage
import { gsap } from "gsap";

gsap.to(element, { opacity: 1, y: 0 }); // Don't do this
```

### Framer Motion Usage Rules

```typescript
// ✓ CORRECT - Use motion variants
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/motionVariants";

export function MyComponent() {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
    >
      Content
    </motion.div>
  );
}

// ✗ WRONG - Inline motion config
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
>
  Content
</motion.div>
```

### Reduced Motion Support

```typescript
// ✓ CORRECT - Respect user preferences
import { useReducedMotion } from "framer-motion";

export function AnimatedComponent() {
  const prefersReducedMotion = useReducedMotion();
  
  if (prefersReducedMotion) {
    return <div>Content</div>; // No animations
  }
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      Content
    </motion.div>
  );
}
```

---

## Part 7: Page Implementation Guidelines

### Home Page (`/`)

**Structure** (MUST maintain):
```tsx
<main>
  <HeroSection />
  <FeaturedProjectsSection />
  <AboutPreviewSection />
  <TechStackSection />
</main>
```

**CSS Usage**:
- `base.css` - 100%
- `luxury-system.css` - 80%
- Tailwind utilities - 100%

**Inline Styles**: Only in HeroSection for dynamic gradients (theme-aware)

### About Page (`/about`)

**Structure**:
```tsx
<main>
  <section> {/* About Content */}</section>
  <section> {/* Education */}</section>
  <section> {/* Certifications */}</section>
  <section> {/* LeetCode & GitHub Dashboard */}</section>
</main>
```

**CSS Usage**:
- FrostedCard component (glass effects)
- GlowOnHover component
- AnimatedCounter component

**Required Migration**: Move gradient orb inline styles to CSS classes

### Projects Page (`/projects`)

**Structure**:
```tsx
<main>
  <section>
    <Container>
      <AnimatedSection>
        <Heading />
        <ProjectCard /> {/* Repeated */}
      </AnimatedSection>
    </Container>
  </section>
</main>
```

**CSS Usage**:
- ProjectCard uses `glass-card`, `hover-glow`
- Grid layout with Tailwind

### Contact Page (`/contact`)

**Structure**:
```tsx
<main>
  <section>
    <Container>
      <AnimatedSection>
        <Heading />
        <div className="grid lg:grid-cols-2">
          {/* Contact Info */}
          {/* Contact Form */}
        </div>
      </AnimatedSection>
    </Container>
  </section>
</main>
```

**Critical Fix Required**: FormField inline styles (see Part 3)

---

## Part 8: Admin System

### Admin Route Isolation

**Admin routes NEVER use public layout**:

```typescript
// src/components/layout/ConditionalLayout.tsx
export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  // Admin routes bypass MainSiteLayout
  if (isAdminRoute) {
    return <>{children}</>;
  }

  // Public routes get full layout
  return <MainSiteLayout>{children}</MainSiteLayout>;
}
```

### Admin CSS Rules

1. **Admin components ONLY use** `admin-input.css`
2. **Never import** `luxury-system.css` in admin components
3. **Base styles** from `base.css` are available everywhere
4. **Theme toggle** works in admin (uses same theme system)

### Admin Component Pattern

```typescript
// src/components/admin/MyAdminForm.tsx
"use client";

import { useState } from "react";
import { Input, Button } from "@/components/ui";

export function MyAdminForm() {
  const [formData, setFormData] = useState({});
  
  return (
    <form className="space-y-4">
      <Input 
        label="Field"
        value={formData.field}
        onChange={(val) => setFormData({ ...formData, field: val })}
      />
      <Button type="submit">Save</Button>
    </form>
  );
}
```

---

## Part 9: Performance Optimization

### Image Optimization

```typescript
// ✓ CORRECT - Use Next.js Image
import Image from "next/image";

<Image
  src="/path/to/image.jpg"
  alt="Description"
  width={800}
  height={600}
  priority // For above-fold images
  placeholder="blur"
  blurDataURL="data:image/..." // Optional
/>

// ✗ WRONG - Regular img tag
<img src="/path/to/image.jpg" alt="Description" />
```

### Code Splitting

```typescript
// ✓ CORRECT - Dynamic imports for heavy components
import dynamic from "next/dynamic";

const HeavyComponent = dynamic(() => import("@/components/HeavyComponent"), {
  loading: () => <div>Loading...</div>,
  ssr: false, // If component uses window/document
});

// Use in component
<HeavyComponent />
```

### Font Optimization

```typescript
// ✓ CORRECT - Already configured in layout.tsx
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});
```

---

## Part 10: Accessibility Requirements

### ARIA Labels

```typescript
// ✓ CORRECT - Semantic HTML + ARIA
<nav aria-label="Primary navigation">
  <a href="/" aria-current="page">Home</a>
</nav>

<button aria-label="Toggle theme" onClick={toggleTheme}>
  <Sun className="h-5 w-5" />
</button>

// ✗ WRONG - No accessibility
<div onClick={handleClick}>Button</div>
```

### Focus Management

```typescript
// ✓ CORRECT - Visible focus indicator
.button:focus-visible {
  outline: 2px solid var(--color-accent-blue);
  outline-offset: 4px;
}

// Already configured in base.css (lines 361-365)
```

### Keyboard Navigation

```typescript
// ✓ CORRECT - Keyboard support
<div
  role="button"
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick();
    }
  }}
>
  Clickable Div
</div>
```

---

## Part 11: Testing Guidelines

### Manual Testing Checklist

**Theme Toggle**:
- [ ] Click theme toggle - smooth transition (300ms)
- [ ] Refresh page - theme persists
- [ ] Open in new tab - theme matches
- [ ] Change system preference - theme updates (if not manually set)
- [ ] No FOUC on page load
- [ ] No hydration errors in console

**Mobile Menu**:
- [ ] Click menu button - opens smoothly
- [ ] Click outside - closes
- [ ] Press ESC key - closes
- [ ] Focus trapped inside menu when open
- [ ] Body scroll locked when menu open
- [ ] Can navigate using Tab key

**Responsive Design**:
- [ ] Test at 320px, 768px, 1024px, 1440px, 1920px
- [ ] All text readable at all sizes
- [ ] No horizontal scroll
- [ ] Touch targets minimum 44x44px
- [ ] Hover effects disabled on touch devices

**Accessibility**:
- [ ] Tab through all interactive elements
- [ ] Screen reader announces all content
- [ ] All images have alt text
- [ ] All buttons have labels
- [ ] High contrast mode works
- [ ] Reduced motion respected

**Performance**:
- [ ] Lighthouse score > 90
- [ ] First Contentful Paint < 1.5s
- [ ] Time to Interactive < 3.5s
- [ ] Cumulative Layout Shift < 0.1
- [ ] No console errors/warnings

---

## Part 12: Common Mistakes to Avoid

### ❌ Mistake 1: Hardcoded Colors

```typescript
// ✗ WRONG
<div style={{ color: '#ffffff' }}>Text</div>
<div style={{ backgroundColor: theme === 'dark' ? '#000' : '#fff' }}>

// ✓ CORRECT
<div className="text-primary bg-primary">Text</div>
<div style={{ color: 'var(--color-text-primary)' }}>Text</div>
```

### ❌ Mistake 2: Duplicate CSS Classes

```css
/* ✗ WRONG - Creating duplicate */
.my-glass-card {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(40px);
  border: 1px solid rgba(0, 0, 0, 0.1);
}

/* ✓ CORRECT - Use existing */
<div className="glass-card">Content</div>
```

### ❌ Mistake 3: Theme State Outside Hook

```typescript
// ✗ WRONG
const [theme, setTheme] = useState('dark');
localStorage.setItem('theme', 'light');

// ✓ CORRECT
const { theme, setTheme } = useTheme();
setTheme('light');
```

### ❌ Mistake 4: Missing Hydration Check

```typescript
// ✗ WRONG - Causes hydration mismatch
return <div className={theme === 'dark' ? 'bg-black' : 'bg-white'}>

// ✓ CORRECT
const [mounted, setMounted] = useState(false);
useEffect(() => setMounted(true), []);

if (!mounted) return <div />;
return <div className={theme === 'dark' ? 'bg-black' : 'bg-white'}>
```

### ❌ Mistake 5: Mixing Admin and Public Styles

```typescript
// ✗ WRONG - Importing luxury styles in admin
import "@/styles/luxury-system.css"; // In admin component

// ✓ CORRECT - Admin uses only admin-input.css
// base.css is automatically available everywhere
```

### ❌ Mistake 6: Not Cleaning Up Effects

```typescript
// ✗ WRONG - Memory leak
useEffect(() => {
  const cleanup = animateFadeInUp(elementRef.current);
  // No cleanup
}, []);

// ✓ CORRECT
useEffect(() => {
  const cleanups: Array<() => void> = [];
  
  if (elementRef.current) {
    const cleanup = animateFadeInUp(elementRef.current);
    if (cleanup) cleanups.push(cleanup);
  }
  
  return () => cleanupGSAP(cleanups);
}, []);
```

### ❌ Mistake 7: Inline Animation Objects

```typescript
// ✗ WRONG
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>

// ✓ CORRECT
import { fadeInUp } from "@/lib/motionVariants";

<motion.div variants={fadeInUp} initial="hidden" animate="visible">
```

---

## Part 13: Implementation Workflow

### Adding a New Page

1. **Create page file** in appropriate route
   ```bash
   src/app/my-page/page.tsx
   ```

2. **Use existing components**
   ```typescript
   import { Container, Heading, Text } from "@/components/ui";
   import { AnimatedSection } from "@/components/animations/AnimatedSection";
   ```

3. **Add to navigation** (if needed)
   ```typescript
   // src/lib/constants.ts
   export const NAV_LINKS = [
     // ... existing links
     { href: "/my-page", label: "My Page" },
   ];
   ```

4. **Style with existing classes**
   ```tsx
   <main className="min-h-screen bg-primary">
     <section className="py-32">
       <Container>
         <AnimatedSection>
           <Heading as="h1" className="text-primary">Title</Heading>
           <Text className="text-secondary">Content</Text>
         </AnimatedSection>
       </Container>
     </section>
   </main>
   ```

### Adding a New Component

1. **Check if similar exists** in `components/ui/`

2. **Create component file**
   ```bash
   src/components/ui/MyComponent.tsx
   ```

3. **Follow component template** (see Part 4)

4. **Export from index**
   ```typescript
   // src/components/ui/index.ts
   export { MyComponent } from "./MyComponent";
   ```

5. **Document CSS dependencies**
   - List CSS classes used
   - Note any inline styles
   - Confirm theme-awareness

### Fixing a Bug

1. **Identify affected files** using documentation

2. **Check CSS dependencies**
   - What CSS files does the component use?
   - Are there inline styles?
   - Is it theme-aware?

3. **Verify no duplicates** before adding code

4. **Test theme toggle** after fix

5. **Test mobile menu** (if layout change)

6. **Run accessibility checks**

---

## Part 14: Deployment Checklist

### Pre-Deployment

- [ ] No console errors or warnings
- [ ] All linter issues resolved
- [ ] TypeScript compilation successful
- [ ] All images optimized
- [ ] All fonts loaded correctly
- [ ] Theme toggle works flawlessly
- [ ] Mobile menu functions perfectly
- [ ] No FOUC on any page
- [ ] Lighthouse score > 90
- [ ] All pages responsive
- [ ] Accessibility audit passed

### Environment Variables

```bash
# .env.local (example)
NEXT_PUBLIC_SITE_URL=https://yoursite.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### Build Command

```bash
npm run build
```

**Check for**:
- No build errors
- No hydration warnings
- Bundle size reasonable

---

## Part 15: Quick Reference Commands

### Development

```bash
# Start dev server
npm run dev

# Start with network access
npm run dev:network

# Lint code
npm run lint

# Type check
npx tsc --noEmit
```

### Debugging

```bash
# Check for unused exports
npx ts-prune

# Analyze bundle
npm run build && npx @next/bundle-analyzer

# Check accessibility
npx axe-cli http://localhost:3000
```

---

## Conclusion

**This is the complete, authoritative guide for AI implementation.**

### Key Takeaways

1. ✓ **Never hardcode colors** - Always use CSS variables
2. ✓ **Reuse everything** - Components, classes, utilities
3. ✓ **Theme-first architecture** - All styles respect `.dark` class
4. ✓ **Zero FOUC** - SSR-safe theme initialization
5. ✓ **Strict separation** - Admin and public never mix
6. ✓ **Performance optimized** - Code splitting, lazy loading
7. ✓ **Accessibility first** - ARIA, keyboard nav, focus management
8. ✓ **Mobile-ready** - Responsive design, touch-friendly

### Next Steps

When implementing or improving this codebase:

1. Read `COMPLETE_PROJECT_DOCUMENTATION.md` thoroughly
2. Follow this guide strictly
3. Check existing code before writing new code
4. Test theme toggle after every change
5. Verify mobile menu functionality
6. Run accessibility checks
7. Optimize performance
8. Document any new patterns

**Remember**: This is a world-class codebase. Maintain the high standard.

---

**Document Version**: 1.0  
**Last Updated**: 2025  
**Based On**: COMPLETE_PROJECT_DOCUMENTATION.md

