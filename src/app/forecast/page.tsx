import { getWeatherData, getWeatherIcon } from "@/lib/api";
import { getDayOfWeek, formatDate } from "@/lib/utils";
import ForecastChart from "@/components/charts/ForecastChart";
import { Cloud, Droplets, Wind, Zap } from "lucide-react";

export default async function ForecastPage() {
  const data = await getWeatherData();

  // Process daily forecast data for visualization
  const dailyForecasts = data.daily.time.slice(0, 7).map((date, idx) => ({
    day: getDayOfWeek(date),
    date: formatDate(date),
    max: Math.round(data.daily.temperature_2m_max[idx]),
    min: Math.round(data.daily.temperature_2m_min[idx]),
    precip: Math.round(data.daily.precipitation_probability_max[idx]),
    code: data.daily.weather_code[idx],
    wind: Math.round(data.daily.wind_speed_10m_max[idx]),
    cloud: Math.round(data.daily.cloud_cover_max[idx]),
  }));

  // Chart data for Recharts (5-day view)
  const chartData = dailyForecasts.slice(0, 5).map((f) => ({
    day: f.day,
    max: f.max,
    min: f.min,
    precip: f.precip,
  }));

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
      {/* Page Header */}
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white/60 backdrop-blur-md rounded-3xl p-8 shadow-sm border-2 border-cyan-100">
        <div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-2">7-Day Outlook</h1>
          <p className="text-slate-500 font-medium">Track weather patterns and trends</p>
        </div>
        <div className="text-4xl">📅</div>
      </header>

      {/* Temperature Trend Chart */}
      <section className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 md:px-8 py-4 md:py-6 flex items-center gap-3">
          <span className="text-2xl">📈</span>
          <h2 className="text-xl md:text-2xl font-bold">Temperature Trends</h2>
        </div>
        <div className="h-80 md:h-96 p-4 md:p-6">
          <ForecastChart data={chartData} variant="area" />
        </div>
        <div className="px-6 md:px-8 py-4 bg-slate-50 border-t border-slate-100">
          <p className="text-center text-sm text-slate-600 font-medium">
            ✨ 5-day temperature progression with smooth trends
          </p>
        </div>
      </section>

      {/* 7-Day Daily Cards Grid */}
      <section className="space-y-4">
        <h2 className="text-2xl font-black text-slate-900 px-4">Daily Breakdown</h2>

        <div className="grid gap-4">
          {dailyForecasts.map((forecast, idx) => {
            const { emoji, color } = getWeatherIcon(forecast.code);
            const isToday = idx === 0;

            return (
              <div
                key={idx}
                className={`rounded-2xl p-6 border-2 shadow-md transition-all duration-300 hover:shadow-lg hover:scale-102 ${
                  isToday
                    ? "bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200"
                    : "bg-white/70 backdrop-blur-sm border-white hover:bg-white"
                }`}
              >
                {/* Daily forecast card content */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  {/* Day info */}
                  <div className="flex items-center gap-4 min-w-max">
                    <div>
                      <div className={`text-3xl font-black ${color}`}>{emoji}</div>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">
                        {isToday ? "Today" : forecast.day}
                      </p>
                      <p className="text-lg font-bold text-slate-900">{forecast.date}</p>
                    </div>
                  </div>

                  {/* Temperature range */}
                  <div className="flex items-center gap-8 md:gap-12">
                    <div className="text-center">
                      <p className="text-xs uppercase tracking-widest font-bold text-slate-500 mb-2">
                        High
                      </p>
                      <p className="text-3xl font-black text-orange-600">{forecast.max}°</p>
                    </div>

                    <div className="hidden md:block w-px h-12 bg-slate-200" />

                    <div className="text-center">
                      <p className="text-xs uppercase tracking-widest font-bold text-slate-500 mb-2">
                        Low
                      </p>
                      <p className="text-3xl font-black text-blue-600">{forecast.min}°</p>
                    </div>

                    {/* Weather details icons */}
                    <div className="hidden md:flex gap-4 ml-6">
                      {/* Precipitation */}
                      <div className="flex flex-col items-center justify-center bg-slate-100/50 rounded-lg p-3 min-w-max">
                        <Droplets size={20} className="text-blue-500 mb-1" strokeWidth={2.2} />
                        <p className="text-xs font-bold text-slate-600">{forecast.precip}%</p>
                      </div>

                      {/* Wind */}
                      <div className="flex flex-col items-center justify-center bg-slate-100/50 rounded-lg p-3 min-w-max">
                        <Wind size={20} className="text-cyan-500 mb-1" strokeWidth={2.2} />
                        <p className="text-xs font-bold text-slate-600">{forecast.wind} km/h</p>
                      </div>

                      {/* Cloud cover */}
                      <div className="flex flex-col items-center justify-center bg-slate-100/50 rounded-lg p-3 min-w-max">
                        <Cloud size={20} className="text-slate-400 mb-1" strokeWidth={2.2} />
                        <p className="text-xs font-bold text-slate-600">{forecast.cloud}%</p>
                      </div>
                    </div>
                  </div>

                  {/* Today badge */}
                  {isToday && (
                    <div className="md:hidden flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-full font-bold text-sm">
                      <Zap size={16} strokeWidth={2.5} />
                      Current
                    </div>
                  )}
                </div>

                {/* Mobile weather details row */}
                <div className="md:hidden flex gap-3 mt-4 pt-4 border-t border-slate-200">
                  <div className="flex items-center gap-2">
                    <Droplets size={16} className="text-blue-500" strokeWidth={2.2} />
                    <span className="text-xs font-bold text-slate-600">{forecast.precip}%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Wind size={16} className="text-cyan-500" strokeWidth={2.2} />
                    <span className="text-xs font-bold text-slate-600">{forecast.wind} km/h</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Cloud size={16} className="text-slate-400" strokeWidth={2.2} />
                    <span className="text-xs font-bold text-slate-600">{forecast.cloud}%</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Weather Insights */}
      <section className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 border-2 border-purple-200 shadow-lg">
        <h3 className="text-2xl font-black text-slate-900 mb-6">📊 Weekly Insights</h3>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Warmest day */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-md">
            <p className="text-xs uppercase tracking-widest font-bold text-slate-500 mb-3">Warmest Day</p>
            <p className="text-3xl font-black text-orange-600 mb-2">
              {Math.max(...dailyForecasts.map((f) => f.max))}°
            </p>
            <p className="text-sm text-slate-600">
              {
                dailyForecasts[
                  dailyForecasts.findIndex((f) => f.max === Math.max(...dailyForecasts.map((d) => d.max)))
                ].day
              }
            </p>
          </div>

          {/* Coolest day */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-md">
            <p className="text-xs uppercase tracking-widest font-bold text-slate-500 mb-3">Coolest Day</p>
            <p className="text-3xl font-black text-blue-600 mb-2">
              {Math.min(...dailyForecasts.map((f) => f.min))}°
            </p>
            <p className="text-sm text-slate-600">
              {
                dailyForecasts[
                  dailyForecasts.findIndex((f) => f.min === Math.min(...dailyForecasts.map((d) => d.min)))
                ].day
              }
            </p>
          </div>

          {/* Highest rain chance */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-md">
            <p className="text-xs uppercase tracking-widest font-bold text-slate-500 mb-3">Rainy Chance</p>
            <p className="text-3xl font-black text-slate-600 mb-2">
              {Math.max(...dailyForecasts.map((f) => f.precip))}%
            </p>
            <p className="text-sm text-slate-600">
              {
                dailyForecasts[
                  dailyForecasts.findIndex((f) => f.precip === Math.max(...dailyForecasts.map((d) => d.precip)))
                ].day
              }
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
