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

    let timer: ReturnType<typeof setTimeout> | undefined;

    if (typeof window.requestIdleCallback === "function") {
      idleId = window.requestIdleCallback(start, { timeout: 2000 });
    } else {
      timer = setTimeout(start, 100);
    }

    return () => {
      cancelled = true;
      if (idleId !== undefined) window.cancelIdleCallback(idleId);
      if (timer) clearTimeout(timer);
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
