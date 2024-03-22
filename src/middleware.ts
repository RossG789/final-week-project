// Allows us to set which pages will be public and which will need authentication to sign in to
import { authMiddleware } from "@clerk/nextjs";

// setting public routes
export default authMiddleware({
  // Currently our only public route is the homepage. Any new routes to be public will need to be specified.
  publicRoutes: ["/"],
});

// matching routes to see if accessible
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
