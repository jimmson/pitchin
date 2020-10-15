import Organisation from '../services/organisation';

export default async (): Promise<Organisation> => {
  const instance = new Organisation();
  return instance;
};
