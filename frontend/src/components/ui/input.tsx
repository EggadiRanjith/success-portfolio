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
            "bg-pure-white/5 border border-pure-white/15",
            "text-pure-white placeholder:text-silver-gray",
            "focus:outline-none focus:border-pure-white/40 focus:bg-pure-white/8",
            "focus-visible:ring-2 focus-visible:ring-pure-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-pure-black",
            "transition-smooth",
            error && "border-red-500/50 focus:border-red-500/80",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            className
          )}
          {...props}
        />
        {helperText && (
          <p
            className={cn(
              "mt-2 text-body-sm",
              error ? "text-red-400" : "text-silver-gray"
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

