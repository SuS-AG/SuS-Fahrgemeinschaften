import { z } from "zod";
import {createTRPCRouter, publicProcedure} from "../trpc";
import * as crypto from 'crypto';

export const registerRouter = createTRPCRouter({
  register: publicProcedure
    .input(z.object({ email: z.string(), password: z.string() }))
    .mutation(({ input, ctx}) => {
      const password = input.password;

      // Creating a unique salt for a particular user
      const salt = crypto.randomBytes(16).toString('hex');

      // Hashing user's salt and password with 1000 iterations,
      const hash = crypto.pbkdf2Sync(
          password,
          salt,
          1000,
          64,
          'sha512'
      )
          .toString('hex');


      return ctx.prisma.user.create({
        data: {
          email: input.email,
          passwordHash: hash,
          passwordSalt: salt,
        }
      })
    })
})