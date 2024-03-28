import { currentUser } from "@clerk/nextjs";

export default async function Page() {
  const clerkUser: any = await currentUser();
  const userName = clerkUser.username;
  return (
    <div className="mx-3 px-2 my-5 text-center">
      <h1 className="text-2xl text-primary mb-5">
        Welcome to your profile page {userName}.
      </h1>
      <p className="text-xl mb-5">
        With your help we can work to populate this page for you in the future!
      </p>
      <p className="mb-10">
        If you wish to donate to our endeavours, please follow the link below
      </p>
      <a
        className="text-l my-5 text-secondary"
        target="_blank"
        href="https://www.youtube.com/watch?v=xvFZjo5PgG0"
      >
        Support Us
      </a>
    </div>
  );
}
