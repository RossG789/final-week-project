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

    console.log("record disliked successfully");
  } catch (error) {
    console.error("Error disliking record:", error);

    throw error;
  }
}
