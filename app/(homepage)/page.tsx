"use client";
import { useEffect, useState } from "react";
import Caresection from "./_components/shared/care-section";
import MainImage from "./_components/shared/main-section";
import Services from "./_components/shared/service-section";
import HealthcareStats from "./_components/shared/stats-section";
import TestimonialsSection from "./_components/shared/testimonial-section";
import Townsection from "./_components/shared/town-section";
import SBILoading from "@/components/shared/loading-section";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("homepageLoaded");

    if (hasVisited) {
      setLoading(false); // Already visited, skip loader
    } else {
      // Simulate real data load (replace with actual fetch logic if needed)
      const fetchData = async () => {
        try {
          // Example: await fetch('/api/health'); // actual health check
          await new Promise((res) => setTimeout(res, 1500)); // simulate
          sessionStorage.setItem("homepageLoaded", "true");
          setLoading(false);
        } catch (error) {
          console.error("Failed to load homepage data", error);
        }
      };

      fetchData();
    }
  }, []);

  if (loading) return <SBILoading />;

  return (
    <>
      <div className="bg-white">
        <MainImage />
        <Services />
        <Townsection />
        <HealthcareStats />
        <Caresection />
        <TestimonialsSection />
      </div>
    </>
  );
}
