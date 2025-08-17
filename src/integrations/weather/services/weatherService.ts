import axios from "axios";
import { envs } from "@config/envs";
import { cache } from "@config/cache";

export const getWeatherByCoords = async (lat: number, lon: number) => {
  const cacheKey = `weather-${lat}-${lon}`;

  const cached = cache.get(cacheKey);
  if (cached) return cached;

  const url = `${envs.OWM_API_URL}?lat=${lat}&lon=${lon}&appid=${envs.OWM_API_KEY}`;

  const response = await axios.get(url);
  const weatherData = response.data;

  cache.set(cacheKey, weatherData);

  return weatherData;
};

export const weatherService = { getWeatherByCoords };
