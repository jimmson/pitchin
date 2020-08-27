import jwt from 'jsonwebtoken';
import config from '../config';

export default function (req: any, res: any, next: any) {
  const token = req.headers['x-access-token'] || req.headers['authorization'];
  if (!token) return res.status(401).send('Come back with a warrant');
  try {
    const decoded = jwt.verify(token, <string>config.jwt.privateKey);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(401).send('Token expired');
  }
}
