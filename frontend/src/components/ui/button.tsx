import React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "glass";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  isLoading?: boolean;
  icon?: React.ReactNode;
  startIcon?: React.ReactNode;
}

const buttonVariants = {
  primary:
    "glass-base text-primary hover:glass-frosted transition-smooth",
  secondary:
    "border border-primary text-primary hover:bg-pure-white/10 transition-smooth",
  ghost: "text-primary hover:bg-pure-white/5 transition-smooth",
  glass:
    "glass-frosted text-primary hover:glass-base transition-smooth",
};

const buttonSizes = {
  xs: "px-3 py-2 text-body-sm rounded-md",
  sm: "px-4 py-2.5 text-body-sm rounded-lg",
  md: "px-6 py-3 text-body rounded-lg",
  lg: "px-8 py-4 text-body-lg rounded-xl",
  xl: "px-10 py-4.5 text-h4 rounded-xl",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      icon,
      startIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-medium",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pure-white focus-visible:ring-offset-2 focus-visible:ring-offset-pure-black",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          buttonVariants[variant],
          buttonSizes[size],
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <>
            {startIcon && <span className="flex-shrink-0">{startIcon}</span>}
            {children}
            {icon && <span className="flex-shrink-0">{icon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

