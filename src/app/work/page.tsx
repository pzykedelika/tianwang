"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { brands, type Brand } from "@/lib/data";
import AnimatedText from "@/components/AnimatedText";
import ScrollReveal from "@/components/ScrollReveal";
import AnimatedGridPattern from "@/components/AnimatedGridPattern";
import { ArrowRight, Play } from "lucide-react";

export default function WorkPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex items-end overflow-hidden pb-12 pt-28">
        <AnimatedGridPattern className="opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
          <AnimatedText
            text="Work"
            as="h1"
            animation="char-by-char"
            delay={0.3}
            stagger={0.04}
            className="font-[family-name:var(--font-syne)] text-6xl md:text-8xl font-black tracking-tighter"
          />
        </div>
      </section>

      {/* Brand sections */}
      <section className="pb-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {brands.map((brand, i) => (
            <BrandSection key={brand.id} brand={brand} index={i} />
          ))}
        </div>
      </section>
    </>
  );
}

function BrandSection({ brand, index }: { brand: Brand; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const featured = brand.projects[0] ?? null;

  return (
    <div ref={ref} className={index > 0 ? "mt-24 md:mt-32" : "mt-8"}>
      {/* Brand header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mb-10"
      >
        <div className="flex items-center justify-between gap-6 mb-3">
          <div className="flex items-baseline gap-4">
            <span className="font-[family-name:var(--font-mono)] text-xs tracking-widest text-muted-foreground/50">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h2 className="font-[family-name:var(--font-syne)] text-3xl md:text-5xl font-bold tracking-tight">
              {brand.name}
            </h2>
          </div>

          <Link
            href={`/work/${brand.id}`}
            className="group flex items-center gap-3 px-8 py-3 bg-foreground text-background text-sm font-medium tracking-widest uppercase rounded-full hover:bg-accent transition-colors duration-300 shrink-0"
          >
            See All
            <ArrowRight
              size={14}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>
        <p className="text-muted-foreground ml-10 whitespace-nowrap">
          {brand.description}
        </p>
      </motion.div>

      {/* Featured project */}
      {featured ? (
        <ScrollReveal>
          <div className="rounded-2xl border border-border bg-card overflow-hidden">
            {/* Media */}
            <div className="relative aspect-video bg-muted/20">
              {featured.mediaType === "local" && featured.media && (
                <video
                  src={featured.media}
                  controls
                  controlsList="nodownload"
                  onContextMenu={(e) => e.preventDefault()}
                  playsInline
                  preload="metadata"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}
              {!featured.media && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Play size={32} className="text-muted-foreground/30" />
                </div>
              )}
            </div>

            {/* Info */}
            <div className="p-6 md:p-8">
              <span className="font-[family-name:var(--font-mono)] text-xs tracking-widest uppercase text-accent">
                Featured Work
              </span>
              <h3 className="font-[family-name:var(--font-syne)] text-xl md:text-2xl font-bold mt-2">
                {featured.title}
              </h3>
              <p className="text-muted-foreground text-sm mt-1">
                {featured.description}
              </p>
            </div>
          </div>
        </ScrollReveal>
      ) : (
        <ScrollReveal>
          <div className="rounded-2xl border border-border bg-card p-12 md:p-16 text-center">
            <p className="text-muted-foreground text-sm">
              Projects coming soon.
            </p>
          </div>
        </ScrollReveal>
      )}
    </div>
  );
}
