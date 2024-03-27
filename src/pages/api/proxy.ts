import { NextApiRequest, NextApiResponse } from "next";

export default async function ProxyAPI(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { offset = 0 } = req.query; // Use query parameters to handle pagination
  const apiKey = process.env.API_KEY;

  try {
    const apiResponse = await fetch(
      `https://api.yelp.com/v3/businesses/search?location=london&limit=20&offset=${offset}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          accept: "application/json",
        },
      }
    );

    if (!apiResponse.ok) {
      throw new Error("Failed to fetch data from Yelp API");
    }

    const data = await apiResponse.json();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
}
