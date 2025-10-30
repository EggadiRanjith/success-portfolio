"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button, Link } from "@/components/ui";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { useScroll } from "@/hooks/use-scroll";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { createPortal } from "react-dom";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const { scrolled } = useScroll(8);
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const firstMenuLinkRef = useRef<HTMLAnchorElement | null>(null);
  const lastActiveRef = useRef<HTMLElement | null>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const prefersReducedMotion = useReducedMotion();

  // Prevent hydration mismatch by only showing theme icon after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onRoute = () => setOpen(false);
    window.addEventListener("hashchange", onRoute);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    lastActiveRef.current = document.activeElement as HTMLElement;
    // Defer focus to first link
    setTimeout(() => firstMenuLinkRef.current?.focus(), 0);
    return () => {
      window.removeEventListener("hashchange", onRoute);
      document.removeEventListener("keydown", onKey);
      lastActiveRef.current?.focus?.();
    };
  }, [open]);

  return (
    <header
      role="banner"
      className={cn(
        "fixed inset-x-0 top-0 z-nav transition-all duration-300",
        scrolled ? "py-4" : "py-6",
        "bg-transparent"
      )}
      onMouseMove={(e) => {
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
    >
      <div className="relative max-w-standard mx-auto px-4">
        {/* Premium pill container */}
        <div
          className={cn(
            "relative rounded-full px-6 py-3 transition-shadow duration-300 bg-bg-secondary dark:bg-bg-primary",
            scrolled
              ? "border border-border-primary/40 shadow-[0_20px_60px_rgba(0,0,0,0.35)] hover:shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-3xl"
              : "border border-border-primary/30 hover:shadow-[0_14px_50px_rgba(0,0,0,0.25)] backdrop-blur-2xl"
          )}
        >
          {/* Surface mask removed per request */}
          {/* Ambient halo */}
          <div className="pointer-events-none absolute -inset-1 rounded-full bg-gradient-to-r from-fg-primary/0 via-fg-primary/10 to-fg-primary/0 blur-xl opacity-40" />
          {/* Specular streak */}
          <div className="pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 w-24 bg-gradient-to-r from-fg-primary/0 via-fg-primary/20 to-fg-primary/0 blur-lg" />
          {/* Outer subtle outline */}
          <div className="pointer-events-none absolute inset-0 rounded-full border border-border-primary/30" />
          {/* Hairline highlights for Apple-like specular edges */}
          <div className="pointer-events-none absolute inset-x-3 top-0 h-px bg-gradient-to-r from-transparent via-fg-primary/15 to-transparent" />
          <div className="pointer-events-none absolute inset-x-3 bottom-0 h-px bg-gradient-to-r from-transparent via-fg-primary/10 to-transparent" />
          {/* Dynamic reflect layer */}
          {!prefersReducedMotion && (
            <motion.div
              className="pointer-events-none absolute inset-0 rounded-full"
              style={{
                background:
                  "linear-gradient(60deg, rgba(255,255,255,0.16), transparent 75%)",
                mixBlendMode: "screen",
              }}
              animate={{ opacity: scrolled ? 0.08 : 0.18, scale: scrolled ? 0.985 : 1 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            />
          )}
          {/* Mouse-reactive light (subtle) */}
          {!prefersReducedMotion && (
            <div
              className="pointer-events-none absolute inset-0 rounded-full opacity-30"
              style={{
                background: `radial-gradient(500px circle at ${mouse.x}px ${mouse.y}px, rgba(255,255,255,0.06), transparent 70%)`,
              }}
            />
          )}

          <div className="relative flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-fg-primary font-bold text-h4 tracking-tight">
          Your Name
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Primary">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "group relative px-3 py-1.5 rounded-md text-fg-secondary hover:text-fg-primary transition-smooth underline-sweep",
                  "hover:bg-fg-primary/5",
                  active && "text-fg-primary bg-fg-primary/5"
                )}
              >
                <span className="relative z-10">{link.label}</span>
                {/* Hover dot */}
                <span className="absolute -right-1 top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-fg-primary/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            aria-label="Toggle theme"
            onClick={toggleTheme}
            className="hidden sm:inline-flex"
          >
            {mounted ? (
              <motion.div
                key={theme}
                initial={{ rotate: -180, scale: 0.9 }}
                animate={{ rotate: 0, scale: 1 }}
                exit={{ rotate: 180 }}
                transition={{ type: "spring", stiffness: 180, damping: 18 }}
              >
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </motion.div>
            ) : (
              <div className="h-5 w-5" />
            )}
          </Button>
          <div className="hidden md:block">
            <Button variant="primary" className="hover-glow pressable">Let's Talk</Button>
          </div>
          <button
            aria-label="Open menu"
            className="md:hidden p-2 rounded-lg text-fg-secondary hover:text-fg-primary hover:bg-pure-white/5 transition-smooth"
            onClick={() => setOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu (animated) */}
      <AnimatePresence>
        {open && createPortal(
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[1050] bg-overlay backdrop-blur-glass md:hidden"
            aria-modal="true"
            role="dialog"
          >
            <motion.div
              key="panel"
              initial={{ y: -40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -40, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="px-6 py-6"
            >
              <div className="flex items-center justify-between">
                <span className="text-fg-primary font-bold text-h4">Menu</span>
                <button
                  aria-label="Close menu"
                  className="p-2 rounded-lg text-fg-secondary hover:text-fg-primary hover:bg-pure-white/5 transition-smooth"
                  onClick={() => setOpen(false)}
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <motion.nav
                aria-label="Mobile"
                className="pt-6 space-y-4"
                initial="hidden"
                animate="show"
                variants={{ hidden: { transition: { staggerChildren: 0 } }, show: { transition: { staggerChildren: 0.06 } } }}
              >
                {NAV_LINKS.map((link, i) => (
                  <motion.div key={link.href} variants={{ hidden: { y: 10, opacity: 0 }, show: { y: 0, opacity: 1 } }}>
                    <Link
                      ref={i === 0 ? firstMenuLinkRef : undefined}
                      href={link.href}
                      className="block text-fg-primary text-h3"
                      onClick={() => setOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </motion.nav>

              <div className="pt-6 border-t border-border-primary flex items-center gap-3">
                <Button variant="primary" className="flex-1" onClick={() => setOpen(false)}>
                  Let's Talk
                </Button>
                <Button variant="ghost" onClick={toggleTheme} aria-label="Toggle theme">
                  {mounted ? (
                    theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />
                  ) : (
                    <div className="h-5 w-5" />
                  )}
                </Button>
              </div>
            </motion.div>
          </motion.div>,
          document.body
        )}
      </AnimatePresence>
    </header>
  );
}
