import React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "base" | "frosted" | "hover";
  image?: string;
  hover?: boolean;
}

const cardVariants = {
  base: "glass-base",
  frosted: "glass-frosted",
  hover: "glass-card",
};

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    { className, variant = "base", image, hover = true, children, ...props },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-2xl overflow-hidden",
          cardVariants[variant],
          hover && variant !== "hover" && "glass-card",
          className
        )}
        {...props}
      >
        {image && (
          <div className="relative w-full aspect-video overflow-hidden">
            <img
              src={image}
              alt=""
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        )}
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("p-6 pb-4", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("p-6 pt-0", className)}
    {...props}
  />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("p-6 pt-4 border-t border-primary", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

Card.Header = CardHeader;
Card.Content = CardContent;
Card.Footer = CardFooter;

