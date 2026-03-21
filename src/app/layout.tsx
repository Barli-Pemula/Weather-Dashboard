import type { Metadata } from "next";
import { Bricolage_Grotesque, Manrope } from "next/font/google";
import Navigation from "@/components/ui/Navigation";
import { WeatherDoodleBg } from "@/components/ui/WeatherDoodleBg";
import "./globals.css";

const bodyFont = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const displayFont = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lively Weather Dashboard — Experience Weather Beautifully",
  description:
    "Professional yet engaging weather dashboard powered by live data. See weather instantly through beautiful visualizations and intuitive design.",
  keywords: ["weather", "forecast", "dashboard", "live data", "analytics"],
  authors: [{ name: "Weather Studio" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://weather-dashboard.example.com",
    title: "Lively Weather Dashboard",
    description: "Experience weather beautifully with data-driven visualizations",
    images: [
      {
        url: "https://og-image-url.example.com",
        width: 1200,
        height: 630,
        alt: "Weather Dashboard",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${bodyFont.variable} ${displayFont.variable} min-h-screen bg-gradient-to-br from-frost via-white to-slate-100 text-slate-900 font-sans relative overflow-x-hidden`}
      >
        {/* Animated smooth background doodles */}
        <WeatherDoodleBg />

        {/* Main content wrapper */}
        <div className="relative z-10 flex flex-col min-h-screen">
          {/* Header section with branding */}
          <header className="pt-8 px-6 max-w-5xl mx-auto w-full mb-8">
            <div className="text-center space-y-2">
              <h1 className="text-5xl md:text-6xl font-display font-extrabold tracking-[-0.03em] text-slate-900 bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-cyan-500 to-emerald-500">
                Weather Studio
              </h1>
              <p className="text-slate-600 font-semibold tracking-[0.22em] uppercase text-[11px]">
                Real Data • Atmospheric Design • Smart Insights
              </p>
            </div>
          </header>

          {/* Main content area */}
          <main className="relative z-20 flex-1 pt-4 pb-32 px-6 max-w-5xl mx-auto w-full">
            {children}
          </main>

          {/* Footer hint */}
          <footer className="text-center pb-4 text-xs text-slate-400">
            <p>Data powered by Open-Meteo API • Always fresh, always free</p>
          </footer>
        </div>

        {/* Floating Navigation Bar */}
        <Navigation />
      </body>
    </html>
  );
}
