"use client";
import React from "react";
import { MapPin, Phone, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

const Footer: React.FC = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/navigations/contact");
    window.scrollTo({ top: 0, behavior: "smooth" }); // force scroll to top
  };
  return (
    <div className="w-full relative bg-white">
      {/* === CTA Section (Overlapping at Footer Border) === */}
      <div className="relative z-30 flex justify-center transform translate-y-12 md:translate-y-20">
        <div className="bg-[#e7a98b] rounded-2xl shadow-2xl overflow-hidden max-w-4xl w-full mx-4">
          <div className="flex flex-col md:flex-row items-center md:h-[160px]">
            {/* Left side - Image */}
            <div className="w-full md:w-2/5 h-40 md:h-full">
              <img
                src="/assets/images/ctacaretaker.jpeg"
                alt="Happy elderly couple"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right side - Content */}
            <div className="w-full md:w-3/5 p-6 flex flex-col justify-center md:h-full">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
                Need an expert nurse?
              </h2>
              <p className="text-gray-700 text-sm md:text-base mb-4">
                We provide exceptional, compassion care to your darlings.
              </p>

              {/* Contact Button */}
              <div className="flex justify-start">
                <button
                  onClick={handleClick}
                  className="bg-white text-gray-800 font-semibold px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 hover:bg-gray-50 text-sm"
                >
                  Contact Us
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* === FOOTER SECTION === */}
      <footer className="w-full relative">
        {/* === Background Image Section === */}
        <div className="relative w-full h-[400px] flex flex-col justify-center items-center overflow-hidden">
          {/* background image */}
          <img
            src="/assets/images/download.jpeg"
            alt="Background"
            className="absolute top-0 left-0 w-full h-full object-cover"
          />

          {/* Overlay with reduced opacity */}
          <div className="absolute top-0 left-0 w-full h-full bg-black/60"></div>

          {/* Center content */}
          <div className="relative z-10 flex flex-col items-center text-center text-white px-4">
            {/* logo */}
            <img
              src="/assets/images/sbilogo.png"
              alt="Logo"
              className="w-24 h-24 mb-4 rounded-full border-2 border-white"
            />
            <h1 className="text-3xl font-bold leading-snug mb-2">
              SKILL <span className="text-[#e7a98b]">BRIDGE INTERNATIONAL</span>{" "}
              SERVICES
            </h1>
            <p className="text-xl">
              We can lend a{" "}
              <span className="text-[#e7a98b] font-semibold">helping hand</span>
            </p>
          </div>
        </div>

        {/* === Bottom Dark Strip === */}
        <div className="bg-[#3d3028] text-white py-6 px-4">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-3">
              <MapPin className="w-6 h-6 text-[#e7a98b]" />
              <p>
                <span className="text-gray-300">Our Location:</span>{" "}
                <span className="font-bold">Basundhara, Kathmandu, Nepal</span>
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-6 h-6 text-[#e7a98b]" />
              <p>
                <span className="text-gray-300">Phone Number:</span>{" "}
                <span className="font-bold">9761058287, 9709196335</span>
              </p>
            </div>
          </div>
          <div className="text-center text-gray-400 text-sm mt-6">
            © Copyright 2025, All Rights Reserved – Nepworld Tech Pvt Ltd
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
