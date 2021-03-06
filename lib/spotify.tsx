const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
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