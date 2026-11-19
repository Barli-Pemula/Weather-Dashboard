"use client";
import WeatherChart from "./WeatherChart";
export default function ForecastChart({ data, variant = "area" }: { data: { day: string; max: number; min: number; precip: number }[]; variant?: "area" | "line" }) {
  return <WeatherChart data={data} kind={variant} unit="°C" series={[{ key: "max", label: "Daily high", color: "#bc773c" }, { key: "min", label: "Daily low", color: "#7c9b89" }]} />;
}
