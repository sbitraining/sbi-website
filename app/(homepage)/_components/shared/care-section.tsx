"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { ExpertiseSection, FlattenedCard } from "@/types/care-section";

const ExpertServicesSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [cards, setCards] = useState<FlattenedCard[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/expertise/`)
      .then((res) => {
        const data: ExpertiseSection[] = res.data || [];
        const flattened: FlattenedCard[] = data.flatMap(
          (section) =>
            section.images?.map((img) => ({
              id: img.id,
              image: img.image,
              title: section.title,
              description: section.description,
            })) || []
        );

        setCards(flattened);
      })
      .catch((err) => {
        console.error("Error fetching expertise data:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        cards.length > 0 ? (prev + 1) % cards.length : 0
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [cards.length]);

  const goToSlide = (index: number): void => {
    setCurrentSlide(index);
  };

  const getVisibleItems = (): FlattenedCard[] => {
    const visibleCount = 3;
    const items: FlattenedCard[] = [];

    for (let i = 0; i < visibleCount; i++) {
      const index = (currentSlide + i) % cards.length;
      const item = cards[index];
      if (item) items.push(item);
    }

    return items;
  };

  if (loading || cards.length === 0) {
    return null;
  }

  return (
    <section className="bg-gray-50 py-16 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            We will do, what we are{" "}
            <span className="text-[#e7a98b]">expert in</span>
          </h2>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
            Everything you need to support you in family caregiver,
            <br />
            We can help you today.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="flex justify-center items-center gap-16 md:gap-24">
            {getVisibleItems().map((item, index) => (
              <div
                key={`${item.id}-${currentSlide}`}
                className={`relative transition-all duration-500 ease-in-out group cursor-pointer ${
                  index === 1
                    ? "transform scale-125 z-20"
                    : "transform scale-90 opacity-70 z-10"
                }`}
              >
                <div className="relative w-56 h-40 md:w-72 md:h-52 rounded-xl overflow-hidden shadow-2xl">
                  <img
                    src={item.image}
                    alt={item.title}
                    onError={(e) => {
                      e.currentTarget.src = "/assets/images/fallback.jpg";
                    }}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-[#e7a98b] opacity-0 group-hover:opacity-70 transition-opacity duration-300 flex flex-col justify-center items-center">
                    <h3 className="text-white font-bold text-xl md:text-2xl text-center mb-4">
                      {item.title}
                    </h3>

                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-[#e7a98b]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center mt-10 space-x-2">
          {cards.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-[#e7a98b] scale-125"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExpertServicesSection;
