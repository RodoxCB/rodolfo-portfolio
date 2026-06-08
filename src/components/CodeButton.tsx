import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const externalPattern = /^(https?:|mailto:|tel:)/;

export function CodeButton({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const classes = cn(
    "code-button inline-flex items-center gap-2 rounded-lg bg-bg-secondary px-6 py-3 font-mono text-base font-semibold text-text-primary transition-all hover:bg-gradient-to-r hover:from-accent-primary hover:via-text-primary hover:to-accent-secondary",
    className,
  );

  if (externalPattern.test(href)) {
    return (
      <a href={href} className={classes}>
        {children}
        <ArrowRight className="h-4 w-4" />
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
      <ArrowRight className="h-4 w-4" />
    </Link>
  );
}
