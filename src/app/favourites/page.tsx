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
      <div className="text-center">
        <h1 className="text-2xl text-primary">
          Welcome to your Favourites {userName}
        </h1>
      </div>

      {results.map((result: any) => (
        <div key={result.id} className="mx-auto max-w-screen-lg">
          <div
            className="card glass m-5 flex flex-col items-center justify-center overflow-hidden mb-28 mt-12 md:flex-row md:items-stretch"
            role="region"
            aria-label={`Business card for ${result.name}`}
          >
            <div className="relative w-full md:w-1/2 h-96">
              <Image
                className="absolute top-0 left-0 w-full h-full object-cover"
                src={result.img_url}
                height={150}
                width={150}
                alt={`Image of ${result.name}`}
              />
            </div>
            <div className="card-body p-6 text-center md:text-left md:w-1/2 mt-4 md:mt-0 flex flex-col justify-between">
              <p
                className="card-title justify-center text-4xl md:text-6xl md:justify-start"
                aria-label={result.name}
              >
                {result.name}
              </p>
              <div className="flex justify-center md:justify-start mt-4">
                <DeleteBtn:any />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
