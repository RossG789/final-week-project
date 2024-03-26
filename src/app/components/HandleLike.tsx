"use server";

import { auth } from "@clerk/nextjs";
import { db } from "@/db";

const { userId } = auth();

interface Business {
  id: string;
  name: string;
  image_url: string;
}

export default async function HandleLike(business: Business) {
  console.log(`Liked ${business.name}`);
  try {
    await db.query(
      `INSERT INTO restaurants (restaurant_id, name,img_url) VALUES ($1, $2, $3)`,
      [business.id, business.name, business.image_url]
    );
    await db.query(
      `INSERT INTO likes (restaurant_id, users_id) VALUES ($1, $2)`,
      [business.id, userId]
    );
  } catch (error) {
    console.error("Error deleting book:", error);
    throw error;
  }
  // Remove from page
  // Add it to liked database
  // Add animation?
}
