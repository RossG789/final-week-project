// Importing clerks user button to have a quick and accessible way to sign out
import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs";
import { db } from "@/db";
import DataRequest from "./components/DataRequest";

export default async function Page() {
  const clerkUser: any = await currentUser();
  if (clerkUser) {
    console.log(clerkUser);
    const userName = clerkUser.username;

    const {
      rows: [user_name],
    } = await db.query("SELECT * FROM users WHERE user_name = $1", [userName]);

    if (user_name?.user_name !== userName) {
      await db.query("INSERT INTO users (user_name) VALUES ($1)", [userName]);
    }
  }
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
    <div>
      <h1>hello world</h1>
      <div>
        <h2>THIS IS WHERE THE INFORMATION GOES</h2>
        <DataRequest />
      </div>
      <UserButton />
    </div>
  );
}
