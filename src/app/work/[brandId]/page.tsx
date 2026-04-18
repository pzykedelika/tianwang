"use client";

import { useRef } from "react";
import { useParams } from "next/navigation";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { brands, type Project } from "@/lib/data";
import AnimatedText from "@/components/AnimatedText";
import AnimatedGridPattern from "@/components/AnimatedGridPattern";
import { ArrowLeft, Play } from "lucide-react";

export default function BrandPage() {
  const { brandId } = useParams<{ brandId: string }>();
  const brand = brands.find((b) => b.id === brandId);

  if (!brand) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Brand not found.</p>
      </div>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="relative flex items-end overflow-hidden pb-12 pt-28">
        <AnimatedGridPattern className="opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
          <Link
            href="/work"
            className="group inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft
              size={14}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Back to Work
          </Link>
          <AnimatedText
            text={brand.name}
            as="h1"
            animation="char-by-char"
            delay={0.3}
            stagger={0.04}
            className="font-[family-name:var(--font-syne)] text-5xl md:text-7xl font-bold tracking-tighter"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-muted-foreground text-lg mt-6 whitespace-nowrap"
          >
            {brand.description}
          </motion.p>
        </div>
      </section>

      {/* Projects grid */}
      <section className="pb-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {brand.projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {brand.projects.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-border bg-card p-12 md:p-16 text-center">
              <p className="text-muted-foreground text-sm">
                Projects coming soon.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <div className="rounded-2xl border border-border bg-card overflow-hidden hover:border-accent/30 transition-all duration-500">
        {/* Media */}
        <div className="relative aspect-video bg-muted/20">
          {project.mediaType === "local" && project.media && (
            <video
              src={project.media}
              controls
              controlsList="nodownload"
              onContextMenu={(e) => e.preventDefault()}
              playsInline
              preload="metadata"
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}

          {!project.media && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Play size={32} className="text-muted-foreground/30" />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-6">
          <h3 className="font-[family-name:var(--font-syne)] text-xl font-bold">
            {project.title}
          </h3>
          <p className="text-muted-foreground text-sm mt-1">
            {project.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
