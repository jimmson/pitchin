import Zelos from '../services/zelos';
import OpenWeatherMap from '../services/openweather';

const latCapeTown = '-33.9258';
const lonCapeTown = '18.4232';

export default async (): Promise<OpenWeatherMap> => {
  const instance = new OpenWeatherMap(latCapeTown, lonCapeTown);
  try {
    await instance.update();
  } catch (err) {
    throw err;
  }
  return instance;
};
