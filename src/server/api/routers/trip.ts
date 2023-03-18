import { z } from "zod";
import {createTRPCRouter, protectedProcedure} from "../trpc";

export const tripRouter = createTRPCRouter({
  getAllTrips: protectedProcedure
      .query(async ({ctx}) => {
        return await ctx.prisma.trip.findMany({
          select: {
            id: true,
            departureTime: true,
            departureLocation: true,
            arrivalTime: true,
            arrivalLocation: true,
            seats: true,
            price: true,
            passengers: true,
            driver: true
          }
        })
      }),

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
            driver: true
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

  create: protectedProcedure
      .input(
          z.object({
            departureTime: z.date(),
            arrivalTime: z.date(),
            departureLocation: z.string(),
            arrivalLocation: z.string(),
            price: z.number(),
            seats: z.number()
          })
      )
      .mutation(({ctx, input}) => {
        return ctx.prisma.trip.create({
          data: {
            departureTime: input.departureTime,
            arrivalTime: input.arrivalTime,
            departureLocation: input.departureLocation,
            arrivalLocation: input.arrivalLocation,
            price: input.price,
            seats: input.seats,
            driver: {
              connect: {
                id: ctx.session?.user?.id,
              },
            },
          },
        });
      })
});
