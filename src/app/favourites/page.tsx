import { auth, currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { db } from "@/db";
import Image from "next/image";
import DeleteBtn from "../components/Delete";

export default async function Page() {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }
  const clerkUser: any = await currentUser();
  const userName = clerkUser.username;

  const {
    rows: [user_id],
  } = await db.query("SELECT * FROM users WHERE id = $1", [userId]);

  const id = user_id.id;

  const { rows: results } = await db.query(
    `SELECT restaurants.restaurant_id, restaurants.name, restaurants.img_url
          FROM likes
          JOIN restaurants ON likes.restaurant_id = restaurants.restaurant_id
          WHERE likes.users_id = $1`,
    [id]
  );

  console.log(results);

  return (
    <div>
      <h1>Welcome to your Favourites {userName}</h1>
      <div>
        <h1>Your favourites are located below</h1>

        {results.map((result: any) => (
          <div key={result.id}>
            <p>{result.name}</p>
            <Image
              className=""
              src={result.img_url}
              height={150}
              width={150}
              alt=""
            />
            <DeleteBtn />
          </div>
        ))}
      </div>
    </div>
  );
}
