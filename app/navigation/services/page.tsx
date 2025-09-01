"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SocialLinks from "./_components/social-links";

interface GalleryItem {
  id: number;
  image: string;
  title: string;
}

const Gallery: React.FC = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8001/api/service-gallery/"
        );
        setGalleryItems(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading gallery...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Error loading gallery: {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12 sm:py-24 lg:py-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryItems.map((item) => (
            <Link
              href="#"
              key={item.id}
              className="relative group overflow-hidden rounded-lg shadow-lg bg-white transform transition-transform duration-300 hover:scale-105"
            >
              {/* Image Container */}
              <div className="relative aspect-w-4 aspect-h-3 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-64 object-cover transition-all duration-300 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-[#e7a98b]/1 group-hover:bg-[#e7a98b]/60 transition-all duration-300 flex items-center justify-center">
                  <div className="text-center text-white transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 px-6">
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <SocialLinks />
    </div>
  );
};

export default Gallery;
