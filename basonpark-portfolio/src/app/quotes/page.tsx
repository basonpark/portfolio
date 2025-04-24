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
import { QuoteData, quotesData } from "@/data/quotes"; // Changed to named import and added QuoteData
import useEmblaCarousel from "embla-carousel-react";
import { veronaSerial } from "../fonts";

// Define the number of quotes per page
const QUOTES_PER_PAGE = 20;
// Define favorite quote indices
const FAVORITE_QUOTES = [0, 3, 7, 10, 15];

export default function QuotesPage() {
  // State for the rotating featured quote
  const [featuredQuoteIndex, setFeaturedQuoteIndex] = useState(0);
  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  // Embla carousel
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
  });

  // Handle rotation of featured quote every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setFeaturedQuoteIndex((prevIndex) =>
        prevIndex === quotesData.length - 1 ? 0 : prevIndex + 1
      );
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // Get paginated quotes for the current page
  const getPaginatedQuotes = () => {
    const startIndex = (currentPage - 1) * QUOTES_PER_PAGE;
    return quotesData.slice(startIndex, startIndex + QUOTES_PER_PAGE);
  };

  // Calculate total pages
  const totalPages = Math.ceil(quotesData.length / QUOTES_PER_PAGE);

  // Get favorite quotes
  const favoriteQuotes = FAVORITE_QUOTES.map((index) => quotesData[index]);

  // Handle sliding the carousel manually
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

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

        /* Make sure these styles apply broadly */
        h1,
        h2,
        h3,
        blockquote,
        footer,
        .pagination-link,
        button {
          font-family: var(--font-verona-serial), Georgia, serif !important;
        }

        .quote-card {
          transition: all 0.3s ease;
          padding: 1.5rem !important;
        }

        .quote-card:hover {
          transform: translateY(-5px);
        }

        .featured-quote-card {
          animation: fadeInOut 10s infinite;
        }

        @keyframes fadeInOut {
          0% {
            opacity: 0.9;
          }
          15% {
            opacity: 1;
          }
          85% {
            opacity: 1;
          }
          100% {
            opacity: 0.9;
          }
        }

        .carousel-container {
          position: relative;
          overflow: hidden;
        }

        .embla {
          overflow: hidden;
        }

        .embla__container {
          display: flex;
        }

        .embla__slide {
          flex: 0 0 100%;
          min-width: 0;
          padding: 0 1rem;
        }

        blockquote {
          padding: 1rem;
        }
      `}</style>

      <h1 className="text-5xl verona-serial-bold mb-12 text-center text-[#5d4c42]">
        some quotes that may change the way you think
      </h1>

      {/* Featured Quote - rotates every 10 seconds */}
      <div className="mb-20">
        <h2 className="text-2xl mb-6 verona-serial-bold text-[#7c6c62]">
          Featured Quote
        </h2>
        <Card className="bg-[#f3f0e5] border-0 shadow-lg quote-card featured-quote-card">
          <CardContent className="p-8">
            <blockquote className="text-2xl verona-serial-regular border-l-4 border-[#bfb5a5] pl-6 pr-4 py-2">
              &quot;{quotesData[featuredQuoteIndex].quote}&quot;
              <footer className="mt-5 text-lg text-[#7c6c62] verona-serial-bold">
                — {quotesData[featuredQuoteIndex].author}
              </footer>
            </blockquote>
          </CardContent>
        </Card>
      </div>

      {/* Carousel of Quotes */}
      <div className="mb-20">
        <h2 className="text-2xl mb-6 verona-serial-bold text-[#7c6c62]">
          Quotes Carousel
        </h2>
        <div className="carousel-container">
          <div className="embla" ref={emblaRef}>
            <div className="embla__container">
              {quotesData.slice(0, 10).map((quote, index) => (
                <div className="embla__slide" key={`carousel-${index}`}>
                  <Card className="bg-[#e5ded3] border-0 shadow-md quote-card h-52 flex items-center">
                    <CardContent className="p-6 text-center">
                      <blockquote className="text-lg verona-serial-regular">
                        &quot;{quote.quote}&quot;
                        <footer className="mt-3 text-sm text-[#7c6c62] verona-serial-bold">
                          — {quote.author}
                        </footer>
                      </blockquote>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center gap-5 mt-6">
            <Button
              variant="outline"
              onClick={scrollPrev}
              className="bg-[#d5c9bb] border-0 text-[#5d4c42] hover:bg-[#bfb5a5] hover:text-[#f3f0e5] verona-serial-regular px-5 py-2"
            >
              Previous
            </Button>
            <Button
              variant="outline"
              onClick={scrollNext}
              className="bg-[#d5c9bb] border-0 text-[#5d4c42] hover:bg-[#bfb5a5] hover:text-[#f3f0e5] verona-serial-regular px-5 py-2"
            >
              Next
            </Button>
          </div>
        </div>
      </div>

      {/* Favorite Quotes */}
      <div className="mb-20">
        <h2 className="text-2xl mb-6 verona-serial-bold text-[#7c6c62]">
          Favorite Quotes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {favoriteQuotes.map((quote, index) => (
            <Card
              key={`favorite-${index}`}
              className="bg-white border border-[#d5c9bb]/50 shadow-md quote-card hover:shadow-xl"
            >
              <CardContent className="p-6">
                <blockquote className="text-lg verona-serial-regular">
                  &quot;{quote.quote}&quot;
                  <footer className="mt-4 text-sm text-[#5d4c42] verona-serial-bold">
                    — {quote.author}
                  </footer>
                </blockquote>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* All Quotes with Pagination */}
      <div>
        <h2 className="text-2xl mb-6 verona-serial-bold text-[#7c6c62]">
          All Quotes
        </h2>
        <div className="space-y-5 mb-8">
          {getPaginatedQuotes().map((quote: QuoteData, index: number) => ( // Added types
            <Card
              key={`paginated-${index}`}
              className="bg-[#f3f0e5] border-0 shadow-sm quote-card"
            >
              <CardContent className="p-5">
                <blockquote className="text-base verona-serial-regular">
                  &quot;{quote.quote}&quot;
                  <footer className="mt-3 text-sm text-[#5d4c42] verona-serial-bold">
                    — {quote.author}
                  </footer>
                </blockquote>
              </CardContent>
            </Card>
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
