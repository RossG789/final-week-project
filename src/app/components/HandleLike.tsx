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
    if (business.id) {
      const {
        rows: [id],
      } = await db.query(`SELECT * FROM restaurants WHERE restaurant_id = $1`, [
        business.id,
      ]);
      const {
        rows: [likesid],
      } = await db.query(
        `SELECT * FROM likes WHERE restaurant_id = $1 AND users_id = $2`,
        [business.id, userId]
      );
      if (!likesid) {
        await db.query(
          `INSERT INTO likes (users_id, restaurant_id) VALUES ($1, $2)`,
          [userId, business.id]
        );
      }

      console.log(business.id);
      if (!business.id) {
        await db.query(
          `INSERT INTO restaurants (restaurant_id, name,img_url) VALUES ($1, $2, $3)`,
          [business.id, business.name, business.image_url]
        );
      }
    }
  } catch (error) {
    console.error("Error liking restaurant:", error);
    throw error;
  }
  // Remove from page
  // Add it to liked database
  // Add animation?
}
