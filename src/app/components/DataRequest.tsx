import React from "react"

export default async function DataRequest() {
  "use server";
  const apiKey = process.env.API_KEY;

  const data = await fetch(
    "https://api.yelp.com/v3/businesses/search?location=london",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        accept: "application/json",
      },
    }
  );
  const result: any = await data.json();
  const businesses: any = result.businesses;
  // const location = result.businesses.location;
  // const categories = result.businesses.categories;
  // console.log(location);
  // console.log(categories);
  return (
    <div>
      {businesses.map(
        (business: {
          id: string;
          name: string;
          image_url: string;
          rating: number;
        }) => (
          <div key={business.id}>
            <h1>{business.name}</h1>
            <img src={business.image_url} />
            <h3>{business.rating}</h3>
          </div>
        )
      )}
    </div>
  );
}
