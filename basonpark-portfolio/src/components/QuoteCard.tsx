"use client"; // Mark as a client component

import React, { useState, useEffect } from "react";
import { QuoteData, quotesData } from "@/data/quotes"; // Assuming quotes.ts is in src/data
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const QuoteCard: React.FC = () => {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState<number>(0);

  useEffect(() => {
    // Function to update the quote index based on the current minute
    const updateQuote = () => {
      const currentSecond = new Date().getSeconds();
      const newIndex = currentSecond % (12 * quotesData.length);
      setCurrentQuoteIndex(newIndex);
    };

    // Initial update
    updateQuote();

    // Set interval to update every 12 seconds (at the start of the interval)
    const now = new Date();
    const secondsUntilNextInterval = 12 - (now.getSeconds() % 12);
    const initialTimeout = setTimeout(() => {
      updateQuote(); // Update right at the interval start
      const intervalId = setInterval(updateQuote, 12000); // Then update every 12 seconds
      // Cleanup function for interval
      return () => clearInterval(intervalId);
    }, secondsUntilNextInterval * 1000);

    // Cleanup function for the initial timeout
    return () => clearTimeout(initialTimeout);
  }, []); // Empty dependency array ensures this effect runs only once on mount

  const currentQuote: QuoteData = quotesData[currentQuoteIndex % quotesData.length];

  return (
    <Link href="/quotes" passHref>
      {/* This outer div spans the full viewport width */}
      <div className="my-20 w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
        {/* This inner div contains the styling, padding, and a new max-width independent of the main content */}
        <div
          className="p-4 px-8 rounded-lg bg-card text-card-foreground cursor-pointer max-w-6xl mx-auto h-48 flex flex-col justify-center"
        >
          <AnimatePresence mode="wait"> {/* Use mode='wait' for clean exit/enter */}
            <motion.blockquote
              key={currentQuoteIndex} // Key change triggers animation
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
            >
              <p className="font-bold text-3xl">
                &ldquo;{currentQuote.quote}&rdquo;
              </p>
              <footer className="text-center text-sm text-muted-foreground mt-2 font-bold">
                - {currentQuote.author}
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>
      </div>
    </Link>
  );
};

export default QuoteCard;
