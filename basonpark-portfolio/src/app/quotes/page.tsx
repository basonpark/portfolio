"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { QuoteData, quotesData } from "@/data/quotes";
import { veronaSerial } from "../fonts";
import SlideFadeIn from "@/components/magicui/slide-fade-in";

// Define the number of quotes per page
const QUOTES_PER_PAGE = 20;
// Define favorite quote indices
const FAVORITE_QUOTES = [0, 1, 2, 6, 4, 3, 7, 10, 11, 15];
const BLUR_FADE_DELAY = 0.05;

export default function QuotesPage() {
  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);

  // Get paginated quotes for the current page
  const getPaginatedQuotes = () => {
    const startIndex = (currentPage - 1) * QUOTES_PER_PAGE;
    return quotesData.slice(startIndex, startIndex + QUOTES_PER_PAGE);
  };

  // Get favorite quotes
  const favoriteQuotes = FAVORITE_QUOTES.map((index) => quotesData[index]);

  // Calculate total pages
  const totalPages = Math.ceil(quotesData.length / QUOTES_PER_PAGE);

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

      <h1 className="text-5xl verona-serial-bold mb-12 text-center text-slate-800">
        some quotes that <br /> you may like
      </h1>

      {/* Favorite Quotes */}
      <div className="mb-20">
        <h2 className="text-2xl mb-6 verona-serial-bold text-[#7c6c62]">
          Favorite Quotes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {favoriteQuotes.map((quote, index) => (
            <SlideFadeIn
              key={`favorite-${index}`}
              delay={BLUR_FADE_DELAY * index}
            >
              <Card className="bg-white border border-[#d5c9bb]/50 shadow-lg hover:shadow-2xl quote-card">
                <CardContent className="p-6">
                  <blockquote className="text-xl figtree-quote-font">
                    &quot;{quote.quote}&quot;
                    <footer className="mt-4 text-sm text-[#5d4c42] figtree-quote-author">
                      — {quote.author}
                    </footer>
                  </blockquote>
                </CardContent>
              </Card>
            </SlideFadeIn>
          ))}
        </div>
      </div>

      {/* All Quotes with Pagination */}
      <div>
        <h2 className="text-2xl mb-6 verona-serial-bold text-[#7c6c62]">
          All Quotes
        </h2>
        <div className="space-y-5 mb-8">
          {getPaginatedQuotes().map((quote: QuoteData, index: number) => (
            <SlideFadeIn
              key={`paginated-${index}`}
              delay={BLUR_FADE_DELAY * index}
            >
              <Card className="bg-[#f3f0e5] border-0 shadow-md hover:shadow-lg quote-card">
                <CardContent className="p-5">
                  <blockquote className="text-lg figtree-quote-font">
                    &quot;{quote.quote}&quot;
                    <footer className="mt-3 text-sm text-[#5d4c42] figtree-quote-author">
                      — {quote.author}
                    </footer>
                  </blockquote>
                </CardContent>
              </Card>
            </SlideFadeIn>
          ))}
        </div>

        {/* Pagination Controls - Using Shadcn UI style with prev/next buttons */}
        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationPrevious
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className={`verona-serial-regular ${
                currentPage === 1
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-[#e5ded3] text-[#5d4c42]"
              }`}
            />

            {Array.from({ length: Math.min(5, totalPages) }).map((_, index) => {
              // Logic to show current page and surrounding pages
              let pageNum = currentPage;
              if (totalPages <= 5) {
                pageNum = index + 1;
              } else if (currentPage <= 3) {
                pageNum = index + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + index;
              } else {
                pageNum = currentPage - 2 + index;
              }

              return (
                <PaginationItem key={`page-${pageNum}`}>
                  <PaginationLink
                    onClick={() => setCurrentPage(pageNum)}
                    isActive={currentPage === pageNum}
                    className={`verona-serial-regular ${
                      currentPage === pageNum
                        ? "bg-[#bfb5a5] text-white border-[#bfb5a5]"
                        : "text-[#5d4c42] hover:bg-[#e5ded3] border-[#d5c9bb]"
                    }`}
                  >
                    {pageNum}
                  </PaginationLink>
                </PaginationItem>
              );
            })}

            <PaginationNext
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className={`verona-serial-regular ${
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-[#e5ded3] text-[#5d4c42]"
              }`}
            />
          </PaginationContent>
        </Pagination>
      </div>
    </section>
  );
}
