// Importing clerks user button to have a quick and accessible way to sign out
import { UserButton } from "@clerk/nextjs";
import { db } from "@/db";
import DataRequest from "./components/DataRequest";

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
    const result: any = await data.json();
    const businesses: any = result.businesses;
  }
  getStuff();

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
