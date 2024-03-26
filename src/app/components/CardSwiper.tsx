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
    <div className="card glass m-5 flex flex-col items-center justify-center overflow-hidden mb-28 mt-12">
      <div className="relative w-full h-96">
        <Image
          className="absolute top-0 left-0 w-full h-full object-cover"
          src={business.image_url}
          alt="Image Description"
          fill
          sizes="100vw"
        />
      </div>
      <div className="card-body p-6 text-center mt-4 items-center">
        <h1 className="card-title">{business.name}</h1>
        <h3 className="mt-2">{business.rating}</h3>
        <div className="flex justify-center mt-4">
          <button
            className="btn btn-lrg btn-primary mr-4"
            onClick={() => HandleDislike(business)}
          >
            Dislike
          </button>
          <button
            className="btn btn-primary"
            onClick={() => HandleLike(business)}
          >
            Like
          </button>
        </div>
      </div>
    </div>
  );
};

const CardSwiper: React.FC<CardSwiperProps> = ({ businesses }) => {
  return (
    <div>
      {businesses.map((business) => (
        <BusinessCard key={business.id} business={business} />
      ))}
    </div>
  );
};

export default CardSwiper;
