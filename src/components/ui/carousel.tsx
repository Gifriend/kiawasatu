"use client";

import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const Carousel = ({ images, alt }: { images: string[], alt: string }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="relative w-full overflow-hidden rounded-lg">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {images.map((url, index) => (
            <div className="relative flex-none w-full h-64 md:h-96" key={index}>
              <img
                src={url}
                alt={`${alt} - Foto ${index + 1}`}
                className="w-full h-full object-contain bg-gray-900" // object-contain & bg gelap
              />
            </div>
          ))}
        </div>
      </div>

      <button
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition"
        onClick={scrollPrev}
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition"
        onClick={scrollNext}
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};