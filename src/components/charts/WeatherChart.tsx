"use client";
import { useId, useRef, useState, useEffect } from "react";
type Datum = { day: string; [key: string]: string | number };
type Series = { key: string; label: string; color: string };
export default function WeatherChart({ data, series, unit, kind = "area", percentage = false }: { data: Datum[]; series: Series[]; unit: string; kind?: "area" | "line" | "bar"; percentage?: boolean }) {
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 500, height: 230 });
  const [active, setActive] = useState<number | null>(null);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new ResizeObserver(([entry]) => setSize({ width: entry.contentRect.width, height: entry.contentRect.height }));
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  if (!data.length) return <p className="muted">No forecast data available.</p>;
  const { width, height } = size;
  const left = 33, right = 12, top = 14, bottom = 30;
  const plotW = Math.max(1, width - left - right), plotH = Math.max(1, height - top - bottom);
  const values = data.flatMap(d => series.map(s => Number(d[s.key])));
  const low = percentage || kind === "bar" ? 0 : Math.floor(Math.min(...values) - 1);
  const high = percentage ? 100 : Math.ceil(Math.max(...values) + 1);
  const span = high - low || 1;
  const x = (i: number) => left + (kind === "bar" ? (i + .5) / data.length : i / Math.max(1, data.length - 1)) * plotW;
  const y = (value: number) => top + (high - value) / span * plotH;
  const pathFor = (key: string) => data.map((d, i) => {
    if (!i) return "M " + x(i) + " " + y(Number(d[key]));
    const middle = (x(i - 1) + x(i)) / 2;
    return "C " + middle + " " + y(Number(data[i - 1][key])) + " " + middle + " " + y(Number(d[key])) + " " + x(i) + " " + y(Number(d[key]));
  }).join(" ");
  const summary = data.map(d => d.day + ": " + series.map(s => s.label + " " + d[s.key] + " " + unit).join(", ")).join(". ");
  return <div ref={ref} className="weather-chart" tabIndex={0} role="group" aria-roledescription="interactive chart" aria-label={series.map(s => s.label).join(" and ") + ". Use left and right arrows to inspect days."}
    onBlur={() => setActive(null)} onKeyDown={event => {
      if (event.key === "ArrowRight" || event.key === "ArrowLeft") { event.preventDefault(); const step = event.key === "ArrowRight" ? 1 : -1; setActive(index => index === null ? 0 : (index + step + data.length) % data.length); }
      if (event.key === "Escape") setActive(null);
    }}>
    <svg width="100%" height="100%" viewBox={"0 0 " + width + " " + height} role="img" aria-labelledby={id + "-title " + id + "-description"}
      onPointerLeave={() => setActive(null)} onPointerMove={event => {
        const bounds = event.currentTarget.getBoundingClientRect();
        const fraction = (event.clientX - bounds.left - left) / plotW;
        setActive(Math.max(0, Math.min(data.length - 1, Math.round(fraction * (data.length - 1)))));
      }}>
      <title id={id + "-title"}>{series.map(s => s.label).join(" and ") + " in " + unit}</title><desc id={id + "-description"}>{summary}</desc>
      <defs>{series.map(s => <linearGradient key={s.key} id={id + s.key} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={s.color} stopOpacity=".12" /><stop offset="100%" stopColor={s.color} stopOpacity="0" /></linearGradient>)}</defs>
      {[0,1,2,3,4].map(i => { const value = low + span / 4 * i; const pos = y(value); return <g key={i}><line x1={left} x2={width - right} y1={pos} y2={pos} stroke="#e5eae2" strokeDasharray="3 5" /><text x={left - 8} y={pos + 4} textAnchor="end" fill="#53614f" fontSize="10">{Number(value.toFixed(1))}{unit === "°C" ? "°" : ""}</text></g>; })}
      {data.map((d,i) => <text key={d.day} x={x(i)} y={height - 6} textAnchor="middle" fill="#53614f" fontSize="10">{d.day}</text>)}
      {series.map(s => <g key={s.key}>{kind === "bar" ? data.map((d,i) => <rect key={d.day} x={x(i) - Math.min(28,plotW / data.length * .55) / 2} y={y(Number(d[s.key]))} width={Math.min(28,plotW / data.length * .55)} height={Math.max(0,top + plotH - y(Number(d[s.key])))} rx={3} fill={s.color} />) : <>
        {kind === "area" && <path d={pathFor(s.key) + " L " + x(data.length - 1) + " " + (top + plotH) + " L " + x(0) + " " + (top + plotH) + " Z"} fill={"url(#" + id + s.key + ")"} />}
        <path d={pathFor(s.key)} fill="none" stroke={s.color} strokeWidth={2} />
        {kind === "line" && data.map((d,i) => <circle key={d.day} cx={x(i)} cy={y(Number(d[s.key]))} r={3} stroke={s.color} strokeWidth={2} fill="#fff" />)}
      </>}</g>)}
      {active !== null && <g><line x1={x(active)} x2={x(active)} y1={top} y2={top + plotH} stroke="#899987" strokeDasharray="3 3" />{series.map(s => <circle key={s.key} cx={x(active)} cy={y(Number(data[active][s.key]))} r={4} fill={s.color} stroke="#fff" strokeWidth={2} />)}</g>}
    </svg>
    {active !== null && <div className="chart-tooltip" role="status" style={{ left: Math.max(5, Math.min(width - 145, x(active) - 65)) }}><strong>{data[active].day}</strong>{series.map(s => <span key={s.key}>{s.label}: {data[active][s.key]} {unit}</span>)}</div>}
  </div>;
}
