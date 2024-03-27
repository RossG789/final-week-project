"use server";
import React from "react";
import { auth } from "@clerk/nextjs";
import { db } from "@/db";

interface Business {
  id: string;
  name: string;
  image_url: string;
  rating: number;
}

export default async function HandleDislike(business: Business) {
  console.log(`Disliked ${business.name}`);

  try {
    const { userId } = auth();

    await db.query(
      `INSERT INTO restaurants (restaurant_id, name, img_url) VALUES ($1, $2, $3)`,
      [business.id, business.name, business.image_url]
    );

    if (userId) {
      await db.query(
        `INSERT INTO dislikes (restaurant_id, users_id) VALUES ($1, $2)`,
        [business.id, userId]
      );
    } else {
      console.log("User is not authenticated");
    }

    console.log("Record deleted successfully");
  } catch (error) {
    console.error("Error disliking restaurant:", error);
    throw error;
  }
}
