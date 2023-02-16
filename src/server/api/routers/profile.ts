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

    getById: protectedProcedure
        .input(
            z.object({
                id: z.string(),
            })
        )
        .query(async ({ ctx, input }) => {
            const user = await ctx.prisma.user.findUnique({
                where: { id: input.id },
                select: { 
                    id: true,
                    email: true,
                    password: true,
                    firstname: true,
                    lastname: true,
                    phoneNumber: true,
                 }
              });
        
              return user;

        }),

        me: publicProcedure
        .input(z.object({vorname: z.string(), nachname: z.string(), telefonnummer: z.string()}))
        .mutation(({input, ctx}) => {
            return ctx.prisma.user.update({
                where:{
                    id: 
                }
            })
            
        })
    });
