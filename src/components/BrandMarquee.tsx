"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const brands = [
  { name: "St Peter's College", logo: "/images/brands/footer-logo-white-transparent-fixed.png" },
  { name: "Nothing", logo: "/images/brands/realnothinglogo.png" },
  { name: "Pure Blanks", logo: "/images/brands/LOGO-2-white-transparent.png" },
  { name: "Simple Tuition", logo: "/images/brands/simple-tuition-white-logo.png" },
];

export default function BrandMarquee() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1 }}
      className="w-full overflow-hidden py-16 md:py-24"
    >
      <div className="relative w-full">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        <div className="flex w-max animate-marquee whitespace-nowrap">
          {[0, 1].map((groupIndex) => (
            <div
              key={groupIndex}
              className="flex shrink-0 items-center gap-20 md:gap-32"
              aria-hidden={groupIndex === 1}
            >
              {brands.map((brand, brandIndex) => (
                <div
                  key={`${groupIndex}-${brand.name}`}
                  className="relative h-16 w-56 shrink-0 md:h-24 md:w-80"
                >
                  <Image
                    src={brand.logo}
                    alt={groupIndex === 1 ? "" : brand.name}
                    fill
                    priority={groupIndex === 0 && brandIndex === 0}
                    className="object-contain grayscale opacity-60"
                    sizes="320px"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
