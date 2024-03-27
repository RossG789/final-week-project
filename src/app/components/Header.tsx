import Image from "next/image";
import logoSVG from "../../public/assets/grumble-logo-horizontal.svg";
import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";

export default function Header() {
  return (
    <div className="navbar sticky top-0 bg-base-100 z-10">
      <div className="flex-1">
        <Image src={logoSVG} alt="Grumble Logo" height="70" />
      </div>
      <div className="flex-none gap-2">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button">
            <div>
              <SignedIn>
                <UserButton />
              </SignedIn>
              <SignedOut>
                <SignInButton
                  afterSignInUrl="/"
                  afterSignUpUrl="/"
                ></SignInButton>
              </SignedOut>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
