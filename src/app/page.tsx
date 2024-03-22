// Importing clerks user button to have a quick and accessible way to sign out
import { UserButton } from "@clerk/nextjs";
import { db } from "@/db";

export default function Page() {
  // const { rows: name } = await db.query(`SELECT * FROM restaurants`);
  // const final = result.rows;

  async function getStuff() {
    "use server";
    const apiKey = process.env.API_KEY;

    const data = await fetch(
      "https://api.yelp.com/v3/businesses/search?location=london",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          accept: "application/json",
        },
      }
    );
    const result = await data.json();
    console.log(result);
  }
  getStuff();

  return (
    <div>
      <h1>hello world</h1>
      <UserButton />
    </div>
  );
}
