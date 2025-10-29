"use client";

import { useEffect } from "react";
import { useReducedMotion } from "./useReducedMotion";

export function useRevealOnScroll() {
  const reduced = useReducedMotion();

  useEffect(() => {
    let ctx: any;
    let ScrollTrigger: any;

    async function run() {
      if (reduced) return;
      if (typeof window === "undefined") return;
      const gsap = (await import("gsap")).default;
      ScrollTrigger = (await import("gsap/ScrollTrigger")).default;
      // @ts-ignore register
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        const elements = gsap.utils.toArray<HTMLElement>(".reveal-on-scroll");
        elements.forEach((el, index) => {
          gsap.from(el, {
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              toggleActions: "play none none none",
            },
            y: 24,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
            delay: index * 0.05,
          });
        });
      });
    }

    run();

    return () => {
      try {
        ctx?.revert?.();
        // @ts-ignore
        ScrollTrigger?.getAll?.().forEach((t: any) => t?.kill());
      } catch {}
    };
  }, [reduced]);
}
