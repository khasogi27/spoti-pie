import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth, { NextAuthOptions } from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';

const {
  SPOTIFY_CLIENT_ID: client_id,
  SPOTIFY_CLIENT_SECRET: client_secret,
  SPOTIFY_REFRESH_TOKEN: refresh_token,
  NEXTAUTH_URL: next_secret
} = process.env;

export default NextAuth({
  providers: [
    SpotifyProvider({
      authorization:
        'https://accounts.spotify.com/authorize?scope=user-read-email,playlist-read-private',
      clientId: client_id as string,
      clientSecret: client_secret as string,
    }),
  ],
  callbacks: {
    async jwt({token, account}) {
      if (account) token.accessToken = account.refresh_token;
      return token;
    },
    async session(session: any, user: any) {
      session.user = user
      return session;
    },
  },
});