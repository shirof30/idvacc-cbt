import NextAuth, { NextAuthConfig } from "next-auth";
import { Provider } from "next-auth/providers";
import { prisma } from "@lib/prisma";
import { AdapterAccount, AdapterUser, type Adapter } from "next-auth/adapters";
import { PrismaClient } from "@prisma/client";
import { VATSIMData } from "./next-auth";

const CustomAdapter = (prisma: PrismaClient): Adapter => {
  return {
    createUser: async (user: AdapterUser & VATSIMData & { email: string }) => {
      await prisma.user.create({
        data: {
          cid: user.cid,
          name: user.name || user.personal.name_full,
          email: user.email || user.personal.email,
        }
      });
      return user;
    },
    updateUser: ({ id, ...data}) => prisma.user.update({
      where: { id },
      data: {
        ...data,
        name: data.name || ''
      }
    }) as unknown as Promise<AdapterUser>,
    getUser: id => prisma.user.findUnique({
      where: { id }
    }) as unknown as Promise<AdapterUser>,
    deleteUser: id => prisma.user.delete({
      where: { id }
    }) as unknown as Promise<AdapterUser>,
    getUserByAccount: async (provider_providerAccountId) => {
      const userData = await prisma.account.findUnique({
        where: {
          provider_providerAccountId
        },
        select: { user: true }
      })
      return (userData as unknown as AdapterUser) ?? null
    },
    getUserByEmail: async (email) => {
      const userData = await prisma.user.findUnique({
        where: {
          email: email
        }
      });
      return (userData as unknown as AdapterUser) ?? null;
    },
    linkAccount: data => prisma.account.create({
      data: {
        refreshToken: data.refresh_token,
        accessToken: data.access_token,
        provider: data.provider,
        providerAccountId: data.providerAccountId,
        type: data.type,
        userId: data.userId,
      }
    }) as unknown as AdapterAccount,
    unlinkAccount: (provider_providerAccountId) => prisma.account.delete({
      where: {
        provider_providerAccountId
      }
    }) as unknown as AdapterAccount,
  }
}


const providers: Provider[] = [
  {
    id: 'vatsim',
    name: 'VATSIM Connect SSO',
    type: 'oauth',
    issuer: 'https://vatsim.net',
    allowDangerousEmailAccountLinking: true,
    clientId: process.env.AUTH_CLIENT_ID_DEV, // DEVELOPMENT MODE
    clientSecret: process.env.AUTH_CLIENT_SECRET_DEV, // DEVELOPMENT MODE
    authorization: {
      url: `${process.env.AUTH_OAUTH_URL_DEV}/oauth/authorize?response_type=code`,
      params: {
        scope: 'full_name vatsim_details email',
      }
    },
    token: {
      url: `${process.env.AUTH_OAUTH_URL_DEV}/oauth/token`,
      params: {
        grant_type: 'authorization_code',
      }
    },
    userinfo: `${process.env.AUTH_OAUTH_URL_DEV}/api/user`,
    async profile(profile) {
      return {
        id: profile.data.cid,
        cid: profile.data.cid,
        name: profile.data.personal.name_full,
        user_details: profile.data.vatsim,
        email: profile.data.personal.email,
        emailVerified: true,
      }
    }
  }
]

export const providerMap = providers.map(provider => {
  if (typeof provider === 'function') {
    const providerData = provider()
    return { id: providerData.id, name: providerData.name }
  } else {
    return { id: provider.id, name: provider.name }
  }
})

export const authOptions: NextAuthConfig = {
  providers,
  adapter: CustomAdapter(prisma),
  callbacks: {
    async session({ session, token }) {
      session.user = token.data as any;
      return session;
    },
    async jwt({ token, profile, account }) {
      if (account && profile) {
        token.data = profile.data;
      }
      return token;
    },
    // async redirect({ baseUrl }) {
    //   return baseUrl
    // },    
    async authorized({ auth }) { 
      return !!auth
    },
  },
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/login',
    error: '/error',
  },
  secret: process.env.AUTH_SECRET
}

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions)