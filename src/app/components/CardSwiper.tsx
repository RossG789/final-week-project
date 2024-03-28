"use client";
import React, { useState } from "react";
import Image from "next/image";
import HandleLike from "./HandleLike";
import HandleDislike from "./HandleDislike";
import DataFetcher from "./DataFetcher";

interface Business {
  id: string;
  name: string;
  image_url: string;
  rating: number;
  review_count: number;
}

const BusinessCard: React.FC<{
  business: Business;
  handleLike: () => void;
  handleDislike: () => void;
}> = ({ business, handleLike, handleDislike }) => {
  return (
    <div className="mx-auto max-w-screen-lg">
      <div
        className="card glass m-5 flex flex-col items-center justify-center overflow-hidden mb-28 mt-12 md:flex-row md:items-stretch"
        role="region"
        aria-label={`Business card for ${business.name}`}
      >
        <div className="relative w-full md:w-1/2 h-96">
          <Image
            className="absolute top-0 left-0 w-full h-full object-cover"
            src={business.image_url}
            alt={`Image of ${business.name}`}
            fill
            sizes="100vw"
            priority
          />
        </div>
        <div className="card-body p-6 text-center md:text-left md:w-1/2 mt-4 md:mt-0 flex flex-col justify-between">
          <div>
            <h1
              className="card-title justify-center text-4xl md:text-6xl md:justify-start"
              aria-label={business.name}
            >
              {business.name}
            </h1>
            <h3 className="mt-2 text-primary text-xl md:text-2xl">
              Rating: {business.rating}
            </h3>
            <h3 className="mt-4 accent text-l md:text-xl">
              Review Count: {business.review_count}
            </h3>
          </div>
          <div className="flex justify-center md:justify-start mt-4">
            <button
              className="btn btn-lrg btn-primary mr-4"
              onClick={handleDislike}
              aria-label={`Dislike ${business.name}`}
            >
              Dislike
            </button>
            <button
              className="btn btn-primary"
              onClick={handleLike}
              aria-label={`Like ${business.name}`}
            >
              Like
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function CardSwiper() {
  const { businesses, isLoading, error, fetchMoreBusinesses } = DataFetcher();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleLike = () => {
    HandleLike(businesses[currentIndex]);
    nextBusiness();
  };

  const handleDislike = () => {
    HandleDislike(businesses[currentIndex]);
    nextBusiness();
  };

  const nextBusiness = () => {
    if (currentIndex < businesses.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      fetchMoreBusinesses();
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {businesses.length > 0 && (
        <BusinessCard
          business={businesses[currentIndex]}
          key={businesses[currentIndex].id}
          handleLike={handleLike}
          handleDislike={handleDislike}
        />
      )}
    </div>
  );
}
