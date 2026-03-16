// Open-Meteo API client optimized for Next.js Server Components
// No authentication required - free tier supports unlimited requests

const BASE_URL = "https://api.open-meteo.com/v1/forecast";

export interface CurrentWeather {
  temperature_2m: number;
  weather_code: number;
  wind_speed_10m: number;
  relative_humidity_2m: number;
  precipitation: number;
}

export interface DailyWeather {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  precipitation_probability_max: number[];
  weather_code: number[];
  wind_speed_10m_max: number[];
  cloud_cover_max: number[];
}

export interface WeatherData {
  current: CurrentWeather;
  daily: DailyWeather;
  timezone: string;
}

/**
 * Fetches current and forecast weather data from Open-Meteo API
 * Optimized for Next.js with automatic caching via ISR (Incremental Static Regeneration)
 * @param latitude - Optional latitude (default: -6.2088 for Jakarta)
 * @param longitude - Optional longitude (default: 106.8456 for Jakarta)
 * @returns Weather data with current conditions and 7-day forecast
 */
export async function getWeatherData(
  latitude: number = -6.2088,
  longitude: number = 106.8456
): Promise<WeatherData> {
  const url = new URL(BASE_URL);

  // Query parameters for current and forecast data
  url.searchParams.append("latitude", latitude.toString());
  url.searchParams.append("longitude", longitude.toString());

  // Current weather parameters
  url.searchParams.append(
    "current",
    "temperature_2m,weather_code,wind_speed_10m,relative_humidity_2m,precipitation"
  );

  // Daily forecast parameters (7 days)
  url.searchParams.append(
    "daily",
    "weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max,cloud_cover_max"
  );

  // Additional options
  url.searchParams.append("timezone", "auto");
  url.searchParams.append("forecast_days", "7");

  try {
    // Next.js fetch wrapper with ISR caching: revalidate every 3600 seconds (1 hour)
    const response = await fetch(url.toString(), {
      next: { revalidate: 3600 }, // Cache for 1 hour in ISR
    });

    if (!response.ok) {
      throw new Error(`Weather API error: ${response.statusText}`);
    }

    const data = await response.json();

    return {
      current: data.current,
      daily: data.daily,
      timezone: data.timezone,
    };
  } catch (error) {
    console.error("Failed to fetch weather data:", error);
    throw new Error("Unable to fetch weather data. Please try again later.");
  }
}

/**
 * Maps WMO weather codes to human-readable descriptions
 */
export function getWeatherDescription(code: number): string {
  const weatherCodes: Record<number, string> = {
    0: "Clear Sky",
    1: "Mostly Clear",
    2: "Partly Cloudy",
    3: "Overcast",
    45: "Foggy",
    48: "Foggy",
    51: "Light Drizzle",
    53: "Moderate Drizzle",
    61: "Slight Rain",
    63: "Moderate Rain",
    65: "Heavy Rain",
    71: "Slight Snow",
    80: "Light Rain Showers",
    82: "Heavy Rain Showers",
    85: "Slight Snow Showers",
    86: "Heavy Snow Showers",
    95: "Thunderstorm",
    96: "Thunderstorm with Hail",
    99: "Thunderstorm with Hail",
  };

  return weatherCodes[code] || "Unknown";
}

/**
 * Determines the appropriate weather icon and color based on WMO code
 */
export function getWeatherIcon(code: number): { emoji: string; color: string } {
  if (code === 0) return { emoji: "☀️", color: "text-yellow-400" };
  if ([1, 2].includes(code)) return { emoji: "⛅", color: "text-cyan-300" };
  if (code === 3) return { emoji: "☁️", color: "text-slate-400" };
  if ([45, 48].includes(code)) return { emoji: "🌫️", color: "text-slate-300" };
  if ([51, 53, 55, 61, 63, 65, 66, 67, 80, 81, 82].includes(code))
    return { emoji: "🌧️", color: "text-blue-500" };
  if ([71, 73, 75, 77, 85, 86].includes(code))
    return { emoji: "❄️", color: "text-blue-200" };
  if ([80, 81, 82].includes(code))
    return { emoji: "🌧️", color: "text-blue-600" };
  if ([95, 96, 99].includes(code))
    return { emoji: "⛈️", color: "text-purple-600" };

  return { emoji: "🌡️", color: "text-slate-500" };
}
