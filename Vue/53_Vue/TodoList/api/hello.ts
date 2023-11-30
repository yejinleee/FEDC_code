import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function (req: VercelRequest, res: VercelResponse) {
  res.status(200).json({
    name: 'yj',
    age: 20,
    isValid: true,
  });
}
