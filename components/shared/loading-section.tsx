"use client";

import React, { useState } from "react";
import Image from "next/image";

interface SimpleLoadingProps {
  fullScreen?: boolean;
  className?: string;
  logoSrc?: string;
}

const SBILoading: React.FC<SimpleLoadingProps> = ({
  fullScreen = true,
  className = "",
  logoSrc = "/assets/images/sbilogo.png",
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      className={`flex flex-col justify-center items-center ${
        fullScreen
          ? "fixed top-0 left-0 w-screen h-screen z-50"
          : "w-full h-full"
      } backdrop-blur-md bg-[#e7a98b]/40 ${className}`}
    >
      {/*Circular Logo Container */}
      <div className="mb-8 relative w-32 h-32 md:w-40 md:h-40">
        {/* Rounded Frame with border */}
        <div className="absolute inset-0 rounded-full bg-white/10 border-4 border-white/20 z-0" />

        {/*Logo Image */}
        {!imageError && (
          <Image
            src={logoSrc}
            alt="Skill Bridge International"
            fill
            className="object-contain p-3 rounded-full z-10"
            priority
            onError={() => setImageError(true)}
          />
        )}

        {/*Fallback Text if Image Fails */}
        {imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/20 rounded-full backdrop-blur-sm z-20">
            <div className="text-white text-lg font-bold">SBI</div>
          </div>
        )}

        {/* Rotating Ring */}
        <div
          className="absolute inset-0 border-4 border-transparent border-t-white border-r-white rounded-full opacity-60"
          style={{ animation: "spin 2s linear infinite" }}
        />
      </div>

      {/* Dots Loader */}
      <div className="flex space-x-2 mb-8">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-3 h-3 bg-white rounded-full"
            style={{
              animation: `bounce 1.4s ease-in-out infinite`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>

      {/*Text Below Logo */}
      <div className="text-center">
        <div className="text-white text-sm md:text-base font-semibold tracking-wide mb-1">
          SKILL BRIDGE INTERNATIONAL
        </div>
        <div className="text-white text-xs opacity-80 tracking-wider">
          TRAINING CENTER
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes bounce {
          0%,
          80%,
          100% {
            transform: translateY(0);
            opacity: 0.5;
          }
          40% {
            transform: translateY(-10px);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default SBILoading;
