"use client";

import { useEffect, useState } from "react";

export function RoleRotator({ roles }: { roles: string[] }) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (roles.length <= 1) return;

    const interval = setInterval(() => {
      setVisible(false);
      const timeout = setTimeout(() => {
        setIndex((prev) => (prev + 1) % roles.length);
        setVisible(true);
      }, 250);
      return () => clearTimeout(timeout);
    }, 2600);

    return () => clearInterval(interval);
  }, [roles.length]);

  if (roles.length === 0) return null;

  return (
    <p
      className={`font-mono text-base text-text-secondary transition-opacity duration-200 sm:text-lg ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      aria-live="polite"
    >
      <span className="text-accent-primary">// </span>
      {roles[index]}
    </p>
  );
}
