/**
 * Enhanced Card Component with Compound Components Pattern
 * Industry-leading best practice implementation
 * Flexible, composable, and highly reusable
 */

"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { hoverLiftVariants } from "@/lib/motionVariants";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// Card Context for compound components
interface CardContextType {
  isHovered: boolean;
  setIsHovered: (value: boolean) => void;
  variant: "glass" | "minimal" | "elevated";
}

const CardContext = React.createContext<CardContextType | undefined>(undefined);

const useCardContext = () => {
  const context = React.useContext(CardContext);
  if (!context) {
    throw new Error("Card sub-components must be used within Card component");
  }
  return context;
};

// Main Card Container
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "glass" | "minimal" | "elevated";
  hoverable?: boolean;
  animated?: boolean;
  asChild?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = "glass",
      hoverable = true,
      animated = true,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [isHovered, setIsHovered] = React.useState(false);
    const prefersReducedMotion = useReducedMotion();

    const variantStyles = {
      glass: cn(
        "glass-card backdrop-blur-xl",
        "border-2 border-border-primary/90 dark:border-border-primary/60",
        "bg-primary/98 dark:bg-secondary/95",
        "shadow-[0_8px_32px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
      ),
      minimal: cn(
        "bg-secondary dark:bg-secondary",
        "border-2 border-border-primary/50 dark:border-border-primary/30",
        "shadow-lg dark:shadow-xl"
      ),
      elevated: cn(
        "bg-primary dark:bg-secondary",
        "shadow-2xl dark:shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
      ),
    };

    const MotionComponent = animated ? motion.div : "div";

    // Separate motion props from HTML props
    const motionProps = animated
      ? {
          onHoverStart: () => hoverable && setIsHovered(true),
          onHoverEnd: () => hoverable && setIsHovered(false),
          variants:
            animated && !prefersReducedMotion && hoverable
              ? hoverLiftVariants
              : undefined,
          initial: animated && !prefersReducedMotion ? "rest" : undefined,
          whileHover:
            animated && !prefersReducedMotion && hoverable
              ? "hover"
              : undefined,
        }
      : {
          onMouseEnter: () => hoverable && setIsHovered(true),
          onMouseLeave: () => hoverable && setIsHovered(false),
        };

    return (
      <CardContext.Provider value={{ isHovered, setIsHovered, variant }}>
        <MotionComponent
          ref={ref}
          className={cn(
            "group relative rounded-2xl p-8 transition-all duration-300 overflow-hidden",
            variantStyles[variant],
            hoverable && "cursor-pointer",
            className
          )}
          {...motionProps}
          {...props}
        >
          {children}

          {/* Shine effect on hover */}
          {hoverable && (
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden">
              <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-fg-primary/10 dark:via-fg-primary/5 to-transparent" />
            </div>
          )}
        </MotionComponent>
      </CardContext.Provider>
    );
  }
);
Card.displayName = "Card";

// Card Sub-components (Compound Pattern)

export const CardImage = React.forwardRef<
  HTMLImageElement,
  React.ImgHTMLAttributes<HTMLImageElement>
>(({ className, ...props }, ref) => (
  <img
    ref={ref}
    className={cn(
      "w-full h-48 object-cover rounded-lg mb-4",
      "transition-transform duration-300 group-hover:scale-105",
      className
    )}
    {...props}
  />
));
CardImage.displayName = "CardImage";

export const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("mb-3 flex flex-col gap-2", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

export const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => {
  const { variant } = useCardContext();
  return (
    <h3
      ref={ref}
      className={cn(
        "text-xl font-bold",
        variant === "glass"
          ? "text-fg-primary dark:text-fg-primary"
          : "text-fg-primary dark:text-fg-primary",
        className
      )}
      {...props}
    />
  );
});
CardTitle.displayName = "CardTitle";

export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "text-sm text-fg-secondary dark:text-fg-secondary leading-relaxed",
      className
    )}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

export const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-fg-secondary dark:text-fg-secondary", className)}
    {...props}
  />
));
CardContent.displayName = "CardContent";

export const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("mt-4 flex gap-2 flex-wrap items-center", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export const CardTags = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { tags: string[] }
>(({ tags, className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex gap-2 flex-wrap", className)}
    {...props}
  >
    {tags.map((tag) => (
      <span
        key={tag}
        className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium"
      >
        {tag}
      </span>
    ))}
  </div>
));
CardTags.displayName = "CardTags";

// Default export for backward compatibility
export default Card;

/**
 * Usage Examples:
 * 
 * // Simple usage (backward compatible)
 * <Card variant="glass" hoverable animated>
 *   <h3>Title</h3>
 *   <p>Content</p>
 * </Card>
 * 
 * // Compound Components Pattern (Best Practice)
 * <Card variant="glass" hoverable animated>
 *   <CardImage src="..." alt="..." />
 *   <CardHeader>
 *     <CardTitle>Project Title</CardTitle>
 *     <CardDescription>Project description</CardDescription>
 *   </CardHeader>
 *   <CardContent>
 *     Additional content here
 *   </CardContent>
 *   <CardFooter>
 *     <CardTags tags={["React", "Next.js"]} />
 *     <Button>Learn More</Button>
 *   </CardFooter>
 * </Card>
 */
