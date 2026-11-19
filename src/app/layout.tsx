import type { Metadata } from "next";
import Link from "next/link";
import { Manrope } from "next/font/google";
import Navigation from "@/components/ui/Navigation";
import "./globals.css";
const font = Manrope({ subsets: ["latin"], variable: "--font-body", display: "swap" });
export const metadata: Metadata = {
  title: { default: "Weather Studio · Jakarta", template: "%s · Weather Studio" },
  description: "Current conditions, a seven-day forecast, and weather trends for Jakarta. Powered by Open-Meteo.",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" data-type="software"><body className={font.variable}>
    <a className="skip-link" href="#main">Skip to weather</a>
    <header className="site-header"><div className="header-inner">
      <Link href="/" className="wordmark">weather<span>studio</span><i /></Link>
      <Navigation /><div className="header-location">Jakarta, ID <span>UTC+7</span></div>
    </div></header>
    <main id="main" className="page-shell">{children}</main>
    <footer className="site-footer"><span>Weather Studio <span className="footer-divider">/</span> Jakarta, Indonesia</span><a href="https://open-meteo.com/" target="_blank" rel="noreferrer">Weather data by Open-Meteo ↗</a></footer>
  </body></html>;
}
