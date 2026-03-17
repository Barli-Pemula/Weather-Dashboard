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

export default function CloudChart({ data }: CloudChartProps) {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="px-4 pt-4 pb-2">
        <h3 className="text-lg font-bold text-slate-700">☁️ Cloud Coverage</h3>
      </div>
      <div className="flex-1">
      <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
        <Tooltip
          contentStyle={{
            borderRadius: "1rem",
            border: "none",
            boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
          }}
        />
        <Bar dataKey="coverage" fill="url(#cloudGradient)" radius={[12, 12, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
      </div>
    </div>
  );
}
