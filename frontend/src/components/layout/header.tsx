"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button, Link } from "@/components/ui";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { useScroll } from "@/hooks/use-scroll";

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

  useEffect(() => {
    if (!open) return;
    const onRoute = () => setOpen(false);
    window.addEventListener("hashchange", onRoute);
    return () => window.removeEventListener("hashchange", onRoute);
  }, [open]);

  return (
    <header
      role="banner"
      className={cn(
        "fixed inset-x-0 top-0 z-nav transition-all duration-300",
        scrolled ? "py-4" : "py-6",
        scrolled
          ? "glass-premium backdrop-blur-lg shadow-[0_10px_40px_rgba(0,0,0,0.5)] border-b border-border-primary"
          : "bg-transparent"
      )}
    >
      <div className="max-w-standard mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-fg-primary font-bold text-h4">
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
                  "text-fg-secondary hover:text-fg-primary transition-smooth underline-sweep",
                  active && "text-fg-primary"
                )}
              >
                {link.label}
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
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
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

      {/* Mobile Menu */}
      {open && (
        <div className="fixed inset-0 z-[1050] bg-overlay backdrop-blur-glass md:hidden">
          <div className="flex items-center justify-between px-6 py-6">
            <span className="text-fg-primary font-bold text-h4">Menu</span>
            <button
              aria-label="Close menu"
              className="p-2 rounded-lg text-fg-secondary hover:text-fg-primary hover:bg-pure-white/5 transition-smooth"
              onClick={() => setOpen(false)}
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="px-6 pt-6 space-y-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-fg-primary text-h3"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-6 border-t border-border-primary flex items-center gap-3">
              <Button variant="primary" className="flex-1" onClick={() => setOpen(false)}>
                Let's Talk
              </Button>
              <Button variant="ghost" onClick={toggleTheme} aria-label="Toggle theme">
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
