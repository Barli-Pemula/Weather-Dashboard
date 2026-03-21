"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface CloudChartProps {
  data: Array<{
    day: string;
    coverage: number;
  }>;
}

type CloudTooltipProps = {
  active?: boolean;
  payload?: Array<{ value?: number; payload?: { day: string } }>;
};

export default function CloudChart({ data }: CloudChartProps) {
  const customTooltip = ({ active, payload }: CloudTooltipProps) => {
    const first = payload?.[0];

    if (active && first) {
      return (
        <div className="bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-slate-200">
          <p className="font-semibold text-slate-900">{first.payload?.day ?? "N/A"}</p>
          <p className="text-sm font-medium text-slate-600">coverage: {first.value ?? 0}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="cloudGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#64748b" stopOpacity={1} />
            <stop offset="100%" stopColor="#cbd5e1" stopOpacity={0.6} />
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
          label={{ value: "%", angle: -90, position: "insideLeft" }}
        />
        <Tooltip content={customTooltip} />
        <Bar dataKey="coverage" fill="url(#cloudGradient)" radius={[12, 12, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
