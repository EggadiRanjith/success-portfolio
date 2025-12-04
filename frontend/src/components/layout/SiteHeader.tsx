"use client";

import React, { useCallback, useEffect, useRef, useState, useMemo, createElement } from "react";
import { usePathname, useRouter } from "next/navigation";
import { cn, validateContrast } from "@/lib/utils";
import { Button, Link } from "@/components/ui";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme, type Theme } from "@/context/ThemeContext";
import { useScroll } from "@/hooks/use-scroll";
import { motion, AnimatePresence, useReducedMotion, useScroll as useFramerScroll, useTransform } from "framer-motion";
import { createPortal } from "react-dom";
import { useIsDesktop } from "@/hooks/use-is-desktop";
import { RemoveScrollBar } from "react-remove-scroll-bar";
import FocusLock from "react-focus-lock";
import { useClickAway, useMedia } from "react-use";
import { useScrollLock } from "@/hooks/useScrollLock";
import { NAV_LINKS } from "@/lib/constants";
import { getPortfolioData } from "@/lib/adminData";
import { trackEvent } from "@/components/Analytics";
import { Home, FolderOpen, User, Mail } from "lucide-react";

// Storage key constant
const STORAGE_KEY = "portfolio_admin_data";

// Menu icons mapping
const MENU_ICONS = {
  "/home": Home,
  "/projects": FolderOpen,
  "/about": User,
  "/contact": Mail,
} as const;

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { scrolled } = useScroll(8);
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [siteName, setSiteName] = useState("Ranjith Eggadi");
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(typeof window !== "undefined" ? window.scrollY : 0);
  const [skipLinkVisible, setSkipLinkVisible] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  
  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;
  
  // Detect if mobile device
  const isMobile = useMedia("(max-width: 767px)", false);
  
  // Consolidated effect: Load site name and handle theme sync
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    const loadSiteName = () => {
      try {
        const data = getPortfolioData();
        if (data?.personalInfo?.name) {
          setSiteName(data.personalInfo.name);
        }
      } catch (error) {
        // Fallback to default
      }
    };
    
    // Load initially
    loadSiteName();
    setMounted(true);
    
    // Listen for storage changes (when admin updates data)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY || e.key === null) {
        loadSiteName();
      }
      // Handle theme changes from other tabs
      if (e.key === "theme" && e.newValue) {
        const newTheme = e.newValue as Theme;
        if (newTheme === "light" || newTheme === "dark") {
          document.documentElement.setAttribute("data-theme", newTheme);
          if (newTheme === "dark") {
            document.documentElement.classList.add("dark");
          } else {
            document.documentElement.classList.remove("dark");
          }
          window.dispatchEvent(new Event("storage"));
        }
      }
    };
    
    // Listen for custom event (for same-tab updates)
    const handlePortfolioUpdate = () => {
      loadSiteName();
    };
    
    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("portfolio-data-updated", handlePortfolioUpdate);
    
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("portfolio-data-updated", handlePortfolioUpdate);
    };
  }, []);
  
  // Lock body scroll when mobile menu is open
  useScrollLock(open);
  
  // Refs
  const firstMenuLinkRef = useRef<HTMLAnchorElement | null>(null);
  const lastActiveRef = useRef<HTMLElement | null>(null);
  const [mouse, setMouse] = useState<{ x: number; y: number } | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const isDesktop = useIsDesktop();
  const headerRef = useRef<HTMLElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const menuPanelRef = useRef<HTMLDivElement>(null);
  
  // Media query for reduced motion
  const prefersReducedMotionMedia = useMedia("(prefers-reduced-motion: reduce)", false);
  
  // Header visibility on scroll (hide on scroll down, show on scroll up)
  // Disabled by default - header stays always visible for better UX
  // To enable auto-hide, uncomment the useEffect below
  useEffect(() => {
    // Always keep header visible
    setIsVisible(true);
  }, []);
  
  // Uncomment below to enable auto-hide on scroll down
  /*
  useEffect(() => {
    if (typeof window === "undefined" || prefersReducedMotion || prefersReducedMotionMedia) {
      setIsVisible(true);
      return;
    }
    
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          
          if (currentScrollY < 10) {
            setIsVisible(true);
          } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
            setIsVisible(false);
          } else if (currentScrollY < lastScrollY) {
            setIsVisible(true);
          }
          
          setLastScrollY(currentScrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    
    setLastScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prefersReducedMotion, prefersReducedMotionMedia]);
  */
  
  // Keyboard shortcuts (Cmd/Ctrl+K to toggle menu)
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + K to toggle mobile menu
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
        trackEvent("keyboard_shortcut", { action: "toggle_menu", key: "cmd+k" });
      }
      
      // Tab key shows skip link
      if (e.key === "Tab" && !e.shiftKey && document.activeElement === document.body) {
        setSkipLinkVisible(true);
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
  
  // Hide skip link when clicking outside
  useEffect(() => {
    const handleClick = () => setSkipLinkVisible(false);
    if (skipLinkVisible) {
      document.addEventListener("click", handleClick);
      return () => document.removeEventListener("click", handleClick);
    }
  }, [skipLinkVisible]);
  
  // Framer Motion scroll for smooth blur interpolation
  const { scrollY } = useFramerScroll();
  
  // Desktop blur transform
  const desktopBlur = useTransform(
    scrollY,
    [0, 10, 100],
    ["blur(12px) saturate(180%)", "blur(16px) saturate(180%)", "blur(24px) saturate(200%)"]
  );
  
  // Mobile blur transform - reduced for performance
  const mobileBlurTransform = useTransform(
    scrollY,
    [0, 10, 100],
    ["blur(8px) saturate(160%)", "blur(10px) saturate(160%)", "blur(12px) saturate(180%)"]
  );
  
  // Select blur based on device
  const blurAmount = isMobile ? mobileBlurTransform : desktopBlur;
  
  // Opacity transform for premium fade effect
  const headerOpacity = useTransform(
    scrollY,
    [0, 50],
    [0.95, 0.98]
  );
  
  // Memoized static blur value for reduced motion
  const staticBlur = useMemo(() => {
    if (prefersReducedMotion || prefersReducedMotionMedia) {
      return scrolled 
        ? (isMobile ? "blur(12px) saturate(160%)" : "blur(24px) saturate(180%)")
        : (isMobile ? "blur(10px) saturate(160%)" : "blur(20px) saturate(180%)");
    }
    return undefined;
  }, [scrolled, prefersReducedMotion, prefersReducedMotionMedia, isMobile]);
  
  // Force style update when theme changes (bypass Framer Motion cache)
  useEffect(() => {
    if (typeof window !== "undefined" && mounted && pillRef.current) {
      const bgColor = theme === "dark" 
        ? "rgba(15, 15, 15, 0.8)" 
        : "rgba(255, 255, 255, 0.9)";
      const shadow = theme === "dark"
        ? scrolled
          ? "0 8px 32px rgba(0,0,0,0.12), 0 0 0 1px rgba(255,255,255,0.05) inset"
          : "0 4px 24px rgba(0,0,0,0.08), 0 0 0 1px rgba(255,255,255,0.03) inset"
        : scrolled
          ? "0 8px 32px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.05) inset"
          : "0 4px 24px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.03) inset";
      
      pillRef.current.style.setProperty("background-color", bgColor, "important");
      pillRef.current.style.setProperty("box-shadow", shadow, "important");
    }
  }, [theme, mounted, scrolled]);

  // WCAG contrast validation (dev only)
  useEffect(() => {
    if (process.env.NODE_ENV === "development" && mounted) {
      validateContrast("#ffffff", "#000000", "Header text", 4.5);
    }
  }, [mounted]);

  // Optimized mouse tracking: desktop-only with useCallback
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (!isDesktop || prefersReducedMotion || prefersReducedMotionMedia || !pillRef.current) return;
    const pillRect = pillRef.current.getBoundingClientRect();
    const x = e.clientX - pillRect.left;
    const y = e.clientY - pillRect.top;
    setMouse({ x, y });
    setIsHovering(true);
  }, [isDesktop, prefersReducedMotion, prefersReducedMotionMedia]);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    setMouse(null);
  }, []);

  // Memoized keyboard handler for mobile menu
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape" && open) {
      setOpen(false);
    }
  }, [open]);

  // Optimized close menu function with error handling
  const closeMenu = useCallback(() => {
    if (!open) return;
    try {
      setOpen(false);
      trackEvent("menu_close", { method: "click" });
      // Haptic feedback on mobile
      if (typeof navigator !== "undefined" && navigator.vibrate && isMobile) {
        navigator.vibrate(10);
      }
    } catch (error) {
      setOpen(false); // Force close on error
    }
  }, [open, isMobile]);
  
  // Handle menu open with analytics
  const handleMenuOpen = useCallback(() => {
    setOpen(true);
    trackEvent("menu_open", { method: "button" });
    if (typeof navigator !== "undefined" && navigator.vibrate && isMobile) {
      navigator.vibrate(10);
    }
  }, [isMobile]);
  
  // Handle "Let's Talk" button click
  const handleLetsTalkClick = useCallback(() => {
    closeMenu();
    trackEvent("cta_click", { button: "lets_talk", location: "header" });
    setIsNavigating(true);
    
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => setIsNavigating(false), 500);
    } else {
      router.push("/contact");
      setTimeout(() => setIsNavigating(false), 300);
    }
  }, [closeMenu, router]);
  
  // Handle navigation with analytics
  const handleNavClick = useCallback((href: string, label: string) => {
    trackEvent("nav_click", { destination: href, label });
    setIsNavigating(true);
    setTimeout(() => setIsNavigating(false), 300);
  }, []);
  
  // Skip to main content handler
  const handleSkipToMain = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const main = document.querySelector("main");
    if (main) {
      main.focus();
      main.scrollIntoView({ behavior: "smooth", block: "start" });
      trackEvent("skip_link_used", { destination: "main" });
    }
  }, []);
  
  // Swipe gesture handlers for mobile menu
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    // Close menu on left swipe (swipe left to close)
    if (isLeftSwipe && open) {
      closeMenu();
    }
  };

  // Click away handler for mobile menu
  useClickAway(menuPanelRef, (e) => {
    // Only close if clicking outside the menu panel
    if (open && menuPanelRef.current && !menuPanelRef.current.contains(e.target as Node)) {
      closeMenu();
    }
  });

  // Focus management with error handling
  useEffect(() => {
    if (!open) return;
    
    const onRoute = () => closeMenu();
    window.addEventListener("hashchange", onRoute);
    document.addEventListener("keydown", handleKeyDown);
    
    // Safe focus capture
    try {
      lastActiveRef.current = document.activeElement as HTMLElement;
    } catch (e) {
      // Ignore focus capture errors
    }
    
    // Defer focus to first link with error handling
    const focusTimeout = setTimeout(() => {
      try {
        firstMenuLinkRef.current?.focus();
      } catch (e) {
        // Focus may fail in some edge cases, ignore
      }
    }, 0);
    
    return () => {
      clearTimeout(focusTimeout);
      window.removeEventListener("hashchange", onRoute);
      document.removeEventListener("keydown", handleKeyDown);
      
      // Safe focus restoration
      if (
        lastActiveRef.current &&
        document.contains(lastActiveRef.current) &&
        lastActiveRef.current instanceof HTMLElement
      ) {
        try {
          lastActiveRef.current.focus();
        } catch (e) {
          // Element may not be focusable, ignore
        }
      }
    };
  }, [open, handleKeyDown, closeMenu]);

  return (
    <>
      {/* Skip to main content link - Accessibility enhancement */}
      <AnimatePresence>
        {skipLinkVisible && (
          <motion.a
            href="#main-content"
            onClick={handleSkipToMain}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={cn(
              "fixed top-4 left-1/2 -translate-x-1/2 z-[1100]",
              "px-4 py-2 rounded-lg font-medium text-sm",
              "bg-primary text-primary-foreground",
              "shadow-lg border-2 border-primary",
              "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
              "transition-all duration-200"
            )}
            onBlur={() => setSkipLinkVisible(false)}
          >
            Skip to main content
          </motion.a>
        )}
      </AnimatePresence>
      
      {/* Professional scroll bar removal when menu is open */}
      {open && <RemoveScrollBar />}
      
      <header
        ref={headerRef}
        role="banner"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          width: "100%",
          zIndex: 1020,
          paddingTop: `calc(${scrolled ? "0.5rem" : "0.625rem"} + env(safe-area-inset-top))`,
          paddingBottom: scrolled ? "0.5rem" : "0.625rem",
          backgroundColor: "transparent",
        }}
        className="bg-transparent"
        onMouseMove={isDesktop ? handleMouseMove : undefined}
        onMouseLeave={isDesktop ? handleMouseLeave : undefined}
      >
        <div className="relative max-w-standard mx-auto px-3 sm:px-3 md:px-4 lg:px-6">
          {/* Premium Clean Header Container */}
          <motion.div
            ref={pillRef}
            className={cn(
              "premium-header relative rounded-full",
              // More spacious padding on mobile for full name display
              scrolled 
                ? "px-3 py-2 sm:px-4 sm:py-2.5 md:px-6 md:py-2.5 lg:px-8 lg:py-3"
                : "px-3 py-2 sm:px-4 sm:py-2.5 md:px-6 md:py-2.5 lg:px-8 lg:py-3"
            )}
            style={{
              backdropFilter: "blur(20px) saturate(180%)",
              WebkitBackdropFilter: "blur(20px) saturate(180%)",
              background: theme === "dark"
                ? scrolled
                  ? "rgba(0, 0, 0, 0.25)"
                  : "rgba(0, 0, 0, 0.2)"
                : scrolled
                  ? "rgba(255, 255, 255, 0.4)"
                  : "rgba(255, 255, 255, 0.35)",
              border: theme === "dark"
                ? "1px solid rgba(255, 255, 255, 0.1)"
                : "1px solid rgba(0, 0, 0, 0.1)",
              opacity: prefersReducedMotion || prefersReducedMotionMedia ? 1 : headerOpacity,
            }}
            animate={{
              boxShadow: scrolled
                ? theme === "dark"
                  ? "0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
                  : "0 8px 32px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.5)"
                : theme === "dark"
                  ? "0 4px 24px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.08)"
                  : "0 4px 24px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.4)",
            }}
            whileHover={prefersReducedMotion || prefersReducedMotionMedia ? {} : {
              boxShadow: scrolled
                ? theme === "dark"
                  ? "0 12px 48px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.15)"
                  : "0 12px 48px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.6)"
                : theme === "dark"
                  ? "0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
                  : "0 8px 32px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.5)",
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              mass: 0.8,
            }}
            suppressHydrationWarning
          >
            {/* Subtle Ambient Glow - Framer Style */}
            <div 
              className="pointer-events-none absolute -inset-1 rounded-full blur-xl opacity-20"
              style={{
                background: theme === "dark"
                  ? "radial-gradient(circle, rgba(96,165,250,0.15) 0%, transparent 60%)"
                  : "radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 60%)",
              }}
              suppressHydrationWarning
            />
            
            {/* Subtle Mouse-Reactive Light */}
            {!prefersReducedMotion && !prefersReducedMotionMedia && isDesktop && isHovering && mouse && (
              <motion.div
                className="pointer-events-none absolute inset-0 rounded-full"
                style={{
                  background: theme === "dark"
                    ? `radial-gradient(300px circle at ${mouse.x}px ${mouse.y}px, rgba(96,165,250,0.1), transparent 50%)`
                    : `radial-gradient(300px circle at ${mouse.x}px ${mouse.y}px, rgba(59,130,246,0.08), transparent 50%)`,
                }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              />
            )}

            <div className="relative flex items-center justify-between gap-2 sm:gap-3 md:gap-4 w-full min-h-[44px] sm:min-h-[48px] md:min-h-[52px]">
              {/* Premium Logo */}
              <motion.div
                whileHover={prefersReducedMotion || prefersReducedMotionMedia ? {} : {
                  scale: 1.02,
                }}
                whileTap={prefersReducedMotion || prefersReducedMotionMedia ? {} : {
                  scale: 0.98,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Link 
                  href="/home" 
                  className={cn(
                    "relative inline-flex items-center font-semibold tracking-tight",
                    "px-2 py-1.5 sm:px-2.5 sm:py-1.5 md:px-3 md:py-1.5 lg:px-3 lg:py-1.5",
                    "rounded-lg",
                    "text-lg sm:text-xl md:text-xl lg:text-2xl xl:text-3xl",
                    "leading-tight sm:leading-tight",
                    "flex-shrink-0",
                    // Mobile: Always show full name, no truncation
                    "whitespace-nowrap",
                    "transition-all duration-200 ease-out",
                    "min-h-[44px]",
                    "touch-manipulation" // Better mobile touch handling
                  )}
                  aria-label="Home"
                >
                  <span className="relative z-10 inline-block text-primary">
                    {siteName}
                  </span>
                </Link>
              </motion.div>

              {/* Desktop Nav */}
              <nav className="hidden md:flex items-center gap-4 lg:gap-6 xl:gap-8" aria-label="Primary">
                {NAV_LINKS.map((link) => {
                  const active = pathname === link.href;
                  const Icon = MENU_ICONS[link.href as keyof typeof MENU_ICONS];
                  return (
                    <motion.div key={link.href} className="relative">
                      <Link
                        href={link.href}
                        aria-current={active ? "page" : undefined}
                        onClick={() => handleNavClick(link.href, link.label)}
                        className={cn(
                          "relative px-3 py-1.5 sm:px-4 sm:py-2",
                          "text-sm sm:text-base md:text-lg",
                          "font-medium text-secondary hover:text-primary",
                          "transition-colors duration-200 ease-out",
                          "rounded-lg flex items-center gap-2",
                          active && "text-primary"
                        )}
                      >
                        {Icon && (
                          <Icon className={cn(
                            "h-4 w-4 transition-transform duration-200",
                            active && "scale-110"
                          )} />
                        )}
                        <motion.span 
                          className="relative z-10"
                          whileHover={prefersReducedMotion || prefersReducedMotionMedia ? {} : { 
                            scale: 1.02,
                            y: -1,
                          }}
                          whileTap={prefersReducedMotion || prefersReducedMotionMedia ? {} : { scale: 0.98 }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 25,
                          }}
                        >
                          {link.label}
                        </motion.span>
                        {/* Framer-style subtle hover background */}
                        <motion.div
                          className="absolute inset-0 rounded-lg bg-secondary/30 opacity-0"
                          whileHover={prefersReducedMotion || prefersReducedMotionMedia ? {} : { opacity: 1 }}
                          transition={{ duration: 0.15, ease: "easeOut" }}
                        />
                      </Link>
                      {/* Clean Active Indicator */}
                      {active && mounted && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full"
                          style={{
                            background: theme === "dark"
                              ? "linear-gradient(to right, transparent, rgba(96,165,250,0.8), transparent)"
                              : "linear-gradient(to right, transparent, rgba(59,130,246,0.8), transparent)",
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 35,
                          }}
                        />
                      )}
                    </motion.div>
                  );
                })}
              </nav>

              {/* Actions - Perfectly aligned for mobile */}
              <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3 flex-shrink-0">
                {/* Clean Theme Toggle */}
                <motion.button
                  aria-label="Toggle theme"
                  onClick={() => {
                    toggleTheme();
                    trackEvent("theme_toggle", { theme: theme === "dark" ? "light" : "dark" });
                  }}
                  className={cn(
                    "inline-flex items-center justify-center",
                    "p-2.5 sm:p-2.5 md:p-2.5",
                    "min-w-[44px] min-h-[44px]",
                    "rounded-full",
                    "bg-secondary/0 hover:bg-secondary/20",
                    "border border-transparent hover:border-border-primary/30",
                    "transition-all duration-200 ease-out",
                    "relative",
                    "touch-manipulation" // Better mobile touch handling
                  )}
                  whileHover={prefersReducedMotion || prefersReducedMotionMedia ? {} : {
                    scale: 1.05,
                  }}
                  whileTap={prefersReducedMotion || prefersReducedMotionMedia ? {} : {
                    scale: 0.95,
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  {mounted ? (
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={theme}
                        initial={{ rotate: -180, scale: 0.8, opacity: 0 }}
                        animate={{ rotate: 0, scale: 1, opacity: 1 }}
                        exit={{ rotate: 180, scale: 0.8, opacity: 0 }}
                        transition={{ 
                          type: "spring", 
                          stiffness: 300, 
                          damping: 20,
                          duration: 0.3
                        }}
                      >
                        {theme === "dark" ? (
                          <Sun className={cn(
                            "text-primary",
                            isMobile ? "h-6 w-6" : "h-5 w-5"
                          )} />
                        ) : (
                          <Moon className={cn(
                            "text-primary",
                            isMobile ? "h-6 w-6" : "h-5 w-5"
                          )} />
                        )}
                      </motion.div>
                    </AnimatePresence>
                  ) : (
                    <div className="h-5 w-5 sm:h-5 sm:w-5 md:h-5 md:w-5" />
                  )}
                </motion.button>
                {/* Clean Let's Talk Button */}
                <div className="hidden md:block">
                  <motion.button
                    onClick={handleLetsTalkClick}
                    className={cn(
                      "relative overflow-hidden",
                      "px-4 py-2 sm:px-5 sm:py-2.5 lg:px-6 lg:py-2.5",
                      "text-sm sm:text-base font-medium",
                      "rounded-full",
                      "border border-transparent",
                      "transition-all duration-200 ease-out",
                      "shadow-sm hover:shadow-md"
                    )}
                    style={mounted ? {
                      background: theme === "dark"
                        ? "linear-gradient(135deg, rgba(96,165,250,0.9), rgba(167,139,250,0.9))"
                        : "linear-gradient(135deg, rgba(59,130,246,0.9), rgba(139,92,246,0.9))",
                      color: "white",
                    } : undefined}
                    whileHover={prefersReducedMotion || prefersReducedMotionMedia ? {} : {
                      boxShadow: theme === "dark"
                        ? "0 8px 24px rgba(96,165,250,0.4)"
                        : "0 8px 24px rgba(59,130,246,0.4)",
                      scale: 1.02,
                    }}
                    whileTap={prefersReducedMotion || prefersReducedMotionMedia ? {} : {
                      scale: 0.98,
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      {isNavigating ? (
                        <>
                          <motion.div
                            className="h-4 w-4 border-2 border-white border-t-transparent rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                          <span>Loading...</span>
                        </>
                      ) : (
                        "Let's Talk"
                      )}
                    </span>
                  </motion.button>
                </div>
                {/* Clean Mobile Menu Button */}
                <motion.button
                  aria-label="Open menu"
                  aria-expanded={open}
                  onClick={handleMenuOpen}
                  className={cn(
                    "md:hidden",
                    "p-2.5 sm:p-2.5 rounded-full",
                    "text-secondary hover:text-primary",
                    "bg-secondary/0 hover:bg-secondary/20",
                    "transition-all duration-200 ease-out",
                    "min-w-[44px] min-h-[44px]",
                    "flex items-center justify-center",
                    "touch-manipulation" // Better mobile touch handling
                  )}
                  whileHover={prefersReducedMotion || prefersReducedMotionMedia ? {} : {
                    scale: 1.05,
                  }}
                  whileTap={prefersReducedMotion || prefersReducedMotionMedia ? {} : { scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Menu className="h-6 w-6 sm:h-6 sm:w-6" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Mobile Menu (animated) - SSR safe with professional libraries */}
      {typeof document !== "undefined" && open && createPortal(
        <FocusLock returnFocus disabled={!open}>
          <AnimatePresence>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[1050] md:hidden"
              style={{
                backgroundColor: theme === "dark" ? "rgba(0, 0, 0, 0.75)" : "rgba(0, 0, 0, 0.5)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
              }}
              aria-modal="true"
              role="dialog"
              aria-label="Mobile navigation menu"
              onClick={closeMenu}
            >
              <motion.div
                ref={menuPanelRef}
                key="panel"
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "100%", opacity: 0 }}
                transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                className="px-6 py-6 h-full overflow-y-auto relative"
                onClick={(e) => e.stopPropagation()}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
                style={{
                  maxWidth: "85vw",
                  marginLeft: "auto",
                  backgroundColor: theme === "dark" ? "rgba(15, 15, 15, 0.98)" : "rgba(255, 255, 255, 0.98)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                }}
              >
                {/* Scroll indicator gradient */}
                <div 
                  className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none z-10"
                  style={{
                    background: `linear-gradient(to top, ${theme === "dark" ? "rgba(15, 15, 15, 0.98)" : "rgba(255, 255, 255, 0.98)"}, transparent)`,
                  }}
                />
                <div className="flex items-center justify-between mb-8">
                  <motion.span 
                    className="text-primary font-bold text-xl sm:text-2xl md:text-h4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1, duration: 0.3 }}
                  >
                    Menu
                  </motion.span>
                  <motion.button
                    aria-label="Close menu"
                    onClick={closeMenu}
                    className={cn(
                      "p-2.5 rounded-lg",
                      "text-secondary hover:text-primary hover:bg-secondary/50",
                      "transition-smooth",
                      "min-w-[44px] min-h-[44px]", // Touch-friendly
                      "flex items-center justify-center"
                    )}
                    whileTap={prefersReducedMotion || prefersReducedMotionMedia ? {} : { scale: 0.9 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 400, 
                      damping: 17,
                      delay: 0.1,
                      duration: 0.3
                    }}
                  >
                    <X className="h-6 w-6" />
                  </motion.button>
                </div>

                <motion.nav
                  aria-label="Mobile"
                  className="space-y-3"
                  initial="hidden"
                  animate="show"
                  variants={{ 
                    hidden: { transition: { staggerChildren: 0 } }, 
                    show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } 
                  }}
                >
                  {NAV_LINKS.map((link, i) => {
                    const active = pathname === link.href;
                    return (
                      <motion.div 
                        key={link.href}
                        variants={{ 
                          hidden: { y: 10, opacity: 0 }, 
                          show: { y: 0, opacity: 1 } 
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      >
                        <Link
                          ref={i === 0 ? firstMenuLinkRef : undefined}
                          href={link.href}
                          aria-current={active ? "page" : undefined}
                          onClick={() => {
                            handleNavClick(link.href, link.label);
                            closeMenu();
                          }}
                          className={cn(
                            "block text-primary transition-all duration-300 rounded-lg relative",
                            "px-4 py-3.5 sm:px-5 sm:py-4",
                            "text-base sm:text-lg", // Reduced from text-lg sm:text-xl md:text-2xl
                            "min-h-[52px] flex items-center gap-3", // Touch-friendly height
                            "hover:bg-secondary/30 active:bg-secondary/50",
                            active && "text-primary font-semibold bg-secondary/30 border-l-2 border-primary"
                          )}
                        >
                          {(() => {
                            const Icon = MENU_ICONS[link.href as keyof typeof MENU_ICONS];
                            return Icon ? (
                              <motion.div
                                animate={active ? { scale: 1.1 } : { scale: 1 }}
                                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                              >
                                <Icon className="h-5 w-5" />
                              </motion.div>
                            ) : null;
                          })()}
                          <span>{link.label}</span>
                        </Link>
                      </motion.div>
                    );
                  })}
                </motion.nav>

                <motion.div 
                  className="pt-8 border-t border-border-primary flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                >
                  <motion.div
                    className="flex-1"
                    whileHover={prefersReducedMotion || prefersReducedMotionMedia ? {} : { scale: 1.02 }}
                    whileTap={prefersReducedMotion || prefersReducedMotionMedia ? {} : { scale: 0.98 }}
                  >
                    <Button 
                      variant="primary" 
                      className={cn(
                        "w-full sm:flex-1",
                        "min-h-[48px] sm:min-h-[44px]", // Larger touch target on mobile
                        "text-base sm:text-base",
                        "relative overflow-hidden"
                      )}
                      onClick={handleLetsTalkClick}
                      disabled={isNavigating}
                    >
                      {isNavigating ? (
                        <span className="flex items-center gap-2">
                          <motion.div
                            className="h-4 w-4 border-2 border-white border-t-transparent rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                          Loading...
                        </span>
                      ) : (
                        "Let's Talk"
                      )}
                    </Button>
                  </motion.div>
                  <motion.div
                    whileHover={prefersReducedMotion || prefersReducedMotionMedia ? {} : { scale: 1.05 }}
                    whileTap={prefersReducedMotion || prefersReducedMotionMedia ? {} : { scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <Button 
                      variant="ghost" 
                      onClick={toggleTheme} 
                      aria-label="Toggle theme"
                      className={cn(
                        "w-full sm:w-auto",
                        "min-h-[48px] sm:min-h-[44px]",
                        "p-3 sm:p-2.5"
                      )}
                    >
                      {mounted ? (
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={theme}
                            initial={{ rotate: -180, scale: 0.9 }}
                            animate={{ rotate: 0, scale: 1 }}
                            exit={{ rotate: 180, scale: 0.9 }}
                            transition={{ type: "spring", stiffness: 180, damping: 18 }}
                          >
                            {theme === "dark" ? (
                              <Sun className="h-6 w-6" />
                            ) : (
                              <Moon className="h-6 w-6" />
                            )}
                          </motion.div>
                        </AnimatePresence>
                      ) : (
                        <div className="h-6 w-6" />
                      )}
                    </Button>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </FocusLock>,
        document.body
      )}
    </>
  );
}
