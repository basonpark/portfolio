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
      {text.split("").map((char, index) => (
        <span
          key={index}
          className=" scroll-bold-char inline-block"
          style={{ fontWeight: 700, color: "#b7b0ad" }}
        >
          {" "}
          {/* Start Bold */}
          {char === " " ? "\u00A0" : char}{" "}
          {/* Use non-breaking space for spaces */}
        </span>
      ))}
    </p>
  );
};
