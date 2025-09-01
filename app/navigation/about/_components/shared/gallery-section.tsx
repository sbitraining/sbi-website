"use client";

import React, { useEffect, useState } from "react";

interface ImageType {
  id: number;
  image: string;
}

interface Highlight {
  title: string;
  description: string;
  images: ImageType[];
}

interface FloatingDot {
  id: number;
  x: number;
  y: number;
  size: number;
  animationDelay: number;
  duration: number;
}

const ExperiencedDoctorsSection: React.FC = () => {
  const [dots, setDots] = useState<FloatingDot[]>([]);
  const [highlight, setHighlight] = useState<Highlight | null>(null);

  // Fetch highlight data
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/highlights/`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) setHighlight(data[0]);
      })
      .catch((err) => console.error("Failed to fetch highlights:", err));
  }, []);

  // Generate floating dots
  useEffect(() => {
    const generateDots = (): FloatingDot[] => {
      const dotCount = 30;
      const newDots: FloatingDot[] = [];

      for (let i = 0; i < dotCount; i++) {
        newDots.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 60,
          size: Math.random() * 6 + 3,
          animationDelay: Math.random() * 8,
          duration: Math.random() * 6 + 8,
        });
      }

      return newDots;
    };

    setDots(generateDots());
  }, []);

  return (
    <section className="relative w-full bg-white">
      {/* Top curved background */}
      <div className="relative w-full h-[400px] sm:h-[450px] md:h-[500px] bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <img
            src={highlight?.images?.[0]?.image}
            alt="Medical background"
            className="w-full h-full object-cover"
          />
        </div>

        {dots.map((dot) => (
          <div
            key={dot.id}
            className="absolute rounded-full bg-white opacity-25 animate-pulse"
            style={{
              left: `${dot.x}%`,
              top: `${dot.y}%`,
              width: `${dot.size}px`,
              height: `${dot.size}px`,
              animationDelay: `${dot.animationDelay}s`,
              animationDuration: `${dot.duration}s`,
            }}
          />
        ))}

        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 sm:px-6 lg:px-8 pt-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight text-center max-w-4xl">
            {highlight?.title}
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed text-center">
            {highlight?.description}
          </p>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-24 sm:h-32">
          <svg
            className="absolute top-0 w-full h-full"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0 C300,120 900,120 1200,0 L1200,120 L0,120 Z"
              fill="white"
            />
          </svg>
        </div>

        {/* Extra floating decorations */}
        <div className="absolute top-20 left-10 w-16 h-16 border-2 border-white/20 rounded-full animate-spin-slow hidden lg:block" />
        <div className="absolute top-32 right-16 w-12 h-12 border-2 border-white/20 rounded-full animate-bounce hidden lg:block" />
        <div className="absolute top-24 right-32 w-1 h-16 bg-white/15 rotate-45 hidden lg:block" />
        <div className="absolute top-40 left-32 w-1 h-12 bg-white/15 -rotate-45 hidden lg:block" />
      </div>

      {/* Gallery Section */}
      <div className="relative -mt-16 sm:-mt-20 md:-mt-24 px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20 lg:pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {highlight?.images?.slice(1, 6).map((img, idx) => (
              <div
                key={img.id}
                className={`relative group cursor-pointer ${
                  idx === 1 ? "col-span-1 md:col-span-1 row-span-2" : ""
                } overflow-hidden`}
              >
                <div className="bg-white rounded-2xl p-2 shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-3xl h-full overflow-hidden">
                  <div className="relative overflow-hidden rounded-xl h-full">
                    <img
                      src={img.image}
                      alt={`Highlight image ${idx + 1}`}
                      className={`w-full object-cover transition-transform duration-500 group-hover:scale-125 ${
                        idx === 1
                          ? "h-full min-h-[320px] sm:min-h-[400px] lg:min-h-[480px] xl:min-h-[540px]"
                          : "h-40 sm:h-48 lg:h-56 xl:h-64"
                      }`}
                    />
                    <div className="absolute inset-0 bg-[#e7a98b]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="w-12 h-12 border-2 border-white rounded-full flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default ExperiencedDoctorsSection;
