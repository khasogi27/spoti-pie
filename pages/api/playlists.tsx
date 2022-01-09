import { getPlaylists } from '../../lib/spotify';
import { getSession } from 'next-auth/react';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { token: { access_token } } = await getSession({ req });
  const response = await getPlaylists(access_token);
  const { items } = await response.json();

  return res.status(200).json({ items })
}

export default handler;