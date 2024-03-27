"use server";

import React from "react";
import FavouritesDisplay from "./FavouritesDisplay";
import { auth, currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { db } from "@/db";

interface Favourite {
  restaurant_id: string;
  name: string;
  img_url: string;
}

export default async function FavouritesFetch() {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }
  const clerkUser: any = await currentUser();
  const userName = clerkUser.username;

  const {
    rows: [user_id],
  } = await db.query("SELECT * FROM users WHERE id = $1", [userId]);

  const id = user_id;

  const { rows: results } = await db.query(
    `SELECT restaurants.restaurant_id, restaurants.name, restaurants.img_url
          FROM likes
          JOIN restaurants ON likes.restaurant_id = restaurants.restaurant_id
          WHERE likes.users_id = $1`,
    [id]
  );

  const favourites: Favourite[] = results;

  return <FavouritesDisplay favourites={favourites} />;
}
