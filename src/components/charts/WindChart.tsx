"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface WindChartProps {
  data: Array<{
    day: string;
    speed: number;
  }>;
}

export default function WindChart({ data }: WindChartProps) {
  const customTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-slate-200">
          <p className="font-semibold text-slate-900">{payload[0].payload.day}</p>
          <p className="text-sm font-medium text-cyan-600">speed: {payload[0].value} km/h</p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="windGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0ea5e9" stopOpacity={0.4} />
            <stop offset="100%" stopColor="#0ea5e9" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
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
          label={{ value: "km/h", angle: -90, position: "insideLeft" }}
        />
        <Tooltip content={customTooltip} />
        <Line
          type="monotone"
          dataKey="speed"
          stroke="#0ea5e9"
          strokeWidth={3}
          dot={{ fill: "#0ea5e9", r: 6 }}
          activeDot={{ r: 8 }}
          fill="url(#windGradient)"
          isAnimationActive={true}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
