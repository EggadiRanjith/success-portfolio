import React from "react";
import { cn } from "@/lib/utils";

type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: HeadingLevel;
  size?: "display" | "h1" | "h2" | "h3" | "h4";
}

const sizeClasses = {
  display: "text-display leading-display letter-spacing-tighter font-extrabold",
  h1: "text-h1 leading-heading letter-spacing-tight font-bold",
  h2: "text-h2 leading-heading letter-spacing-tight font-bold",
  h3: "text-h3 leading-heading letter-spacing-wide font-semibold",
  h4: "text-h4 leading-relaxed font-semibold",
};

const defaultElements: Record<HeadingLevel, HeadingLevel> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
};

export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  (
    {
      as,
      size = "h1",
      className,
      children,
      ...props
    },
    ref
  ) => {
    const Component = as || defaultElements[size as HeadingLevel] || "h1";
    const sizeClass = sizeClasses[size] || sizeClasses.h1;

    return React.createElement(
      Component,
      {
        ref,
        className: cn("text-pure-white", sizeClass, className),
        ...props,
      },
      children
    );
  }
);

Heading.displayName = "Heading";

