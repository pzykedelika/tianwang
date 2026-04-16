"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import ParticleField from "./ParticleField";
import AnimatedText from "./AnimatedText";
import TextShimmer from "./TextShimmer";
import MagneticButton from "./MagneticButton";
import Link from "next/link";
import { ArrowDownRight } from "lucide-react";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!lineRef.current) return;

    gsap.fromTo(
      lineRef.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1.5,
        delay: 1.8,
        ease: "power3.out",
      }
    );
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Particle background */}
      <ParticleField />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/50 via-transparent to-background/50 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div className="flex flex-col items-start">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <span className="font-[family-name:var(--font-mono)] text-sm font-semibold tracking-[0.3em] uppercase text-accent">
              Creative Director &mdash; Adelaide
            </span>
          </motion.div>

          {/* Main heading */}
          <div className="mb-4">
            <AnimatedText
              text="TIAN"
              as="h1"
              animation="char-by-char"
              delay={0.5}
              stagger={0.06}
              className="font-[family-name:var(--font-syne)] text-[clamp(4rem,12vw,12rem)] font-black leading-[0.85] tracking-tighter"
            />
          </div>
          <div className="mb-8">
            <AnimatedText
              text="WANG"
              as="h1"
              animation="char-by-char"
              delay={0.8}
              stagger={0.06}
              className="font-[family-name:var(--font-syne)] text-[clamp(4rem,12vw,12rem)] font-black leading-[0.85] tracking-tighter text-accent"
            />
          </div>

          {/* Animated line */}
          <div
            ref={lineRef}
            className="w-full max-w-md h-px bg-gradient-to-r from-accent via-muted-foreground to-transparent origin-left mb-8"
            style={{ transform: "scaleX(0)" }}
          />

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mb-12"
          >
            <p className="text-muted-foreground text-lg leading-relaxed whitespace-nowrap">
              Crafting{" "}
              <TextShimmer text="visual stories" className="font-semibold" />{" "}
              through film, photography, and digital experiences.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="flex flex-wrap items-center gap-6"
          >
            <MagneticButton>
              <Link
                href="/work"
                className="group flex items-center gap-3 px-8 py-4 bg-foreground text-background font-medium text-sm tracking-widest uppercase rounded-full hover:bg-accent transition-colors duration-500"
              >
                View Work
                <ArrowDownRight
                  size={16}
                  className="group-hover:rotate-45 transition-transform duration-300"
                />
              </Link>
            </MagneticButton>
            <MagneticButton>
              <Link
                href="/about#contact"
                className="group flex items-center gap-3 px-8 py-4 border border-border text-foreground font-medium text-sm tracking-widest uppercase rounded-full hover:border-accent hover:bg-accent/5 transition-all duration-500"
              >
                Work with me
              </Link>
            </MagneticButton>
          </motion.div>
        </div>
      </div>

    </section>
  );
}
