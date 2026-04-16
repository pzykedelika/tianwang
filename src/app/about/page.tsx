"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import AnimatedText from "@/components/AnimatedText";
import ScrollReveal from "@/components/ScrollReveal";
import AnimatedGridPattern from "@/components/AnimatedGridPattern";
import MagneticButton from "@/components/MagneticButton";
import { MapPin, ArrowRight, ArrowLeft, Check, Send } from "lucide-react";

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex items-end overflow-hidden pb-12 pt-28">
        <AnimatedGridPattern className="opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
          <AnimatedText
            text="About me"
            as="h1"
            animation="char-by-char"
            delay={0.3}
            stagger={0.04}
            className="font-[family-name:var(--font-syne)] text-6xl md:text-8xl font-black tracking-tighter"
          />
        </div>
      </section>

      {/* Bio Section */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
            {/* Portrait */}
            <ScrollReveal direction="left">
              <div className="relative aspect-[3/4] max-w-sm mx-auto rounded-3xl overflow-hidden border border-border bg-card">
                <Image
                  src="/images/tian-portrait.jpg"
                  alt="Tian Wang"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            </ScrollReveal>

            {/* Bio text */}
            <div className="flex flex-col justify-center">
              <ScrollReveal delay={0.3}>
                <h2 className="font-[family-name:var(--font-syne)] text-3xl md:text-4xl font-bold mb-8 leading-tight">
                  Creative Director &<br />
                  <span className="text-accent">Digital Producer</span>
                </h2>
              </ScrollReveal>

              <ScrollReveal delay={0.4}>
                <div className="space-y-6 text-muted-foreground leading-relaxed">
                  <p>
                    I&apos;m an Adelaide-based creative focused on bringing
                    ideas to life through both visuals and digital design.
                    Combining videography, photography, and web development,
                    I create polished, engaging work that helps brands present
                    themselves with clarity and impact.
                  </p>
                  <p>
                    Through my work with institutions such as{" "}
                    <span className="text-foreground font-medium">
                      St Peter&apos;s College
                    </span>
                    , I&apos;ve developed a strong understanding of how to
                    capture the identity of a brand and turn it into content
                    that feels purposeful, professional, and memorable.
                  </p>
                  <p>
                    Whether it&apos;s producing cinematic video, high-quality
                    photography, or building modern websites, I approach each
                    project with a focus on strong execution, attention to
                    detail, and delivering work that stands out for the right
                    reasons.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.5}>
                <div className="flex items-center gap-3 mt-8 text-sm text-muted-foreground">
                  <MapPin size={14} className="text-accent" />
                  Adelaide, South Australia
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Form Card */}
      <section id="contact" className="py-20 md:py-32">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <InteractiveForm />
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}

const steps = [
  {
    id: "service",
    question: "What type of project are you building?",
    type: "select" as const,
    options: [
      "Video",
      "Photography",
      "Website",
      "Mixed",
    ],
  },
  {
    id: "scope",
    question: "What best describes the scope?",
    type: "select" as const,
    options: [
      "One-off project",
      "Ongoing",
      "Event coverage",
    ],
  },
  {
    id: "details",
    question: "Tell me a bit more about the project.",
    type: "text" as const,
    placeholder: "A brief description of what you have in mind\u2026",
  },
  {
    id: "contact",
    question: "How can I get back to you?",
    type: "contact" as const,
  },
];

function InteractiveForm() {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [direction, setDirection] = useState(1);

  const current = steps[step];
  const totalSteps = steps.length;
  const progress = ((step + 1) / totalSteps) * 100;

  const goNext = () => {
    if (step < totalSteps - 1) {
      setDirection(1);
      setStep(step + 1);
    }
  };

  const goBack = () => {
    if (step > 0) {
      setDirection(-1);
      setStep(step - 1);
    }
  };

  const selectOption = (value: string) => {
    setAnswers({ ...answers, [current.id]: value });
    setTimeout(goNext, 300);
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  if (!started) {
    return (
      <div className="rounded-3xl border border-border bg-card">
        <div className="p-12 md:p-16 flex flex-col items-center text-center">
          <h2 className="font-[family-name:var(--font-syne)] text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Have a project in mind?
          </h2>
          <p className="text-muted-foreground max-w-md mb-10">
            Whether it's a film, a photoshoot, or a website — let's bring your vision to life.
          </p>
          <MagneticButton>
            <button
              onClick={() => setStarted(true)}
              className="relative group rounded-full p-[2px] overflow-hidden"
            >
              {/* Spinning conic gradient border */}
              <span
                className="absolute inset-[-50%] rounded-full"
                style={{
                  background: "conic-gradient(from 0deg, transparent 0%, transparent 60%, var(--accent) 80%, transparent 100%)",
                  animation: "shimmer-spin 3s linear infinite",
                }}
              />
              {/* Inner pill */}
              <span className="relative flex items-center rounded-full bg-card px-12 py-5">
                <span className="font-[family-name:var(--font-syne)] text-lg md:text-xl font-bold tracking-wide uppercase text-foreground group-hover:text-accent transition-colors duration-300">
                  Work with Me
                </span>
              </span>
            </button>
          </MagneticButton>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="rounded-3xl border border-border bg-card">
        <div className="p-12 md:p-16 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-6"
          >
            <Check size={32} className="text-accent" />
          </motion.div>
          <h2 className="font-[family-name:var(--font-syne)] text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Thanks! I&apos;ll be in touch.
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            I&apos;ve received your details and will get back to you shortly
            to discuss your project.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-border bg-card">
      <div className="p-10 md:p-16 min-h-[360px] flex flex-col">
        {/* Progress bar */}
        <div className="flex items-center justify-between mb-10">
          <span className="font-[family-name:var(--font-mono)] text-xs tracking-widest uppercase text-muted-foreground">
            {step + 1} / {totalSteps}
          </span>
          <div className="flex-1 mx-6 h-px bg-border relative">
            <motion.div
              className="absolute left-0 top-0 h-full bg-accent"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
          <button
            onClick={goBack}
            disabled={step === 0}
            className="text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ArrowLeft size={18} />
          </button>
        </div>

        {/* Question area */}
        <div className="flex-1 flex flex-col justify-center">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              initial={{ opacity: 0, x: direction * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -40 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <h3 className="font-[family-name:var(--font-syne)] text-2xl md:text-3xl font-bold mb-8">
                {current.question}
              </h3>

              {current.type === "select" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {current.options?.map((option) => (
                    <button
                      key={option}
                      onClick={() => selectOption(option)}
                      className={`text-left px-6 py-4 rounded-xl border transition-all duration-300 ${
                        answers[current.id] === option
                          ? "border-accent bg-accent/10 text-foreground"
                          : "border-border bg-card hover:border-accent/40 text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <span className="text-sm font-medium">{option}</span>
                    </button>
                  ))}
                </div>
              )}

              {current.type === "text" && (
                <div>
                  <textarea
                    value={answers[current.id] || ""}
                    onChange={(e) =>
                      setAnswers({ ...answers, [current.id]: e.target.value })
                    }
                    rows={4}
                    className="w-full bg-card border border-border rounded-xl px-6 py-4 text-foreground placeholder:text-muted-foreground/50 focus:border-accent focus:outline-none transition-colors resize-none"
                    placeholder={current.placeholder}
                  />
                  <div className="flex justify-end mt-4">
                    <button
                      onClick={goNext}
                      disabled={!answers[current.id]}
                      className="group flex items-center gap-2 px-6 py-3 bg-foreground text-background text-sm font-medium tracking-widest uppercase rounded-full hover:bg-accent transition-colors duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      Next
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              )}

              {current.type === "contact" && (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={answers.name || ""}
                    onChange={(e) =>
                      setAnswers({ ...answers, name: e.target.value })
                    }
                    className="w-full bg-card border border-border rounded-xl px-6 py-4 text-foreground placeholder:text-muted-foreground/50 focus:border-accent focus:outline-none transition-colors"
                    placeholder="Your name"
                  />
                  <input
                    type="email"
                    value={answers.email || ""}
                    onChange={(e) =>
                      setAnswers({ ...answers, email: e.target.value })
                    }
                    className="w-full bg-card border border-border rounded-xl px-6 py-4 text-foreground placeholder:text-muted-foreground/50 focus:border-accent focus:outline-none transition-colors"
                    placeholder="your@email.com"
                  />
                  <div className="flex justify-end mt-4">
                    <MagneticButton>
                      <button
                        onClick={handleSubmit}
                        disabled={!answers.name || !answers.email}
                        className="group flex items-center gap-3 px-8 py-4 bg-foreground text-background font-medium text-sm tracking-widest uppercase rounded-full hover:bg-accent transition-colors duration-500 disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        Send
                        <Send size={14} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </MagneticButton>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
