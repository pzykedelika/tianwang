"use client";

import { motion, useInView } from "framer-motion";
import { type CSSProperties, useEffect, useRef, useState } from "react";
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
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [marqueeDistance, setMarqueeDistance] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    const group = groupRef.current;
    const viewport = viewportRef.current;

    if (!track || !group || !viewport) {
      return;
    }

    const updateDistance = () => {
      const trackStyles = window.getComputedStyle(track);
      const gap = Number.parseFloat(trackStyles.columnGap || trackStyles.gap || "0");
      const groupWidth = group.offsetWidth;
      const nextViewportWidth = viewport.offsetWidth;

      setMarqueeDistance(groupWidth + gap);
      setViewportWidth(nextViewportWidth);
    };

    updateDistance();

    const resizeObserver = new ResizeObserver(() => {
      updateDistance();
    });

    resizeObserver.observe(track);
    resizeObserver.observe(group);
    resizeObserver.observe(viewport);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const copyCount =
    marqueeDistance && viewportWidth
      ? Math.max(3, Math.ceil(viewportWidth / marqueeDistance) + 2)
      : 3;

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
        <div ref={viewportRef} className="px-10 md:px-16">
          <div
            ref={trackRef}
            className="flex w-max animate-marquee items-center gap-20 whitespace-nowrap md:gap-32"
            style={
              {
                "--marquee-start": marqueeDistance ? `-${marqueeDistance}px` : "0px",
                "--marquee-distance": marqueeDistance ? `-${marqueeDistance}px` : "0px",
              } as CSSProperties
            }
          >
          {Array.from({ length: copyCount }, (_, dupeIdx) => (
            <div
              ref={dupeIdx === 0 ? groupRef : undefined}
              key={dupeIdx}
              className="flex shrink-0 items-center gap-20 md:gap-32"
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
      </div>
    </motion.div>
  );
}
