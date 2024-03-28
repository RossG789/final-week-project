![image](https://github.com/RossG789/final-week-project/assets/123095012/eba9664f-f216-4269-b025-2f3736cbe7a3)

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

This project uses DaisyUI and Tailwind CSS for UI component styling. You may read more into the use of these powerful styling tools with these links: 
- [DaisyUI](https://daisyui.com/docs/use/)
- [Tailwind CSS](https://tailwindcss.com/)

This Project uses Clerk for authentication and the Yelp API to populate the homescreen.
- [Yelp API](https://docs.developer.yelp.com/docs/fusion-intro)
- [Clerk Authentication](https://clerk.com/docs)

For Storage we utilised a postgreSQL databse using Supabase.
- [Supabase](https://supabase.com/docs)

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) for more information.

## This project is deployed on Vercel

This is an easy and efficient way to deploy your Next.js app [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

- When Deploying be sure to specify your environment variables with regards to your clerk authentication keys and your Yelp API key. 
- You should also add your Suoabase DB connection string too.

## Your env.local file should contain the following
- API_KEY
- NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
- CLERK_SECRET_KEY
- DATABASE_URL

You may view the deployed app here: [Grumble](https://final-week-project.vercel.app/)
