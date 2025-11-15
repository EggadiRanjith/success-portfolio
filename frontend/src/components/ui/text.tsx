import React from "react";
import { cn } from "@/lib/utils";

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  size?: "body-xl" | "body-lg" | "body" | "body-sm" | "caption";
  color?: "primary" | "secondary" | "tertiary";
  as?: "p" | "span" | "div";
}

const sizeClasses = {
  "body-xl": "text-body-xl leading-relaxed",
  "body-lg": "text-body-lg leading-relaxed",
  body: "text-body leading-relaxed",
  "body-sm": "text-body-sm leading-relaxed",
  caption: "text-caption leading-relaxed",
};

const colorClasses = {
  primary: "text-fg-primary",
  secondary: "text-fg-secondary",
  tertiary: "text-fg-tertiary",
};

export const Text = React.forwardRef<
  HTMLParagraphElement,
  TextProps
>(({ size = "body", color = "secondary", as: Component = "p", className, children, ...props }, ref) => {
  return React.createElement(
    Component,
    {
      ref,
      className: cn(sizeClasses[size], colorClasses[color], className),
      ...props,
    },
    children
  );
});

Text.displayName = "Text";

