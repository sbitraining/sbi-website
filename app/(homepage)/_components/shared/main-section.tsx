"use client";

import React, { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import { useRouter } from "next/navigation";
import { Slide } from "@/types/main-section";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.3,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const MainImage = () => {
  const [slide, setSlide] = useState<Slide | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/main-images/`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) {
          setSlide(data[0]);
        }
      })
      .catch((err) => console.error("❌ Error fetching slide:", err));
  }, []);

  if (!slide)
    return <div className="text-white text-center p-20">Loading...</div>;

  return (
    <section className="relative w-full h-screen overflow-hidden -mt-[1px]">
      {/* Background Image */}
      <img
        src={slide?.image ?? ""}
        alt={slide?.title ?? "Main Image"}
        className="absolute inset-0 w-full h-full object-cover"
        crossOrigin="anonymous"
        onError={(e) =>
          console.error("Image failed to load:", e.currentTarget.src)
        }
      />

      {/* Left side black blur overlay */}
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-black/40 to-transparent z-10"></div>

      {/* Right side black blur overlay */}
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-black/40 to-transparent z-10"></div>

      {/* Slide Content */}
      <div className="relative z-20 flex items-center h-full px-6 md:px-24 justify-start">
        <div className="space-y-6 max-w-3xl mt-16 text-left">
          {/* Subtitle */}
          {slide.subtitle && (
            <motion.h2
              className="text-xl md:text-2xl font-light text-white"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1}
            >
              {slide.subtitle}
            </motion.h2>
          )}

          {/* Title */}
          {slide.title && (
            <motion.h1
              className="text-3xl md:text-6xl font-extrabold text-white"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={2}
            >
              {slide.title.split(" ").map((word, i) =>
                word.toLowerCase() === "home" ? (
                  <span key={i} className=" px-2 rounded  text-black">
                    {word}
                  </span>
                ) : (
                  <span key={i}> {word} </span>
                )
              )}
            </motion.h1>
          )}

          {/* Description */}
          {slide.description && (
            <motion.p
              className="text-lg md:text-xl font-light text-white"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={3}
            >
              {slide.description}
            </motion.p>
          )}

          {/* Buttons */}
          {slide.buttons !== false && (
            <motion.div
              className="flex gap-4 pt-4"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={4}
            >
              <button
                onClick={() => router.push("/navigation/services")}
                className="bg-[#e7a98b] text-black font-semibold px-6 py-2 rounded-md hover:opacity-90 transition"
              >
                Our Services
              </button>
              <button
                onClick={() => router.push("/navigation/about")}
                className="bg-white text-black border border-gray-300 font-semibold px-6 py-2 rounded-md hover:bg-black hover:text-white transition"
              >
                About Us
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MainImage;
