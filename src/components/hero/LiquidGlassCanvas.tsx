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

    let dispose: (() => void) | undefined;
    let cancelled = false;
    let idleId: number | undefined;

    const start = () => {
      if (cancelled) return;
      dispose = createLiquidGlass(container);
    };

    if ("requestIdleCallback" in window) {
      idleId = requestIdleCallback(start, { timeout: 2000 });
    } else {
      const timer = window.setTimeout(start, 100);
      return () => {
        cancelled = true;
        clearTimeout(timer);
        dispose?.();
      };
    }

    return () => {
      cancelled = true;
      if (idleId !== undefined) cancelIdleCallback(idleId);
      dispose?.();
    };
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
