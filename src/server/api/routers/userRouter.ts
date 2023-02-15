import {createTRPCRouter, publicProcedure} from "../trpc";

export const userRouter = createTRPCRouter({
  me: publicProcedure
    .query(({ctx}) => {
      if (ctx.session?.user?.email) {
        return ctx.prisma.user.findUnique({
          where: {
            email: ctx.session.user.email
          },
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            phoneNumber: true,
          }
        })
      }

      return null;
    })
})