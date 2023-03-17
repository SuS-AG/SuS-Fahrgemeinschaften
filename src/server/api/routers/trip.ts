import { array, z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const tripRouter = createTRPCRouter({
  getById: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const trip = await ctx.prisma.trip.findUnique({
        where: { id: input.id },
        select: {
          id: true,
          departureTime: true,
          departureLocation: true,
          arrivalTime: true,
          arrivalLocation: true,
          seats: true,
          price: true,
          passengers: true,
        },
      });

      return trip;
    }),

  addPassengerToTrip: protectedProcedure
    .input(
      z.object({
        tripId: z.string(),
        passengerId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.trip.update({
        where: {
          id: input.tripId,
        },
        data: {
          passengers: {
            connect: {
              id: input.passengerId,
            },
          },
        },
      });
    }),
});
