"use client"; // Needed for useEffect and GSAP animations

import React, { useEffect, useRef } from "react";
import { DATA } from "@/data/resume";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion"; // Import Framer Motion

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function ArtPage() {
  const mainContainerRef = useRef<HTMLDivElement>(null);
  const panelsContainerRef = useRef<HTMLDivElement>(null); // Ref for the panels container

  useEffect(() => {
    const mainEl = mainContainerRef.current;
    const panelsContainer = panelsContainerRef.current; // Get the panels container
    if (!mainEl || !panelsContainer) return;

    const panels: HTMLDivElement[] = gsap.utils.toArray(
      ".art-panel",
      panelsContainer // Use panels container as context
    );
    if (panels.length === 0) return;

    const body = document.body;
    const originalBodyBg = body.style.background; // Store original background style

    // Apply new gradient background to body
    body.style.background = "linear-gradient(to bottom, #abb29d, #79806d)";

    // --- GSAP Scroll Snap Logic ---
    const snapTrigger = ScrollTrigger.create({
      trigger: panelsContainer, // Use the panels container as the trigger
      start: "top top",
      end: "bottom bottom",
      snap: {
        snapTo: 1 / (panels.length - 1),
        duration: { min: 0.2, max: 0.8 },
        delay: 0.1,
        ease: "power2.inOut",
      },
    });
    // --- End GSAP Scroll Snap Logic ---

    // --- GSAP Panel Entrance Animation Logic ---
    const panelAnimations: globalThis.ScrollTrigger[] = []; // Store individual animation triggers for cleanup
    // --- End GSAP Panel Entrance Animation Logic ---

    // Cleanup function
    return () => {
      // Kill the scroll trigger instances
      if (snapTrigger) {
        // Check if snapTrigger exists before killing
        snapTrigger.kill();
      }
      panelAnimations.forEach((trigger) => trigger.kill()); // Kill individual animations
      gsap.set(panels, { clearProps: "all" }); // Clear GSAP props from panels
      // Reset body background
      body.style.background = originalBodyBg;
    };
  }, []);

  return (
    <div ref={mainContainerRef} className="w-full">
      <style jsx global>{`
        /* Apply Verona Serial to all specific elements with these classes */
        .verona-serial {
          font-family: var(--font-verona-serial), Georgia, serif !important;
        }

        .verona-serial-bold {
          font-family: var(--font-verona-serial), Georgia, serif !important;
          font-weight: 700;
        }
      `}</style>
      {/* Title Section */}
      <div className="text-center pt-20 px-4">
        <motion.h1
          initial={{ x: "-100%", opacity: 0 }} // Start off-screen left, invisible
          animate={{ x: 0, opacity: 1 }} // Animate to final position, visible
          transition={{
            type: "spring",
            stiffness: 300, // Controls spring tightness
            damping: 8, // Controls bounce resistance (lower = more bounce)
            mass: 2, // Affects overshoot
            delay: 0.1, // Small delay before starting
          }}
          className="verona-serial-bold text-4xl sm:text-5xl md:text-6xl text-slate-800"
        >
          keepers of the funk
        </motion.h1>
        <p className="text-xl verona-serial-bold text-gray-600">
          basonpark@gmail.com
        </p>
      </div>

      {/* Panels Container - This will be the trigger for snapping */}
      <div ref={panelsContainerRef}>
        {DATA.art.map((artItem, index) => (
          <div
            key={index}
            // Panel takes full viewport height, centers content.
            className="art-panel flex h-screen w-full flex-col items-center justify-center p-6"
          >
            {/* Image container: Increased height */}
            <div className="relative mb-4 h-3/4 w-full max-w-4xl">
              {/* NOTE:
               * These source images are large (multi‑MB). next/image optimization can fail on some hosts
               * (timeouts/limits), causing images to render locally but not in production.
               * Serving directly from /public avoids the optimizer entirely.
               */}
              <img
                src={artItem.imageUrl}
                alt={artItem.title}
                loading={index < 2 ? "eager" : "lazy"}
                className="h-full w-full rounded object-contain"
              />
            </div>
            {/* Text container: Reduced top margin */}
            <div className="text-center w-full max-w-lg mt-2 p-3 md:p-4 bg-card/50 backdrop-blur-sm rounded-lg shadow-md border border-border/30">
              <h3 className="mb-1 text-xl md:text-2xl font-semibold text-card-foreground">
                {artItem.title}
              </h3>
              <p className="text-sm md:text-base text-muted-foreground">
                {artItem.year} | {artItem.medium} | {artItem.dimensions}
              </p>
              {/* Description can be re-added here if needed */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
