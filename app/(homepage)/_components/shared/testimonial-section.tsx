"use client";

import { Testimonial } from "@/types/testimonial";
import React, { useState, useEffect } from "react";
const TestimonialsSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    type RawTestimonial = {
      id: number;
      name: string;
      designation: string;
      image: string;
      description: string;
    };

    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/testimonials/`)
      .then((res) => res.json())
      .then((data: RawTestimonial[]) => {
        const mappedData: Testimonial[] = data.map((item) => ({
          id: item.id,
          name: item.name,
          role: item.designation,
          image: item.image,
          quote: item.description,
        }));
        setTestimonials(mappedData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching testimonials:", error);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (testimonials.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % testimonials.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [testimonials.length]);

  const goToSlide = (index: number): void => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  if (isLoading) {
    return (
      <section className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center items-center h-96">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-500 border-t-transparent"></div>
          </div>
        </div>
      </section>
    );
  }

  if (!testimonials.length) {
    return (
      <section className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-500 text-lg">
            No testimonials available at the moment.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-20 px-4 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 mb-6">
            <div className="w-2 h-2 bg-[#e7a98b] rounded-full animate-pulse"></div>
            <span className="text-[#e7a98b] font-medium text-sm tracking-wide uppercase">
              Testimonials
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            What Our <span className="text-[#e7a98b]">Amazing {""}</span>
            <br className="hidden sm:block" />
            Clients Say
          </h2>

          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Real stories from real people who have experienced exceptional care
            and service
          </p>
        </div>

        {/* Main Testimonial Card */}
        <div className="relative">
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white/90 backdrop-blur-sm hover:bg-white shadow-xl rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group md:flex"
          >
            <svg
              className="w-5 h-5 text-gray-700 group-hover:text-indigo-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white/90 backdrop-blur-sm hover:bg-white shadow-xl rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group md:flex"
          >
            <svg
              className="w-5 h-5 text-gray-700 group-hover:text-indigo-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <div className="relative">
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden ring-4 ring-white/50 shadow-xl bg-gradient-to-br from-indigo-100 to-purple-100 relative">
                      <img
                        src={
                          testimonials[currentSlide].image.startsWith("http")
                            ? testimonials[currentSlide].image
                            : `${process.env.NEXT_PUBLIC_API_BASE_URL}${testimonials[currentSlide].image}`
                        }
                        alt={testimonials[currentSlide].name}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (target.src.includes("127.0.0.1")) {
                            target.src = testimonials[currentSlide].image;
                          } else {
                            target.style.display = "none";
                            const fallbackDiv =
                              target.nextElementSibling as HTMLDivElement;
                            if (fallbackDiv) fallbackDiv.style.display = "flex";
                          }
                        }}
                      />
                      <div
                        className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl md:text-2xl"
                        style={{ display: "none" }}
                      >
                        {testimonials[currentSlide].name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="flex-1 text-center md:text-left">
                  <div className="mb-6">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                      {testimonials[currentSlide].name}
                    </h3>
                    <p className="text-[#e7a98b] font-semibold text-lg">
                      {testimonials[currentSlide].role}
                    </p>
                  </div>
                  <blockquote className="text-gray-700 text-lg md:text-xl leading-relaxed italic">
                    &quot;{testimonials[currentSlide].quote}&quot;
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center items-center gap-3 mt-12">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentSlide
                  ? "w-12 h-3 bg-[#e7a98b] shadow-lg"
                  : "w-3 h-3 bg-gray-300 hover:bg-gray-400 hover:scale-125"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Mobile Nav */}
        <div className="flex justify-center gap-4 mt-8 md:hidden">
          <button
            onClick={prevSlide}
            className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <svg
              className="w-5 h-5 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <svg
              className="w-5 h-5 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
