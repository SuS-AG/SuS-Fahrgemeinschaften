import {z} from "zod";
import {createTRPCRouter, protectedProcedure} from "../trpc";

export const profileRouter = createTRPCRouter({
  me: protectedProcedure.query(({ctx}) => {
    if (ctx.session?.user?.id) {
      return ctx.prisma.user.findUnique({
        where: {
          id: ctx.session.user.id,
        }, select: {
          id: true, email: true, firstname: true, lastname: true, phoneNumber: true,
        },
      });
    }

    return null;
  }),

  getById: protectedProcedure
      .input(z.object({
        id: z.string(),
      }))
      .query(async ({ctx, input}) => {
        return await ctx.prisma.user.findUnique({
          where: {id: input.id}, select: {
            id: true, email: true, firstname: true, lastname: true, phoneNumber: true,
          },
        });
      }),

  completeProfile: protectedProcedure
      .input(z.object({
        firstname: z.string(), lastname: z.string(), phoneNumber: z.string(),
      }))
      .mutation(({input, ctx}) => {
        if (!ctx.session?.user?.id) throw new Error('Not logged in');
        const id = ctx.session.user.id;
        console.log('id', id);
        console.log('input', input);

        return ctx.prisma.user.update({
          where: { id },
          data: {
            firstname: input.firstname,
            lastname: input.lastname,
            phoneNumber: input.phoneNumber,
          },
        });
      }),

  editProfile: protectedProcedure
      .input(z.object({
        firstname: z.string(), lastname: z.string(), phonenumber: z.string(), email: z.string(),
      }))
      .mutation(({input, ctx}) => {
        if (!ctx.session?.user?.id) throw new Error('Not logged in');

        return ctx.prisma.user.update({
          where: {
            id: ctx.session.user.id,
          }, data: {
            firstname: input.firstname, lastname: input.lastname, phoneNumber: input.phonenumber, email: input.email,
          },
        });
      }),

});
