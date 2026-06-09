"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import { localePath } from "@/lib/utils";
import { CodeButton } from "./CodeButton";
import { Logo } from "./Logo";

export function Hero({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <section className="relative min-h-[140vh] overflow-hidden">
      <div className="absolute inset-0 h-screen">
        <div className="grid-floor absolute inset-0" />
        <div className="absolute inset-x-0 bottom-0 h-[30vh] bg-gradient-to-b from-transparent to-bg-primary" />
      </div>

      <div className="pointer-events-none absolute inset-0 z-10 flex h-screen items-center justify-center">
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative flex items-center justify-center"
          >
            <div className="absolute inset-0 m-auto h-40 w-40 rounded-full bg-accent-primary/20 blur-3xl animate-pulseGlow sm:h-48 sm:w-48" />
            <div className="relative flex h-28 w-28 items-center justify-center sm:h-36 sm:w-36">
              <Logo className="h-full w-full text-text-primary drop-shadow-[0_0_24px_rgba(20,184,166,0.45)]" />
            </div>
          </motion.div>

          <div className="absolute left-1/2 top-full mt-10 -translate-x-1/2 animate-float">
            <ArrowDown className="block h-6 w-6 text-accent-primary" strokeWidth={2} />
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto mt-[92vh] max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 font-mono text-base italic tracking-wide text-accent-primary sm:text-lg"
          >
            {dict.hero.greeting}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mb-4 text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl lg:text-6xl"
          >
            <span className="font-mono font-bold text-accent-primary">{dict.hero.const}</span>
            <span className="mx-2 font-mono font-bold text-accent-secondary sm:mx-3">=</span>
            <br className="sm:hidden" />
            <span className="font-display font-black tracking-normal text-text-primary">{dict.hero.name}</span>
            <span className="ml-1 font-mono font-bold text-text-tertiary sm:ml-2">;</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mb-8 font-mono text-base text-text-secondary sm:text-lg md:text-xl"
          >
            {dict.hero.roleLine}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <CodeButton href={localePath(locale, "/projects")}>{dict.hero.viewProjects}</CodeButton>
            <Link
              href={localePath(locale, "/contact")}
              className="inline-flex h-12 items-center justify-center rounded-lg border border-border-default px-8 text-base font-medium transition-all hover:border-border-hover hover:bg-bg-tertiary"
            >
              {dict.hero.getInTouch}
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="relative mt-24 flex min-h-48 items-center justify-center md:min-h-56"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-56 w-56 rounded-full border border-accent-primary/20 bg-accent-muted" />
          </div>
          <h2 className="relative z-10 whitespace-pre-line text-center font-mono text-3xl font-bold uppercase tracking-wide text-text-primary sm:text-4xl md:text-5xl">
            {dict.hero.statement}
          </h2>
        </motion.div>
      </div>
    </section>
  );
}
