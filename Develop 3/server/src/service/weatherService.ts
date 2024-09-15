import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  latitude: number;
  longitude: number;
}

class Weather {
  temperature: number;
  humidity: number;
  description: string;
  coordinates: Coordinates;

  constructor(temperature: number, humidity: number, description: string, coordinates: Coordinates) {
      this.temperature = temperature;
      this.humidity = humidity;
      this.description = description;
      this.coordinates = coordinates;
  }
}

class WeatherService {
  private apiKey: string;
  private baseURL: string;

  constructor(apiKey: string) {
      this.apiKey = apiKey;
      this.baseURL = 'https://api.openweathermap.org/data/2.5';
  }

  public async getWeatherByCity(city: string): Promise<Weather | null> {
      try {
          const response = await fetch(`${this.baseURL}/weather?q=${city}&appid=${this.apiKey}&units=metric`);
          const data = await response.json();
          if (data.cod !== 200) {
              throw new Error(data.message);
          }
          const coordinates: Coordinates = {
              latitude: data.coord.lat,
              longitude: data.coord.lon
          };
          return new Weather(data.main.temp, data.main.humidity, data.weather[0].description, coordinates);
      } catch (error) {
          console.error('Error fetching weather data:', error);
          return null;
      }
  }

  public async getWeatherByCoordinates(coordinates: Coordinates): Promise<Weather | null> {
      try {
          const response = await fetch(`${this.baseURL}/weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=${this.apiKey}&units=metric`);
          const data = await response.json();
          if (data.cod !== 200) {
              throw new Error(data.message);
          }
          return new Weather(data.main.temp, data.main.humidity, data.weather[0].description, coordinates);
      } catch (error) {
          console.error('Error fetching weather data:', error);
          return null;
      }
  }
}

export default new WeatherService('9f5a6aa2daa522156cf86b3e7ded068a');