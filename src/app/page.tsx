import { SignedIn, SignedOut } from "@clerk/nextjs";
import CardSwiper from "./components/CardSwiper";

export default function Page() {
  return (
    <div className="bg-base-100">
      <SignedIn>
        <CardSwiper />
      </SignedIn>
      <SignedOut>
        <h1>Please sign in to continue</h1>
      </SignedOut>
    </div>
  );
}
