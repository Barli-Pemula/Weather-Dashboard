"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, CalendarDays, LayoutDashboard } from "lucide-react";
const links = [
  { href: "/", label: "Overview", icon: LayoutDashboard },
  { href: "/forecast", label: "Forecast", icon: CalendarDays },
  { href: "/stats", label: "Statistics", icon: BarChart3 },
];
export default function Navigation() {
  const pathname = usePathname();
  return <nav className="navigation" aria-label="Main navigation">{links.map(({ href, label, icon: Icon }) => <Link key={href} href={href} className={pathname === href ? "nav-link active" : "nav-link"} aria-current={pathname === href ? "page" : undefined}><Icon size={17} aria-hidden="true" /><span>{label}</span></Link>)}</nav>;
}
