"use server";
import { db } from "@/db";
import { auth } from "@clerk/nextjs";
const { userId } = auth();

// interface Business {
//   id: string;
//   name: string;
//   image_url: string;
//   rating: number;
// }

export default async function DeleteBtn({ businessId }) {
  console.log(`Disliked ${businessId}`);

  try {
    await db.query(
      `
         DELETE FROM likes
         WHERE restaurant_id = $1 AND users_id = $2
     `,
      [businessId, userId]
    );
    // await db.query(
    //   `
    //   INSERT INTO dislikes (restaurant_id, users_id) VALUES ($1, $2)`,
    //   [business.restaurant_id, userId]
    // );

    console.log("record deleted successfully");
  } catch (error) {
    console.error("Error deleting record:", error);
    throw error;
  }
  return <button className="btn btn-lrg btn-primary mr-4">Delete</button>;
}

//     await db.query(
//       `
//      DELETE FROM likes
//      WHERE restaurant_id = $1 AND users_id = $2
//  `,
//   [business.id, userId]
// );
