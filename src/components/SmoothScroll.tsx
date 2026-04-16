"use client";

import { ReactNode } from "react";

interface SmoothScrollProps {
  children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  return <div className="flex-1 w-full flex flex-col">{children}</div>;
}
