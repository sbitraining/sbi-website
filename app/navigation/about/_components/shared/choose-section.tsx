"use client";

import React, { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import Banner from "@/app/navigation/about/_components/shared/banner-section";
import axios from "axios";

const care = [
  "Residential Caring",
  "Caregiver Training",
  "Career Counseling",
  "Pre-Departure and Cultural Orientation",
  "Job Placement Assistance",
  "Test Preparation ",
  "Certification",
  "Corporate and Customized Training",
];

const sliderData = [
  { title: "Home Care", percent: 92 },
  { title: "Health Care", percent: 96 },
  { title: "Residential Care", percent: 91 },
  { title: "Intensive Care", percent: 97 },
];

interface AboutData {
  title: string;
  description: string;
  image: string;
}

const Choosesection = () => {
  const [about, setAbout] = useState<AboutData | null>(null);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/about/`)
      .then((res) => {
        if (res.data.length > 0) {
          setAbout(res.data[0]);
        }
      })
      .catch((err) => console.error("Error fetching about data:", err));
  }, []);

  return (
    <>
      <section className="px-4 sm:px-6 md:px-20 py-14 sm:py-20 bg-white flex flex-col lg:flex-row items-start gap-10">
        {/* Image */}
        <div className="relative w-full lg:w-1/2 order-1 lg:order-none">
          <img
            src={about?.image}
            alt="Elderly Care"
            className="rounded-lg object-cover w-full h-auto max-h-[400px] sm:max-h-full"
          />
          <div className="absolute -bottom-8 left-4 sm:left-6 bg-[#e7a98b] text-white p-6 sm:p-12 shadow-lg text-center w-44 sm:w-56">
            <h4 className="text-3xl sm:text-4xl font-extrabold">5+</h4>
            <p className="text-xs sm:text-sm font-medium mt-1">
              Years of Experience
            </p>
          </div>
        </div>

        {/* Text Content */}
        <div className="w-full lg:w-1/2">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-black mb-4">
            {about?.title}
          </h2>

          <p className="text-gray-700 leading-relaxed mb-8 sm:mb-10 text-base sm:text-xl">
            {about?.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 sm:gap-y-6 gap-x-6 sm:gap-x-10">
            {care.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 sm:gap-4">
                <div className="bg-[#e7a98b] p-2 rounded-md">
                  <Heart size={18} className="text-white" />
                </div>
                <p className="text-gray-800 font-medium text-base sm:text-xl">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Banner />
    </>
  );
};

export default Choosesection;
