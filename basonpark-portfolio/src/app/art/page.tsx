"use client"; // Needed for useEffect and GSAP animations

import React, { useEffect, useMemo, useRef, useState } from "react";
import { DATA } from "@/data/resume";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion"; // Import Framer Motion

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function ArtPage() {
  const mainContainerRef = useRef<HTMLDivElement>(null);
  const panelsContainerRef = useRef<HTMLDivElement>(null); // Ref for the panels container
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeArt = useMemo(
    () => (activeIndex === null ? null : DATA.art[activeIndex]),
    [activeIndex]
  );

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

    // White background for a cleaner portfolio look.
    body.style.background = "#ffffff";

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

  // Lightbox behavior: close on Escape and prevent background scrolling.
  useEffect(() => {
    const body = document.body;
    const prevOverflow = body.style.overflow;

    if (activeIndex !== null) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = prevOverflow;
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveIndex(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex]);

  return (
    <div ref={mainContainerRef} className="w-full bg-white">
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
            className="art-panel flex h-screen w-full flex-col items-center justify-center p-6 bg-white"
          >
            {/* Image container: Increased height */}
            <button
              type="button"
              onClick={() => setActiveIndex(index)}
              className="relative mb-4 h-[78vh] w-full max-w-6xl rounded-lg bg-white transition focus:outline-none focus:ring-2 focus:ring-black/20"
              aria-label={`Open ${artItem.title} in full screen`}
            >
              {/* NOTE:
               * These source images are large (multi‑MB). next/image optimization can fail on some hosts
               * (timeouts/limits), causing images to render locally but not in production.
               * Serving directly from /public avoids the optimizer entirely.
               */}
              <img
                src={artItem.imageUrl}
                alt={artItem.title}
                loading={index < 2 ? "eager" : "lazy"}
                className="h-full w-full rounded-lg object-contain"
              />
            </button>
            {/* Text container: Reduced top margin */}
            <div className="text-center w-full max-w-xl mt-2 p-3 md:p-4 rounded-lg">
              <h3 className="verona-serial-bold mb-1 text-xl md:text-2xl text-slate-900">
                {artItem.title}
              </h3>
              <p className="verona-serial text-sm md:text-base text-slate-600">
                {artItem.year} | {artItem.medium} | {artItem.dimensions}
              </p>
              {/* Description can be re-added here if needed */}
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {activeArt && (
        <div
          className="fixed inset-0 z-50 bg-black/80 p-4 md:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={`${activeArt.title} preview`}
          onClick={() => setActiveIndex(null)}
        >
          <div
            className="mx-auto flex h-full max-w-6xl flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 text-white">
              <div className="min-w-0">
                <div className="verona-serial-bold truncate text-lg">
                  {activeArt.title}
                </div>
                <div className="verona-serial truncate text-sm text-white/80">
                  {activeArt.year} · {activeArt.medium} · {activeArt.dimensions}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveIndex(null)}
                className="verona-serial ml-4 rounded-md bg-white/10 px-3 py-2 text-sm text-white hover:bg-white/20"
              >
                Close (Esc)
              </button>
            </div>

            <div className="relative flex-1 rounded-lg bg-black/30 p-2">
              <img
                src={activeArt.imageUrl}
                alt={activeArt.title}
                className="h-full w-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
