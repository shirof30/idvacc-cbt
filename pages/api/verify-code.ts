import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { code } = req.body;
    const filePath = path.join(process.cwd(), 'generatedCodes.txt');

    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading file', err);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
      }

      const codes = data.split('\n').filter(Boolean); // Split and filter out empty lines
      if (codes.includes(code)) {
        res.status(200).json({ success: true, message: 'Valid Code' });
      } else {
        res.status(400).json({ success: false, message: 'Invalid Code' });
      }
    });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
