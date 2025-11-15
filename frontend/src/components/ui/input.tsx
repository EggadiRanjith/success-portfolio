import React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", error, helperText, ...props }, ref) => {
    return (
      <div className="w-full">
        <input
          type={type}
          ref={ref}
          className={cn(
            "w-full px-4 py-3 rounded-lg",
            "bg-secondary/50 border border-primary",
            "text-primary",
            "placeholder:text-tertiary",
            "focus:outline-none focus:border-primary focus:bg-secondary/80 focus:ring-2 focus:ring-primary/20",
            "transition-smooth",
            error && "border-red-500/50 focus:border-red-500/80 focus:ring-red-500/20",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            className
          )}
          {...props}
        />
        {helperText && (
          <p
            className={cn(
              "mt-2 text-body-sm",
              error ? "text-red-500 dark:text-red-400" : "text-tertiary"
            )}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

