"use client";

import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { useRef } from "react";

interface SlideFadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  yOffset?: number;
  xOffset?: number;
  once?: boolean;
}

export default function SlideFadeIn({
  children,
  className,
  delay = 0,
  duration = 0.3, // Slightly longer duration for more noticeable effect
  yOffset = 24, // Increase vertical offset
  xOffset = -24, // Add horizontal offset for slide-in from left
  once = true,
}: SlideFadeInProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once });

  const variants = {
    hidden: {
      opacity: 0,
      y: yOffset,
      x: xOffset,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
    },
  };

  return (
    <motion.div
      ref={ref}
      animate={isInView ? "visible" : "hidden"}
      initial="hidden"
      variants={variants}
      transition={{ duration, delay, ease: "easeOut" }} // Use easeOut for a smoother end
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
