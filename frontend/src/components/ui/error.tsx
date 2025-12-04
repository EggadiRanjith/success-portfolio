import React from "react";
import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";

export interface ErrorProps extends React.HTMLAttributes<HTMLDivElement> {
  message: string;
  size?: "sm" | "md";
}

export const Error = React.forwardRef<HTMLDivElement, ErrorProps>(
  ({ className, message, size = "md", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center gap-2 text-error",
          size === "sm" ? "text-body-sm" : "text-body",
          className
        )}
        {...props}
      >
        <AlertCircle className="h-4 w-4 flex-shrink-0" />
        <span>{message}</span>
      </div>
    );
  }
);

Error.displayName = "Error";

