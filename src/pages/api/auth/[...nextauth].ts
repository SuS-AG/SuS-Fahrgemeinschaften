import NextAuth, {type NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {PrismaAdapter} from "@next-auth/prisma-adapter";
import {env} from "../../../env/server.mjs";
import {prisma} from "../../../server/db";
import omit from "../../../utils/omit";
import {pbkdf2Sync} from 'crypto';
import type {BinaryLike} from "crypto";

export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({session, token}) => {
      if (session?.user) {
        session.user.id = token.uid as string;
      }
      return session;
    },
    jwt: ({user, token}) => {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
  },
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {label: "E-Mail", type: "text", placeholder: "example@example.com"},
        password: {label: "Password", type: "password"},
      },
      async authorize(credentials) {
        if (!credentials) return null;
        const email = credentials.email;
        const password = credentials.password;

        const user = await prisma.user.findUnique({
          where: { email },
          select: {
            id: true,
            email: true,
            passwordHash: true,
            passwordSalt: true,
            firstname: true,
            lastname: true,
            phoneNumber: true,
          }
        });

        if (!user) return null;
        if (!user.passwordHash || !user.passwordSalt) return null;

        const inputHash = pbkdf2Sync(
            password,
            user.passwordSalt as BinaryLike,
            10000,
            64,
            'sha512'
        )
            .toString('hex');

        if (user.passwordHash === inputHash) {
          return omit(user, 'passwordHash', 'passwordSalt');
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
