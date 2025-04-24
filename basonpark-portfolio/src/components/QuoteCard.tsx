"use client"; // Mark as a client component

import React, { useState, useEffect } from "react";
import { QuoteData, quotesData } from "@/data/quotes"; // Assuming quotes.ts is in src/data
import Link from "next/link";

const QuoteCard: React.FC = () => {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState<number>(0);

  useEffect(() => {
    // Function to update the quote index based on the current minute
    const updateQuote = () => {
      const currentMinute = new Date().getMinutes();
      const newIndex = currentMinute % quotesData.length;
      setCurrentQuoteIndex(newIndex);
    };

    // Initial update
    updateQuote();

    // Set interval to update every minute (at the start of the minute)
    const now = new Date();
    const secondsUntilNextMinute = 60 - now.getSeconds();
    const initialTimeout = setTimeout(() => {
      updateQuote(); // Update right at the minute change
      const intervalId = setInterval(updateQuote, 60000); // Then update every 60 seconds
      // Cleanup function for interval
      return () => clearInterval(intervalId);
    }, secondsUntilNextMinute * 1000);

    // Cleanup function for the initial timeout
    return () => clearTimeout(initialTimeout);
  }, []); // Empty dependency array ensures this effect runs only once on mount

  const currentQuote: QuoteData = quotesData[currentQuoteIndex];

  return (
    <Link href="/quotes" passHref>
      <div className="my-20 p-4 border rounded-lg shadow-lg bg-card text-card-foreground bg-gradient-to-br from-slate-100 to-slate-400 cursor-pointer transition-transform duration-200 ease-in-out hover:scale-105">
        <blockquote className="text-center font-verona">
          <p className="font-bold text-xl">"{currentQuote.quote}"</p>
          <footer className="text-center text-xs text-muted-foreground mt-2 font-bold">
            - {currentQuote.author}
          </footer>
        </blockquote>
      </div>
    </Link>
  );
};

export default QuoteCard;
