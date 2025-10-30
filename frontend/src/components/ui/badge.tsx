import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "outline" | "solid" | "glass";
  size?: "sm" | "md";
}

const badgeVariants = {
  default:
    "bg-fg-primary/5 border border-border-primary text-fg-secondary",
  outline: "border border-border-primary text-fg-secondary",
  solid: "glass-base text-fg-primary",
  glass: "glass-base border border-border-primary text-fg-primary backdrop-blur-xl",
};

const badgeSizes = {
  sm: "px-3 py-1 text-caption rounded-full",
  md: "px-4 py-2 text-body-sm rounded-full",
};

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = "default", size = "sm", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-medium",
          badgeVariants[variant],
          badgeSizes[size],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Badge.displayName = "Badge";

