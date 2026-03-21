import { getWeatherData, getWeatherIcon, getWeatherDescription } from "@/lib/api";
import { getTempColor, getTempGradient, formatTemp, formatWindSpeed } from "@/lib/utils";
import { CloudRain, Droplets, Eye, Wind } from "lucide-react";

export default async function HomePage() {
  const data = await getWeatherData();
  const currentTemp = data.current.temperature_2m;
  const {
    temperature_2m: temp,
    weather_code: code,
    wind_speed_10m: wind,
    relative_humidity_2m: humidity,
    precipitation,
  } = data.current;

  const tempColors = getTempColor(currentTemp);
  const gradientBg = getTempGradient(currentTemp);
  const { emoji: weatherEmoji } = getWeatherIcon(code);
  const weatherDesc = getWeatherDescription(code);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
      {/* Hero Section - Main Temperature Display */}
      <section
        className={`relative rounded-[2rem] md:rounded-[3rem] p-8 md:p-16 bg-gradient-to-br ${gradientBg} border-4 border-white shadow-2xl overflow-hidden flex flex-col items-center justify-center min-h-[400px] md:min-h-[600px]`}
      >
        {/* Animated background element */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <svg
            viewBox="0 0 200 200"
            className="w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="5 5" />
            <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
          </svg>
        </div>

        {/* Weather icon */}
        {/* Weather icon */}
        <div className={`text-6xl md:text-9xl mb-4 md:mb-6 drop-shadow-lg animate-float`}>{weatherEmoji}</div>

        {/* Main temperature display */}
        <div className={`text-center z-10 mb-4 md:mb-6`}>
          <div className={`flex items-baseline justify-center gap-2 md:gap-3`}>
            <span className={`${tempColors.text} text-5xl md:text-7xl font-black tracking-tighter leading-none drop-shadow-lg`}>{formatTemp(temp)}</span>
            <span className="text-2xl md:text-4xl font-black drop-shadow-lg text-slate-800">°C</span>
          </div>

          {/* Weather condition badge */}
          <div className="mt-4 md:mt-6 inline-block px-6 md:px-8 py-2 md:py-3 bg-white/80 backdrop-blur-md shadow-xl rounded-full border-2 border-white">
            <p className="text-lg md:text-2xl font-bold text-slate-800">{weatherDesc}</p>
          </div>
        </div>

        {/* Quick info badges - Positioned for mobile */}
        <div className="w-full mt-6 md:mt-8 px-4 md:px-0 grid grid-cols-2 gap-3 md:gap-4 md:absolute md:bottom-8 md:left-8 md:right-8">
          {/* Wind */}
          <div className="bg-white/80 backdrop-blur-md shadow-lg rounded-xl md:rounded-2xl p-3 md:p-4 flex flex-col items-center justify-center transform -rotate-2 hover:rotate-0 transition-all duration-300 hover:shadow-xl">
            <Wind className="text-blue-500 mb-1 md:mb-2" size={24} strokeWidth={2.4} />
            <div className={`text-lg md:text-2xl font-black ${tempColors.text}`}>{formatWindSpeed(wind)}</div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-0.5 md:mt-1">Wind</div>
          </div>

          {/* Humidity */}
          <div className="bg-white/80 backdrop-blur-md shadow-lg rounded-xl md:rounded-2xl p-3 md:p-4 flex flex-col items-center justify-center transform rotate-1 hover:rotate-0 transition-all duration-300 hover:shadow-xl">
            <Droplets className="text-cyan-500 mb-1 md:mb-2" size={24} strokeWidth={2.4} />
            <div className={`text-lg md:text-2xl font-black text-cyan-600`}>{formatTemp(humidity)}</div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-0.5 md:mt-1">Humidity</div>
          </div>

          {/* Precipitation */}
          <div className="bg-white/80 backdrop-blur-md shadow-lg rounded-xl md:rounded-2xl p-3 md:p-4 flex flex-col items-center justify-center transform -rotate-1 hover:rotate-0 transition-all duration-300 hover:shadow-xl">
            <CloudRain className="text-emerald-500 mb-1 md:mb-2" size={24} strokeWidth={2.4} />
            <div className={`text-lg md:text-2xl font-black text-emerald-600`}>{formatTemp(precipitation)}</div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-0.5 md:mt-1">Rain</div>
          </div>

          {/* Visibility (simulated) */}
          <div className="bg-white/80 backdrop-blur-md shadow-lg rounded-xl md:rounded-2xl p-3 md:p-4 flex flex-col items-center justify-center transform rotate-2 hover:rotate-0 transition-all duration-300 hover:shadow-xl">
            <Eye className="text-purple-500 mb-1 md:mb-2" size={24} strokeWidth={2.4} />
            <div className={`text-lg md:text-2xl font-black text-purple-600`}>10</div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-0.5 md:mt-1">View</div>
          </div>
        </div>
      </section>

      {/* Secondary Information Cards */}
      <section className="grid md:grid-cols-3 gap-6">
        {/* Feels Like Temperature */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg border-2 border-blue-100 transform hover:scale-105 transition-all duration-300 hover:shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm uppercase tracking-widest font-bold text-slate-500">Feels Like</p>
            <span className="text-2xl">🌡️</span>
          </div>
          <div className="text-4xl font-black text-blue-600">{formatTemp(temp - 2)}°</div>
          <p className="text-xs text-slate-400 mt-2">Slightly cooler today</p>
        </div>

        {/* Tomorrow's Forecast Hint */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg border-2 border-cyan-100 transform hover:scale-105 transition-all duration-300 hover:shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm uppercase tracking-widest font-bold text-slate-500">Tomorrow</p>
            <span className="text-2xl">📈</span>
          </div>
          <div className="text-4xl font-black text-cyan-600">28°-32°</div>
          <p className="text-xs text-slate-400 mt-2">Warmer, mostly sunny</p>
        </div>

        {/* Air Quality Indicator */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg border-2 border-emerald-100 transform hover:scale-105 transition-all duration-300 hover:shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm uppercase tracking-widest font-bold text-slate-500">Air Quality</p>
            <span className="text-2xl">💨</span>
          </div>
          <div className="text-4xl font-black text-emerald-600">Good</div>
          <p className="text-xs text-slate-400 mt-2">Safe for outdoor activities</p>
        </div>
      </section>

      {/* Location & Update Info */}
      <section className="flex justify-between items-center bg-slate-900/5 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50">
        <div>
          <p className="text-xs uppercase tracking-widest font-bold text-slate-500 mb-1">Current Location</p>
          <p className="text-lg font-bold text-slate-900">Jakarta, Indonesia</p>
          <p className="text-xs text-slate-400">-6.2088° N, 106.8456° E</p>
        </div>
        <div className="text-right">
          <p className="text-xs uppercase tracking-widest font-bold text-slate-500 mb-1">Last Update</p>
          <p className="text-sm font-mono text-slate-600">Just now</p>
          <p className="text-xs text-slate-400">Auto-refresh every hour</p>
        </div>
      </section>

      {/* Call to action */}
      <section className="text-center py-8">
        <p className="text-slate-500 text-sm font-medium mb-4">
          👉 Explore more insights on the <strong>Forecast</strong> and <strong>Stats</strong> pages
        </p>
      </section>
    </div>
  );
}
