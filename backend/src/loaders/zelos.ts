import Zelos from '../services/zelos';

export default async (): Promise<Zelos> => {
  const instance = new Zelos();
  try {
    await instance.auth();
  } catch (err) {
    throw err;
  }
  return instance;
};
