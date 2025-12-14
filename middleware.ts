import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    '/', // Home page
    '/about',
    '/contact',
    '/collections',
    '/all-products',
    '/product/(.*)', // for dynamic product pages
    '/api/(.*)',     // if you have public API routes
  ],
});

export const config = {
  matcher: [
    '/((?!_next|.*\\..*).*)',
    '/(api|trpc)(.*)',
  ],
};