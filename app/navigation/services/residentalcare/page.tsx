"use client";

import React, { useEffect, useState } from "react";
import Residentalsection from "./_components/shared/residentalsection";
import Breadcrumb from "@/components/ui/breadcrumb-section";
import SBILoading from "@/components/shared/loading-section";

const Residentalcare = () => {
  const [loading, setLoading] = useState(true);

  const breadcrumbItems: { label: string; url?: string }[] = [
    { label: "Career Counseling and Guidance" },
  ];

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("residentalPageLoaded");

    if (hasVisited) {
      setLoading(false);
    } else {
      const loadData = async () => {
        await new Promise((resolve) => setTimeout(resolve, 1200)); // Optional delay
        sessionStorage.setItem("residentalPageLoaded", "true");
        setLoading(false);
      };

      loadData();
    }
  }, []);

  if (loading) return <SBILoading />;

  return (
    <div className="bg-white">
      {/* Breadcrumb Container */}
      <div className="bg-[#e7a98b] py-6 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>
      <Residentalsection />
    </div>
  );
};

export default Residentalcare;
