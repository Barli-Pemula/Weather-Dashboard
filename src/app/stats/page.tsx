import type { Metadata } from "next";
import { getWeatherData } from "@/lib/api";
import { getDayOfWeek } from "@/lib/utils";
import CloudChart from "@/components/charts/CloudChart";
import WindChart from "@/components/charts/WindChart";
import RainChart from "@/components/charts/RainChart";
import { DataNote, PageHeading, SectionHeading } from "@/components/ui/WeatherUI";
export const metadata: Metadata = { title: "Weather statistics" };
export default async function StatsPage() {
  const data = await getWeatherData();
  const d = data.daily;
  const average = (values: number[]) => Math.round(values.reduce((a, b) => a + b, 0) / values.length);
  const metrics = [
    { label: "Mean daily high", value: average(d.temperature_2m_max) + "°", unit: "C" },
    { label: "Peak wind speed", value: Math.round(Math.max(...d.wind_speed_10m_max)), unit: "km/h" },
    { label: "Mean rain probability", value: average(d.precipitation_probability_max), unit: "%" },
    { label: "Mean daily peak cloud", value: average(d.cloud_cover_max), unit: "%" },
  ];
  return <><PageHeading title="Weather, in perspective" description="The patterns behind Jakarta’s seven-day forecast." date={d.time[0]} />
    <section className="metrics-strip stats-metrics" aria-label="Weekly statistics">{metrics.map(m => <div className="metric" key={m.label}><p className="metric-label">{m.label}</p><p className="metric-value">{m.value}<small>{m.unit}</small></p><p className="metric-note">Next 7 days</p></div>)}</section>
    <div className="stats-grid"><section className="panel"><SectionHeading title="Rain probability" detail="Daily maximum · %" /><div className="chart-frame"><RainChart data={d.time.map((date, i) => ({ day: getDayOfWeek(date), probability: d.precipitation_probability_max[i] }))} /></div></section>
    <section className="panel"><SectionHeading title="Wind speed" detail="Daily maximum · km/h" /><div className="chart-frame"><WindChart data={d.time.map((date, i) => ({ day: getDayOfWeek(date), speed: d.wind_speed_10m_max[i] }))} /></div></section>
    <section className="panel"><SectionHeading title="Cloud cover" detail="Daily maximum · %" /><div className="chart-frame"><CloudChart data={d.time.map((date, i) => ({ day: getDayOfWeek(date), coverage: d.cloud_cover_max[i] }))} /></div></section>
    <section className="reading-panel"><p className="eyebrow">Reading the forecast</p><h2>A probability, not a promise.</h2><p>Rain probability describes the chance of precipitation. It does not describe how much rain will fall.</p><dl><div><dt>Rain & cloud</dt><dd>Daily maximum percentages</dd></div><div><dt>Wind speed</dt><dd>Daily maximum at 10 m</dd></div><div><dt>Forecast horizon</dt><dd>7 days, in Jakarta local time</dd></div></dl></section></div><DataNote data={data} /></>;
}
