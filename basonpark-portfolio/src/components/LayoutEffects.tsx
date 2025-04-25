"use client"; // Mark this whole file as a client component module

import { useSmoothScroll } from "@/hooks/useSmoothScroll";

export function LayoutEffects() {
  // Apply smooth scrolling
  useSmoothScroll();
  // We can add other global layout effects here later if needed
  return null;
}
