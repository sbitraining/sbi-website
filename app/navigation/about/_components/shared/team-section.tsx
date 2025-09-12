import React, { useRef, useEffect, useState } from "react";
import { Mail, Phone, Linkedin, Facebook, Twitter } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";

interface MemberType {
  id: number;
  name: string;
  position: string;
  image: string;
  description: string;
  email: string;
  phone: string;
  linkedin: string;
  facebook: string;
  twitter: string;
}

const OurTeam = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [teamMembers, setTeamMembers] = useState<MemberType[]>([]);

  const handleSuccess = () => {
    router.push("/navigation/gallery");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const handleWheel = (e: WheelEvent) => {
      // Only handle horizontal scrolling on desktop
      if (window.innerWidth >= 1024) {
        e.preventDefault();
        scrollContainer.scrollLeft += e.deltaY;
      }
    };

    scrollContainer.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      scrollContainer.removeEventListener("wheel", handleWheel);
    };
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/team-members/`)
      .then((res) => setTeamMembers(res.data))
      .catch((err) => console.error("Failed to fetch team members", err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with CTA */}
      <div className="bg-[#e7a98b] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Have you already met our team?
          </h2>
          <p className="text-white/90 text-lg mb-8">
            We’re guided by passionate advisors, dedicated trainers, and a
            committed team — all working together to deliver care with heart.
          </p>
          <button
            onClick={handleSuccess}
            className="bg-white text-[#e7a98b] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            View our Achievement
          </button>
        </div>
      </div>

      {/* Team Section*/}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Manual Scroll for All Devices */}
          <div>
            <div
              className="flex overflow-x-auto scrollbar-hide space-x-6 pb-4"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group flex-shrink-0 w-80 lg:w-96"
                >
                  {/* Image Section */}
                  <div className="relative overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  {/* Content Section */}
                  <div className="p-4 lg:p-6">
                    {/* Name and Position */}
                    <div className="text-center mb-3 lg:mb-4">
                      <h3 className="text-lg lg:text-xl font-bold text-gray-800 mb-1 lg:mb-2">
                        {member.name}
                      </h3>
                      <p className="text-[#e7a98b] font-semibold text-base lg:text-lg">
                        {member.position}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 text-xs lg:text-sm leading-relaxed mb-4 lg:mb-6 line-clamp-4 lg:line-clamp-none">
                      {member.description}
                    </p>

                    {/* Contact Info */}
                    <div className="space-y-1 lg:space-y-2 mb-3 lg:mb-4">
                      <div className="flex items-center text-xs lg:text-sm text-gray-600">
                        <Mail className="w-3 lg:w-4 h-3 lg:h-4 text-[#e7a98b] mr-2" />
                        <a
                          href={`mailto:${member.email}`}
                          className="hover:text-[#e7a98b] transition-colors truncate lg:truncate-none"
                        >
                          {member.email}
                        </a>
                      </div>
                      <div className="flex items-center text-xs lg:text-sm text-gray-600">
                        <Phone className="w-3 lg:w-4 h-3 lg:h-4 text-[#e7a98b] mr-2" />
                        <a
                          href={`tel:${member.phone}`}
                          className="hover:text-[#e7a98b] transition-colors"
                        >
                          {member.phone}
                        </a>
                      </div>
                    </div>

                    {/* Social Links */}
                    <div className="flex justify-center space-x-3 lg:space-x-4 pt-3 lg:pt-4 border-t border-gray-100">
                      <a
                        href={member.linkedin}
                        className="p-1.5 lg:p-2 bg-gray-100 rounded-full hover:bg-[#e7a98b] hover:text-white transition-colors"
                        aria-label="LinkedIn"
                      >
                        <Linkedin className="w-3 lg:w-4 h-3 lg:h-4 text-black" />
                      </a>
                      <a
                        href={member.facebook}
                        className="p-1.5 lg:p-2 bg-gray-100 rounded-full hover:bg-[#e7a98b] hover:text-white transition-colors"
                        aria-label="Facebook"
                      >
                        <Facebook className="w-3 lg:w-4 h-3 lg:h-4 text-black" />
                      </a>
                      <a
                        href={member.twitter}
                        className="p-1.5 lg:p-2 bg-gray-100 rounded-full hover:bg-[#e7a98b] hover:text-white transition-colors"
                        aria-label="Twitter"
                      >
                        <Twitter className="w-3 lg:w-4 h-3 lg:h-4 text-black" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Scroll Indicator */}
            <div className="flex justify-center mt-4">
              <div className="flex space-x-2">
                {teamMembers.slice(0, 4).map((_, index) => (
                  <div
                    key={index}
                    className="w-2 h-2 rounded-full bg-[#e7a98b] opacity-30"
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurTeam;
