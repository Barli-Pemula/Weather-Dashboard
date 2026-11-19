"use client";
import WeatherChart from "./WeatherChart";
export default function CloudChart({ data }: { data: { day: string; coverage: number }[] }) {
  return <WeatherChart data={data} kind="bar" percentage unit="%" series={[{ key: "coverage", label: "Cloud cover", color: "#8a9d91" }]} />;
}
