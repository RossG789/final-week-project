// Importing clerks user button to have a quick and accessible way to sign out
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
      <h1>Final Project!</h1>
      <UserButton />
    </div>
  );
}
