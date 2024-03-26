"use client";

import React from "react";
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
  businesses: Business[];
}

const BusinessCard: React.FC<{ business: Business }> = ({ business }) => {
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
              onClick={() => HandleDislike(business)}
              aria-label={`Dislike ${business.name}`}
            >
              Dislike
            </button>
            <button
              className="btn btn-primary"
              onClick={() => HandleLike(business)}
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

const CardSwiper: React.FC<CardSwiperProps> = ({ businesses }) => {
  return (
    <div>
      <div className="text-center">
        <h2 className="text-2xl text-primary mb-5">
          Welcome to your food suggestions page.
        </h2>
        <p>Like a restaurant to add it to your favourites.</p>
      </div>
      {businesses.map((business) => (
        <BusinessCard key={business.id} business={business} />
      ))}
    </div>
  );
};

export default CardSwiper;
