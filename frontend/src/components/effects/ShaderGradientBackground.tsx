"use client";

import { useEffect, useRef } from "react";

interface ShaderGradientBackgroundProps {
  className?: string;
  opacity?: number;
}

/**
 * ShaderGradient Background Component
 * Embeds a ShaderGradient water plane shader as a background effect
 * Based on: https://www.shadergradient.co/
 */
export function ShaderGradientBackground({ 
  className = "", 
  opacity = 0.3 
}: ShaderGradientBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // ShaderGradient embed URL with your custom settings
    const shaderUrl = "https://www.shadergradient.co/customize?animate=on&axesHelper=off&bgColor1=%23000000&bgColor2=%23000000&brightness=1.2&cAzimuthAngle=170&cDistance=4.4&cPolarAngle=70&cameraZoom=1&color1=%230d86ff&color2=%236bf5ff&color3=%23ffffff&destination=onCanvas&embedMode=off&envPreset=city&format=gif&fov=45&frameRate=10&gizmoHelper=hide&grain=off&lightType=3d&pixelDensity=1&positionX=0&positionY=0.9&positionZ=-0.3&range=enabled&rangeEnd=40&rangeStart=0&reflection=0.1&rotationX=45&rotationY=0&rotationZ=0&shader=defaults&type=waterPlane&uAmplitude=0&uDensity=1.2&uFrequency=0&uSpeed=0.2&uStrength=3.4&uTime=0&wireframe=false";

    // Create iframe for ShaderGradient embed
    const iframe = document.createElement("iframe");
    iframe.src = shaderUrl;
    iframe.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: none;
      pointer-events: none;
      opacity: ${opacity};
      mix-blend-mode: screen;
    `;
    iframe.setAttribute("aria-hidden", "true");
    iframe.setAttribute("tabindex", "-1");

    containerRef.current.appendChild(iframe);

    return () => {
      if (containerRef.current && iframe.parentNode) {
        containerRef.current.removeChild(iframe);
      }
    };
  }, [opacity]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 rounded-full overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
}

