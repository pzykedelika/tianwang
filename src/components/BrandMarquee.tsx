"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const brands = [
  {
    name: "St Peter's College",
    logo: "/images/brands/footer-logo-white-transparent-fixed.png",
    width: 2000,
    height: 672,
  },
  {
    name: "Nothing",
    logo: "/images/brands/realnothinglogo.png",
    width: 1539,
    height: 373,
  },
  {
    name: "Pure Blanks",
    logo: "/images/brands/LOGO-2-white-transparent.png",
    width: 2440,
    height: 486,
  },
  {
    name: "Simple Tuition",
    logo: "/images/brands/simple-tuition-white-logo.png",
    width: 461,
    height: 266,
  },
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
          {[...Array(2)].map((_, dupeIdx) => (
            <div
              key={dupeIdx}
              className="flex shrink-0 items-center gap-20 px-10 md:gap-32 md:px-16"
            >
              {brands.map((brand, i) => (
                <Image
                  key={`${dupeIdx}-${brand.name}`}
                  src={brand.logo}
                  alt={brand.name}
                  width={brand.width}
                  height={brand.height}
                  priority={dupeIdx === 0 && i === 0}
                  className="h-16 w-auto shrink-0 grayscale opacity-60 md:h-24"
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
