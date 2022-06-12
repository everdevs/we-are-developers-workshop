import type { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log('req.body --->', JSON.stringify(JSON.parse(req.body), null, 2));
    const { id } = JSON.parse(req.body);

    await res.unstable_revalidate('/');
    await res.unstable_revalidate(`/${id}`);

    return res.json({ revalidated: true });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send('Error revalidating');
  }
}

export default handler;
