import type { Metadata } from "next";
import { getWeatherData } from "@/lib/api";
import { getDayOfWeek } from "@/lib/utils";
import ForecastChart from "@/components/charts/ForecastChart";
import { DailyList, DataNote, PageHeading, SectionHeading } from "@/components/ui/WeatherUI";
export const metadata: Metadata = { title: "7-day forecast" };
export default async function ForecastPage() {
  const data = await getWeatherData();
  const d = data.daily;
  const chartData = d.time.map((date, i) => ({ day: i === 0 ? "Today" : getDayOfWeek(date), max: d.temperature_2m_max[i], min: d.temperature_2m_min[i], precip: d.precipitation_probability_max[i] }));
  return <><PageHeading title="The next seven days" description="Daily highs, cooler nights, and the chance of rain in between." date={d.time[0]} />
    <section className="forecast-summary" aria-label="Week at a glance"><div><span>Highest temperature</span><strong>{Math.round(Math.max(...d.temperature_2m_max))}°<small>C</small></strong></div><div><span>Lowest temperature</span><strong>{Math.round(Math.min(...d.temperature_2m_min))}°<small>C</small></strong></div><div><span>Peak rain probability</span><strong>{Math.round(Math.max(...d.precipitation_probability_max))}<small>%</small></strong></div></section>
    <section className="panel forecast-chart"><SectionHeading title="Temperature across the week" detail="°C · Jakarta" /><div className="chart-legend"><span><i className="legend-high" />Daily high</span><span><i className="legend-low" />Daily low</span></div><div className="chart-frame tall"><ForecastChart data={chartData} variant="line" /></div></section>
    <section className="panel daily-panel"><SectionHeading title="Day by day" detail="Low / High · °C" /><DailyList data={data} /></section><DataNote data={data} /></>;
}
