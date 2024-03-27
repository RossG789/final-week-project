"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import HandleLike from "./HandleLike";
import HandleDislike from "./HandleDislike";

interface Business {
  id: string;
  name: string;
  image_url: string;
  rating: number;
}

interface CardSwiperProps {
  initialBusinesses: Business[];
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
            <h3 className="mt-2 text-secondary text-xl md:text-2xl">
              Rating: {business.rating}
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

export default function CardSwiper({ initialBusinesses }: CardSwiperProps) {
  const [businesses, setBusinesses] = useState<Business[]>(initialBusinesses);
  const [offset, setOffset] = useState(20);
  const [currentIndex, setCurrentIndex] = useState(0);

  const fetchData = async () => {
    const apiKey = process.env.API_KEY;
    const response = await fetch(
      `https://api.yelp.com/v3/businesses/search?location=london&limit=20&offset=${offset}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data from Yelp API");
    }

    const result: any = await response.json();
    const newBusinesses: Business[] = result.businesses;

    if (newBusinesses.length > 0) {
      setBusinesses((prevBusinesses) => [...prevBusinesses, ...newBusinesses]);
      setOffset(offset + 20);
    } else {
      console.log("No more businesses found");
    }
  };

  useEffect(() => {
    const fetchMoreBusinesses = () => {
      fetchData();
    };

    if (currentIndex === businesses.length - 1) {
      fetchMoreBusinesses();
    }
  }, [currentIndex, businesses.length]);

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
    }
  };

  return (
    <div>
      <div className="text-center">
        <h2 className="text-2xl text-primary mb-5">
          Welcome to your food suggestions page.
        </h2>
        <p>Like a restaurant to add it to your favourites.</p>
      </div>
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
