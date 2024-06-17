import { NextApiRequest, NextApiResponse } from 'next';

const codes: { [key: string]: string } = {}; // Same object used in `store-code.ts`

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { code } = req.query;

  if (!code || Array.isArray(code)) {
    return res.status(400).json({ error: 'Invalid code' });
  }

  const isValid = !!codes[code];

  return res.status(200).json({ valid: isValid });
}
