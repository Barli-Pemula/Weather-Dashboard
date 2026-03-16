"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  LineChart,
  Line,
} from "recharts";

interface ForecastChartProps {
  data: Array<{
    day: string;
    max: number;
    min: number;
    precip: number;
  }>;
  variant?: "area" | "line";
}

export default function ForecastChart({ data, variant = "area" }: ForecastChartProps) {
  const chartMargin = { top: 20, right: 10, left: -20, bottom: 0 };

  const customTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-slate-200">
          <p className="font-semibold text-slate-900">{payload[0].payload.day}</p>
          {payload.map((entry: any, idx: number) => (
            <p key={idx} style={{ color: entry.color }} className="text-sm font-medium">
              {entry.name}: {entry.value}°
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  if (variant === "line") {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={chartMargin}
        >
          <defs>
            <linearGradient id="colorMax" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f97316" stopOpacity={1} />
              <stop offset="95%" stopColor="#f97316" stopOpacity={0.3} />
            </linearGradient>
            <linearGradient id="colorMin" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={1} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.3} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" strokeOpacity={0.5} />
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#64748b", fontSize: 14, fontWeight: 600 }}
            dy={12}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#cbd5e1", fontSize: 12 }}
            label={{ value: "°C", angle: -90, position: "insideLeft" }}
          />
          <Tooltip content={customTooltip} />
          <Legend
            wrapperStyle={{ paddingTop: "20px" }}
            iconType="line"
          />
          <Line
            type="monotone"
            dataKey="max"
            stroke="#f97316"
            strokeWidth={3}
            dot={{ fill: "#f97316", r: 6 }}
            activeDot={{ r: 8, fill: "#f97316" }}
            name="Max Temp"
            isAnimationActive={true}
          />
          <Line
            type="monotone"
            dataKey="min"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={{ fill: "#3b82f6", r: 6 }}
            activeDot={{ r: 8, fill: "#3b82f6" }}
            name="Min Temp"
            isAnimationActive={true}
          />
        </LineChart>
      </ResponsiveContainer>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={chartMargin}
      >
        <defs>
          <linearGradient id="colorMax" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#f97316" stopOpacity={0.4} />
            <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorMin" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" strokeOpacity={0.5} />
        <XAxis
          dataKey="day"
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#64748b", fontSize: 14, fontWeight: 600 }}
          dy={12}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#cbd5e1", fontSize: 12 }}
          label={{ value: "°C", angle: -90, position: "insideLeft" }}
        />
        <Tooltip content={customTooltip} />
        <Legend
          wrapperStyle={{ paddingTop: "20px" }}
          iconType="line"
        />
        <Area
          type="monotone"
          dataKey="max"
          name="Max Temperature"
          stroke="#f97316"
          strokeWidth={3}
          fillOpacity={1}
          fill="url(#colorMax)"
          activeDot={{ r: 8, fill: "#f97316" }}
          isAnimationActive={true}
        />
        <Area
          type="monotone"
          dataKey="min"
          name="Min Temperature"
          stroke="#3b82f6"
          strokeWidth={3}
          fillOpacity={1}
          fill="url(#colorMin)"
          isAnimationActive={true}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
