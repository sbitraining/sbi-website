"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

const sharedBackText =
  "Thats Incredible! We are moved more than 4280 homes to another destination";

const experience = [
  { target: 47, suffix: "+", desc: "Years Of Experience" },
  { target: 25000, suffix: "", desc: "Happy Families" },
  { target: 69, suffix: "+", desc: "Awards Winning" },
  { target: 128, suffix: "+", desc: "Expert Nurses" },
];

interface Slide {
  id: number;
  image: string;
  caption?: string;
}

interface CarouselData {
  background_image: string;
  slides: Slide[];
}

const Banner = () => {
  const [carousel, setCarousel] = useState<CarouselData | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [counters, setCounters] = useState(experience.map(() => 0));
  const [flipped, setFlipped] = useState(experience.map(() => false));
  const [isVisible, setIsVisible] = useState(false);

  //Fetch carousel data
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/carousel/1/`)
      .then((res) => setCarousel(res.data))
      .catch((err) => console.error("Carousel fetch error:", err));
  }, []);

  // Auto slide change
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        carousel?.slides ? (prev + 1) % carousel.slides.length : 0
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [carousel]);

  // Counter animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const section = document.getElementById("banner-section");
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const intervalIds = experience.map((exp, idx) =>
      setInterval(() => {
        setCounters((prev) => {
          const updated = [...prev];
          if (updated[idx] < exp.target) {
            const increment =
              exp.target > 1000 ? Math.ceil(exp.target / 80) : 1;
            updated[idx] = Math.min(updated[idx] + increment, exp.target);
          }
          return updated;
        });
      }, 50)
    );

    return () => intervalIds.forEach(clearInterval);
  }, [isVisible]);

  const handleCardHoverEnter = (index: number) => {
    setFlipped((prev) => {
      const updated = [...prev];
      updated[index] = true;
      return updated;
    });
  };

  const handleCardHoverLeave = (index: number) => {
    setFlipped((prev) => {
      const updated = [...prev];
      updated[index] = false;
      return updated;
    });
  };

  function formatNumber(num: number): string {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(0) + "k";
    return num.toString();
  }

  return (
    <section
      id="banner-section"
      className="relative w-full h-[700px] overflow-visible mt-20"
    >
      {/* Background image */}
      <img
        src={carousel?.background_image || "/assets/images/doctors.jpg"}
        alt="Banner background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      <div className="absolute inset-0 bg-[#429dae]/70 z-10" />

      {/*Carousel image slide */}
      <div className="absolute top-[-120px] left-1/2 transform -translate-x-1/2 w-[380px] sm:w-[440px] h-[280px] sm:h-[320px] rounded-xl overflow-hidden shadow-2xl border-4 border-white z-20 bg-white">
        <img
          src={
            carousel?.slides?.[currentSlide]?.image || "/assets/images/girl.jpg"
          }
          alt={`Slide ${currentSlide + 1}`}
          className="w-full h-full object-cover transition-opacity duration-500"
        />

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {carousel?.slides?.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-white scale-125"
                  : "bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/*Statistics cards (unchanged) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 px-4 sm:px-8 text-center max-w-7xl mx-auto relative z-10 pt-52 sm:pt-48 md:pt-56">
        {experience.map((item, index) => (
          <div
            key={index}
            className="group cursor-pointer"
            onMouseEnter={() => handleCardHoverEnter(index)}
            onMouseLeave={() => handleCardHoverLeave(index)}
            style={{ perspective: "1000px" }}
          >
            <div
              className={`relative w-full h-44 sm:h-48 transition-transform duration-700 ${
                flipped[index]
                  ? "[transform:rotateY(180deg)]"
                  : "[transform:rotateY(0deg)]"
              }`}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="absolute inset-0 bg-white rounded-lg shadow-lg hover:shadow-xl p-4 sm:p-6 flex flex-col justify-center items-center transition-shadow duration-300 [backface-visibility:hidden]">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#e7a98b] mb-2">
                  {formatNumber(counters[index])}
                  {counters[index] === item.target ? item.suffix : ""}
                </h2>
                <p className="text-sm sm:text-base lg:text-lg font-semibold text-gray-800 text-center leading-tight">
                  {item.desc}
                </p>
              </div>

              <div className="absolute inset-0 bg-[#e7a98b] rounded-lg shadow-lg p-4 sm:p-6 text-white text-sm sm:text-base lg:text-lg font-semibold flex items-center justify-center text-center [backface-visibility:hidden] [transform:rotateY(180deg)]">
                <p className="leading-relaxed">{sharedBackText}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/20 to-transparent z-5"></div>
    </section>
  );
};

export default Banner;
