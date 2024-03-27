"use client";

import React from "react";
import Image from "next/image";
import HandleDelete from "./HandleDelete";

interface Favourite {
  restaurant_id: string;
  name: string;
  img_url: string;
}

interface FavouriteProps {
  favourites: Favourite[];
}

const FavouriteCard: React.FC<{ favourite: Favourite }> = ({ favourite }) => {
  return (
    <div className="mx-auto max-w-screen-lg">
      <div
        className="card glass m-5 flex flex-col items-center justify-center overflow-hidden mb-28 mt-12 md:flex-row md:items-stretch"
        role="region"
        aria-label={`Favourite card for ${favourite.name}`}
      >
        <div className="relative w-full md:w-1/2 h-96">
          <Image
            className="absolute top-0 left-0 w-full h-full object-cover"
            src={favourite.img_url}
            alt={`Image of ${favourite.name}`}
            fill
            sizes="100vw"
          />
        </div>
        <div className="card-body p-6 text-center md:text-left md:w-1/2 mt-4 md:mt-0 flex flex-col justify-between">
          <h1
            className="card-title justify-center text-4xl md:text-6xl md:justify-start"
            aria-label={favourite.name}
          >
            {favourite.name}
          </h1>
          <div className="flex justify-center md:justify-start mt-4">
            <button
              className="btn btn-lrg btn-primary mr-4"
              onClick={() => HandleDelete(favourite)}
              aria-label={`Delete ${favourite.name}`}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const FavouritesDisplay: React.FC<FavouriteProps> = ({ favourites }) => {
  return (
    <div>
      <div className="text-center">
        <h2 className="px-2 text-2xl text-primary mb-5">
          Welcome to your Favourites page.
        </h2>
        <p className="px-2">
          Delete a favourite if you no longer want it to display
        </p>
      </div>
      {favourites.map((favourite) => (
        <FavouriteCard key={favourite.restaurant_id} favourite={favourite} />
      ))}
    </div>
  );
};

export default FavouritesDisplay;
