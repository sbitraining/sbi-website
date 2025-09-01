"use client";

import React, { useEffect, useState } from "react";
import { Home, Users, Bell, Stethoscope } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Service } from "@/types/service-section";

const categoryMap = {
  home_care: {
    title: "Home Care",
    icon: Home,
    gradient: "from-amber-500 to-orange-500",
    bgColor: "bg-amber-50",
  },
  personal_care: {
    title: "Personal Care",
    icon: Users,
    gradient: "from-amber-500 to-orange-500",
    bgColor: "bg-amber-50",
  },
  reminders: {
    title: "Reminders",
    icon: Bell,
    gradient: "from-amber-500 to-orange-500",
    bgColor: "bg-amber-50",
  },
  medical_services: {
    title: "Medical Services",
    icon: Stethoscope,
    gradient: "from-amber-500 to-orange-500",
    bgColor: "bg-amber-50",
  },
};

const Services: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const router = useRouter();

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/services/`)
      .then((res) => setServices(res.data))
      .catch((err) => console.error("Failed to load services:", err));
  }, []);

  //Add path to navigate to different services
  const servicePaths: Record<string, string> = {
    home_care: "/navigation/services/homecare",
    personal_care: "/navigation/services/healthcare",
    reminders: "/navigation/services/residentalcare",
    medical_services: "/navigation/services/specialcare",
  };

  return (
    <section className="relative px-6 md:px-20 py-12 bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#e7a98b] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-[#e7a98b] rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-[#e7a98b] rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Our{" "}
            <span className="bg-[#e7a98b] bg-clip-text text-transparent">
              Services
            </span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Comprehensive care solutions designed to enhance quality of life and
            provide peace of mind
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 items-stretch">
          {services.map((service, index) => {
            const config = categoryMap[service.category];
            const Icon = config.icon;
            return (
              <div
                key={service.id}
                className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2 border border-gray-100 flex flex-col justify-between h-full"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div
                  className={`absolute inset-0 ${config.bgColor} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                ></div>
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <div className="relative mb-8">
                      <div className="absolute inset-0 w-20 h-20 mx-auto">
                        <div
                          className={`w-full h-full bg-gradient-to-r ${config.gradient} rounded-full opacity-20 animate-pulse`}
                        ></div>
                      </div>
                      <div
                        className={`relative w-20 h-20 flex items-center justify-center bg-[#e7a98b] ${config.gradient} rounded-full shadow-lg mx-auto group-hover:scale-110 transition-transform duration-300`}
                      >
                        <Icon size={32} className="text-white drop-shadow-sm" />
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full opacity-80 group-hover:animate-bounce"></div>
                        <div
                          className="absolute -bottom-1 -left-1 w-2 h-2 bg-white rounded-full opacity-60 group-hover:animate-bounce"
                          style={{ animationDelay: "0.5s" }}
                        ></div>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
                      {config.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed text-center mb-6">
                      {service.description}
                    </p>
                  </div>
                  <div className="flex justify-center">
                    {/* <-- Added onClick for navigation */}
                    <button
                      onClick={() =>
                        router.push(servicePaths[service.category])
                      }
                      className="relative px-6 py-2 bg-[#e7a98b] text-white text-sm font-semibold rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 overflow-hidden group/btn"
                    >
                      <span className="relative z-10">Read more</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover/btn:opacity-20 transform -skew-x-12 group-hover/btn:translate-x-full transition-all duration-700"></div>
                      <svg
                        className="inline-block ml-2 w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform duration-300"
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
                <div
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${config.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300 -z-10`}
                ></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
