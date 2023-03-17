import { z } from "zod";
import {createTRPCRouter, protectedProcedure} from "../trpc";

export const tripRouter = createTRPCRouter({
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
