import {
  currentUser,
  SignedIn,
  SignedOut,
  UserButton,
  SignInButton,
  auth,
} from "@clerk/nextjs";
import { db } from "@/db";
import DataRequest from "./components/DataRequest";

export default async function Page() {
  const { userId } = auth();
  if (userId) {
    const clerkUser: any = await currentUser();
    const userName = clerkUser.username;

    const {
      rows: [id],
    } = await db.query("SELECT * FROM users WHERE id = $1", [userId]);

    if (!userName) {
      await db.query("INSERT INTO users (username, id) VALUES ($1, $2)", [
        userName,
        userId,
      ]);
    }
  }

  //

  // const clerkUser: any = await currentUser();
  // console.log(clerkUser);
  // const userName = clerkUser.username;

  // const {
  //   rows: [user_name],
  // } = await db.query("SELECT * FROM users WHERE user_name = $1", [userName]);

  // console.log(user_name.user_name);

  // async function getStuff() {
  //   "use server";
  //   const apiKey = process.env.API_KEY;

  //   const data = await fetch(
  //     "https://api.yelp.com/v3/businesses/search?location=london",
  //     {
  //       method: "GET",
  //       headers: {
  //         Authorization: `Bearer ${apiKey}`,
  //         accept: "application/json",
  //       },
  //     }
  //   );
  //   const result: any = await data.json();
  //   const businesses: any = result.businesses;
  // }
  // getStuff();

  return (
    <div className="bg-base-100">
      <SignedIn>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <SignInButton afterSignInUrl="/" afterSignUpUrl="/"></SignInButton>
      </SignedOut>
      <DataRequest />
    </div>
  );
}
