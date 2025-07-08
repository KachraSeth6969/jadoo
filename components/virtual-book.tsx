"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { bookPages } from "@/lib/book-data";
import type { BookPage } from "@/lib/book-data";

// Extend Window interface for jQuery and turn.js
declare global {
  interface Window {
    jQuery: any;
    $: any;
  }
}

export default function VirtualBook() {
  const bookRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0); // Will be calculated dynamically
  const [isFlipping, setIsFlipping] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Load external libraries with better error handling
  const loadLibraries = useCallback(async () => {
    try {
      // Load jQuery first
      if (!window.jQuery) {
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement("script");
          script.src =
            "https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js";
          script.onload = () => resolve();
          script.onerror = () => reject(new Error("Failed to load jQuery"));
          document.head.appendChild(script);
        });
      }

      // Wait a bit for jQuery to be available
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Load turn.js from a reliable CDN
      await new Promise<void>((resolve, reject) => {
        const script = document.createElement("script");
        script.src =
          "https://raw.githack.com/blasten/turn.js/master/turn.min.js";
        script.onload = () => {
          // Wait for turn.js to attach to jQuery
          setTimeout(() => {
            if (window.jQuery && window.jQuery.fn.turn) {
              resolve();
            } else {
              reject(new Error("turn.js did not attach properly"));
            }
          }, 100);
        };
        script.onerror = () => reject(new Error("Failed to load turn.js"));
        document.head.appendChild(script);
      });

      setIsLoaded(true);
    } catch (error) {
      console.error("Library loading error:", error);
      setLoadError(
        error instanceof Error
          ? error.message
          : "Failed to load required libraries"
      );
    }
  }, []);

  // Initialize turn.js
  const initializeBook = useCallback(() => {
    if (
      !isLoaded ||
      !bookRef.current ||
      !window.jQuery ||
      !window.jQuery.fn.turn
    )
      return;

    const $ = window.jQuery;

    try {
      // Destroy existing instance if it exists
      if ($(bookRef.current).data("turn")) {
        $(bookRef.current).turn("destroy");
      }

      // Wait for DOM to be ready and pages to be rendered
      setTimeout(() => {
        if (!bookRef.current) return;

        // Count actual pages in the DOM
        const pages = $(bookRef.current).find('.page');
        const actualPageCount = pages.length;

        if (actualPageCount === 0) {
          console.warn("No pages found in DOM, retrying initialization...");
          setTimeout(() => initializeBook(), 500);
          return;
        }

        console.log(`Initializing book with ${actualPageCount} pages`);
        setTotalPages(actualPageCount);

        // Initialize turn.js with realistic settings
        $(bookRef.current).turn({
          width: 800,
          height: 600,
          autoCenter: true,
          gradients: true,
          elevation: 50,
          duration: 1000,
          acceleration: true,
          display: "double",
          when: {
            turning: (event: any, page: number, view: any) => {
              setIsFlipping(true);
            },
            turned: (event: any, page: number, view: any) => {
              setCurrentPage(page);
              setIsFlipping(false);
            },
            start: function (event: any, pageObject: any, corner: any) {
              $(this).addClass("turning");
            },
            end: function (event: any, pageObject: any, turned: boolean) {
              $(this).removeClass("turning");
            },
          },
        });
      }, 100);

      // Handle responsive design
      const handleResize = () => {
        if (!bookRef.current) return;

        const container = bookRef.current.parentElement;
        if (!container) return;

        const containerWidth = container.offsetWidth - 40;
        const containerHeight = window.innerHeight - 200;

        let scale = Math.min(1, containerWidth / 800, containerHeight / 600);
        scale = Math.max(0.5, scale); // Minimum scale

        $(bookRef.current).turn("size", 800 * scale, 600 * scale);
      };

      // Initial resize and add listener
      setTimeout(handleResize, 100);
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        if (bookRef.current && $(bookRef.current).data("turn")) {
          try {
            $(bookRef.current).turn("destroy");
          } catch (e) {
            console.warn("Error destroying turn.js:", e);
          }
        }
      };
    } catch (error) {
      console.error("Book initialization error:", error);
      setLoadError("Failed to initialize the book");
    }
  }, [isLoaded]);

  useEffect(() => {
    loadLibraries();
  }, [loadLibraries]);

  useEffect(() => {
    if (isLoaded) {
      const cleanup = initializeBook();
      return cleanup;
    }
  }, [isLoaded, initializeBook]);

  // Navigation functions
  const nextPage = useCallback(() => {
    if (bookRef.current && window.jQuery && !isFlipping) {
      window.jQuery(bookRef.current).turn("next");
    }
  }, [isFlipping]);

  const prevPage = useCallback(() => {
    if (bookRef.current && window.jQuery && !isFlipping) {
      window.jQuery(bookRef.current).turn("previous");
    }
  }, [isFlipping]);

  const goToPage = useCallback(
    (page: number) => {
      if (bookRef.current && window.jQuery && !isFlipping) {
        window.jQuery(bookRef.current).turn("page", page);
      }
    },
    [isFlipping]
  );

  const resetBook = useCallback(() => {
    goToPage(1);
  }, [goToPage]);

  // Render loading state
  if (!isLoaded && !loadError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[600px] space-y-6">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-stone-200 border-t-stone-600 rounded-full animate-spin"></div>
        </div>
        <div className="text-center space-y-2">
          <p className="text-stone-700 font-medium">Loading your notebook...</p>
          <p className="text-sm text-stone-500">
            Preparing realistic page flips
          </p>
        </div>
      </div>
    );
  }

  // Render error state
  if (loadError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[600px] space-y-6 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
          <span className="text-red-600 text-2xl">⚠</span>
        </div>
        <div className="space-y-2">
          <p className="text-red-700 font-medium">
            Unable to load the notebook
          </p>
          <p className="text-sm text-red-600 max-w-md">{loadError}</p>
          <Button
            onClick={() => window.location.reload()}
            variant="outline"
            className="mt-4"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Book Container */}
      <div className="flex justify-center mb-8 px-4">
        <div className="book-wrapper relative">
          {/* Notebook binding/spine */}
          <div className="absolute left-1/2 top-0 w-8 h-full bg-gradient-to-r from-stone-600 via-stone-500 to-stone-600 transform -translate-x-1/2 rounded-sm shadow-lg z-0 opacity-80">
            {/* Spiral binding holes */}
            <div className="absolute left-1/2 transform -translate-x-1/2 top-8 space-y-8">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-stone-800 rounded-full opacity-60"
                ></div>
              ))}
            </div>
          </div>

          {/* Main Book */}
          <div
            ref={bookRef}
            className="book relative z-10 bg-white shadow-2xl"
            style={{
              width: "800px",
              height: "600px",
              maxWidth: "90vw",
              maxHeight: "70vh",
            }}
          >
            {/* Front Cover */}
            <div className="page hard-cover bg-gradient-to-br from-stone-100 to-stone-200 border-2 border-stone-300">
              <div className="h-full flex flex-col items-center justify-center p-8 relative overflow-hidden">
                {/* Notebook paper texture */}
                <div className="absolute inset-0 opacity-10">
                  <div className="w-full h-full bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:20px_20px]"></div>
                </div>

                {/* Red margin line */}
                <div className="absolute left-12 top-0 bottom-0 w-px bg-red-300 opacity-40"></div>

                <div className="text-center z-10 space-y-6">
                  <div className="text-6xl mb-6">📔</div>
                  <h1 className="text-4xl md:text-5xl font-bold text-stone-800 mb-4 font-handwriting">
                    My Gift Book
                  </h1>
                  <p className="text-xl text-stone-600 font-handwriting">
                    For Someone Special
                  </p>
                  <div className="w-24 h-px bg-stone-400 mx-auto mt-8"></div>
                </div>
              </div>
            </div>

            {/* Content Pages */}
            {bookPages.map((page, index) => (
              <BookPageComponent
                key={page.id}
                page={page}
                pageNumber={index + 2}
              />
            ))}

            {/* Back Cover */}
            <div className="page hard-cover bg-gradient-to-br from-stone-200 to-stone-100 border-2 border-stone-300">
              <div className="h-full flex flex-col items-center justify-center p-8 relative overflow-hidden">
                {/* Notebook paper texture */}
                <div className="absolute inset-0 opacity-10">
                  <div className="w-full h-full bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:20px_20px]"></div>
                </div>

                <div className="text-center z-10 space-y-6">
                  <div className="text-6xl mb-6">💝</div>
                  <h2 className="text-3xl font-bold text-stone-800 mb-4 font-handwriting">
                    Made with Love
                  </h2>
                  <p className="text-lg text-stone-600 font-handwriting">
                    Thank you for being amazing
                  </p>
                  <div className="w-24 h-px bg-stone-400 mx-auto mt-8"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4">
        <div className="flex items-center gap-3">
          <Button
            onClick={prevPage}
            disabled={currentPage <= 1 || isFlipping || totalPages === 0}
            variant="outline"
            size="lg"
            className="bg-white/90 hover:bg-white border-stone-300 text-stone-700 shadow-md disabled:opacity-50"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          <div className="flex items-center gap-2 px-4 py-2 bg-white/90 rounded-lg border border-stone-300 shadow-sm">
            <span className="text-sm text-stone-600 font-medium">
              Page {currentPage} of {totalPages || '...'}
            </span>
          </div>

          <Button
            onClick={nextPage}
            disabled={currentPage >= totalPages || isFlipping || totalPages === 0}
            variant="outline"
            size="lg"
            className="bg-white/90 hover:bg-white border-stone-300 text-stone-700 shadow-md disabled:opacity-50"
          >
            Next
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}

// Individual page component with notebook styling
function BookPageComponent({
  page,
  pageNumber,
}: {
  page: BookPage;
  pageNumber: number;
}) {
  if (page.type === "image") {
    return (
      <div className="page notebook-page bg-white border-r border-stone-200">
        <div className="h-full p-6 flex flex-col relative">
          {/* Notebook paper texture */}
          <div className="absolute inset-0 opacity-5">
            <div className="w-full h-full bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:20px_20px]"></div>
          </div>

          {/* Red margin line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-red-300 opacity-30"></div>

          {/* Three-hole punch */}
          <div className="absolute left-2 top-16 space-y-16">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="w-3 h-3 bg-stone-100 rounded-full border border-stone-300"
              ></div>
            ))}
          </div>

          <div className="relative z-10 flex-1 flex flex-col ml-6">
            {page.title && (
              <h3 className="text-lg font-medium text-stone-800 font-handwriting mb-4 text-center underline">
                {page.title}
              </h3>
            )}

            <div className="flex-1 relative rounded-lg overflow-hidden shadow-inner bg-stone-50 border border-stone-200">
              <Image
                src={page.content || "/placeholder.svg"}
                alt={page.title || `Page ${pageNumber}`}
                fill
                className="object-contain p-4"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {page.caption && (
              <div className="mt-4 text-center">
                <p className="text-sm text-stone-600 font-handwriting italic">
                  {page.caption}
                </p>
              </div>
            )}
          </div>

          {/* Page number */}
          <div className="absolute bottom-4 right-4 text-xs text-stone-400">
            {pageNumber}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page notebook-page bg-white border-r border-stone-200">
      <div className="h-full p-8 flex flex-col justify-center relative">
        {/* Notebook lines */}
        <div className="absolute inset-0 pointer-events-none opacity-15">
          {Array.from({ length: 24 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-full h-px bg-blue-300"
              style={{ top: `${60 + i * 22}px` }}
            />
          ))}
        </div>

        {/* Red margin line */}
        <div className="absolute left-12 top-0 bottom-0 w-px bg-red-300 opacity-30"></div>

        {/* Three-hole punch */}
        <div className="absolute left-4 top-16 space-y-16">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="w-3 h-3 bg-stone-100 rounded-full border border-stone-300"
            ></div>
          ))}
        </div>

        <div className="relative z-10 space-y-6 ml-8">
          {page.title && (
            <h2 className="text-2xl md:text-3xl font-medium text-center text-stone-800 font-handwriting mb-8 underline">
              {page.title}
            </h2>
          )}

          <div className="prose prose-stone max-w-none">
            <div className="text-lg md:text-xl leading-relaxed text-stone-700 font-handwriting whitespace-pre-line">
              {page.textContent}
            </div>
          </div>

          {page.date && (
            <div className="text-right mt-8 pt-4">
              <p className="text-sm text-stone-500 font-handwriting italic">
                {page.date}
              </p>
            </div>
          )}
        </div>

        {/* Page number */}
        <div className="absolute bottom-4 right-6 text-xs text-stone-400">
          {pageNumber}
        </div>
      </div>
    </div>
  );
}
