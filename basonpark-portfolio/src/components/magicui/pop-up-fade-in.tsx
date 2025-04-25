"use client";

import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { useRef } from "react";

interface PopUpFadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  scaleOffset?: number;
  once?: boolean;
}

export default function PopUpFadeIn({
  children,
  className,
  delay = 0,
  duration = 0.5,
  scaleOffset = 0.8, // Start slightly smaller
  once = false,
}: PopUpFadeInProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once });

  const variants = {
    hidden: {
      opacity: 0,
      scale: scaleOffset, // Start scaled down
    },
    visible: {
      opacity: 1,
      scale: 1, // Scale up to normal size
    },
  };

  return (
    <motion.div
      ref={ref}
      animate={isInView ? "visible" : "hidden"}
      initial="hidden"
      variants={variants}
      transition={{ duration, delay, ease: "easeOut" }} // Use easeOut
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
