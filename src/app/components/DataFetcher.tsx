import { useState, useEffect, useCallback } from "react";

interface Business {
  id: string;
  name: string;
  image_url: string;
  rating: number;
  review_count: number;
}

export default function DataFetcher() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (currentOffset: number) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/proxy?offset=${currentOffset}`);
      console.log(response);

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const result = await response.json();
      const newBusinesses: Business[] = result.businesses;

      setBusinesses((prevBusinesses) => [...prevBusinesses, ...newBusinesses]);
      setIsLoading(false);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(offset);
  }, [offset, fetchData]);

  const fetchMoreBusinesses = () => {
    setOffset((prevOffset) => prevOffset + 20);
  };

  return { businesses, isLoading, error, fetchMoreBusinesses };
}
