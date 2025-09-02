import React from "react";
import { Phone } from "lucide-react";

interface ElderlyCareHeroProps {
  phoneNumber?: string;
  className?: string;
}

const Ctasection: React.FC<ElderlyCareHeroProps> = ({
  phoneNumber = "+977-9851403517",
  className = "",
}) => {
  const handleWhatsAppClick = () => {
    const cleanNumber = phoneNumber.replace(/\D/g, "");
    window.open(`https://wa.me/${cleanNumber}`, "_blank");
  };

  return (
    <section
      className={`bg-white py-8 px-5 flex items-center justify-center ${className}`}
    >
      <div className="text-center max-w-4xl mx-auto">
        {/* Care Icon */}
        <div className="mb-10">
          <svg
            className="w-20 h-20 text-[#e7a98b] mx-auto transition-transform duration-300 hover:scale-110"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2C10.9 2 10 2.9 10 4C10 5.1 10.9 6 12 6C13.1 6 14 5.1 14 4C14 2.9 13.1 2 12 2Z"
              fill="currentColor"
            />
            <path
              d="M8 8C6.9 8 6 8.9 6 10C6 11.1 6.9 12 8 12C9.1 12 10 11.1 10 10C10 8.9 9.1 8 8 8Z"
              fill="currentColor"
            />
            <path
              d="M16 8C14.9 8 14 8.9 14 10C14 11.1 14.9 12 16 12C17.1 12 18 11.1 18 10C18 8.9 17.1 8 16 8Z"
              fill="currentColor"
            />
            <path
              d="M12 14C10.3 14 8.9 15.4 8.9 17.1V22H15.1V17.1C15.1 15.4 13.7 14 12 14Z"
              fill="currentColor"
            />
            <path
              d="M4 16C2.9 16 2 16.9 2 18V22H6V18C6 16.9 5.1 16 4 16Z"
              fill="currentColor"
            />
            <path
              d="M20 16C18.9 16 18 16.9 18 18V22H22V18C22 16.9 21.1 16 20 16Z"
              fill="currentColor"
            />
          </svg>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-6xl font-light text-gray-800 mb-8 leading-tight">
          We are expert elderly care{" "}
          <span className="text-[#e7a98b] font-normal">in this town</span>
        </h1>

        {/* Description */}
        <p className="text-lg text-gray-600 mb-12 leading-relaxed max-w-lg mx-auto px-2">
          Our mission is to provide the best service to your family, care and
          match for you and your family.
        </p>

        {/* Call to Action Button */}
        <button
          onClick={handleWhatsAppClick}
          className="inline-flex items-center gap-3 bg-[#e7a98b] hover:bg-[#d0977a] text-white px-9 py-5 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-opacity-50"
          aria-label={`Call us at ${phoneNumber}`}
        >
          <Phone size={20} className="flex-shrink-0" />
          Chat on WhatsApp {phoneNumber}
        </button>
      </div>
    </section>
  );
};

export default Ctasection;
