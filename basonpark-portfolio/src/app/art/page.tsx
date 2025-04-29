"use client"; // Needed for useEffect and GSAP animations

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { DATA } from "@/data/resume";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function ArtPage() {
  const mainContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mainContainerRef.current;
    const body = document.body;
    const originalBodyBg = body.style.background; // Store original background style

    // Apply new gradient background to body
    body.style.background = "linear-gradient(to bottom, #abb29d, #79806d)";

    if (!container) {
      return () => {
        body.style.background = originalBodyBg;
      };
    }

    const panels = gsap.utils.toArray(".art-panel") as HTMLElement[];
    const panelAnimations: globalThis.ScrollTrigger[] = []; // Store individual animation triggers for cleanup

    if (panels.length === 0) {
      return () => {
        body.style.background = originalBodyBg;
      };
    }

    // --- GSAP Scroll Snap Logic ---
    const snapTrigger = ScrollTrigger.create({
      trigger: container,
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
    panels.forEach((panel, index) => {
      const isOdd = index % 2 !== 0;
      gsap.set(panel, { autoAlpha: 0, xPercent: isOdd ? 50 : -50 }); // Initial state: invisible, offset left/right

      const animTrigger = ScrollTrigger.create({
        trigger: panel,
        start: "top bottom-=100", // Trigger slightly before bottom hits the top
        end: "center center", // Optional: end when center hits center
        // markers: true, // Uncomment for debugging
        onEnter: () =>
          gsap.to(panel, {
            autoAlpha: 1,
            xPercent: 0,
            duration: 0.8,
            ease: "power2.out",
            overwrite: "auto",
          }),
        onLeaveBack: () =>
          gsap.to(panel, {
            autoAlpha: 0,
            xPercent: isOdd ? 50 : -50,
            duration: 0.4,
            ease: "power1.in",
            overwrite: "auto",
          }),
        invalidateOnRefresh: true, // Recalculate on resize
      });
      panelAnimations.push(animTrigger);
    });
    // --- End GSAP Panel Entrance Animation Logic ---

    // Cleanup function
    return () => {
      if (snapTrigger) {
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
      {DATA.art.map((artItem, index) => (
        <div
          key={index}
          // Panel takes full viewport height, centers content. Added opacity-0 for initial state before GSAP
          className="art-panel flex h-screen w-full flex-col items-center justify-center p-6 opacity-0"
        >
          {/* Image container: Increased height */}
          <div className="relative mb-4 h-3/4 w-full max-w-4xl">
            <Image
              src={artItem.imageUrl}
              alt={artItem.title}
              fill
              style={{ objectFit: "contain" }}
              className="rounded"
              priority={index < 2}
              sizes="(max-width: 1024px) 90vw, 80vw" // Adjusted sizes
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
  );
}
