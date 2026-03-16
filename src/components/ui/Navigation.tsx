"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Cloud, Sun, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Navigation() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      {/* Floating Navigation Bar */}
      <div className="bg-white/85 backdrop-blur-xl border-2 border-slate-200 shadow-2xl rounded-full px-2 py-4 flex gap-4">
        {/* Home */}
        <Link
          href="/"
          className={cn(
            "relative flex flex-col items-center justify-center w-14 h-14 rounded-full transition-all duration-300",
            isActive("/")
              ? "bg-blue-500 text-white shadow-lg scale-110"
              : "text-slate-400 hover:text-blue-500 hover:scale-105"
          )}
          title="Current Weather"
        >
          <Sun size={28} strokeWidth={2.5} />
          {isActive("/") && (
            <div className="absolute inset-0 rounded-full border-2 border-blue-300 opacity-30 animate-pulse" />
          )}
        </Link>

        {/* Forecast */}
        <Link
          href="/forecast"
          className={cn(
            "relative flex flex-col items-center justify-center w-14 h-14 rounded-full transition-all duration-300",
            isActive("/forecast")
              ? "bg-cyan-500 text-white shadow-lg scale-110"
              : "text-slate-400 hover:text-cyan-500 hover:scale-105"
          )}
          title="5-Day Forecast"
        >
          <Cloud size={28} strokeWidth={2.5} />
          {isActive("/forecast") && (
            <div className="absolute inset-0 rounded-full border-2 border-cyan-300 opacity-30 animate-pulse" />
          )}
        </Link>

        {/* Advanced Stats */}
        <Link
          href="/stats"
          className={cn(
            "relative flex flex-col items-center justify-center w-14 h-14 rounded-full transition-all duration-300",
            isActive("/stats")
              ? "bg-purple-500 text-white shadow-lg scale-110"
              : "text-slate-400 hover:text-purple-500 hover:scale-105"
          )}
          title="Advanced Statistics"
        >
          <BarChart3 size={28} strokeWidth={2.5} />
          {isActive("/stats") && (
            <div className="absolute inset-0 rounded-full border-2 border-purple-300 opacity-30 animate-pulse" />
          )}
        </Link>
      </div>
    </nav>
  );
}
