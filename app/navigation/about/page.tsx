"use client";

import React, { useEffect, useState } from "react";
import Choosesection from "./_components/shared/choose-section";
import Gallerysection from "./_components/shared/gallery-section";
import Ctasection from "./_components/shared/cta-section";
import Breadcrumb from "@/components/ui/breadcrumb-section";
import SBILoading from "@/components/shared/loading-section";
import OurTeam from "./_components/shared/team-section";

const About = () => {
  const [loading, setLoading] = useState(true);

  const breadcrumbItems: { label: string; url?: string }[] = [
    { label: "About Us" },
  ];

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("aboutPageLoaded");

    if (hasVisited) {
      setLoading(false);
    } else {
      const fetchData = async () => {
        try {
          await new Promise((res) => setTimeout(res, 1200)); // Simulated API load
          sessionStorage.setItem("aboutPageLoaded", "true");
          setLoading(false);
        } catch (error) {
          console.error("Failed to load About page", error);
        }
      };

      fetchData();
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

      <Choosesection />
      <OurTeam />
      <Ctasection />
      <Gallerysection />
    </div>
  );
};

export default About;
