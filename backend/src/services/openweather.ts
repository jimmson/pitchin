import { Service, Inject } from 'typedi';
import axios from 'axios';
import config from '../config';
import { IWeatherData } from '../interfaces/IOpenWeatherMap';

@Service()
export default class OpenWeatherMap {
  private static baseURL = `https://api.openweathermap.org/data/2.5/onecall`;
  private apiKey: string;
  private lat: string;
  private lon: string;
  private data: any;

  constructor(lat: string, lon: string) {
    this.apiKey = config.openWeatherMap.apiKey;
    this.lat = lat;
    this.lon = lon;
  }

  async update() {
    const res = await axios.get(
      `${OpenWeatherMap.baseURL}?lat=${this.lat}&lon=${this.lon}&appid=${this.apiKey}&units=metric`,
    );
    this.data = res.data;
  }

  weatherData(): IWeatherData {
    return this.data;
  }
}
