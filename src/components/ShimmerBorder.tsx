"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ShimmerBorderProps {
  children: ReactNode;
  className?: string;
  borderRadius?: string;
  borderWidth?: number;
  duration?: number;
  color?: string;
}

export default function ShimmerBorder({
  children,
  className,
  borderRadius = "12px",
  borderWidth = 1,
  duration = 3,
  color = "#607D8B",
}: ShimmerBorderProps) {
  return (
    <div
      className={cn("relative overflow-hidden p-[1px]", className)}
      style={{ borderRadius }}
    >
      {/* Animated shimmer border */}
      <div
        className="absolute inset-0"
        style={{
          borderRadius,
          background: `conic-gradient(from 0deg, transparent 0%, ${color} 10%, transparent 20%)`,
          animation: `shimmer-spin ${duration}s linear infinite`,
        }}
      />
      {/* Inner content with background */}
      <div
        className="relative bg-card"
        style={{
          borderRadius: `calc(${borderRadius} - ${borderWidth}px)`,
        }}
      >
        {children}
      </div>
      <style jsx>{`
        @keyframes shimmer-spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
