import NextAuth from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';
import { getSession } from 'next-auth/react';

const { SPOTIFY_CLIENT_ID: client_id, SPOTIFY_CLIENT_SECRET: client_secret, SPOTIFY_REFRESH_TOKEN: refresh_token } = process.env;
const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const PLAYLISTS_ENDPOINT = 'https://api.spotify.com/v1/me/playlists';

const getToken = async (refresh_token: any) => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token,
    })
  })
  return response.json();
}

export const getPlaylists = async (refresh_token: any) => {
  const { access_token } = await getToken(refresh_token);
  return fetch(PLAYLISTS_ENDPOINT, { headers: { Authorization: `Bearer ${access_token}` } });
}

export const Handler = async (req: any, res: any) => {
  const { token: { access_token } } = await getSession({ req });
  const response = await getPlaylists(access_token);
  const { items } = await response.json();

  return res.status(200).json({ items })
}

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
    async session({session, user}) {
      session.user = user
      return session;
    },
  },
});