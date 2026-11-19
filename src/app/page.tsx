import Link from "next/link";
import { ArrowDown, ArrowUp, ArrowUpRight, Cloud, CloudRain, Droplets, Thermometer, Wind } from "lucide-react";
import { getWeatherData, getWeatherDescription } from "@/lib/api";
import { getHumidityLevel, getDayOfWeek } from "@/lib/utils";
import { DailyList, DataNote, PageHeading, SectionHeading, WeatherIcon } from "@/components/ui/WeatherUI";
import ForecastChart from "@/components/charts/ForecastChart";
export default async function HomePage() {
  const data = await getWeatherData();
  const { current: c, daily: d } = data;
  const chartData = d.time.map((date, i) => ({ day: i === 0 ? "Today" : getDayOfWeek(date), max: d.temperature_2m_max[i], min: d.temperature_2m_min[i], precip: d.precipitation_probability_max[i] }));
  const metrics = [
    { label: "Feels like", value: Math.round(c.apparent_temperature) + "°", unit: "C", note: "Perceived temperature", icon: Thermometer },
    { label: "Humidity", value: Math.round(c.relative_humidity_2m), unit: "%", note: getHumidityLevel(c.relative_humidity_2m), icon: Droplets },
    { label: "Wind speed", value: Math.round(c.wind_speed_10m), unit: "km/h", note: "At 10 m above ground", icon: Wind },
    { label: "Precipitation", value: c.precipitation.toFixed(1), unit: "mm", note: "Current precipitation", icon: CloudRain },
  ];
  return <>
    <PageHeading title="Weather in Jakarta" description="A clear view of today. A little perspective on the week ahead." date={d.time[0]} />
    <div className="overview-grid">
      <section className="current-weather" aria-label="Current weather" data-enter>
        <div className="current-top"><span><i className="status-dot" />Current conditions</span><span>{c.time.slice(11, 16)} WIB</span></div>
        <div className="current-main"><div><div className="main-temperature">{Math.round(c.temperature_2m)}<span>°</span><small>C</small></div><h2>{getWeatherDescription(c.weather_code)}</h2><p>Feels like {Math.round(c.apparent_temperature)}° · Jakarta, Indonesia</p></div><div className="hero-weather-icon"><WeatherIcon code={c.weather_code} size={154} night={c.is_day === 0} /></div></div>
        <div className="current-bottom"><div className="high-low"><span><ArrowUp size={16} />{Math.round(d.temperature_2m_max[0])}° High</span><span><ArrowDown size={16} />{Math.round(d.temperature_2m_min[0])}° Low</span></div><span className="rain-today"><Droplets size={16} />{Math.round(d.precipitation_probability_max[0])}% chance of rain</span></div>
      </section>
      <section className="panel week-panel"><SectionHeading title="The week ahead" detail="7-day view" href="/forecast" /><DailyList data={data} compact /></section>
      <section className="metrics-strip" aria-label="Current weather measurements">{metrics.map(({ label, value, unit, note, icon: Icon }) => <div className="metric" key={label}><div className="metric-label"><span>{label}</span><Icon size={19} aria-hidden="true" /></div><p className="metric-value">{value}<small>{unit}</small></p><p className="metric-note">{note}</p></div>)}</section>
      <section className="panel trend-panel"><SectionHeading title="Temperature outlook" detail="Next 7 days" /><div className="chart-legend"><span><i className="legend-high" />Daily high</span><span><i className="legend-low" />Daily low</span></div><div className="chart-frame"><ForecastChart data={chartData} /></div></section>
      <section className="tomorrow-panel"><div className="tomorrow-top"><p className="eyebrow">A look ahead</p><Cloud size={22} aria-hidden="true" /></div><h2>Tomorrow, in brief.</h2><div className="tomorrow-weather"><WeatherIcon code={d.weather_code[1]} size={42} /><span>{Math.round(d.temperature_2m_max[1])}°<small> / {Math.round(d.temperature_2m_min[1])}°</small></span></div><p>{getWeatherDescription(d.weather_code[1])}, with a {Math.round(d.precipitation_probability_max[1])}% chance of rain.</p><Link href="/forecast" className="button-link">See full forecast<ArrowUpRight size={17} aria-hidden="true" /></Link></section>
    </div><DataNote data={data} />
  </>;
}
