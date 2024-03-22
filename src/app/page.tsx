// Importing clerks user button to have a quick and accessible way to sign out
import { UserButton } from "@clerk/nextjs";
import { db } from "@/db";

export default async function BasicFetch() {
  const { rows: name } = await db.query(`SELECT * FROM restaurants`);
  // const final = result.rows;

  console.log(name);

  return (
    <div>
      <h1>hello world</h1>
      <UserButton />
    </div>
  );
}
