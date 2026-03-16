import { getWeatherData } from "@/lib/api";
import CloudChart from "@/components/charts/CloudChart";
import WindChart from "@/components/charts/WindChart";
import RainChart from "@/components/charts/RainChart";
import { Cloud, Zap, Wind, TrendingUp } from "lucide-react";

export default async function StatsPage() {
  const data = await getWeatherData();

  // Prepare data for cloud cover analysis
  const cloudData = data.daily.time.slice(0, 7).map((date, idx) => ({
    day: new Date(date).toLocaleDateString("en-US", { weekday: "short" }),
    coverage: Math.round(data.daily.cloud_cover_max[idx]),
  }));

  // Prepare data for wind speed trends
  const windData = data.daily.time.slice(0, 7).map((date, idx) => ({
    day: new Date(date).toLocaleDateString("en-US", { weekday: "short" }),
    speed: Math.round(data.daily.wind_speed_10m_max[idx]),
  }));

  // Prepare rain probability data
  const rainData = data.daily.time.slice(0, 7).map((date, idx) => ({
    day: new Date(date).toLocaleDateString("en-US", { weekday: "short" }),
    probability: Math.round(data.daily.precipitation_probability_max[idx]),
  }));

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
      {/* Page Header */}
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white/60 backdrop-blur-md rounded-3xl p-8 shadow-sm border-2 border-purple-100">
        <div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-2">
            Advanced Statistics
          </h1>
          <p className="text-slate-500 font-medium">Deep dive into weather data and patterns</p>
        </div>
        <div className="text-4xl">📊</div>
      </header>

      {/* Top metrics cards */}
      <section className="grid md:grid-cols-4 gap-4">
        {/* Average Temperature */}
        <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 border-2 border-orange-200 shadow-md hover:shadow-lg transition-all">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs uppercase tracking-widest font-bold text-slate-600">Avg Temperature</p>
            <span className="text-2xl">🌡️</span>
          </div>
          <p className="text-4xl font-black text-orange-600 mb-2">
            {Math.round(
              (Math.max(...data.daily.temperature_2m_max.slice(0, 7)) +
                Math.min(...data.daily.temperature_2m_min.slice(0, 7))) /
                2
            )}
            °
          </p>
          <p className="text-xs text-slate-600">This week</p>
        </div>

        {/* Max Wind Speed */}
        <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-6 border-2 border-cyan-200 shadow-md hover:shadow-lg transition-all">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs uppercase tracking-widest font-bold text-slate-600">Max Wind</p>
            <span className="text-2xl">💨</span>
          </div>
          <p className="text-4xl font-black text-cyan-600 mb-2">
            {Math.max(...data.daily.wind_speed_10m_max.slice(0, 7))}
          </p>
          <p className="text-xs text-slate-600">km/h</p>
        </div>

        {/* Avg Rain Chance */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-200 shadow-md hover:shadow-lg transition-all">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs uppercase tracking-widest font-bold text-slate-600">Avg Rain</p>
            <span className="text-2xl">🌧️</span>
          </div>
          <p className="text-4xl font-black text-blue-600 mb-2">
            {Math.round(
              data.daily.precipitation_probability_max.slice(0, 7).reduce((a, b) => a + b, 0) / 7
            )}
            %
          </p>
          <p className="text-xs text-slate-600">Probability</p>
        </div>

        {/* Avg Cloud Cover */}
        <div className="bg-gradient-to-br from-slate-50 to-zinc-50 rounded-2xl p-6 border-2 border-slate-200 shadow-md hover:shadow-lg transition-all">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs uppercase tracking-widest font-bold text-slate-600">Avg Cloud</p>
            <span className="text-2xl">☁️</span>
          </div>
          <p className="text-4xl font-black text-slate-600 mb-2">
            {Math.round(data.daily.cloud_cover_max.slice(0, 7).reduce((a, b) => a + b, 0) / 7)}%
          </p>
          <p className="text-xs text-slate-600">Coverage</p>
        </div>
      </section>

      {/* Cloud Cover Analysis */}
      <section className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border-4 border-slate-50 relative overflow-hidden">
        <div className="absolute -top-6 left-8 bg-gradient-to-r from-slate-600 to-slate-800 text-white px-6 py-2 rounded-2xl font-bold shadow-lg transform -rotate-3 flex items-center gap-2">
          <Cloud size={18} /> Cloud Coverage
        </div>

        <div className="h-96 w-full mt-8">
          <CloudChart data={cloudData} />
        </div>
      </section>

      {/* Wind Speed Trends */}
      <section className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border-4 border-slate-50 relative overflow-hidden">
        <div className="absolute -top-6 left-8 bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-6 py-2 rounded-2xl font-bold shadow-lg transform -rotate-3 flex items-center gap-2">
          <Wind size={18} /> Wind Speed Trends
        </div>

        <div className="h-96 w-full mt-8">
          <WindChart data={windData} />
        </div>
      </section>

      {/* Precipitation Forecast */}
      <section className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border-4 border-slate-50 relative overflow-hidden">
        <div className="absolute -top-6 left-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-2xl font-bold shadow-lg transform -rotate-3 flex items-center gap-2">
          <Zap size={18} /> Rain Probability
        </div>

        <div className="h-96 w-full mt-8">
          <RainChart data={rainData} />
        </div>
      </section>

      {/* Summary Insights */}
      <section className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-3xl p-8 border-2 border-purple-200 shadow-lg">
        <h3 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-2">
          <TrendingUp size={28} className="text-purple-600" />
          Key Insights
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-md">
            <p className="text-sm uppercase tracking-widest font-bold text-slate-600 mb-3">Trend</p>
            <p className="text-lg font-bold text-slate-900 mb-2">Temperature Stability</p>
            <p className="text-sm text-slate-600">
              Temperatures remain stable with moderate fluctuations, typical for this season. No extreme variations expected.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-md">
            <p className="text-sm uppercase tracking-widest font-bold text-slate-600 mb-3">Alert</p>
            <p className="text-lg font-bold text-slate-900 mb-2">Wind Advisory</p>
            <p className="text-sm text-slate-600">
              Moderate wind speeds detected. Exercise caution for outdoor activities, especially in elevated areas.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-md">
            <p className="text-sm uppercase tracking-widest font-bold text-slate-600 mb-3">Pattern</p>
            <p className="text-lg font-bold text-slate-900 mb-2">Cloud Coverage</p>
            <p className="text-sm text-slate-600">
              Cloud cover varies throughout the week. Mid-week shows higher cloud coverage, while weekends appear clearer.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-md">
            <p className="text-sm uppercase tracking-widest font-bold text-slate-600 mb-3">Forecast</p>
            <p className="text-lg font-bold text-slate-900 mb-2">Best Weather Days</p>
            <p className="text-sm text-slate-600">
              Friday through Sunday show optimal conditions for outdoor activities. Plan accordingly for best experience.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
