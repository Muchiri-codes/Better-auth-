
import { Pool } from "pg";
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from "../generated/prisma/client";
import { betterAuth } from "better-auth";
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { nextCookies } from 'better-auth/next-js'

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({adapter});
export const auth = betterAuth({
  database: prismaAdapter(prisma,
    {
      provider: "postgresql"
    }),
    user:{
      additionalFields:{
        role:{
          type:"string",
          defaultValue:"USER",
          input:false
        }
      }
    },
  emailAndPassword: {
    enabled: true
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET_ID as string
    },
  },
  plugins: [nextCookies()],
});
