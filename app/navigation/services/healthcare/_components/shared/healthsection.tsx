"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";

interface ServiceImage {
  id: number;
  image: string;
}

interface OurService {
  id: number;
  service: string;
  features: string;
  images: ServiceImage[];
}

const Healthsection = () => {
  const router = useRouter();
  const [serviceData, setServiceData] = useState<OurService | null>(null);
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/services-category/`)
      .then((res) => res.json())
      .then((data: OurService[]) => {
        console.log("API response:", data);

        const caregiver = data.find(
          (item) =>
            item.service === "caregiver" ||
            item.service === "Caregiver Training Programs"
        );

        console.log("Caregiver Training Programs service found:", caregiver);
        setServiceData(caregiver || null);
      })
      .catch((error) =>
        console.error("Error fetching Caregiver Training Programs data:", error)
      );
  }, []);

  return (
    <div className="flex flex-col md:flex-row gap-8 px-6 py-10 bg-white">
      {/*  Image Grid */}
      <div className="grid grid-cols-2 gap-3 md:w-1/2">
        {serviceData &&
        Array.isArray(serviceData.images) &&
        serviceData.images.length > 0 ? (
          serviceData.images.map((img, index) => (
            <div
              key={index}
              className="relative w-full h-60 rounded-lg overflow-hidden shadow-md"
            >
              <img
                src={img.image}
                alt={`Healthcare ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))
        ) : (
          <p className="text-gray-500">No images available.</p>
        )}
      </div>

      {/*Text Content */}
      <div className="md:w-1/2 flex flex-col justify-center">
        <h2 className="text-4xl text-[#e7a98b] font-extrabold mb-4">
          Caregiver Training Programs
        </h2>
        <p className="mb-4 text-gray-700">
          Step into one of the most respected and in-demand professions
          worldwide. Caregiver training program prepares you to deliver
          compassionate care to the elderly, disabled, and those in need with
          international standards and cultural sensitivity.
        </p>

        <h3 className="text-xl font-semibold mb-2 text-black">Key Features:</h3>
        <ul className="list-disc pl-6 space-y-1 text-gray-600 mb-6">
          {serviceData?.features
            ?.split(/,\r?\n|\r?\n|,/)
            .map((feature, index) => {
              const cleaned = feature.trim();
              return cleaned ? <li key={index}>{cleaned}</li> : null;
            })}
        </ul>

        {/*Additional Services */}
        <div className="mt-6">
          <div className="grid grid-cols-2 gap-x-6 gap-y-2">
            {[
              "SPECIAL NEEDS CARE",
              "HEALTH CARE",
              "EXERCISE CARE",
              "CARE AT INSTITUTION",
            ].map((item, idx) => (
              <div key={idx} className="flex items-center text-gray-700">
                <Heart className="w-5 h-5 text-[#e7a98b] mr-2" />
                {item}
              </div>
            ))}
          </div>
        </div>

        {/*Navigation Buttons */}
        <div className="mt-6 flex flex-wrap gap-4">
          <button
            onClick={() => router.push("/navigation/services/homecare")}
            className="px-4 py-2 bg-[#e7a98b] text-white rounded-md"
          >
            Language Training Programs
          </button>
          <button
            onClick={() => router.push("/navigation/services/residentialcare")}
            className="px-4 py-2 bg-[#e7a98b] text-white rounded-md"
          >
            Career Counseling and Guidance
          </button>
          <button
            onClick={() => router.push("/navigation/services/specialcare")}
            className="px-4 py-2 bg-[#e7a98b] text-white rounded-md"
          >
            Job Placement Assistance
          </button>
        </div>

        <div className="mt-6">
          <button
            onClick={() => router.push("/navigation/contact")}
            className="px-6 py-3 bg-black hover:bg-[#e7a98b] text-white rounded-md transition"
          >
            Make an Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Healthsection;
