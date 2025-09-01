"use client";

import React, { useEffect, useState } from "react";
import Contactsection from "./_components/shared/contact-section";
import Breadcrumb from "@/components/ui/breadcrumb-section";
import SBILoading from "@/components/shared/loading-section";

const Contact = () => {
  const [loading, setLoading] = useState(true);

  const breadcrumbItems: { label: string; url?: string }[] = [
    { label: "Contact Us" },
  ];

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("contactPageLoaded");

    if (hasVisited) {
      setLoading(false);
    } else {
      const fetchData = async () => {
        try {
          await new Promise((res) => setTimeout(res, 1200)); // Simulate data load
          sessionStorage.setItem("contactPageLoaded", "true");
          setLoading(false);
        } catch (error) {
          console.error("Failed to load contact page", error);
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
      <Contactsection />
    </div>
  );
};

export default Contact;
