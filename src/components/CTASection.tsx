"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import AnimatedText from "./AnimatedText";
import MagneticButton from "./MagneticButton";
import AnimatedGridPattern from "./AnimatedGridPattern";
import { ArrowUpRight } from "lucide-react";

export default function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative w-full py-20 md:py-32 overflow-hidden">
      {/* Grid pattern background */}
      <AnimatedGridPattern className="opacity-50" />

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_var(--background)_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 text-center">
        <div className="mb-2">
          <AnimatedText
            text="Have a project"
            as="h2"
            animation="slide"
            className="font-[family-name:var(--font-syne)] text-5xl md:text-7xl font-bold tracking-tight"
          />
        </div>
        <div className="mb-10">
          <AnimatedText
            text="in mind?"
            as="h2"
            animation="slide"
            delay={0.15}
            className="font-[family-name:var(--font-syne)] text-5xl md:text-7xl font-bold tracking-tight text-accent"
          />
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-muted-foreground text-lg max-w-xl mx-auto mb-12 leading-relaxed"
        >
          Whether it&apos;s a film, a photoshoot, or a website
          &mdash; let&apos;s bring your vision to life.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-6"
        >
          <MagneticButton>
            <Link
              href="/about#contact"
              className="group flex items-center gap-3 px-10 py-5 bg-foreground text-background font-medium text-sm tracking-widest uppercase rounded-full hover:bg-accent transition-colors duration-500"
            >
              Work with Me
              <ArrowUpRight
                size={16}
                className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
              />
            </Link>
          </MagneticButton>
          <MagneticButton>
            <a
              href="mailto:hello@tianwang.com"
              className="flex items-center gap-3 px-10 py-5 border border-border text-foreground font-medium text-sm tracking-widest uppercase rounded-full hover:border-accent hover:bg-accent/5 transition-all duration-500"
            >
              hello@tianwang.com
            </a>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
