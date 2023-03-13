import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { env } from "../../../env/server.mjs";
//import uploadFile from "../../../utils/upload-file";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

const profileInclude = {
  header: true,
  avatar: true,
};

export const profileRouter = createTRPCRouter({
  me: protectedProcedure.query(({ ctx }) => {
    if (ctx.session?.user?.id) {
      return ctx.prisma.user.findUnique({
        where: {
          id: ctx.session.user.id,
        },
        select: {
          id: true,
          email: true,
          firstname: true,
          lastname: true,
          phoneNumber: true,
        },
      });
    }

    return null;
  }),

  getById: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const id = ctx.session.user.id;
      console.log(id);
      const user = await ctx.prisma.user.findUnique({
        where: { id: input.id },
        select: {
          id: true,
          email: true,
          password: true,
          firstname: true,
          lastname: true,
          phoneNumber: true,
        },
      });

      return user;
    }),

  completeProfile: protectedProcedure
    .input(
      z.object({
        firstname: z.string(),
        lastname: z.string(),
        phoneNumber: z.string(),
      })
    )
    .mutation(({ input, ctx }) => {
      if (ctx.session?.user?.id) {
        return ctx.prisma.user.update({
          where: { id: ctx.session.user.id },
          data: {
            firstname: input.firstname,
            lastname: input.lastname,
            phoneNumber: input.phoneNumber,
          },
        });
      }
    }),
});
