"use client";

import React, { useRef, useEffect } from 'react';
import { Renderer, Program, Mesh, Triangle } from 'ogl';
import { useTheme } from '@/context/ThemeContext';

interface LiquidChromeProps extends React.HTMLAttributes<HTMLDivElement> {
  speed?: number;
  amplitude?: number;
  frequencyX?: number;
  frequencyY?: number;
  interactive?: boolean;
  theme?: string; // Explicitly pass theme from parent
}

/**
 * LiquidChrome Component - Method 2: Multi-Palette Weighted Blending
 * Premium luxury animated background with rich color complexity
 * Uses weighted blending of 4 colors for vibrant, dynamic feel
 */
export const LiquidChrome: React.FC<LiquidChromeProps> = ({
  speed = 1,
  amplitude = 0.6,
  frequencyX = 3,
  frequencyY = 2,
  interactive = true,
  theme: themeProp, // Get theme from props
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { theme: hookTheme } = useTheme();
  const theme = themeProp || hookTheme; // Use prop theme if provided, otherwise fallback to hook

  // Method 2: Multi-Palette Weighted Blending - Visible premium effect
  // Dark Mode: Luxury Black Gold Royal System
  const darkColors = [
    [0.30, 0.16, 1.00], // Royal Violet #4C2AFF
    [0.11, 0.10, 0.23], // Deep Indigo #1B1A3A
    [0.16, 0.11, 0.30], // Midnight Violet #2A1B4D
    [0.83, 0.69, 0.22], // Polished Gold #D4AF37 (very subtle)
  ];

  // Light Mode: Luxury Porcelain + Soft Gold + Muted Lavender
  const lightColors = [
    [0.91, 0.90, 0.95], // Muted Lavender #E8E6F2
    [0.77, 0.69, 0.26], // Soft Gold #C4A040
    [0.96, 0.96, 0.94], // Porcelain tint #F7F7F5
    [0.58, 0.48, 0.63], // Dusty Violet
  ];

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    
    // Get initial colors for program setup (will update dynamically in updateColor)
    const initialColors = theme === 'dark' ? darkColors : lightColors;
    const cycleDuration = 10; // 10 seconds per cycle

    const renderer = new Renderer({ antialias: true });
    const gl = renderer.gl;
    
    // Function to update clear color based on theme - Luxury System
    const updateClearColor = (themeValue: string) => {
      if (themeValue === 'dark') {
        gl.clearColor(0.00, 0.00, 0.00, 1); // Obsidian Black #000000
      } else {
        gl.clearColor(0.97, 0.97, 0.96, 1); // Porcelain White #F7F7F5
      }
    };
    
    // Set initial clear color
    updateClearColor(theme);

    const vertexShader = `
      attribute vec2 position;
      attribute vec2 uv;
      varying vec2 vUv;

      void main() {
        vUv = uv;
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fragmentShader = `
      precision highp float;
      uniform float uTime;
      uniform vec3 uResolution;
      uniform vec3 uBaseColor;
      uniform float uAmplitude;
      uniform float uFrequencyX;
      uniform float uFrequencyY;
      uniform vec2 uMouse;

      varying vec2 vUv;

      vec4 renderImage(vec2 uvCoord) {
          vec2 fragCoord = uvCoord * uResolution.xy;
          vec2 uv = (2.0 * fragCoord - uResolution.xy) / min(uResolution.x, uResolution.y);

          for (float i = 1.0; i < 10.0; i++){
              uv.x += uAmplitude / i * cos(i * uFrequencyX * uv.y + uTime + uMouse.x * 3.14159);
              uv.y += uAmplitude / i * cos(i * uFrequencyY * uv.x + uTime + uMouse.y * 3.14159);
          }

          vec2 diff = (uvCoord - uMouse);
          float dist = length(diff);
          float falloff = exp(-dist * 20.0);
          float ripple = sin(10.0 * dist - uTime * 2.0) * 0.03;
          uv += (diff / (dist + 0.0001)) * ripple * falloff;

          // Use multiplication-based color variation (safer, no division artifacts)
          float colorMod = abs(sin(uTime * 0.5 - uv.y - uv.x));
          colorMod = clamp(colorMod * 1.5 + 0.3, 0.3, 1.5); // Prevent too dark/bright
          vec3 color = uBaseColor * colorMod;

          return vec4(color, 1.0);
      }

      void main() {
          vec4 col = vec4(0.0);
          int samples = 0;
          for (int i = -1; i <= 1; i++){
              for (int j = -1; j <= 1; j++){
                  vec2 offset = vec2(float(i), float(j)) * (1.0 / min(uResolution.x, uResolution.y));
                  col += renderImage(vUv + offset);
                  samples++;
              }
          }
          gl_FragColor = col / float(samples);
      }
    `;

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uResolution: {
          value: new Float32Array([gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height])
        },
        uBaseColor: { value: new Float32Array(initialColors[0]) },
        uAmplitude: { value: amplitude },
        uFrequencyX: { value: frequencyX },
        uFrequencyY: { value: frequencyY },
        uMouse: { value: new Float32Array([0, 0]) }
      }
    });

    const mesh = new Mesh(gl, { geometry, program });

    function resize() {
      const scale = 1;
      renderer.setSize(container.offsetWidth * scale, container.offsetHeight * scale);
      const resUniform = program.uniforms.uResolution.value as Float32Array;
      resUniform[0] = gl.canvas.width;
      resUniform[1] = gl.canvas.height;
      resUniform[2] = gl.canvas.width / gl.canvas.height;
    }

    window.addEventListener('resize', resize);
    resize();

    function handleMouseMove(event: MouseEvent) {
      if (!interactive) return;
      const rect = container.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = 1 - (event.clientY - rect.top) / rect.height;
      const mouseUniform = program.uniforms.uMouse.value as Float32Array;
      mouseUniform[0] = x;
      mouseUniform[1] = y;
    }

    function handleTouchMove(event: TouchEvent) {
      if (!interactive || event.touches.length === 0) return;
      const touch = event.touches[0];
      const rect = container.getBoundingClientRect();
      const x = (touch.clientX - rect.left) / rect.width;
      const y = 1 - (touch.clientY - rect.top) / rect.height;
      const mouseUniform = program.uniforms.uMouse.value as Float32Array;
      mouseUniform[0] = x;
      mouseUniform[1] = y;
    }

    if (interactive) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('touchmove', handleTouchMove);
    }

    let animationId: number;
    let startTime = performance.now();

    /**
     * Method 2: Multi-Palette Weighted Blending
     * Uses time-based weight distribution across 4 colors
     * Weights shift smoothly to create complex color blends
     */
    function updateColor(time: number) {
      const colorUniform = program.uniforms.uBaseColor.value as Float32Array;
      const cycleDuration = 7; // 7 seconds per cycle (faster, more dynamic)
      // Always use current theme colors (updates when theme changes)
      const currentColors = theme === 'dark' ? darkColors : lightColors;
      
      // Normalize time to 0-1 range for the cycle
      const cycleTime = (time / cycleDuration) % 1.0;
      
      // Create 4 weight functions that shift over time
      // Each weight peaks at different points in the cycle
      // Using smooth curves (sine waves with different phases)
      const phase1 = (cycleTime * Math.PI * 2);
      const phase2 = (cycleTime * Math.PI * 2) + (Math.PI / 2);
      const phase3 = (cycleTime * Math.PI * 2) + Math.PI;
      const phase4 = (cycleTime * Math.PI * 2) + (3 * Math.PI / 2);
      
      // Calculate weights using smooth curves (0 to 1 range)
      // Using cosine for smoother transitions
      const w1 = (Math.cos(phase1) + 1) / 2;
      const w2 = (Math.cos(phase2) + 1) / 2;
      const w3 = (Math.cos(phase3) + 1) / 2;
      const w4 = (Math.cos(phase4) + 1) / 2;
      
      // Normalize weights so they sum to 1
      const total = w1 + w2 + w3 + w4;
      const weight1 = w1 / total;
      const weight2 = w2 / total;
      const weight3 = w3 / total;
      const weight4 = w4 / total;
      
      // Blend all 4 colors using weighted average
      colorUniform[0] = 
        currentColors[0][0] * weight1 + 
        currentColors[1][0] * weight2 + 
        currentColors[2][0] * weight3 + 
        currentColors[3][0] * weight4;
      
      colorUniform[1] = 
        currentColors[0][1] * weight1 + 
        currentColors[1][1] * weight2 + 
        currentColors[2][1] * weight3 + 
        currentColors[3][1] * weight4;
      
      colorUniform[2] = 
        currentColors[0][2] * weight1 + 
        currentColors[1][2] * weight2 + 
        currentColors[2][2] * weight3 + 
        currentColors[3][2] * weight4;
    }

    function update(t: number) {
      animationId = requestAnimationFrame(update);
      
      const elapsed = (t - startTime) * 0.001;
      program.uniforms.uTime.value = elapsed * speed;
      
      // Update color using Method 2: Multi-palette weighted blending
      updateColor(elapsed);
      
      renderer.render({ scene: mesh });
    }

    animationId = requestAnimationFrame(update);
    container.appendChild(gl.canvas);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      if (interactive) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('touchmove', handleTouchMove);
      }
      if (gl.canvas.parentElement) {
        gl.canvas.parentElement.removeChild(gl.canvas);
      }
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [speed, amplitude, frequencyX, frequencyY, interactive, theme]);

  return <div ref={containerRef} className="w-full h-full absolute inset-0" {...props} />;
};

export default LiquidChrome;

