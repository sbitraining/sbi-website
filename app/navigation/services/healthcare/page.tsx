"use client";

import React, { useEffect, useState } from "react";
import Healthsection from "./_components/shared/healthsection";
import Breadcrumb from "@/components/ui/breadcrumb-section";
import SBILoading from "@/components/shared/loading-section";

const Healthcare = () => {
  const [loading, setLoading] = useState(true);

  const breadcrumbItems: { label: string; url?: string }[] = [
    { label: "Health Care" },
  ];

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("healthcarePageLoaded");

    if (hasVisited) {
      setLoading(false);
    } else {
      const loadData = async () => {
        try {
          await new Promise((resolve) => setTimeout(resolve, 1200));
          sessionStorage.setItem("healthcarePageLoaded", "true");
          setLoading(false);
        } catch (err) {
          console.error("Error loading Healthcare page:", err);
        }
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

      <Healthsection />
    </div>
  );
};

export default Healthcare;
