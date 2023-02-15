import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import { env } from "../../../env/server.mjs";
import { prisma } from "../../../server/db";
import omit from "../../../utils/omit";

export const authOptions: NextAuthOptions = {
  callbacks: {
    // FIXME: This doesn't work, the account and user is always null
    jwt({token, account}) {
      if (account) token.id = account.userId;
      return token;
    }
  },
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "E-Mail", type: "text", placeholder: "example@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const email =  credentials.email;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const password = credentials.password;

        const user = await prisma.user.findUnique({
          where: {
            email: email,
          },
          select: {
            id: true,
            email: true,
            password: true,
            firstName: true,
            lastName: true,
            phoneNumber: true,
          }
        });

        console.log(JSON.stringify(user));

        if (user && user.password === password) {
          console.log(password)
          return omit(user, 'password');
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
    /**
     * ...add more providers here
     *
     * Most other providers require a bit more work than the Discord provider.
     * For example, the GitHub provider requires you to add the
     * `refresh_token_expires_in` field to the Account model. Refer to the
     * NextAuth.js docs for the provider you want to use. Example:
     * @see https://next-auth.js.org/providers/github
     */
  ],
  pages: {
    signIn: '/auth/signin',
    // signOut: '/auth/signout',
  },
  session: {
    strategy: 'jwt'
  },
  secret: env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
