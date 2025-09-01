"use client";

import React, { useEffect, useState } from "react";
import Questionsection from "./_components/shared/question-section";
import Breadcrumb from "@/components/ui/breadcrumb-section";
import SBILoading from "@/components/shared/loading-section";

const FAQs = () => {
  const [loading, setLoading] = useState(true);

  const breadcrumbItems: { label: string; url?: string }[] = [
    { label: "FAQs" },
  ];

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("faqPageLoaded");

    if (hasVisited) {
      setLoading(false);
    } else {
      const loadData = async () => {
        try {
          await new Promise((resolve) => setTimeout(resolve, 1200)); // simulate fetch
          sessionStorage.setItem("faqPageLoaded", "true");
          setLoading(false);
        } catch (err) {
          console.error("Error loading FAQs:", err);
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
        <Questionsection />
      </div>
    </div>
  );
};

export default FAQs;
