import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as pdfjsLib from 'pdfjs-dist';
import { ChevronLeft, ChevronRight, Loader2, BookOpen, Layers } from 'lucide-react';

// Set pdfjs worker source to cdnjs worker for seamless client-side PDF rendering
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

interface PdfPageFlipperProps {
  pdfSource: string; // Data URL or URL
  currentPage: number;
  onPageChange: (newPage: number) => void;
  title: string;
}

export const PdfPageFlipper: React.FC<PdfPageFlipperProps> = ({
  pdfSource,
  currentPage,
  onPageChange,
  title,
}) => {
  const [pdfDoc, setPdfDoc] = useState<pdfjsLib.PDFDocumentProxy | null>(null);
  const [numPages, setNumPages] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [pageDirection, setPageDirection] = useState<'next' | 'prev'>('next');
  const [canvasDataUrl, setCanvasDataUrl] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Load PDF Document
  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    const loadingTask = pdfjsLib.getDocument(pdfSource);
    loadingTask.promise
      .then((doc) => {
        if (!isMounted) return;
        setPdfDoc(doc);
        setNumPages(doc.numPages);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Error loading PDF document:', err);
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [pdfSource]);

  // Render Page onto Canvas whenever currentPage or pdfDoc changes
  useEffect(() => {
    if (!pdfDoc) return;

    const targetPage = Math.min(Math.max(1, currentPage), numPages);
    
    pdfDoc.getPage(targetPage).then((page) => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      if (!context) return;

      const viewport = page.getViewport({ scale: 1.5 });
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      };

      page.render(renderContext).promise.then(() => {
        setCanvasDataUrl(canvas.toDataURL('image/png'));
      });
    });
  }, [pdfDoc, currentPage, numPages]);

  const handleNext = () => {
    if (currentPage < numPages) {
      setPageDirection('next');
      onPageChange(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setPageDirection('prev');
      onPageChange(currentPage - 1);
    }
  };

  // 3D Page Flip Motion Variants
  const pageFlipVariants = {
    initial: (dir: 'next' | 'prev') => ({
      rotateY: dir === 'next' ? 45 : -45,
      opacity: 0.6,
      scale: 0.95,
    }),
    animate: {
      rotateY: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.45,
        ease: [0.25, 1, 0.5, 1],
      },
    },
    exit: (dir: 'next' | 'prev') => ({
      rotateY: dir === 'next' ? -90 : 90,
      opacity: 0.3,
      scale: 0.92,
      transition: {
        duration: 0.35,
        ease: [0.5, 0, 0.75, 0],
      },
    }),
  };

  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center p-4 select-none relative min-h-[75vh]">
      
      {/* Loading State */}
      {isLoading && (
        <div className="flex flex-col items-center gap-3 p-8 rounded-3xl bg-surface/80 border border-border/80 shadow-sm backdrop-blur-md">
          <Loader2 className="w-8 h-8 text-accent animate-spin" />
          <span className="text-xs font-mono text-text-primary font-semibold">
            Rendering Magazine Pages...
          </span>
        </div>
      )}

      {/* Real 3D Book Page Flip Canvas Container */}
      {!isLoading && (
        <div className="relative w-full max-w-4xl flex items-center justify-center perspective-1000">
          
          {/* Left Turn Click Hotspot */}
          <button
            onClick={handlePrev}
            disabled={currentPage <= 1}
            className={`absolute left-0 top-0 bottom-0 w-20 z-30 flex items-center justify-start pl-2 opacity-0 hover:opacity-100 transition-opacity ${
              currentPage <= 1 ? 'pointer-events-none' : 'cursor-pointer'
            }`}
            title="Turn to Previous Page"
          >
            <div className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform">
              <ChevronLeft className="w-6 h-6" />
            </div>
          </button>

          {/* Right Turn Click Hotspot */}
          <button
            onClick={handleNext}
            disabled={currentPage >= numPages}
            className={`absolute right-0 top-0 bottom-0 w-20 z-30 flex items-center justify-end pr-2 opacity-0 hover:opacity-100 transition-opacity ${
              currentPage >= numPages ? 'pointer-events-none' : 'cursor-pointer'
            }`}
            title="Turn to Next Page"
          >
            <div className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform">
              <ChevronRight className="w-6 h-6" />
            </div>
          </button>

          {/* 3D Paper Sheet Canvas Wrapper with Realistic Spine & Shadows */}
          <AnimatePresence custom={pageDirection} mode="wait">
            <motion.div
              key={currentPage}
              custom={pageDirection}
              variants={pageFlipVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="relative aspect-[1/1.414] w-full max-w-2xl rounded-2xl bg-[#FAF7F0] text-[#1C1917] border border-[#E2DACD] shadow-2xl overflow-hidden flex flex-col items-center justify-center shadow-[0_20px_50px_rgba(0,0,0,0.2)]"
              style={{
                transformStyle: 'preserve-3d',
                transformOrigin: pageDirection === 'next' ? 'left center' : 'right center',
              }}
            >
              {/* Spine Binding Shading */}
              <div className="absolute top-0 left-0 bottom-0 w-6 bg-gradient-to-r from-black/25 via-black/5 to-transparent pointer-events-none z-20" />
              
              {/* Paper Texture Overlay */}
              <div className="absolute inset-0 bg-paper-texture opacity-30 pointer-events-none z-10" />

              {/* Rendered PDF Page Image */}
              {canvasDataUrl ? (
                <img
                  src={canvasDataUrl}
                  alt={`${title} - Page ${currentPage}`}
                  className="w-full h-full object-contain pointer-events-none select-none"
                />
              ) : (
                <div className="flex flex-col items-center justify-center gap-3 p-8 text-center">
                  <BookOpen className="w-10 h-10 text-accent/50" />
                  <span className="text-sm font-display font-semibold text-text-primary">
                    Page {currentPage} of {numPages}
                  </span>
                </div>
              )}

              {/* Bottom Page Number Badge */}
              <div className="absolute bottom-3 right-4 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-[11px] font-mono text-white z-20 shadow-md">
                Page {currentPage} / {numPages}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};
