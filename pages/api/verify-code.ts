import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

const codesFilePath = path.join(process.cwd(), 'codes.txt');

const verifyCode = (req: NextApiRequest, res: NextApiResponse) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ success: false, message: 'Code is required' });
  }

  fs.readFile(codesFilePath, 'utf-8', (err, data) => {
    if (err) {
      console.error('Error reading codes file:', err);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }

    const codes = data.split('\n').filter(Boolean).map((line) => JSON.parse(line));
    const codeData = codes.find((item) => item.code === code);

    if (codeData) {
      return res.status(200).json({ success: true, name: codeData.name, idNumber: codeData.idNumber });
    } else {
      return res.status(400).json({ success: false, message: 'Invalid code' });
    }
  });
};

export default verifyCode;
