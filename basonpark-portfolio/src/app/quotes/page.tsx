"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SlideFadeIn from "@/components/magicui/slide-fade-in";
import Link from "next/link";
import { Icons } from "@/components/icons";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Import chevron icons
import { QuoteData, quotesData as importedQuotesData } from "@/data/quotes"; // Import quotes data
import { veronaSerial } from "../fonts";

// Define QuoteType based on DATA structure
interface QuoteType {
  quote: string;
  author?: string;
  source?: string; // Add optional source
  link?: string;   // Add optional link
  favorite?: boolean;
}

// Fisher-Yates (Knuth) Shuffle function
function shuffle<T>(array: T[]): T[] {
  let currentIndex = array.length,
    randomIndex;
  const shuffledArray = [...array];
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [shuffledArray[currentIndex], shuffledArray[randomIndex]] = [
      shuffledArray[randomIndex],
      shuffledArray[currentIndex],
    ];
  }
  return shuffledArray;
}

export default function QuotesPage() {
  // State
  const [currentPage, setCurrentPage] = useState(1);
  const [quotesData] = useState<QuoteType[]>(importedQuotesData); // Keep original data immutable
  const [randomQuoteMoment, setRandomQuoteMoment] = useState<QuoteType | null>(null);
  const [selectedQuotesRotation, setSelectedQuotesRotation] = useState<QuoteType[]>([]);
  const [shuffledRemainingQuotes, setShuffledRemainingQuotes] = useState<QuoteType[]>([]);

  // Constants
  const QUOTES_PER_PAGE = 9; // Or your desired number
  const NUM_SELECTED_ROTATION = 10; // How many to show in "Selected Quotes"
  const BLUR_FADE_DELAY = 0.05;

  // Shuffle quotes and select random quote on component mount
  useEffect(() => {
    if (quotesData.length === 0) return;

    // 1. Define the pool (first 26 quotes) and the rest
    const selectionPool = quotesData.slice(0, 26);
    const quotesAfterPool = quotesData.slice(26);

    // 2. Select "Quote of the Moment" from the pool
    if (selectionPool.length > 0) {
      const randomIndexMoment = Math.floor(Math.random() * selectionPool.length);
      setRandomQuoteMoment(selectionPool[randomIndexMoment]);
    }

    // 3. Select and shuffle "Selected Quotes" from the pool
    const shuffledPool = shuffle([...selectionPool]); // Shuffle a copy
    const selected = shuffledPool.slice(0, Math.min(NUM_SELECTED_ROTATION, shuffledPool.length)); // Ensure we don't slice beyond array length
    setSelectedQuotesRotation(selected);

    // 4. Determine remaining quotes
    const selectedSet = new Set(selected.map(q => q.quote)); // Use quote text for uniqueness check
    const remainingFromPool = selectionPool.filter((q: QuoteType) => !selectedSet.has(q.quote));
    const allRemaining = [...remainingFromPool, ...quotesAfterPool];
    setShuffledRemainingQuotes(shuffle(allRemaining));

  }, [quotesData]); // Depend on quotesData

  // Calculate total pages based on shuffled *remaining* quotes
  const totalPages = Math.ceil(shuffledRemainingQuotes.length / QUOTES_PER_PAGE);

  // Get quotes for the current page from the shuffled *remaining* list
  const getPaginatedQuotes = () => {
    const startIndex = (currentPage - 1) * QUOTES_PER_PAGE;
    return shuffledRemainingQuotes.slice(startIndex, startIndex + QUOTES_PER_PAGE);
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top on page change
    }
  };

  return (
    <section className="py-16 px-6 max-w-5xl mx-auto">
      {/* Font styles for Verona Serial */}
      <style jsx global>{`
        /* Apply Verona Serial to all specific elements with these classes */
        .verona-serial {
          font-family: var(--font-verona-serial), Georgia, serif !important;
        }

        .verona-serial-regular {
          font-family: var(--font-verona-serial), Georgia, serif !important;
          font-weight: 400;
        }

        .verona-serial-bold {
          font-family: var(--font-verona-serial), Georgia, serif !important;
          font-weight: 700;
        }

        /* Changed Lexend to Figtree and made bolder */
        .figtree-quote-font {
          font-family: var(--font-figtree), sans-serif !important;
          font-weight: 700; /* Bold weight */
        }

        .figtree-quote-author {
          font-family: var(--font-figtree), sans-serif !important;
          font-weight: 800; /* ExtraBold weight */
        }

        /* Make sure these styles apply broadly */
        h1,
        h2,
        h3,
        /* Removed blockquote and footer to prevent override */
        .pagination-link,
        button {
          font-family: var(--font-verona-serial), Georgia, serif;
        }

        .quote-card {
          transition: all 0.3s ease;
          padding: 1.5rem !important;
        }

        .quote-card:hover {
          transform: translateY(-5px);
        }

        blockquote {
          padding: 1rem;
        }
      `}</style>

      <h1 className="text-5xl verona-serial-bold mb-16 text-center text-slate-800">
        some quotes <br /> you may like
      </h1>

      {/* Random Quote Section */}
      {randomQuoteMoment && (
        <div className="mb-20">
          <h2 className="text-2xl mb-6 verona-serial-bold text-[#7c6c62]">
            Quote of the Moment
          </h2>
          <SlideFadeIn delay={0}>
            <Card className="bg-white border border-[#d5c9bb]/50 shadow-lg hover:shadow-xl quote-card">
              <CardContent className="p-6">
                <blockquote className="text-xl figtree-quote-font">
                  &quot;{randomQuoteMoment.quote}&quot;
                </blockquote>
              </CardContent>
              {(randomQuoteMoment.author || randomQuoteMoment.source) && (
                <CardFooter className="text-sm text-gray-600 justify-end p-4 pt-0">
                  — {randomQuoteMoment.author || "Unknown"}
                  {randomQuoteMoment.source && randomQuoteMoment.link ? (
                    <Link
                      href={randomQuoteMoment.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-1 italic hover:underline"
                    >
                      ({randomQuoteMoment.source})
                    </Link>
                  ) : randomQuoteMoment.source ? (
                    <span className="ml-1 italic">({randomQuoteMoment.source})</span>
                  ) : null}
                </CardFooter>
              )}
            </Card>
          </SlideFadeIn>
        </div>
      )}

      {/* Selected Quotes (Rotation) */}
      <div className="mb-20">
        <h2 className="text-2xl mb-6 verona-serial-bold text-[#7c6c62]">
          Selected Quotes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {selectedQuotesRotation.map((quote, index) => (
            <SlideFadeIn key={`selected-${index}`} delay={BLUR_FADE_DELAY * index}>
              <Card className="bg-white border border-[#d5c9bb]/50 shadow-lg hover:shadow-2xl quote-card">
                <CardContent className="p-6">
                  <blockquote className="text-xl figtree-quote-font">
                    &quot;{quote.quote}&quot;
                  </blockquote>
                </CardContent>
                {(quote.author || quote.source) && (
                  <CardFooter className="text-sm text-gray-600 justify-end p-4 pt-0">
                    — {quote.author || "Unknown"}
                     {quote.source && quote.link ? (
                       <Link
                         href={quote.link}
                         target="_blank"
                         rel="noopener noreferrer"
                         className="ml-1 italic hover:underline"
                       >
                         ({quote.source})
                       </Link>
                     ) : quote.source ? (
                       <span className="ml-1 italic">({quote.source})</span>
                     ) : null}
                  </CardFooter>
                )}
              </Card>
            </SlideFadeIn>
          ))}
        </div>
      </div>

      {/* More Quotes (Paginated Remaining) */}
      {shuffledRemainingQuotes.length > 0 && (
        <div>
          <h2 className="text-2xl mb-6 verona-serial-bold text-[#7c6c62]">
            More Quotes
          </h2>
          <div className="space-y-5 mb-8">
            {getPaginatedQuotes().map((quote, index) => (
              <SlideFadeIn
                key={`paginated-shuffled-${index}`}
                delay={BLUR_FADE_DELAY * index}
              >
                <Card className="bg-[#f3f0e5] border-0 shadow-md hover:shadow-lg quote-card">
                  <CardContent className="p-6">
                    <blockquote className="text-xl figtree-quote-font">
                      &quot;{quote.quote}&quot;
                    </blockquote>
                  </CardContent>
                  {(quote.author || quote.source) && (
                    <CardFooter className="text-sm text-gray-600 justify-end p-4 pt-0">
                       — {quote.author || "Unknown"}
                       {quote.source && quote.link ? (
                         <Link
                           href={quote.link}
                           target="_blank"
                           rel="noopener noreferrer"
                           className="ml-1 italic hover:underline"
                         >
                           ({quote.source})
                         </Link>
                       ) : quote.source ? (
                         <span className="ml-1 italic">({quote.source})</span>
                       ) : null}
                    </CardFooter>
                  )}
                </Card>
              </SlideFadeIn>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2 mt-10">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="bg-white/70 hover:bg-white"
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="ml-1">Previous</span>
              </Button>
              <span className="text-sm text-gray-700">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="bg-white/70 hover:bg-white"
              >
                <span className="mr-1">Next</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
