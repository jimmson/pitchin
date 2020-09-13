import jwt from 'jsonwebtoken';
import config from '../config';
import { IPayload } from '../interfaces/IAuth';

export default function (req: any, res: any, next: any) {
  const token = req.headers['x-access-token'] || req.headers['authorization'];
  if (!token) return res.status(401).send('Come back with a warrant');
  try {
    const decoded: IPayload = <IPayload>jwt.verify(token, <string>config.jwt.privateKey);
    if (decoded.admin) {
      next();
    } else {
      res.status(401).send('This endpoint requires admin permissions');
    }
  } catch (ex) {
    res.status(401).send('Token expired');
  }
}
