"use client";

import React, { useState, useEffect } from "react";
import { Play, X } from "lucide-react";
import axios from "axios";
import { Stat, VideoSection } from "@/types/stats-section";

const StatsSection: React.FC = () => {
  const [animatedStats, setAnimatedStats] = useState<Record<number, number>>(
    {}
  );
  const [videoSection, setVideoSection] = useState<VideoSection | null>(null);
  const [showVideo, setShowVideo] = useState(false);

  const stats: Stat[] = [
    { number: "5+", label: "Years of Experience" },
    { number: "1k", label: "Happy Families" },
    { number: "50+", label: "Expert Nurses" },
    { number: "5+", label: "Awards Winnings" },
    { number: "300+", label: "Happy Seniors" },
  ];

  const getNumericValue = (numberString: string): number => {
    const numStr = numberString.replace(/[^0-9]/g, "");
    return parseInt(numStr, 10) || 0;
  };

  useEffect(() => {
    // Animate Stats
    const animateNumbers = () => {
      stats.forEach((stat, index) => {
        const targetValue = getNumericValue(stat.number);
        let currentValue = 0;
        const increment = Math.ceil(targetValue / 50);
        const duration = 2000;
        const stepTime = duration / (targetValue / increment);

        const timer = setInterval(() => {
          currentValue += increment;
          if (currentValue >= targetValue) {
            currentValue = targetValue;
            clearInterval(timer);
          }
          setAnimatedStats((prev) => ({ ...prev, [index]: currentValue }));
        }, stepTime);
      });
    };

    const timeout = setTimeout(animateNumbers, 300);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    // Fetch video + thumbnail
    axios
      .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/video-sections/`)
      .then((res) => {
        if (res.data.length > 0) {
          setVideoSection(res.data[0]);
        }
      })
      .catch((err) => console.error("Failed to load video section:", err));
  }, []);

  const formatStatNumber = (stat: Stat, index: number): string => {
    const animatedValue = animatedStats[index];
    if (animatedValue === undefined) return "0";

    const suffix = stat.number.includes("+")
      ? "+"
      : stat.number.includes("k")
      ? "k"
      : "";

    return `${animatedValue}${suffix}`;
  };

  return (
    <section
      className="relative bg-[#2191a5] text-white pt-20 pb-20"
      style={{ overflow: "visible" }}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20 z-0"
        style={{ backgroundImage: "url('/assets/images/statback.jpg')" }}
      />

      {/* Curved top */}
      <div className="absolute top-0 w-full overflow-hidden leading-[0]">
        <svg
          className="relative block w-full h-16"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
        >
          <path
            d="M0,0 C600,120 600,0 1200,120 L1200,0 L0,0 Z"
            fill="#ffffff"
          />
        </svg>
      </div>

      {/* Video Preview */}
      <div className="absolute top-[-90px] left-1/2 transform -translate-x-1/2 z-10 md:z-50 px-4 w-full flex justify-center">
        <div className="relative w-[320px] md:w-[480px] lg:w-[560px] shadow-2xl rounded-xl overflow-hidden transform hover:scale-105 transition-all duration-500">
          <div className="relative aspect-video bg-gradient-to-br from-orange-200 to-orange-300">
            <img
              src={videoSection?.thumbnail || "/assets/images/best.jpg"}
              alt="Video Thumbnail"
              className="w-full h-auto object-contain"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  "/assets/images/best.jpg";
              }}
            />

            {/* <div className="absolute inset-0 flex flex-col items-center justify-center hover:bg-opacity-30 transition-all duration-300"> */}

            {/* <button
                className="bg-[#e7a98b] hover:bg-[#e7a98b] p-6 rounded-full text-white shadow-2xl hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-offset-2 focus:ring-offset-gray-800 mb-4"
                aria-label="Play healthcare video"
                onClick={() => setShowVideo(true)}
              >
                <Play size={32} className="ml-1" />
              </button> */}

            {/* <div className="bg-black bg-opacity-70 px-6 py-2 rounded-full backdrop-blur-sm">
                <span className="text-white text-sm md:text-base font-medium">
                  Watch Our Video — How we care?
                </span>
              </div> */}
            {/* </div> */}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 px-8 text-center max-w-7xl mx-auto relative z-10 pt-48 md:pt-56">
        {stats.map((stat, index) => (
          <div key={index} className="group">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#e7a98b] transition-all duration-300 group-hover:scale-110 group-hover:text-[#e7a98b]">
              {formatStatNumber(stat, index)}
            </h2>
            <p className="text-sm md:text-base text-gray-300 mt-3 transition-colors duration-300 group-hover:text-white font-medium">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Heart Icon */}
      <div className="flex justify-center mt-16 relative z-10">
        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-full p-6 border border-white border-opacity-20">
          <svg
            className="w-10 h-10 text-[#e7a98b]"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      </div>

      {/* Curved bottom */}
      <div className="absolute bottom-0 w-full overflow-hidden leading-[0] rotate-180">
        <svg
          className="relative block w-full h-16"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
        >
          <path
            d="M0,0 C600,120 600,0 1200,120 L1200,0 L0,0 Z"
            fill="#f8f9fa"
          />
        </svg>
      </div>
      {/* Modal Video Player with Blur Background */}

      {/*
      {showVideo && videoSection?.video && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center backdrop-blur-md bg-black/30">
          <div className="relative w-full max-w-4xl px-4">
            
            <button
              className="absolute -top-6 right-0 text-white hover:text-red-500 bg-[#e7a98b] bg-opacity-50 rounded-full p-2 shadow-lg"
              onClick={() => setShowVideo(false)}
              aria-label="Close video"
            >
              <X size={28} />
            </button>

           
            <video
              controls
              autoPlay
              className="w-full h-auto rounded-xl shadow-2xl border-4 border-white"
              src={videoSection.video}
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )} 
      */}
    </section>
  );
};

export default StatsSection;
