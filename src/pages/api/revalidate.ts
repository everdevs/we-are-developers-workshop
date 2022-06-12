import type { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = JSON.parse(req.body);

    await Promise.all([
      res.unstable_revalidate('/'),
      res.unstable_revalidate(`/${id}`),
    ]);

    return res.json({ revalidated: true });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send('Error revalidating');
  }
}

export default handler;
