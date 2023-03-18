import { z } from "zod";
import {createTRPCRouter, publicProcedure} from "../trpc";
import {pbkdf2Sync, randomBytes} from 'crypto';

const validateEmail = (email: string | null | undefined) => {
  if (!email) return false;

  const re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  return re.test(email);
}


const validatePassword = (password: string | null | undefined) => {
  if (!password) return false;

  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return re.test(password);
}

export const registerRouter = createTRPCRouter({
  register: publicProcedure
    .input(z.object({ email: z.string(), password: z.string() }))
    .mutation(({ input, ctx}) => {
      // 1. validate input
      if (!validateEmail(input.email)) throw new Error('Invalid email')
      if (!validatePassword(input.password)) throw new Error('Invalid password')

      // 2. hash password
      const salt = randomBytes(16).toString('hex')
      const hash = pbkdf2Sync(
          input.password,
          salt,
          10000,
          64,
          'sha512'
      )
          .toString('hex')

      // 3. save user to db
      return ctx.prisma.user.create({
        data: {
          email: input.email,
          passwordHash: hash,
          passwordSalt: salt,
        }
      })
    })
})