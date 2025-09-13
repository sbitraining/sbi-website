"use client";

import React, { useEffect, useState } from "react";
import Specialsection from "./_components/shared/specialsection";
import Breadcrumb from "@/components/ui/breadcrumb-section";
import SBILoading from "@/components/shared/loading-section";

const Specialcare = () => {
  const [loading, setLoading] = useState(true);

  const breadcrumbItems: { label: string; url?: string }[] = [
    { label: "Job Placement Assistance" },
  ];

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("specialPageLoaded");

    if (hasVisited) {
      setLoading(false);
    } else {
      const loadData = async () => {
        await new Promise((resolve) => setTimeout(resolve, 1200)); // Optional delay
        sessionStorage.setItem("specialPageLoaded", "true");
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
      <Specialsection />
    </div>
  );
};

export default Specialcare;
