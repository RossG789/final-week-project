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
    await db.query(`SELECT * FROM restaurants WHERE restaurant_id = $1`, [
      business.id,
    ]);
    console.log(business.id);
    if (!business.id) {
      await db.query(
        `INSERT INTO restaurants (restaurant_id, name,img_url) VALUES ($1, $2, $3)`,
        [business.id, business.name, business.image_url]
      );
    }
    await db.query(`INSERT INTO likes  (users_id) VALUES ($1)`, [userId]);
  } catch (error) {
    console.error("Error deleting book:", error);
    throw error;
  }
  // Remove from page
  // Add it to liked database
  // Add animation?
}
