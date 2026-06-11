"use client";

import { useEffect, useRef } from "react";
import { createLiquidGlass } from "./liquid-glass/engine";

type LiquidGlassCanvasProps = {
  className?: string;
};

export function LiquidGlassCanvas({ className }: LiquidGlassCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const dispose = createLiquidGlass(container);
    return dispose;
  }, []);

  return (
    <div
      ref={containerRef}
      className={className}
      aria-hidden
      data-liquid-glass
    />
  );
}
