"use server";

import { db } from "@/db";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import Toast from "./Toast";
const { userId } = auth();

interface Favourite {
  restaurant_id: string;
  name: string;
  img_url: string;
}

export default async function HandleDelete(favourite: Favourite) {
  console.log(`Disliked ${favourite.name}`);

  try {
    await db.query(
      `
         DELETE FROM likes
         WHERE restaurant_id = $1 AND users_id = $2
     `,
      [favourite.restaurant_id, userId]
    );
    <Toast />;

    console.log("record deleted successfully");
  } catch (error) {
    console.error("Error deleting record:", error);
    throw error;
  }
  revalidatePath("/favourites");
}
