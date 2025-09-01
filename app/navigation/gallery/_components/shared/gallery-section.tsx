"use client";
import React, { useState, useEffect } from "react";
import {
  Play,
  X,
  ChevronLeft,
  ChevronRight,
  Users,
  Award,
  HeartHandshake,
  BookOpen,
  Calendar,
  MapPin,
} from "lucide-react";

interface GalleryItem {
  id: number;
  type: "image" | "video";
  src: string;
  thumbnail: string;
  title: string;
  category: "training" | "certification" | "achievement";
  description: string;
  date: string;
  location: string;
}

interface ProgramAPIItem {
  id: number;
  title: string;
  description: string;
  tag: string;
  image: string;
  video: string;
  date: string;
  location: string;
}

interface FilterCategory {
  key: string;
  label: string;
  icon: React.ComponentType<{ size?: number }>;
  count: number;
}

const Gallery: React.FC = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [selectedMedia, setSelectedMedia] = useState<GalleryItem | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [filter, setFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6;

  const primaryColor = "#e7a98b";

  useEffect(() => {
    async function fetchPrograms() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/programs/`
        );
        const data = await response.json();
        const mappedItems: GalleryItem[] = (data as ProgramAPIItem[]).map(
          (item) => {
            const tag = item.tag.toLowerCase();
            return {
              id: item.id,
              type: item.video ? "video" : "image",
              src: item.video || item.image,
              thumbnail: item.image || "",
              title: item.title,
              category:
                tag === "training"
                  ? "training"
                  : tag === "certifications"
                  ? "certification"
                  : "achievement",
              description: item.description,
              date: item.date,
              location: item.location,
            };
          }
        );
        setGalleryItems(mappedItems);
      } catch (error) {
        console.error("Failed to fetch programs:", error);
      }
    }

    fetchPrograms();
  }, []);

  const filterCategories: FilterCategory[] = [
    {
      key: "all",
      label: "All Programs",
      icon: Users,
      count: galleryItems.length,
    },
    {
      key: "training",
      label: "Training Sessions",
      icon: BookOpen,
      count: galleryItems.filter((item) => item.category === "training").length,
    },
    {
      key: "certification",
      label: "Certifications",
      icon: Award,
      count: galleryItems.filter((item) => item.category === "certification")
        .length,
    },
    {
      key: "achievement",
      label: "Achievement",
      icon: HeartHandshake,
      count: galleryItems.filter((item) => item.category === "achievement")
        .length,
    },
  ];

  const filteredItems =
    filter === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === filter);

  // Reset to page 1 when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, endIndex);

  const openLightbox = (item: GalleryItem, index: number): void => {
    setSelectedMedia(item);
    setCurrentIndex(startIndex + index); // Adjust index for pagination
  };

  const closeLightbox = (): void => {
    setSelectedMedia(null);
  };

  const nextMedia = (): void => {
    if (filteredItems.length === 0) return;
    const nextIndex = (currentIndex + 1) % filteredItems.length;
    setSelectedMedia(filteredItems[nextIndex]);
    setCurrentIndex(nextIndex);
  };

  const prevMedia = (): void => {
    if (filteredItems.length === 0) return;
    const prevIndex =
      (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setSelectedMedia(filteredItems[prevIndex]);
    setCurrentIndex(prevIndex);
  };

  // Pagination functions
  const scrollToGallery = () => {
    const galleryElement = document.getElementById("gallery-grid");
    if (galleryElement) {
      const headerOffset = 100; // Adjust this value based on your header height
      const elementPosition = galleryElement.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
    setTimeout(() => scrollToGallery(), 100);
  };

  const goToPrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setTimeout(() => scrollToGallery(), 100);
    }
  };

  const goToNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      setTimeout(() => scrollToGallery(), 100);
    }
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      let startPage = Math.max(1, currentPage - 2);
      let endPage = Math.min(totalPages, currentPage + 2);

      if (currentPage <= 3) {
        endPage = maxVisiblePages;
      }
      if (currentPage >= totalPages - 2) {
        startPage = totalPages - maxVisiblePages + 1;
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (!selectedMedia) return;
      switch (event.key) {
        case "Escape":
          closeLightbox();
          break;
        case "ArrowLeft":
          prevMedia();
          break;
        case "ArrowRight":
          nextMedia();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selectedMedia, currentIndex, filteredItems]);

  const renderPagination = () => {
    if (filteredItems.length <= itemsPerPage) return null;

    const pageNumbers = getPageNumbers();

    return (
      <div className="flex justify-center items-center mt-12 space-x-2">
        {/* Previous button */}
        <button
          onClick={goToPrevious}
          disabled={currentPage === 1}
          className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
            currentPage === 1
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-gray-300"
          }`}
        >
          <ChevronLeft size={18} className="mr-1" />
          Previous
        </button>

        {/* Page numbers */}
        {pageNumbers.map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => goToPage(pageNum)}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
              currentPage === pageNum
                ? "text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-gray-300"
            }`}
            style={
              currentPage === pageNum ? { backgroundColor: primaryColor } : {}
            }
          >
            {pageNum}
          </button>
        ))}

        {/* Next button */}
        <button
          onClick={goToNext}
          disabled={currentPage === totalPages}
          className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
            currentPage === totalPages
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-gray-300"
          }`}
        >
          Next
          <ChevronRight size={18} className="ml-1" />
        </button>
      </div>
    );
  };

  return (
    <section className="py-4 sm:py-6 md:py-8 lg:py-10 xl:py-12 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-20">
          <div
            className="inline-block px-4 py-2 rounded-full mb-6"
            style={{ backgroundColor: `${primaryColor}20` }}
          >
            <span
              className="font-semibold text-sm uppercase tracking-wide"
              style={{ color: primaryColor }}
            >
              Training Excellence
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight">
            Professional Training
            <span className="block" style={{ color: primaryColor }}>
              Gallery
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Discover our state-of-the-art facilities, comprehensive curriculum,
            and the success stories of our certified caretaker professionals.
          </p>
        </div>

        <div
          className="flex flex-wrap justify-center gap-3 mb-16"
          role="tablist"
          aria-label="Gallery filters"
        >
          {filterCategories.map((category) => {
            const IconComponent = category.icon;
            const isActive = filter === category.key;
            return (
              <button
                key={category.key}
                onClick={() => setFilter(category.key)}
                role="tab"
                aria-selected={isActive}
                aria-controls="gallery-grid"
                className={`flex items-center gap-3 px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                  isActive
                    ? "text-white shadow-lg transform scale-105"
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-gray-300"
                }`}
                style={isActive ? { backgroundColor: primaryColor } : {}}
              >
                <IconComponent size={20} />
                <span>{category.label}</span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-bold ${
                    isActive ? "bg-white" : "bg-gray-100 text-gray-600"
                  }`}
                  style={isActive ? { color: primaryColor } : {}}
                >
                  {category.count}
                </span>
              </button>
            );
          })}
        </div>

        <div
          id="gallery-grid"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          role="tabpanel"
        >
          {currentItems.map((item, index) => (
            <article
              key={item.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 border border-gray-100"
            >
              <div
                className="relative aspect-video overflow-hidden cursor-pointer"
                onClick={() => openLightbox(item, index)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openLightbox(item, index);
                  }
                }}
              >
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {item.type === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center bg-opacity-40 group-hover:bg-opacity-50 transition-all duration-300">
                    <div
                      className="rounded-full p-4 transform group-hover:scale-110 transition-transform duration-300 shadow-2xl"
                      style={{ backgroundColor: primaryColor }}
                    >
                      <Play
                        size={28}
                        className="text-white ml-1"
                        fill="white"
                      />
                    </div>
                  </div>
                )}
                <div className="absolute top-4 left-4">
                  <span
                    className="text-white px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide"
                    style={{ backgroundColor: primaryColor }}
                  >
                    {item.category}
                  </span>
                </div>
              </div>
              <div className="p-8">
                <div
                  className="flex items-center gap-2 text-sm font-semibold mb-3"
                  style={{ color: primaryColor }}
                >
                  <Calendar size={14} />
                  <time dateTime={item.date}>{item.date}</time>
                </div>
                <h3 className="font-bold text-gray-900 text-xl mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {item.description}
                </p>
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <MapPin size={14} />
                  {item.location}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Pagination */}
        <div id="pagination-section">{renderPagination()}</div>

        {selectedMedia && (
          <div
            className="fixed inset-0 backdrop-blur-md bg-black/40 z-50 flex items-center justify-center p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                closeLightbox();
              }
            }}
          >
            <div className="relative max-w-7xl max-h-full w-full">
              <div className="flex justify-between items-center mb-6 text-white">
                <div>
                  <h2 className="text-2xl font-bold mb-1">
                    {selectedMedia.title}
                  </h2>
                  <p className="text-gray-300">
                    <time dateTime={selectedMedia.date}>
                      {selectedMedia.date}
                    </time>{" "}
                    • {selectedMedia.location}
                  </p>
                </div>
                <button
                  onClick={closeLightbox}
                  className="text-white hover:text-orange-300 p-2 hover:bg-white hover:bg-opacity-10 rounded-full"
                >
                  <X size={28} />
                </button>
              </div>
              <button
                onClick={prevMedia}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black bg-opacity-50 rounded-full p-3"
              >
                <ChevronLeft size={32} />
              </button>
              <button
                onClick={nextMedia}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black bg-opacity-50 rounded-full p-3"
              >
                <ChevronRight size={32} />
              </button>
              <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
                {selectedMedia.type === "image" ? (
                  <img
                    src={selectedMedia.src}
                    alt={selectedMedia.title}
                    className="w-full max-h-[70vh] object-contain bg-gray-100"
                  />
                ) : (
                  <video
                    src={selectedMedia.src}
                    controls
                    poster={selectedMedia.thumbnail}
                    className="w-full max-h-[70vh] object-contain"
                  >
                    Your browser does not support the video tag.
                  </video>
                )}

                <div className="p-8 border-t border-gray-100">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">
                        {selectedMedia.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed text-lg mb-4">
                        {selectedMedia.description}
                      </p>
                      <div className="flex items-center gap-6 text-gray-500">
                        <div className="flex items-center gap-2">
                          <Calendar size={16} />
                          <time dateTime={selectedMedia.date}>
                            {selectedMedia.date}
                          </time>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin size={16} />
                          <span>{selectedMedia.location}</span>
                        </div>
                      </div>
                    </div>
                    <span
                      className="text-white px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wide"
                      style={{ backgroundColor: primaryColor }}
                    >
                      {selectedMedia.category}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
