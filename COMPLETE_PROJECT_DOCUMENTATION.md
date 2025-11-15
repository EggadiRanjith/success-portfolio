# Complete Project Documentation

## Table of Contents
1. [Project Structure](#project-structure)
2. [Toggle System Documentation](#toggle-system-documentation)
3. [CSS Layout System](#css-layout-system)
4. [Page-by-Page Documentation](#page-by-page-documentation)
5. [Component CSS Dependencies](#component-css-dependencies)
6. [Cross-References](#cross-references)

---

## Project Structure

```
success-portfolio/
├── frontend/
│   ├── src/
│   │   ├── app/                          # Next.js App Router
│   │   │   ├── layout.tsx                # Root layout with theme script
│   │   │   ├── page.tsx                  # Home page
│   │   │   ├── (root)/                   # Root route group
│   │   │   │   ├── layout.tsx            # Root layout wrapper
│   │   │   │   ├── error.tsx            # Error boundary
│   │   │   │   └── not-found.tsx        # 404 page
│   │   │   ├── about/
│   │   │   │   └── page.tsx              # About page
│   │   │   ├── projects/
│   │   │   │   ├── page.tsx              # Projects listing
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx          # Project detail page
│   │   │   ├── contact/
│   │   │   │   └── page.tsx              # Contact page
│   │   │   └── admin/                    # Admin panel
│   │   │       ├── layout.tsx
│   │   │       ├── page.tsx
│   │   │       ├── dashboard/
│   │   │       │   └── page.tsx
│   │   │       └── admin-input.css       # Admin-specific styles
│   │   ├── components/
│   │   │   ├── admin/                    # Admin components
│   │   │   │   ├── ThemeToggle.tsx       # Theme toggle component
│   │   │   │   ├── HeroForm.tsx
│   │   │   │   ├── PersonalInfoForm.tsx
│   │   │   │   ├── ProjectsForm.tsx
│   │   │   │   ├── SkillsForm.tsx
│   │   │   │   ├── CertificationsForm.tsx
│   │   │   │   ├── EducationForm.tsx
│   │   │   │   └── StatsForm.tsx
│   │   │   ├── animations/               # Animation components
│   │   │   │   ├── AnimatedSection.tsx
│   │   │   │   └── AnimationProvider.tsx
│   │   │   ├── effects/                  # Visual effects
│   │   │   │   ├── MatrixRainEffect.tsx
│   │   │   │   └── SplineViewer.tsx
│   │   │   ├── interactions/             # Interactive elements
│   │   │   │   └── RainbowShimmer.tsx
│   │   │   ├── layout/                   # Layout components
│   │   │   │   ├── ConditionalLayout.tsx
│   │   │   │   ├── MainSiteLayout.tsx
│   │   │   │   ├── SiteHeader.tsx        # Header with theme toggle
│   │   │   │   ├── SiteFooter.tsx
│   │   │   │   ├── PageTransition.tsx
│   │   │   │   ├── PageLoader.tsx
│   │   │   │   ├── PageGate.tsx
│   │   │   │   └── Loader.tsx
│   │   │   ├── sections/                 # Page sections
│   │   │   │   ├── HeroSection.tsx
│   │   │   │   ├── FeaturedProjectsSection.tsx
│   │   │   │   ├── AboutPreviewSection.tsx
│   │   │   │   ├── TechStackSection.tsx
│   │   │   │   ├── ProjectCard.tsx
│   │   │   │   ├── GithubStats.tsx
│   │   │   │   └── LeetCodeStats.tsx
│   │   │   └── ui/                       # UI components
│   │   │       ├── button.tsx
│   │   │       ├── Card.tsx
│   │   │       ├── FrostedCard.tsx
│   │   │       ├── FormField.tsx
│   │   │       ├── input.tsx
│   │   │       ├── text.tsx
│   │   │       ├── heading.tsx
│   │   │       ├── container.tsx
│   │   │       └── [other UI components]
│   │   ├── hooks/                       # Custom hooks
│   │   │   ├── use-theme.ts             # Theme management hook
│   │   │   ├── use-scroll.ts
│   │   │   ├── use-is-desktop.ts
│   │   │   ├── useReducedMotion.ts
│   │   │   ├── useScrollLock.ts
│   │   │   └── [other hooks]
│   │   ├── lib/                         # Utilities
│   │   │   ├── gsapAnimations.ts        # GSAP animation functions
│   │   │   ├── motionVariants.ts       # Framer Motion variants
│   │   │   ├── constants.ts            # Site constants
│   │   │   ├── adminData.ts           # Admin data management
│   │   │   ├── utils.ts                # Utility functions
│   │   │   └── animatedGradients.ts
│   │   ├── styles/                     # Global styles
│   │   │   ├── base.css                # Main stylesheet
│   │   │   └── luxury-system.css       # Luxury theme system
│   │   ├── context/                     # React contexts
│   │   │   ├── AdminContext.tsx
│   │   │   └── LoaderContext.tsx
│   │   ├── constants/                   # Constants
│   │   │   ├── heroSection.ts
│   │   │   ├── featuredProjects.ts
│   │   │   ├── techStack.ts
│   │   │   └── aboutPreview.ts
│   │   └── types/                       # TypeScript types
│   │       └── index.ts
│   ├── tailwind.config.ts               # Tailwind configuration
│   ├── next.config.ts                   # Next.js configuration
│   └── package.json
└── docs/                                # Documentation
    ├── PROJECT_STRUCTURE.md
    ├── COMPLETE_CODEBASE_DOCUMENTATION.md
    └── [other docs]
```

---

## Toggle System Documentation

### 1. Theme Toggle System

#### Architecture Overview
The theme toggle system uses a multi-layered approach to prevent FOUC (Flash of Unstyled Content) and ensure smooth theme transitions.

#### Files Involved
- **`src/hooks/use-theme.ts`** - Core theme management hook
- **`src/components/admin/ThemeToggle.tsx`** - Theme toggle button component
- **`src/components/layout/SiteHeader.tsx`** - Header with integrated theme toggle
- **`src/app/layout.tsx`** - Root layout with theme initialization script
- **`src/styles/base.css`** - Theme CSS variables and transitions
- **`src/styles/luxury-system.css`** - Theme-specific luxury styles

#### How Theme Toggle Works

**Step 1: Initial Theme Detection (SSR-Safe)**
```typescript
// src/app/layout.tsx (lines 114-132)
// Inline script runs BEFORE React hydration
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

**Step 2: Theme Hook Initialization**
```typescript
// src/hooks/use-theme.ts
export function useTheme() {
  // 1. Get initial theme from localStorage or system preference
  const getInitialTheme = useCallback<() => Theme>(() => {
    if (typeof window === "undefined") return "dark";
    const stored = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
    if (stored === "light" || stored === "dark") return stored;
    const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
    return prefersDark ? "dark" : "light";
  }, []);

  // 2. State management
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);

  // 3. Apply theme class to DOM
  const applyThemeClass = useCallback((t: Theme) => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    root.setAttribute("data-theme", t);
    if (t === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, []);

  // 4. Toggle function
  const toggleTheme = useCallback(() => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  }, [theme, setTheme]);

  // 5. System preference listener
  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-color-scheme: dark)");
    const onChange = () => {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        const next = mq.matches ? "dark" : "light";
        setThemeState(next);
        applyThemeClass(next);
      }
    };
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, [applyThemeClass]);
}
```

**Step 3: Theme Toggle Component**
```typescript
// src/components/admin/ThemeToggle.tsx
export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // Prevent hydration mismatch
  }, []);

  return (
    <Button onClick={toggleTheme}>
      {mounted ? (
        <AnimatePresence mode="wait">
          <motion.div
            key={theme}
            initial={{ rotate: -180, scale: 0.9 }}
            animate={{ rotate: 0, scale: 1 }}
            exit={{ rotate: 180, scale: 0.9 }}
          >
            {theme === "dark" ? <Sun /> : <Moon />}
          </motion.div>
        </AnimatePresence>
      ) : (
        <div className="h-5 w-5" /> // Placeholder
      )}
    </Button>
  );
}
```

**Step 4: CSS Theme Variables**
```css
/* src/styles/base.css */
:root {
  --color-bg-primary: #FFFFFF;
  --color-text-primary: #0A0A0A;
  /* ... light mode variables */
}

.dark {
  --color-bg-primary: #000000;
  --color-text-primary: #FFFFFF;
  /* ... dark mode variables */
}

/* Smooth transitions */
* {
  transition-property: background-color, border-color, color, fill, stroke, box-shadow;
  transition-duration: 300ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
```

#### Theme Toggle Flow Diagram
```
User Clicks Toggle
    ↓
toggleTheme() called
    ↓
setTheme(newTheme)
    ↓
localStorage.setItem('theme', newTheme)
    ↓
applyThemeClass(newTheme)
    ↓
document.documentElement.classList.toggle('dark')
    ↓
CSS variables update via .dark class
    ↓
All components re-render with new theme
    ↓
CSS transitions animate color changes (300ms)
```

#### CSS Files Affected by Theme Toggle
1. **`base.css`** - Main theme variables (lines 12-58)
2. **`luxury-system.css`** - Luxury theme gradients (lines 12-195)
3. **Tailwind config** - Dark mode class strategy (line 4)

#### Inline Styles Used in Theme Toggle
- **SiteHeader.tsx** (lines 114-128): Direct style updates for header pill background
- **SiteHeader.tsx** (lines 277-286): Framer Motion style props for backdrop blur
- **SiteHeader.tsx** (lines 316-325): Gradient border styles (theme-aware)
- **HeroSection.tsx** (lines 331-348): Background gradient styles (theme-aware)

---

### 2. Mobile Menu Toggle System

#### Files Involved
- **`src/components/layout/SiteHeader.tsx`** - Mobile menu implementation
- **`src/hooks/useScrollLock.ts`** - Body scroll lock hook

#### How Mobile Menu Toggle Works

**Step 1: State Management**
```typescript
// src/components/layout/SiteHeader.tsx (line 24)
const [open, setOpen] = useState(false);
```

**Step 2: Scroll Lock**
```typescript
// src/components/layout/SiteHeader.tsx (line 69)
useScrollLock(open); // Locks body scroll when menu is open
```

**Step 3: Menu Toggle Functions**
```typescript
// src/components/layout/SiteHeader.tsx (lines 190-197)
const closeMenu = useCallback(() => {
  if (!open) return;
  try {
    setOpen(false);
  } catch (error) {
    setOpen(false); // Force close on error
  }
}, [open]);
```

**Step 4: Click Away Handler**
```typescript
// src/components/layout/SiteHeader.tsx (lines 200-205)
useClickAway(menuPanelRef, (e) => {
  if (open && menuPanelRef.current && !menuPanelRef.current.contains(e.target as Node)) {
    closeMenu();
  }
});
```

**Step 5: Keyboard Handler**
```typescript
// src/components/layout/SiteHeader.tsx (lines 183-187)
const handleKeyDown = useCallback((e: KeyboardEvent) => {
  if (e.key === "Escape" && open) {
    setOpen(false);
  }
}, [open]);
```

**Step 6: Mobile Menu Rendering**
```typescript
// src/components/layout/SiteHeader.tsx (lines 546-632)
{typeof document !== "undefined" && open && createPortal(
  <FocusLock returnFocus disabled={!open}>
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[1050] bg-overlay backdrop-blur-luxury"
        onClick={closeMenu}
      >
        <motion.div
          ref={menuPanelRef}
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
        >
          {/* Menu content */}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  </FocusLock>,
  document.body
)}
```

#### Mobile Menu Toggle Flow
```
User Clicks Menu Button
    ↓
setOpen(true)
    ↓
useScrollLock(true) - Locks body scroll
    ↓
Portal renders menu overlay
    ↓
FocusLock traps focus
    ↓
AnimatePresence animates menu in
    ↓
User clicks outside or Escape key
    ↓
closeMenu() called
    ↓
setOpen(false)
    ↓
useScrollLock(false) - Unlocks body scroll
    ↓
AnimatePresence animates menu out
    ↓
FocusLock releases focus
```

#### CSS Classes Used for Mobile Menu
- **Overlay**: `bg-overlay backdrop-blur-luxury` (from `base.css`)
- **Menu Panel**: Custom classes with glass effects
- **Animations**: Framer Motion handles animations

---

## CSS Layout System

### CSS Architecture

#### 1. Global Styles (`src/styles/base.css`)

**Lines 1-6**: Imports and Tailwind directives
```css
@import url('./luxury-system.css');
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**Lines 12-58**: CSS Custom Properties (Theme Variables)
- Light mode variables (lines 12-34)
- Dark mode variables (lines 36-58)
- Glass effect variables
- Color system variables

**Lines 60-72**: Semantic Theme Utilities
- `.text-primary`, `.text-secondary`, `.text-tertiary`
- `.bg-primary`, `.bg-secondary`, `.bg-tertiary`
- `.border-primary`

**Lines 74-90**: Luxury Gradient Backgrounds
- `.luxury-gradient-bg` - Theme-aware gradient backgrounds

**Lines 92-122**: Premium Glass Effects
- `.glass-card` - Main glass card style
- `.glass-base` - Base glass style
- `.glass-frosted` - Frosted glass style
- Mobile optimizations (lines 104-109)

**Lines 144-146**: Overlay Background Utility
- `.bg-overlay` - Uses `var(--overlay)`

**Lines 148-182**: Luxury Text Gradients
- `.text-gradient-luxury` - Blue-purple-cyan gradient
- `.text-gradient-gold` - Gold gradient
- `.text-gradient-silver` - Silver gradient

**Lines 184-211**: Luxury Hover Effects
- `.hover-glow` - Glow effect on hover
- `.pressable` - Press animation

**Lines 213-237**: Luxury Border Glows
- `.border-glow` - Gradient border effect

**Lines 239-273**: Theme Transition
- Global transition properties
- Exclusions for animated elements
- Smooth theme toggle animation

**Lines 275-297**: Base Resets
- CSS reset
- HTML/body styles
- Font smoothing

**Lines 299-315**: Animation Utilities
- `.fade-up`, `.fade-in`
- `.transition-smooth`

**Lines 317-354**: Mobile Optimizations
- Touch-friendly sizes
- iOS input zoom prevention
- Touch action manipulation
- Hover effect disabling on touch devices

**Lines 356-385**: Accessibility
- Focus visible styles
- Reduced motion support
- High contrast mode support

**Lines 387-412**: Scrollbar Styling
- Custom webkit scrollbar
- Firefox scrollbar

**Lines 414-464**: Luxury Gradient Orbs
- `.gradient-orb-blue`
- `.gradient-orb-purple`
- `.gradient-orb-cyan`

**Lines 466-510**: Premium Button Styles
- `.btn-luxury` - Luxury button with shine effect

**Lines 512-546**: Micro-interactions
- `.shine-effect` - Shine animation

**Lines 548-565**: Utility Classes
- `.no-scrollbar`
- `.backdrop-blur-luxury`

**Lines 567-591**: Loader Transitions
- Prevents content flash during loader

**Lines 592-655**: Tailwind Base Layer
- shadcn/ui color system variables

#### 2. Luxury System Styles (`src/styles/luxury-system.css`)

**Lines 12-105**: Light Mode Luxury Variables
- Foundational colors
- Gradient stops (blue, purple, cyan, gold, rose)
- Accent colors
- Text colors
- Background colors
- Glassmorphism variables
- Shadow system
- Glow effects

**Lines 112-195**: Dark Mode Luxury Variables
- Same structure as light mode but with darker/vibrant values

**Lines 202-262**: Light Mode Luxury Gradients
- `.luxury-gradient-primary-light`
- `.luxury-gradient-secondary-light`
- `.luxury-gradient-mesh-light`
- Text gradients (`.luxury-text-gradient-light-1/2/3`)

**Lines 269-329**: Dark Mode Luxury Gradients
- Same structure as light mode

**Lines 336-457**: Theme-Aware Luxury Gradients
- Automatically switches based on `.dark` class
- `.luxury-gradient-primary`
- `.luxury-gradient-secondary`
- `.luxury-gradient-mesh`
- Text gradients

**Lines 463-533**: Premium Card System
- `.luxury-card-base` - Base card style
- `.luxury-card-hover` - Hover effects
- `.luxury-card-glow` - Glow border effect
- `.luxury-card-float` - Floating animation

**Lines 539-595**: Luxury Button System
- `.luxury-btn-primary` - Primary button with shine

**Lines 601-624**: Luxury Backdrop Effects
- `.luxury-backdrop-blur`
- `.luxury-backdrop-mesh`

**Lines 630-668**: Luxury Animation Keyframes
- `luxuryPulse`
- `luxuryShimmer`
- `luxuryGlow`
- `luxuryGlowDark`

**Lines 678-706**: Luxury Typography
- `.luxury-heading`
- `.luxury-body`
- `.luxury-text-shadow-light`

**Lines 712-744**: Premium Hover Effects
- `.luxury-hover-glow`
- `.luxury-hover-lift`
- `.luxury-hover-scale`

**Lines 750-759**: Responsive Luxury
- Mobile optimizations

**Lines 765-780**: Utility Classes
- `.luxury-transition`
- `.luxury-transition-fast`
- `.luxury-no-select`
- `.luxury-pointer`

**Lines 787-799**: Theme Transition Animation
- Global transition properties
- Exclusions

**Lines 806-830**: Animated Gradient System
- `animateGradient` keyframe
- `.gradient-animated`
- `.gradient-animated-fast`
- `.gradient-animated-slow`

**Lines 836-909**: Reduced Motion Support
- Disables animations for reduced motion preference

#### 3. Tailwind Configuration (`tailwind.config.ts`)

**Lines 4-5**: Dark Mode Strategy
```typescript
darkMode: ["class", "class"], // Uses class strategy
```

**Lines 12-78**: Color System
- Custom color palette
- CSS variable integration
- Theme-aware colors

**Lines 79-88**: Spacing
- Custom spacing scale

**Lines 89-99**: Font Sizes
- Responsive font sizes using clamp()

**Lines 101-105**: Line Heights
- Display, heading, relaxed

**Lines 106-111**: Letter Spacing
- Tighter, tight, wide, wider

**Lines 112-118**: Border Radius
- Custom radius values

**Lines 119-127**: Box Shadows
- Glass shadows (glass-sm to glass-2xl)
- Glow effects

**Lines 128-132**: Backdrop Blur
- xs, glass, heavy

**Lines 133-138**: Max Width
- content, standard, text, narrow

**Lines 139-142**: Transition Duration
- Custom durations

**Lines 143-148**: Z-Index
- cursor, modal, nav, dropdown

**Lines 149-151**: Background Image
- Gradient radial

**Lines 152-173**: Keyframes & Animations
- Accordion animations

---

## Page-by-Page Documentation

### 1. Home Page (`/`)

**File**: `src/app/page.tsx`

#### Structure
```tsx
<main>
  <HeroSection />
  <FeaturedProjectsSection />
  <AboutPreviewSection />
  <TechStackSection />
</main>
```

#### CSS Dependencies

**Global Styles**:
- `base.css` - All global styles
- `luxury-system.css` - Luxury theme system

**Component-Specific Styles**:
1. **HeroSection**:
   - Inline styles: Background gradients (lines 331-348)
   - CSS classes: `bg-primary`, `text-fg-primary`, `text-fg-secondary`
   - Tailwind: Responsive padding, font sizes
   - GSAP animations: Fade-in-up, stagger, counter

2. **FeaturedProjectsSection**:
   - CSS classes: `glass-card`, `hover-glow`
   - Tailwind: Grid layouts, spacing

3. **AboutPreviewSection**:
   - CSS classes: `glass-base`, `glass-frosted`
   - Tailwind: Flexbox, responsive design

4. **TechStackSection**:
   - CSS classes: `luxury-card-base`, `luxury-card-hover`
   - Tailwind: Grid, gap utilities

#### Inline Styles Count
- **HeroSection**: 15+ inline style objects
- **FeaturedProjectsSection**: 0 inline styles (uses classes)
- **AboutPreviewSection**: 5+ inline styles
- **TechStackSection**: 0 inline styles (uses classes)

#### CSS Files Affecting Home Page
1. `base.css` - 100% (all sections use base styles)
2. `luxury-system.css` - 80% (luxury effects used)
3. `tailwind.config.ts` - 100% (all utility classes)

---

### 2. About Page (`/about`)

**File**: `src/app/about/page.tsx`

#### Structure
```tsx
<main>
  <section> {/* About Content */}
    <Container>
      <AnimatedSection>
        {/* Personal Info */}
        {/* Stats Cards */}
        {/* Certifications */}
        {/* Skills */}
      </AnimatedSection>
    </Container>
  </section>
  
  <section> {/* Education */}
    <Container>
      <AnimatedSection>
        {/* Education Cards */}
      </AnimatedSection>
    </Container>
  </section>
  
  <section> {/* Certifications */}
    <Container>
      <AnimatedSection>
        {/* Certification Cards */}
      </AnimatedSection>
    </Container>
  </section>
  
  <section> {/* LeetCode & GitHub Dashboard */}
    <Container>
      <AnimatedSection>
        {/* Carousel */}
      </AnimatedSection>
    </Container>
  </section>
</main>
```

#### CSS Dependencies

**Section 1: About Content**
- CSS classes: `glass-card`, `glass-base`, `FrostedCard`, `GlowOnHover`
- Tailwind: Grid layouts, spacing, responsive design
- Inline styles: Background gradient orbs (lines 179-182)

**Section 2: Education**
- CSS classes: `glass-card`, `glass-base`
- Tailwind: Flexbox, spacing
- Inline styles: Background gradient orbs (lines 391-394)

**Section 3: Certifications**
- CSS classes: `glass-card`, `hover-glow`
- Tailwind: Grid, transitions
- Inline styles: Background gradient orbs (lines 474-477), certificate card styles

**Section 4: Dashboard Carousel**
- CSS classes: `glass-base`, `backdrop-blur-luxury`
- Tailwind: Flexbox, animations
- Inline styles: Background gradient orbs (lines 587-590)

#### Inline Styles Count
- **About Content Section**: 3+ inline styles
- **Education Section**: 2+ inline styles
- **Certifications Section**: 8+ inline styles
- **Dashboard Section**: 2+ inline styles

#### CSS Files Affecting About Page
1. `base.css` - 100%
2. `luxury-system.css` - 90% (heavy use of luxury cards)
3. `tailwind.config.ts` - 100%

---

### 3. Projects Page (`/projects`)

**File**: `src/app/projects/page.tsx`

#### Structure
```tsx
<main>
  <section>
    <Container>
      <AnimatedSection>
        {/* Header */}
        {/* Projects Grid */}
      </AnimatedSection>
    </Container>
  </section>
</main>
```

#### CSS Dependencies

**Projects Grid**:
- CSS classes: `glass-card`, `hover-glow` (from ProjectCard)
- Tailwind: Grid layouts, gap utilities
- Inline styles: Background gradient orbs (lines 61-64)

#### Inline Styles Count
- **Projects Section**: 1+ inline styles (background orbs)

#### CSS Files Affecting Projects Page
1. `base.css` - 100%
2. `luxury-system.css` - 60% (card effects)
3. `tailwind.config.ts` - 100%

---

### 4. Contact Page (`/contact`)

**File**: `src/app/contact/page.tsx`

#### Structure
```tsx
<main>
  <section>
    <Container>
      <AnimatedSection>
        {/* Header */}
        <div className="grid lg:grid-cols-2">
          {/* Contact Info */}
          {/* Contact Form */}
        </div>
      </AnimatedSection>
    </Container>
  </section>
</main>
```

#### CSS Dependencies

**Contact Info**:
- CSS classes: `glass-base`, `glass-card`
- Tailwind: Flexbox, spacing

**Contact Form**:
- CSS classes: `FrostedCard`, `FormField` (with inline styles)
- Tailwind: Form layouts
- Inline styles: FormField has hardcoded styles (lines 82-85, 99-103 in FormField.tsx)

#### Inline Styles Count
- **Contact Section**: 2+ inline styles (background orbs)
- **FormField Component**: 2 inline style objects (hardcoded colors)

#### CSS Files Affecting Contact Page
1. `base.css` - 100%
2. `luxury-system.css` - 70%
3. `tailwind.config.ts` - 100%
4. `form-field.css` - FormField specific styles

---

### 5. Project Detail Page (`/projects/[slug]`)

**File**: `src/app/projects/[slug]/page.tsx`

#### CSS Dependencies
- Similar to Projects page
- Additional detail-specific styles
- Image galleries
- Code blocks styling

---

### 6. Admin Pages (`/admin/*`)

**Files**: 
- `src/app/admin/layout.tsx`
- `src/app/admin/page.tsx`
- `src/app/admin/dashboard/page.tsx`
- `src/app/admin/admin-input.css`

#### CSS Dependencies

**Admin Layout**:
- Conditional layout (no header/footer)
- Admin-specific styles

**Admin Input CSS**:
- Form-specific styles
- Input field styling
- Validation styles

#### CSS Files Affecting Admin
1. `base.css` - 100%
2. `admin-input.css` - Admin-specific
3. `tailwind.config.ts` - 100%

---

## Component CSS Dependencies

### Layout Components

#### SiteHeader (`src/components/layout/SiteHeader.tsx`)
**CSS Files Used**:
- `base.css` - 100% (all base styles)
- `luxury-system.css` - 80% (luxury effects)

**CSS Classes**:
- `glass-base`, `glass-frosted`
- `bg-overlay`, `backdrop-blur-luxury`
- `text-primary`, `text-secondary`
- Tailwind utilities

**Inline Styles**:
- 15+ inline style objects
- Theme-aware background colors
- Framer Motion style props
- Gradient borders
- Mouse-reactive effects

**Lines with Inline Styles**:
- 114-128: Header pill background
- 277-286: Backdrop blur animation
- 316-325: Gradient border
- 329-337: Ambient glow
- 340-348: Inner glow
- 351-359: Top highlight
- 362-374: Dynamic reflect layer
- 377-400: Mouse-reactive light

#### SiteFooter (`src/components/layout/SiteFooter.tsx`)
**CSS Files Used**:
- `base.css` - 100%
- `luxury-system.css` - 40%

**CSS Classes**:
- `glass-base`
- `text-secondary`
- Tailwind utilities

**Inline Styles**:
- Minimal (0-2 inline styles)

#### PageTransition (`src/components/layout/PageTransition.tsx`)
**CSS Files Used**:
- `base.css` - 20% (transitions)
- Framer Motion handles animations

**Inline Styles**:
- 1 inline style object (willChange)

---

### Section Components

#### HeroSection (`src/components/sections/HeroSection.tsx`)
**CSS Files Used**:
- `base.css` - 100%
- `luxury-system.css` - 60%

**CSS Classes**:
- `bg-primary`, `text-fg-primary`
- `gradient-animated`
- Tailwind utilities

**Inline Styles**:
- 15+ inline style objects
- Background gradients (theme-aware)
- Responsive font sizes
- Padding calculations

**Lines with Inline Styles**:
- 331-348: Background gradient
- 361-364: Container padding
- 368-372: Content max-width
- 377-379: Headline margin
- 383-387: H1 font size
- 392-394: Line 1 margin
- 414-421: Subheadline styles
- 430-433: CTA container gap
- 447-468: Button styles (theme-aware)
- 479-485: Stats border
- 513-519: Stat value styles
- 528-536: Stat label styles
- 550-554: Social links styles
- 564-569: Social link text styles

#### FeaturedProjectsSection
**CSS Files Used**:
- `base.css` - 100%
- `luxury-system.css` - 70%

**CSS Classes**:
- `glass-card`, `hover-glow`
- Tailwind grid utilities

**Inline Styles**:
- Minimal (0-2 inline styles)

#### AboutPreviewSection
**CSS Files Used**:
- `base.css` - 100%
- `luxury-system.css` - 80%

**CSS Classes**:
- `glass-base`, `glass-frosted`
- `luxury-card-base`

**Inline Styles**:
- 5+ inline styles

#### TechStackSection
**CSS Files Used**:
- `base.css` - 100%
- `luxury-system.css` - 90%

**CSS Classes**:
- `luxury-card-base`
- `luxury-card-hover`
- `luxury-card-glow`

**Inline Styles**:
- Minimal (0-1 inline styles)

---

### UI Components

#### Button (`src/components/ui/button.tsx`)
**CSS Files Used**:
- `base.css` - 100%
- `luxury-system.css` - 30%

**CSS Classes**:
- `glass-base`, `glass-frosted`
- `transition-smooth`
- Tailwind utilities

**Inline Styles**:
- 0 inline styles (pure CSS classes)

#### Card (`src/components/ui/Card.tsx`)
**CSS Files Used**:
- `base.css` - 100%
- `luxury-system.css` - 80%

**CSS Classes**:
- `glass-card`
- `backdrop-blur-xl`
- Tailwind utilities

**Inline Styles**:
- 0 inline styles (pure CSS classes)

#### FrostedCard (`src/components/ui/FrostedCard.tsx`)
**CSS Files Used**:
- `base.css` - 100%
- `luxury-system.css` - 90%

**CSS Classes**:
- `glass-frosted`
- `backdrop-blur-luxury`
- Custom intensity classes

**Inline Styles**:
- 0-2 inline styles (backdrop blur calculations)

#### FormField (`src/components/ui/FormField.tsx`)
**CSS Files Used**:
- `base.css` - 100%
- `form-field.css` - 100%
- `luxury-system.css` - 20%

**CSS Classes**:
- `glass-base`
- Tailwind utilities

**Inline Styles**:
- 2 inline style objects (hardcoded colors - lines 82-85, 99-103)
- **Issue**: Hardcoded colors don't respect theme

#### Input (`src/components/ui/input.tsx`)
**CSS Files Used**:
- `base.css` - 100%
- `luxury-system.css` - 10%

**CSS Classes**:
- `bg-secondary/50`
- `border-primary`
- Tailwind utilities

**Inline Styles**:
- 1 inline style (color variable - line 29)

---

## Cross-References

### Theme System Cross-References

**Files that use theme**:
1. `src/hooks/use-theme.ts` - Core theme hook
2. `src/components/admin/ThemeToggle.tsx` - Toggle button
3. `src/components/layout/SiteHeader.tsx` - Header with toggle
4. `src/app/layout.tsx` - Root theme initialization
5. `src/styles/base.css` - Theme CSS variables
6. `src/styles/luxury-system.css` - Theme-specific styles
7. `src/components/sections/HeroSection.tsx` - Theme-aware gradients
8. All UI components - Use theme variables

**CSS Variables Used Across Components**:
- `--color-bg-primary` - Used in 50+ places
- `--color-text-primary` - Used in 100+ places
- `--color-border` - Used in 30+ places
- `--glass-bg` - Used in 20+ places
- `--glass-border` - Used in 15+ places

### Animation System Cross-References

**GSAP Animations** (`src/lib/gsapAnimations.ts`):
- Used in: HeroSection, AboutPreviewSection
- Functions: `animateFadeInUp`, `animateStagger`, `animateScrollFadeIn`, `animateCounter`

**Framer Motion**:
- Used in: All animated components
- Variants: `src/lib/motionVariants.ts`
- Components: AnimatedSection, PageTransition, SiteHeader

### Layout System Cross-References

**ConditionalLayout** (`src/components/layout/ConditionalLayout.tsx`):
- Routes admin pages differently
- Wraps main site with MainSiteLayout

**MainSiteLayout** (`src/components/layout/MainSiteLayout.tsx`):
- Provides: Header, Footer, PageTransition, Loaders
- Wraps all main site pages

### CSS File Dependencies

**base.css imports**:
- `luxury-system.css` (line 2)

**Components using base.css**:
- 100% of components

**Components using luxury-system.css**:
- 80% of components (main site only)

**Components using admin-input.css**:
- Admin form components only

### Inline Style Usage Summary

**Components with Most Inline Styles**:
1. **SiteHeader**: 15+ inline styles
2. **HeroSection**: 15+ inline styles
3. **AboutPage**: 15+ inline styles (across sections)
4. **FormField**: 2 inline styles (hardcoded - needs fix)

**Components with No Inline Styles**:
- Button
- Card
- Text
- Heading
- Container
- Most UI components

**Theme-Aware Inline Styles**:
- SiteHeader (background colors, gradients)
- HeroSection (background gradients)
- AboutPage (gradient orbs)

### CSS Class Usage Statistics

**Most Used CSS Classes**:
1. `glass-card` - 50+ uses
2. `glass-base` - 40+ uses
3. `glass-frosted` - 30+ uses
4. `bg-primary` - 100+ uses
5. `text-fg-primary` - 100+ uses
6. `luxury-card-base` - 20+ uses
7. `hover-glow` - 15+ uses

**Tailwind Utility Usage**:
- Grid: 30+ uses
- Flexbox: 50+ uses
- Spacing: 200+ uses
- Typography: 100+ uses
- Responsive: 150+ uses

---

## Summary Statistics

### File Count
- **Total CSS Files**: 3 (base.css, luxury-system.css, admin-input.css)
- **Total Component Files**: 50+
- **Total Page Files**: 6
- **Total Hook Files**: 10+

### CSS Lines of Code
- **base.css**: ~656 lines
- **luxury-system.css**: ~910 lines
- **admin-input.css**: ~50 lines (estimated)
- **Total**: ~1,616 lines of CSS

### Inline Style Usage
- **Components with inline styles**: 8
- **Total inline style objects**: ~50+
- **Theme-aware inline styles**: ~30+

### CSS Class Usage
- **Custom CSS classes**: 100+
- **Tailwind utilities**: 500+ uses
- **Most used class**: `bg-primary` (100+ uses)

### Toggle Systems
- **Theme Toggle**: 1 (light/dark)
- **Mobile Menu Toggle**: 1
- **Other toggles**: 0

---

## Recommendations

### 1. Fix Hardcoded Colors
**Issue**: FormField has hardcoded colors that don't respect theme
**Location**: `src/components/ui/FormField.tsx` (lines 82-85, 99-103)
**Fix**: Replace with CSS variables

### 2. Reduce Inline Styles
**Issue**: Some components have too many inline styles
**Recommendation**: Move theme-aware styles to CSS classes where possible

### 3. CSS Variable Consistency
**Issue**: Some components use both CSS variables and inline styles
**Recommendation**: Standardize on CSS variables for theme-aware styles

### 4. Performance Optimization
**Recommendation**: Consider CSS-in-JS for dynamic styles to reduce inline style objects

---

## Conclusion

This portfolio project uses a sophisticated CSS architecture with:
- **3 main CSS files** managing different concerns
- **Theme system** with CSS variables and class-based dark mode
- **Luxury design system** with extensive gradient and glass effects
- **Responsive design** using Tailwind utilities
- **Animation system** combining GSAP and Framer Motion
- **Toggle systems** for theme and mobile menu

The codebase follows modern best practices with separation of concerns, theme-aware styling, and accessibility considerations.

