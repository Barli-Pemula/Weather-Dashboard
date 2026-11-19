"use client";
import WeatherChart from "./WeatherChart";
export default function RainChart({ data }: { data: { day: string; probability: number }[] }) {
  return <WeatherChart data={data} kind="bar" percentage unit="%" series={[{ key: "probability", label: "Rain probability", color: "#7497a4" }]} />;
}
