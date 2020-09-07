import Zelos from '../services/zelos';
import log from './logger';

export default async (): Promise<Zelos> => {
  const instance = new Zelos();
  await instance.auth();
  return instance;
};
