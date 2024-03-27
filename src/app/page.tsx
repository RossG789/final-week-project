import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs";
import { db } from "@/db";
import CardSwiper from "./components/CardSwiper";

export default async function Page() {
  const { userId } = auth();

  if (userId) {
    const clerkUser: any = await currentUser();
    const userName = clerkUser.username;

    const {
      rows: [id],
    } = await db.query("SELECT * FROM users WHERE id = $1", [userId]);

    if (!id) {
      await db.query("INSERT INTO users (username, id) VALUES ($1, $2)", [
        userName,
        userId,
      ]);
    }
  }

  return (
    <div className="bg-base-100">
      <SignedIn>
        <CardSwiper />
      </SignedIn>
      <SignedOut>
        <div className="mx-auto hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Welcome to Grumble</h1>
            <p className="text-xl py-6">
              To access our illustrious array of culinary concoctions, please
              Sign in Below
            </p>
            <button className="btn btn-primary">
              <SignInButton />
            </button>
          </div>
        </div>
      </SignedOut>
    </div>
  );
}
