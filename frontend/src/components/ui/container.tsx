import React from "react";
import { cn } from "@/lib/utils";

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "standard" | "text" | "narrow" | "content";
  size?: "sm" | "md" | "lg" | "xl" | "full";
}

const variantClasses = {
  standard: "max-w-standard",
  text: "max-w-text",
  narrow: "max-w-narrow",
  content: "max-w-content",
  full: "max-w-full",
};

const sizePadding = {
  sm: "px-4 py-8",
  md: "px-6 py-12",
  lg: "px-8 py-16",
  xl: "px-10 py-20",
  full: "px-4 sm:px-6 lg:px-8",
};

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  (
    { variant = "standard", size = "md", className, children, ...props },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "w-full mx-auto",
          variantClasses[variant],
          sizePadding[size],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Container.displayName = "Container";

