"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export interface SplineViewerProps {
  url: string;
  className?: string;
  style?: React.CSSProperties;
  loading?: "lazy" | "eager";
  onLoad?: () => void;
  onError?: (error: Error) => void;
}

/**
 * SplineViewer Component
 * 
 * Embeds a Spline 3D scene using the official Spline viewer.
 * 
 * @example
 * ```tsx
 * <SplineViewer 
 *   url="https://prod.spline.design/LEvjG3OETYd2GsRw/scene.splinecode"
 *   className="w-full h-[600px] rounded-2xl"
 * />
 * ```
 */
export function SplineViewer({
  url,
  className,
  style,
  loading = "lazy",
  onLoad,
  onError,
}: SplineViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptLoadedRef = useRef(false);

  useEffect(() => {
    // Load Spline viewer script
    if (scriptLoadedRef.current) return;

    const script = document.createElement("script");
    script.type = "module";
    script.src = "https://unpkg.com/@splinetool/viewer/build/spline-viewer.js";
    script.async = true;
    
    script.onload = () => {
      scriptLoadedRef.current = true;
    };

    script.onerror = () => {
      const error = new Error("Failed to load Spline viewer script");
      onError?.(error);
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup: remove script if component unmounts
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [onError]);

  useEffect(() => {
    if (!containerRef.current || !scriptLoadedRef.current) return;

    // Wait for custom element to be defined
    const checkCustomElement = setInterval(() => {
      if (customElements.get("spline-viewer")) {
        clearInterval(checkCustomElement);
        
        // Clear container
        containerRef.current!.innerHTML = "";
        
        // Create spline-viewer element
        const splineViewer = document.createElement("spline-viewer");
        splineViewer.setAttribute("url", url);
        splineViewer.setAttribute("loading", loading);
        
        // Add event listeners
        splineViewer.addEventListener("load", () => {
          onLoad?.();
        });

        splineViewer.addEventListener("error", (e: Event) => {
          const error = new Error("Failed to load Spline scene");
          onError?.(error);
        });

        containerRef.current!.appendChild(splineViewer);
      }
    }, 100);

    return () => {
      clearInterval(checkCustomElement);
    };
  }, [url, loading, onLoad, onError]);

  return (
    <div
      ref={containerRef}
      className={cn("spline-viewer-container", className)}
      style={style}
    />
  );
}

export default SplineViewer;

