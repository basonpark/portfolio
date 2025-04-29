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
      className="text-pretty text-xl max-w-4xl mx-auto leading-relaxed"
    >
      {" "}
      {/* Added max-w-3xl and mx-auto */}
      {
        // Split the input text into individual characters and map over them
        text.split("").map((char, index) => (
          <span
            key={index}
            className=" scroll-bold-char inline-block" // Added class for easier targeting if needed
            style={{ fontWeight: 700, lineHeight: 1.6, color: "#ffffff" }} // Added line-height, removed color
          >
            {char === " " ? "\u00A0" : char}{" "}
            {/* Replace space with non-breaking space */}
          </span>
        ))
      }
    </p>
  );
};
