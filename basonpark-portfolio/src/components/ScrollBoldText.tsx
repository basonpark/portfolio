// src/components/ScrollBoldText.tsx
"use client";

import React from "react";

interface ScrollBoldTextProps {
  text: string;
  id?: string; // Optional ID for targeting with GSAP
}

export const ScrollBoldText: React.FC<ScrollBoldTextProps> = ({ text, id }) => {
  return (
    <p
      id={id || "scroll-bold-text"}
      className="text-pretty text-xl max-w-5xl mx-auto leading-relaxed"
      style={{ whiteSpace: "pre-wrap" }} // Ensure whitespace is handled correctly
    >
      {
        // Split text into words and spaces, keeping spaces
        text
          .split(/(\s+)/)
          .filter(Boolean)
          .map((segment, segmentIndex) => {
            // Check if the segment is whitespace
            if (/^\s+$/.test(segment)) {
              // Wrap spaces in a span with the target class
              return (
                <span
                  key={`space-${segmentIndex}`}
                  className="scroll-bold-char"
                  style={{
                    fontWeight: 550,
                    lineHeight: 1.6,
                    color: "#ffffff",
                    display: "inline",
                  }} // Add styles for consistency
                >
                  {segment}
                </span>
              );
            }

            // Otherwise, it's a word. Wrap the word in an inline-block span.
            return (
              <span
                key={`word-${segmentIndex}`}
                style={{ display: "inline-block" }}
              >
                {
                  // Split the word into characters and wrap each character
                  segment.split("").map((char, charIndex) => (
                    <span
                      key={charIndex}
                      className="scroll-bold-char"
                      style={{
                        fontWeight: 550,
                        lineHeight: 1.6,
                        color: "#ffffff", // Change initial character color back to white
                        display: "inline",
                      }} // Set initial weight to 400
                    >
                      {char}
                    </span>
                  ))
                }
              </span>
            );
          })
      }
    </p>
  );
};
