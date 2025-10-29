import React from "react";
import NextLink from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: "default" | "underline" | "button" | "ghost";
  external?: boolean;
  showArrow?: boolean;
  children: React.ReactNode;
}

const linkVariants = {
  default: "text-light-silver hover:text-pure-white transition-smooth",
  underline:
    "text-light-silver hover:text-pure-white underline underline-offset-4 transition-smooth",
  button:
    "glass-base text-pure-white hover:glass-frosted px-4 py-2 rounded-lg inline-flex items-center gap-2 transition-smooth",
  ghost:
    "text-light-silver hover:text-pure-white hover:bg-pure-white/5 p-2 rounded-lg transition-smooth inline-flex items-center",
};

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      href,
      variant = "default",
      external = false,
      showArrow = false,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const baseClasses = cn(linkVariants[variant], className);

    if (external) {
      return (
        <a
          ref={ref}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={baseClasses}
          {...props}
        >
          {children}
          {showArrow && <ArrowRight className="inline h-4 w-4" />}
        </a>
      );
    }

    return (
      <NextLink ref={ref} href={href} className={baseClasses} {...props}>
        {children}
        {showArrow && <ArrowRight className="inline h-4 w-4" />}
      </NextLink>
    );
  }
);

Link.displayName = "Link";

