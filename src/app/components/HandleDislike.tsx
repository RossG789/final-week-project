"use server";

import React from "react";
import { auth } from "@clerk/nextjs";
import { db } from "@/db";

const userId = auth().userId;

interface Business {
  id: string;
  name: string;
  image_url: string;
  rating: number;
}

export default async function HandleDislike(business: Business) {
  console.log(`Disliked ${business.name}`);
  // Remove from page
  // Add it to disliked database
  // Add animation?
}
