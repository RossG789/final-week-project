"use server";

import React from "react";
import CardSwiper from "./components/CardSwiper";

interface Business {
  id: string;
  name: string;
  image_url: string;
  rating: number;
}

export default async function DataRequest() {
  const apiKey = process.env.API_KEY;
  const response = await fetch(
    "https://api.yelp.com/v3/businesses/search?location=london&limit=20",
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
  const initialBusinesses: Business[] = result.businesses;

  return <CardSwiper initialBusinesses={initialBusinesses} />;
}
