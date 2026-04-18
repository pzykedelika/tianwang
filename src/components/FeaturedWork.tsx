"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import AnimatedText from "./AnimatedText";
import { ArrowUpRight } from "lucide-react";

const categories = [
  {
    title: "Sports",
    gradient: "from-accent/20 via-card to-muted/30",
    media: "https://www.youtube.com/embed/--GjpQRF4EE?rel=0",
    mediaType: "youtube" as const,
  },
  {
    title: "Concerts",
    gradient: "from-muted/30 via-card to-accent-light/10",
    media: "https://www.youtube.com/embed/XSwKn42et64?rel=0",
    mediaType: "youtube" as const,
  },
  {
    title: "Products",
    gradient: "from-accent-light/10 via-card to-accent/20",
    media: "https://www.youtube.com/embed/4ZdJKstetI0?rel=0",
    mediaType: "youtube" as const,
  },
  {
    title: "Websites",
    gradient: "from-card via-muted/20 to-accent/15",
    media: "/videos/simpletuition.mp4",
    mediaType: "local" as const,
    objectPosition: "top",
  },
];

export default function FeaturedWork() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className="relative w-full pt-32 md:pt-48 pb-16 md:pb-24 overflow-hidden"
    >
      {/* Section header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            <AnimatedText
              text="Featured Work"
              as="h2"
              animation="slide"
              className="font-[family-name:var(--font-syne)] text-5xl md:text-7xl font-bold tracking-tight"
            />
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link
              href="/work"
              className="group flex items-center gap-2 text-sm font-medium tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
            >
              View All
              <ArrowUpRight
                size={14}
                className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
              />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* 2x2 Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 md:px-6">
        {categories.map((category, i) => (
          <CategoryCard key={category.title} category={category} index={i} />
        ))}
      </div>
    </section>
  );
}

function CategoryCard({
  category,
  index,
}: {
  category: (typeof categories)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <Link href="/work" className="group block">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-card hover:border-accent/40 transition-all duration-500">
          <div className="relative aspect-[16/9] overflow-hidden">
            {category.mediaType === "local" && category.media ? (
              <video
                src={category.media}
                autoPlay
                loop
                muted
                playsInline
                controlsList="nodownload"
                onContextMenu={(e) => e.preventDefault()}
                style={{ objectPosition: category.objectPosition ?? "center" }}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : null}

            {category.mediaType === "youtube" && category.media ? (
              <iframe
                src={category.media}
                title={category.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
                className="absolute inset-0 w-full h-full transition-transform duration-700 group-hover:scale-105"
              />
            ) : null}

            {!category.media ? (
              <div
                className={`absolute inset-0 bg-gradient-to-br ${category.gradient} transition-transform duration-700 group-hover:scale-105`}
              />
            ) : null}

            {/* Category number */}
            <div className="absolute top-6 left-6">
              <span className="font-[family-name:var(--font-mono)] text-xs tracking-widest text-muted-foreground/60">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-background/0 group-hover:bg-background/30 transition-colors duration-500" />

            {/* View button on hover */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="px-6 py-3 bg-foreground text-background text-sm font-medium tracking-widest uppercase rounded-full flex items-center gap-2">
                View Project
                <ArrowUpRight size={14} />
              </div>
            </div>

            {/* Title overlay at bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-gradient-to-t from-background/80 via-background/40 to-transparent">
              <h3 className="font-[family-name:var(--font-syne)] text-3xl md:text-4xl font-bold tracking-tight group-hover:text-accent transition-colors duration-300">
                {category.title}
              </h3>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
