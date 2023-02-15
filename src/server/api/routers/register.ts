import { z } from "zod";
import {createTRPCRouter, publicProcedure} from "../trpc";

export const registerRouter = createTRPCRouter({
  register: publicProcedure
    .input(z.object({ email: z.string(), password: z.string() }))
    .mutation(({ input, ctx}) => {
      return ctx.prisma.user.create({
        data: {
          email: input.email,
          password: input.password
        }
      })
    })
})