"use client";

import { useState, useEffect, useCallback } from "react";

interface Business {
  id: string;
  name: string;
  image_url: string;
  rating: number;
}

interface DataFetcherProps {
  initialData: Business[];
}

export default function DataFetcher({ initialData }: DataFetcherProps) {
  const [businesses, setBusinesses] = useState<Business[]>(initialData);
  const [offset, setOffset] = useState(20);

  const fetchData = useCallback(async () => {
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
  }, [offset]);

  useEffect(() => {
    const fetchMoreBusinesses = () => {
      fetchData();
    };

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;

      if (scrollTop + clientHeight >= scrollHeight) {
        fetchMoreBusinesses();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [fetchData]);

  return { businesses };
}
