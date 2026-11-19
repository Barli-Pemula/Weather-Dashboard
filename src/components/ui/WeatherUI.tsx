import Link from "next/link";
import { ArrowUpRight, Cloud, CloudDrizzle, CloudFog, CloudLightning, CloudRain, CloudSun, Droplets, Moon, Snowflake, Sun } from "lucide-react";
import { getWeatherDescription, type WeatherData } from "@/lib/api";
import { formatDate, getDayOfWeek } from "@/lib/utils";
export function WeatherIcon({ code, size = 28, night = false }: { code: number; size?: number; night?: boolean }) {
  const Icon = code === 0 ? (night ? Moon : Sun) : code < 3 ? CloudSun : code === 3 ? Cloud : code < 50 ? CloudFog : code < 60 ? CloudDrizzle : code < 70 || (code >= 80 && code < 85) ? CloudRain : code < 90 ? Snowflake : CloudLightning;
  return <Icon size={size} strokeWidth={1.5} className={code < 3 ? "weather-icon sunny" : "weather-icon"} aria-hidden="true" />;
}
export function PageHeading({ title, description, date }: { title: string; description: string; date: string }) {
  return <div className="page-heading"><div><p className="eyebrow">Your daily weather, considered.</p><h1>{title}</h1><p className="page-description">{description}</p></div><div className="date-label"><span>Jakarta, Indonesia</span><time dateTime={date}>{new Date(date + "T12:00:00+07:00").toLocaleDateString("en-US", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Jakarta" })}</time></div></div>;
}
export function SectionHeading({ title, detail, href }: { title: string; detail?: string; href?: string }) {
  return <div className="section-heading"><h2>{title}</h2>{href ? <Link className="text-link" href={href}>{detail}<ArrowUpRight size={16} aria-hidden="true" /></Link> : detail ? <span className="muted">{detail}</span> : null}</div>;
}
export function DailyList({ data, compact = false }: { data: WeatherData; compact?: boolean }) {
  const floor = Math.min(...data.daily.temperature_2m_min);
  const range = Math.max(...data.daily.temperature_2m_max) - floor || 1;
  return <div className={compact ? "daily-list compact" : "daily-list"}>{data.daily.time.map((date, i) => <div className="daily-row" key={date}>
    <div className="daily-day"><strong>{i === 0 ? "Today" : getDayOfWeek(date)}</strong>{!compact && <span>{formatDate(date)}</span>}</div>
    <div className="daily-condition"><WeatherIcon code={data.daily.weather_code[i]} /><span>{getWeatherDescription(data.daily.weather_code[i])}</span></div>
    <div className="daily-rain"><Droplets size={14} aria-hidden="true" />{Math.round(data.daily.precipitation_probability_max[i])}%</div>
    <div className="temperature-range"><span>{Math.round(data.daily.temperature_2m_min[i])}°</span><div className="range-track"><div style={{ left: ((data.daily.temperature_2m_min[i] - floor) / range * 100) + "%", width: ((data.daily.temperature_2m_max[i] - data.daily.temperature_2m_min[i]) / range * 100) + "%" }} /></div><strong>{Math.round(data.daily.temperature_2m_max[i])}°</strong></div>
  </div>)}</div>;
}
export function DataNote({ data }: { data: WeatherData }) {
  return <div className="data-note"><i className="status-dot" /><span>Model updated {data.current.time.slice(11, 16)} WIB · Refreshes hourly</span><span>All temperatures in °C</span></div>;
}
