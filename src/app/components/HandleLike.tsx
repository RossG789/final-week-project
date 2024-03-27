"use server";
import { auth } from "@clerk/nextjs";
import { db } from "@/db";

interface Business {
  id: string;
  name: string;
  image_url: string;
  rating: number;
}

export default async function HandleLike(business: Business) {
  console.log(`Liked ${business.name}`);

  try {

    const { userId } = auth();

    if (business.id) {
      const {
        rows: [id],
      } = await db.query(`SELECT * FROM restaurants WHERE restaurant_id = $1`, [
        business.id,
      ]);
      if (!id) {
        await db.query(
          `INSERT INTO restaurants (restaurant_id, name,img_url) VALUES ($1, $2, $3)`,
          [business.id, business.name, business.image_url]
        );

        console.log(business.id);
      }

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
    }
  } catch (error) {
    console.error("Error liking restaurant:", error);
    throw error;
  }
}
