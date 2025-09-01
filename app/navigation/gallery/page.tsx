"use client";

import React, { useEffect, useState } from "react";
import Breadcrumb from "@/components/ui/breadcrumb-section";
import Gallery from "./_components/shared/gallery-section";
import SBILoading from "@/components/shared/loading-section";

const Gallerysection = () => {
  const [loading, setLoading] = useState(true);

  const breadcrumbItems: { label: string; url?: string }[] = [
    { label: "Gallery" },
  ];

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("galleryPageLoaded");

    if (hasVisited) {
      setLoading(false);
    } else {
      const loadData = async () => {
        try {
          await new Promise((resolve) => setTimeout(resolve, 1200)); // simulate loading
          sessionStorage.setItem("galleryPageLoaded", "true");
          setLoading(false);
        } catch (err) {
          console.error("Error loading Gallery:", err);
        }
      };

      loadData();
    }
  }, []);

  if (loading) return <SBILoading />;

  return (
    <div className="bg-white">
      <div className="bg-[#e7a98b] py-6 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>
      <div>
        <Gallery />
      </div>
    </div>
  );
};

export default Gallerysection;
