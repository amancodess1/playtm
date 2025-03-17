import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phone: { label: "Phone number", type: "text", placeholder: "1231231231" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.phone || !credentials?.password) {
          throw new Error("Missing phone number or password");
        }
        
        const existingUser = await db.user.findFirst({
          where: { number: credentials.phone },
        });
        
        if (existingUser) {
          const passwordValid = await bcrypt.compare(credentials.password, existingUser.password);
          if (passwordValid) {
            return { 
              id: existingUser.id.toString(), 
              name: existingUser.name, 
              email: existingUser.number 
            };
          }
          throw new Error("Invalid password");
        }
        
        throw new Error("No account found with this phone number");
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    // signUp: '/auth/signup', // NextAuth doesn't have a built-in signUp page configuration
    error: '/auth/signin', // Error code passed in query string as ?error=
  },
  secret: process.env.JWT_SECRET || "secret",
  callbacks: {
    async session({ token, session }) {
      if (session?.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
};