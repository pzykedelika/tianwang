"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface AnimatedGridPatternProps {
  className?: string;
  cellSize?: number;
  strokeColor?: string;
}

export default function AnimatedGridPattern({
  className,
  cellSize = 60,
  strokeColor = "rgba(96, 125, 139, 0.08)",
}: AnimatedGridPatternProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const cells = svg.querySelectorAll(".grid-cell");
    const highlightRandomCells = () => {
      cells.forEach((cell) => {
        cell.setAttribute("fill", "transparent");
      });

      const count = Math.min(5, cells.length);
      const indices = new Set<number>();
      while (indices.size < count) {
        indices.add(Math.floor(Math.random() * cells.length));
      }

      indices.forEach((idx) => {
        const cell = cells[idx];
        cell.setAttribute("fill", "rgba(96, 125, 139, 0.04)");
        (cell as SVGElement).style.transition = "fill 2s ease";
      });
    };

    highlightRandomCells();
    const interval = setInterval(highlightRandomCells, 3000);
    return () => clearInterval(interval);
  }, []);

  const cols = 20;
  const rows = 15;

  return (
    <svg
      ref={svgRef}
      className={cn("absolute inset-0 w-full h-full", className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id="grid"
          width={cellSize}
          height={cellSize}
          patternUnits="userSpaceOnUse"
        >
          <path
            d={`M ${cellSize} 0 L 0 0 0 ${cellSize}`}
            fill="none"
            stroke={strokeColor}
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
      {Array.from({ length: rows }).map((_, row) =>
        Array.from({ length: cols }).map((_, col) => (
          <rect
            key={`${row}-${col}`}
            className="grid-cell"
            x={col * cellSize}
            y={row * cellSize}
            width={cellSize}
            height={cellSize}
            fill="transparent"
          />
        ))
      )}
    </svg>
  );
}
