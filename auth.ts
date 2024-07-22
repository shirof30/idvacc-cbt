import NextAuth, { NextAuthConfig } from "next-auth";
import { Provider } from "next-auth/providers";

const providers: Provider[] = [
  {
    id: 'vatsim',
    name: 'VATSIM Connect SSO',
    type: 'oauth',
    issuer: 'https://vatsim.net',
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
        name: profile.data.full_name,
        user_details: profile.data.vatsim_details,
        email: profile.data.email,
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
    async redirect({ baseUrl }) {
      return baseUrl
    },
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
  secret: process.env.AUTH_SECRET,
}

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions)