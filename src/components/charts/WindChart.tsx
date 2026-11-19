"use client";
import WeatherChart from "./WeatherChart";
export default function WindChart({ data }: { data: { day: string; speed: number }[] }) {
  return <WeatherChart data={data} kind="line" unit="km/h" series={[{ key: "speed", label: "Wind speed", color: "#427a72" }]} />;
}
