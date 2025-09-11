"use client";

import React, { useEffect, useState } from "react";
import { GiGlassHeart } from "react-icons/gi";
import axios from "axios";

const Townsection = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [thumbnail, setThumbnail] = useState<string>("");

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/video-sections/`)
      .then((res) => {
        if (res.data.length > 0) {
          setTitle(res.data[0].title);
          setDescription(res.data[0].description);
          setThumbnail(res.data[0].thumbnail);
        }
      })
      .catch((err) => {
        console.error("Error fetching video section:", err);
      });
  }, []);

  return (
    <section className="pt-10 pb-44 px-6 md:px-28 lg:px-40 bg-white text-center flex flex-col items-center justify-center space-y-8">
      <GiGlassHeart className="text-[#e7a98b] drop-shadow-lg" size={64} />

      <h1 className="font-extrabold text-4xl md:text-6xl leading-tight text-gray-900">
        {title}{" "}
        <span className="text-[#e7a98b] underline underline-offset-4 decoration-2">
          guiding your success
        </span>
      </h1>

      <p className="text-gray-600 text-lg md:text-xl max-w-3xl leading-relaxed">
        {description}
      </p>

      {thumbnail && (
        <img
          src={thumbnail}
          alt={title}
          className="rounded-2xl shadow-lg max-w-3xl w-full"
        />
      )}
    </section>
  );
};

export default Townsection;
