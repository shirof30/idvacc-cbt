import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

const codesFilePath = path.join(process.cwd(), 'codes.txt');

const storeCode = (req: NextApiRequest, res: NextApiResponse) => {
  const { code, name, idNumber } = req.body;

  if (!code || !name || !idNumber) {
    return res.status(400).json({ success: false, message: 'Code, name, and ID number are required' });
  }

  const codeData = { code, name, idNumber };

  fs.appendFile(codesFilePath, JSON.stringify(codeData) + '\n', (err) => {
    if (err) {
      console.error('Error storing code:', err);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }

    return res.status(200).json({ success: true, message: 'Code stored successfully' });
  });
};

export default storeCode;
