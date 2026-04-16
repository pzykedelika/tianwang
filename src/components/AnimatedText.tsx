"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";

interface AnimatedTextProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
  stagger?: number;
  animation?: "reveal" | "glitch" | "slide" | "char-by-char";
}

export default function AnimatedText({
  text,
  className = "",
  as: Tag = "h1",
  delay = 0,
  stagger = 0.03,
  animation = "reveal",
}: AnimatedTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  if (animation === "char-by-char") {
    const chars = text.split("");
    return (
      <Tag ref={ref as React.RefObject<HTMLHeadingElement>} className={className}>
        {chars.map((char, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 50, rotateX: -90 }}
            animate={
              isInView
                ? { opacity: 1, y: 0, rotateX: 0 }
                : { opacity: 0, y: 50, rotateX: -90 }
            }
            transition={{
              duration: 0.5,
              delay: delay + i * stagger,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="inline-block"
            style={{ transformOrigin: "bottom" }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </Tag>
    );
  }

  if (animation === "slide") {
    const words = text.split(" ");
    return (
      <Tag ref={ref as React.RefObject<HTMLHeadingElement>} className={className}>
        {words.map((word, i) => (
          <span
            key={i}
            className="inline-block overflow-hidden"
            style={{ marginRight: "0.3em" }}
          >
            <motion.span
              initial={{ y: "100%" }}
              animate={isInView ? { y: 0 } : { y: "100%" }}
              transition={{
                duration: 0.8,
                delay: delay + i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="inline-block"
            >
              {word}
            </motion.span>
          </span>
        ))}
      </Tag>
    );
  }

  if (animation === "glitch") {
    return (
      <GlitchText
        text={text}
        className={className}
        Tag={Tag}
        delay={delay}
        isInView={isInView}
        ref={ref}
      />
    );
  }

  // Default: reveal
  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div
        initial={{ y: "100%" }}
        animate={isInView ? { y: 0 } : { y: "100%" }}
        transition={{
          duration: 0.8,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <Tag className={className}>{text}</Tag>
      </motion.div>
    </div>
  );
}

interface GlitchTextProps {
  text: string;
  className: string;
  Tag: "h1" | "h2" | "h3" | "p" | "span";
  delay: number;
  isInView: boolean;
}

const GlitchText = ({
  text,
  className,
  Tag,
  delay,
  isInView,
  ref,
}: GlitchTextProps & { ref: React.RefObject<HTMLDivElement | null> }) => {
  const textRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isInView || !textRef.current) return;

    const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?";
    const original = text;
    let iteration = 0;

    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        if (!textRef.current) return;
        textRef.current.textContent = original
          .split("")
          .map((char, index) => {
            if (index < iteration) return original[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("");

        if (iteration >= original.length) {
          clearInterval(interval);
        }
        iteration += 1 / 2;
      }, 30);

      return () => clearInterval(interval);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [isInView, text, delay]);

  return (
    <div ref={ref}>
      <Tag ref={textRef as React.RefObject<HTMLHeadingElement>} className={className}>
        {text}
      </Tag>
    </div>
  );
};
