"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { cn, validateContrast } from "@/lib/utils";
import { Button, Link } from "@/components/ui";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme, type Theme } from "@/hooks/use-theme";
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

export function SiteHeader() {
  const pathname = usePathname();
  const { scrolled } = useScroll(8);
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [siteName, setSiteName] = useState("Ranjith Eggadi");
  
  // Load site name from admin data and listen for changes
  useEffect(() => {
    if (typeof window !== "undefined") {
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
      
      // Listen for storage changes (when admin updates data)
      const handleStorageChange = (e: StorageEvent) => {
        if (e.key === "portfolio-data" || e.key === null) {
          // Reload site name when portfolio data changes
          loadSiteName();
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
    }
  }, []);
  
  // Lock body scroll when mobile menu is open
  useScrollLock(open);
  
  // Use theme directly from hook - it's the single source of truth
  // The hook handles localStorage and DOM updates automatically
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
  
  // Framer Motion scroll for smooth blur interpolation
  const { scrollY } = useFramerScroll();
  
  // Enhanced blur with smoother transitions
  const blurAmount = useTransform(
    scrollY,
    [0, 10, 100],
    ["blur(12px) saturate(180%)", "blur(16px) saturate(180%)", "blur(24px) saturate(200%)"]
  );
  
  // Opacity transform for premium fade effect
  const headerOpacity = useTransform(
    scrollY,
    [0, 50],
    [0.95, 0.98]
  );
  
  // Prevent hydration mismatch by only showing theme icon after mount
  useEffect(() => {
    setMounted(true);
  }, []);
  
  
  // Force style update when theme changes (bypass Framer Motion cache)
  // This effect runs on mount and whenever theme/scrolled changes
  useEffect(() => {
    if (typeof window !== "undefined" && mounted && pillRef.current) {
      // Directly update the style to ensure it changes
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
      
      // Use setProperty with !important to override any CSS rules
      pillRef.current.style.setProperty("background-color", bgColor, "important");
      pillRef.current.style.setProperty("box-shadow", shadow, "important");
    }
  }, [theme, mounted, scrolled]);

  // Listen for storage changes (in case theme is changed in another tab/window)
  // Note: Storage events only fire for changes in OTHER tabs/windows, not the current one
  // The useTheme hook handles current tab changes automatically
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "theme" && e.newValue) {
        const newTheme = e.newValue as Theme;
        if (newTheme === "light" || newTheme === "dark") {
          // Update DOM to match the new theme from other tab
          // The useTheme hook will pick this up on next render
          document.documentElement.setAttribute("data-theme", newTheme);
          if (newTheme === "dark") {
            document.documentElement.classList.add("dark");
          } else {
            document.documentElement.classList.remove("dark");
          }
          // Trigger a re-render by dispatching a custom event
          // The component will re-render and useTheme will sync
          window.dispatchEvent(new Event("storage"));
        }
      }
    };
    
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

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
    } catch (error) {
      setOpen(false); // Force close on error
    }
  }, [open]);

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
      {/* Professional scroll bar removal when menu is open */}
      {open && <RemoveScrollBar />}
      
      <header
        ref={headerRef}
        role="banner"
        className={cn(
          "fixed inset-x-0 top-0 z-nav transition-all duration-300",
          // Responsive padding: optimized for mobile
          scrolled 
            ? "py-2 sm:py-2.5 md:py-3 lg:py-3" 
            : "py-2.5 sm:py-3 md:py-3.5 lg:py-4",
          "bg-transparent"
        )}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative max-w-standard mx-auto px-2.5 sm:px-3 md:px-4 lg:px-6">
          {/* Premium Clean Header Container */}
          <motion.div
            ref={pillRef}
            className={cn(
              "premium-header relative rounded-full",
              // More spacious padding on mobile for larger title
              scrolled 
                ? "px-3 py-2.5 sm:px-5 sm:py-2.5 md:px-6 md:py-2.5 lg:px-8 lg:py-3"
                : "px-3 py-2.5 sm:px-5 sm:py-2.5 md:px-6 md:py-2.5 lg:px-8 lg:py-3"
            )}
            style={{
              backdropFilter: prefersReducedMotion || prefersReducedMotionMedia
                ? scrolled ? "blur(24px) saturate(180%)" : "blur(20px) saturate(180%)"
                : blurAmount,
              WebkitBackdropFilter: prefersReducedMotion || prefersReducedMotionMedia
                ? scrolled ? "blur(24px) saturate(180%)" : "blur(20px) saturate(180%)"
                : blurAmount,
              background: theme === "dark"
                ? scrolled
                  ? "rgba(0, 0, 0, 0.4)"
                  : "rgba(0, 0, 0, 0.3)"
                : scrolled
                  ? "rgba(255, 255, 255, 0.7)"
                  : "rgba(255, 255, 255, 0.6)",
              opacity: prefersReducedMotion || prefersReducedMotionMedia ? 1 : headerOpacity,
            }}
            animate={{
              boxShadow: scrolled
                ? theme === "dark"
                  ? "0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0 0.5px rgba(255, 255, 255, 0.1)"
                  : "0 8px 32px rgba(0, 0, 0, 0.1), 0 0 0 0.5px rgba(0, 0, 0, 0.08)"
                : theme === "dark"
                  ? "0 4px 24px rgba(0, 0, 0, 0.2), 0 0 0 0.5px rgba(255, 255, 255, 0.08)"
                  : "0 4px 24px rgba(0, 0, 0, 0.06), 0 0 0 0.5px rgba(0, 0, 0, 0.06)",
            }}
            whileHover={prefersReducedMotion || prefersReducedMotionMedia ? {} : {
              boxShadow: scrolled
                ? theme === "dark"
                  ? "0 12px 48px rgba(0, 0, 0, 0.4), 0 0 0 0.5px rgba(255, 255, 255, 0.12)"
                  : "0 12px 48px rgba(0, 0, 0, 0.15), 0 0 0 0.5px rgba(0, 0, 0, 0.1)"
                : theme === "dark"
                  ? "0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0 0.5px rgba(255, 255, 255, 0.1)"
                  : "0 8px 32px rgba(0, 0, 0, 0.1), 0 0 0 0.5px rgba(0, 0, 0, 0.08)",
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

            <div className="relative flex items-center justify-between gap-2 sm:gap-3 md:gap-4 w-full min-h-[44px] sm:min-h-[48px]">
              {/* Premium Logo */}
              <Link 
                href="/" 
                className={cn(
                  "relative inline-flex items-center font-semibold tracking-tight",
                  "px-2 py-1 sm:px-2.5 sm:py-1.5 md:px-3 md:py-1.5 lg:px-3 lg:py-1.5",
                  "rounded-lg",
                  "text-base sm:text-lg md:text-xl lg:text-2xl xl:text-h4",
                  "leading-none sm:leading-tight",
                  "flex-shrink min-w-0",
                  "truncate sm:truncate-none",
                  "transition-all duration-200 ease-out"
                )}
                whileHover={prefersReducedMotion || prefersReducedMotionMedia ? {} : {
                  scale: 1.02,
                }}
                whileTap={prefersReducedMotion || prefersReducedMotionMedia ? {} : {
                  scale: 0.98,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <span className="relative z-10 inline-block text-primary">
                  {siteName}
                </span>
              </Link>

              {/* Desktop Nav */}
              <nav className="hidden md:flex items-center gap-4 lg:gap-6 xl:gap-8" aria-label="Primary">
                {NAV_LINKS.map((link) => {
                  const active = pathname === link.href;
                  return (
                    <motion.div key={link.href} className="relative">
                      <motion.a
                        href={link.href}
                        className={cn(
                          "relative px-3 py-1.5 sm:px-4 sm:py-2",
                          "text-sm sm:text-base md:text-lg",
                          "font-medium text-secondary hover:text-primary",
                          "transition-colors duration-200 ease-out",
                          "rounded-lg",
                          active && "text-primary"
                        )}
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
                        <span className="relative z-10">{link.label}</span>
                        {/* Framer-style subtle hover background */}
                        <motion.div
                          className="absolute inset-0 rounded-lg bg-secondary/30 opacity-0"
                          whileHover={prefersReducedMotion || prefersReducedMotionMedia ? {} : { opacity: 1 }}
                          transition={{ duration: 0.15, ease: "easeOut" }}
                        />
                      </motion.a>
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
                  onClick={toggleTheme}
                  className={cn(
                    "inline-flex items-center justify-center",
                    "p-2 sm:p-2.5 md:p-2.5",
                    "min-w-[44px] min-h-[44px]",
                    "rounded-full",
                    "bg-secondary/0 hover:bg-secondary/20",
                    "border border-transparent hover:border-border-primary/30",
                    "transition-all duration-200 ease-out"
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
                          <Sun className="h-5 w-5 sm:h-5 sm:w-5 md:h-5 md:w-5 text-primary" />
                        ) : (
                          <Moon className="h-5 w-5 sm:h-5 sm:w-5 md:h-5 md:w-5 text-primary" />
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
                    onClick={() => {
                      const contactSection = document.getElementById("contact");
                      if (contactSection) {
                        contactSection.scrollIntoView({ behavior: "smooth" });
                      } else {
                        window.location.href = "/contact";
                      }
                    }}
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
                    <span className="relative z-10">Let's Talk</span>
                  </motion.button>
                </div>
                {/* Clean Mobile Menu Button */}
                <motion.button
                  aria-label="Open menu"
                  onClick={() => setOpen(true)}
                  className={cn(
                    "md:hidden",
                    "p-2.5 sm:p-2.5 rounded-full",
                    "text-secondary hover:text-primary",
                    "bg-secondary/0 hover:bg-secondary/20",
                    "transition-all duration-200 ease-out",
                    "min-w-[44px] min-h-[44px]",
                    "flex items-center justify-center"
                  )}
                  whileHover={prefersReducedMotion || prefersReducedMotionMedia ? {} : {
                    scale: 1.05,
                  }}
                  whileTap={prefersReducedMotion || prefersReducedMotionMedia ? {} : { scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
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
              className="fixed inset-0 z-[1050] bg-overlay backdrop-blur-luxury md:hidden"
              aria-modal="true"
              role="dialog"
              aria-label="Mobile navigation menu"
              onClick={closeMenu}
            >
              <motion.div
                ref={menuPanelRef}
                key="panel"
                initial={{ y: -40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -40, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="px-6 py-6 h-full overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
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
                          className={cn(
                            "block text-primary transition-all duration-300 rounded-lg",
                            "px-4 py-3.5 sm:px-5 sm:py-4",
                            "text-lg sm:text-xl md:text-2xl",
                            "min-h-[52px] flex items-center", // Touch-friendly height
                            "hover:bg-secondary/30 active:bg-secondary/50",
                            pathname === link.href && "text-primary font-semibold bg-secondary/20"
                          )}
                          onClick={closeMenu}
                        >
                          {link.label}
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
                        "text-base sm:text-base"
                      )}
                      onClick={closeMenu}
                    >
                      Let's Talk
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
                              <Sun className="h-5 w-5" />
                            ) : (
                              <Moon className="h-5 w-5" />
                            )}
                          </motion.div>
                        </AnimatePresence>
                      ) : (
                        <div className="h-5 w-5" />
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
