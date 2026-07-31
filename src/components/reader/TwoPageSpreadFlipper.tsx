import React, { useEffect, useRef, useState } from 'react';
import { PageFlip } from 'page-flip';
import * as pdfjsLib from 'pdfjs-dist';
import { Loader2, ChevronLeft, ChevronRight } from 'lucide-react';

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

interface TwoPageSpreadFlipperProps {
  pdfSource?: string | null;
  bookTitle: string;
  currentPage: number;
  onPageChange: (newPage: number) => void;
  zoomLevel: number;
  onZoomChange: (newZoom: number) => void;
}

export const TwoPageSpreadFlipper: React.FC<TwoPageSpreadFlipperProps> = ({
  pdfSource,
  bookTitle,
  currentPage,
  onPageChange,
  zoomLevel,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const bookElementRef = useRef<HTMLDivElement | null>(null);
  const pageFlipRef = useRef<PageFlip | null>(null);

  const [pageImages, setPageImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [totalPages, setTotalPages] = useState<number>(0);

  // Load PDF and render all pages into high-resolution Canvas Data URLs
  useEffect(() => {
    let isMounted = true;

    if (pdfSource) {
      setIsLoading(true);
      const loadingTask = pdfjsLib.getDocument(pdfSource);

      loadingTask.promise
        .then(async (doc) => {
          if (!isMounted) return;
          const numPages = doc.numPages;
          setTotalPages(numPages);

          const pageDataUrls: string[] = [];

          for (let pageNum = 1; pageNum <= numPages; pageNum++) {
            const page = await doc.getPage(pageNum);
            // Render at high resolution (scale 2.5) for crisp, large presentation
            const viewport = page.getViewport({ scale: 2.5 });
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');

            if (context) {
              canvas.height = viewport.height;
              canvas.width = viewport.width;
              await page.render({ canvasContext: context, viewport }).promise;
              pageDataUrls.push(canvas.toDataURL('image/png'));
            }
          }

          if (isMounted) {
            setPageImages(pageDataUrls);
            setIsLoading(false);
          }
        })
        .catch((err) => {
          console.error('Error rendering PDF pages:', err);
          if (isMounted) setIsLoading(false);
        });
    } else {
      setIsLoading(false);
      setTotalPages(6);
      setPageImages([
        'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1618663741645-9d1678d71680?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop',
      ]);
    }

    return () => {
      isMounted = false;
    };
  }, [pdfSource]);

  // Initialize StPageFlip engine when page images are ready
  useEffect(() => {
    if (!bookElementRef.current || pageImages.length === 0) return;

    if (pageFlipRef.current) {
      pageFlipRef.current.destroy();
    }

    // Set showCover: false so Page 1 ALWAYS renders on the LEFT page of the 2-page spread!
    const pageFlip = new PageFlip(bookElementRef.current, {
      width: 580, // Large single page width
      height: 780, // Large single page height
      size: 'stretch',
      minWidth: 400,
      maxWidth: 900,
      minHeight: 550,
      maxHeight: 1200,
      drawShadow: true,
      maxShadowOpacity: 0.5,
      showCover: false, // Page 1 is ALWAYS on the LEFT side!
      mobileScrollSupport: false,
      usePortrait: false, // Force 2-page spread side-by-side mode!
      startPage: currentPage > 0 ? currentPage - 1 : 0,
    });

    pageFlip.loadFromHTML(bookElementRef.current.querySelectorAll('.magazine-page'));
    pageFlipRef.current = pageFlip;

    pageFlip.on('flip', (e: any) => {
      onPageChange(e.data + 1);
    });

    return () => {
      if (pageFlipRef.current) {
        pageFlipRef.current.destroy();
        pageFlipRef.current = null;
      }
    };
  }, [pageImages]);

  const handleNextPage = () => {
    if (pageFlipRef.current) {
      pageFlipRef.current.flipNext('top');
    }
  };

  const handlePrevPage = () => {
    if (pageFlipRef.current) {
      pageFlipRef.current.flipPrev('top');
    }
  };

  // Determine container overflow and scaling
  const isZoomed = zoomLevel > 100;
  const zoomScale = zoomLevel / 100;

  return (
    <div
      ref={containerRef}
      className={`w-full h-[calc(100vh-4.5rem)] flex flex-col items-center justify-center relative select-none ${
        isZoomed ? 'overflow-auto cursor-grab' : 'overflow-hidden'
      }`}
    >
      {/* Loading Overlay */}
      {isLoading && (
        <div className="flex flex-col items-center gap-3 p-8 rounded-3xl bg-surface/90 border border-border/80 shadow-elevation backdrop-blur-md">
          <Loader2 className="w-8 h-8 text-accent animate-spin" />
          <span className="text-xs font-mono text-text-primary font-semibold">
            Rendering Large 2-Page Spread Magazine...
          </span>
        </div>
      )}

      {/* Large 2-Page Spread Corner Page Turn Canvas */}
      {!isLoading && (
        <div
          className="relative w-[94vw] h-[82vh] max-w-7xl flex items-center justify-center transition-transform duration-300 ease-out"
          style={{
            transform: `scale(${zoomScale})`,
            transformOrigin: 'center center',
          }}
        >
          {/* Navigation Corner Arrows */}
          <button
            onClick={handlePrevPage}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-40 p-3.5 rounded-full bg-black/60 backdrop-blur-md text-white hover:bg-accent transition-all shadow-lg hover:scale-110"
            title="Turn to Previous Page (Corner Turn)"
          >
            <ChevronLeft className="w-7 h-7" />
          </button>

          <button
            onClick={handleNextPage}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-40 p-3.5 rounded-full bg-black/60 backdrop-blur-md text-white hover:bg-accent transition-all shadow-lg hover:scale-110"
            title="Turn to Next Page (Corner Turn)"
          >
            <ChevronRight className="w-7 h-7" />
          </button>

          {/* StPageFlip Container: 2-Page Spread with Page 1 ALWAYS on LEFT */}
          <div
            ref={bookElementRef}
            className="magazine-book-spread w-full h-full flex shadow-[0_30px_70px_rgba(0,0,0,0.35)] rounded-2xl overflow-hidden"
          >
            {pageImages.map((imgSrc, idx) => (
              <div
                key={idx}
                className="magazine-page bg-[#FAF7F0] border-r border-[#E2DACD] overflow-hidden flex flex-col items-center justify-center relative shadow-inner"
              >
                {/* Book Spine Shading overlay */}
                <div className="absolute top-0 bottom-0 left-0 w-10 bg-gradient-to-r from-black/25 via-black/5 to-transparent pointer-events-none z-20" />
                <div className="absolute top-0 bottom-0 right-0 w-10 bg-gradient-to-l from-black/25 via-black/5 to-transparent pointer-events-none z-20" />

                <img
                  src={imgSrc}
                  alt={`${bookTitle} - Page ${idx + 1}`}
                  className="w-full h-full object-contain pointer-events-none select-none"
                />

                <div className="absolute bottom-3 right-4 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-white font-mono text-xs z-30 font-bold">
                  Page {idx + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
