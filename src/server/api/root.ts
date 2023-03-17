import { createTRPCRouter } from "./trpc";
import {registerRouter} from "./routers/register";
import { profileRouter } from "./routers/profile";
import {tripRouter} from "./routers/trip";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  register: registerRouter,
  profile: profileRouter,
  trip: tripRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
