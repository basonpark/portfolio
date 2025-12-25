"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";

type ArtItem = {
  imageUrl: string;
  title: string;
  year: number;
  dimensions: string;
  medium: string;
};

export function ArtLightbox({
  art,
  onClose,
}: {
  art: ArtItem | null;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {art && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/80 p-4 md:p-8 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label={`${art.title} preview`}
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
        >
          <motion.div
            className="mx-auto w-full max-w-6xl"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 14, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.99 }}
            transition={{
              duration: 0.22,
              ease: [0.22, 1, 0.36, 1], // smooth "easeOutCubic"-ish
            }}
          >
            <div className="flex items-center justify-between pb-3 text-white">
              <div className="min-w-0">
                <div className="verona-serial-bold truncate text-lg">
                  {art.title}
                </div>
                <div className="verona-serial truncate text-sm text-white/80">
                  {art.year} · {art.medium} · {art.dimensions}
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="verona-serial ml-4 rounded-md bg-white/10 px-3 py-2 text-sm text-white hover:bg-white/20"
              >
                Close (Esc)
              </button>
            </div>

            {/* Scroll behavior:
             * For tall/vertical works we render the image at natural height (h-auto).
             * The overlay is overflow-y-auto, so users can scroll down to see the full piece.
             */}
            <div className="rounded-lg bg-black/30 p-2">
              <img
                src={art.imageUrl}
                alt={art.title}
                className="w-full h-auto"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


