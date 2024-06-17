import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { code } = req.body;
    const filePath = path.join(process.cwd(), 'generatedCodes.txt');

    fs.appendFile(filePath, `${code}\n`, (err) => {
      if (err) {
        console.error('Error writing to file', err);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
      }
      res.status(200).json({ success: true });
    });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
