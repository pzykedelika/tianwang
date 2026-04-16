"use client";

import { cn } from "@/lib/utils";

interface TextShimmerProps {
  text: string;
  className?: string;
  duration?: number;
}

export default function TextShimmer({
  text,
  className,
  duration = 3,
}: TextShimmerProps) {
  return (
    <span
      className={cn(
        "inline-block bg-clip-text text-transparent",
        className
      )}
      style={{
        backgroundImage:
          "linear-gradient(90deg, #B0BEC5 0%, #FFFFFF 50%, #B0BEC5 100%)",
        backgroundSize: "200% 100%",
        animation: `text-shimmer ${duration}s ease-in-out infinite`,
      }}
    >
      {text}
      <style jsx>{`
        @keyframes text-shimmer {
          0%,
          100% {
            background-position: 200% center;
          }
          50% {
            background-position: 0% center;
          }
        }
      `}</style>
    </span>
  );
}
