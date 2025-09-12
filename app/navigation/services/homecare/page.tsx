"use client";

import React, { useEffect, useState } from "react";
import Homesection from "./_components/shared/homesection";
import Breadcrumb from "@/components/ui/breadcrumb-section";
import SBILoading from "@/components/shared/loading-section";

const Homecare = () => {
  const [loading, setLoading] = useState(true);

  const breadcrumbItems: { label: string; url?: string }[] = [
    { label: "Language Training Programs" },
  ];

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("homecarePageLoaded");

    if (hasVisited) {
      setLoading(false);
    } else {
      const loadData = async () => {
        await new Promise((resolve) => setTimeout(resolve, 1200));
        sessionStorage.setItem("homecarePageLoaded", "true");
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
      <Homesection />
    </div>
  );
};

export default Homecare;
