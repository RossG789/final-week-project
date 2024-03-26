import { currentUser, auth } from "@clerk/nextjs";
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

  return (
    <div className="bg-base-100">
      <DataRequest />
    </div>
  );
}
