# 🌦️ Lively Weather Dashboard

A professional yet highly engaging weather dashboard built with Next.js 14 (App Router), TypeScript, Tailwind CSS, and Framer Motion. Experience weather data beautifully with intuitive visualizations and a lively "ramai" aesthetic.

## ✨ Features

- **Show, Don't Tell Design**: Minimize text, maximize visual impact with icons, color-coded gauges, and intuitive layouts
- **Multi-Page Architecture**: Separate routes for Home, 5-Day Forecast, and Advanced Statistics
- **Beautiful Data Visualization**: Recharts-powered smooth area and bar charts for weather trends
- **Lively UI Elements**: Creative doodle SVG elements and smooth animations throughout
- **Real-Time Data**: Open-Meteo API integration for accurate, always-free weather data
- **Fully Responsive**: Optimized for mobile, tablet, and desktop displays
- **Server-Side Rendering**: Optimized with Next.js Server Components and ISR (Incremental Static Regeneration)

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [Framer Motion](https://www.framer.com/motion/)
- **Data Visualization**: [Recharts](https://recharts.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Data Source**: [Open-Meteo API](https://open-meteo.com/) (Free, no authentication)

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout with navigation
│   ├── page.tsx                # Home: Current weather display
│   ├── globals.css             # Global Tailwind styles & animations
│   ├── forecast/
│   │   └── page.tsx            # 5-day forecast with advanced charts
│   └── stats/
│       └── page.tsx            # Advanced statistics and analysis
├── components/
│   ├── ui/
│   │   ├── Navigation.tsx      # Multi-page navigation bar
│   │   └── WeatherDoodleBg.tsx # Animated SVG doodle backgrounds
│   └── charts/
│       └── ForecastChart.tsx   # Recharts component wrapper
└── lib/
    ├── api.ts                  # Open-Meteo API client
    └── utils.ts                # Utility functions & color coding
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- npm, yarn, or pnpm

### Installation

1. **Clone or extract the project**

   ```bash
   cd "Project 3"
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   # No additional configuration needed - Open-Meteo is free and public
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📦 Available Scripts

```bash
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting checks
npm run lint
```

## 🎨 Design Philosophy

### Show, Don't Tell

- **Minimal Text**: Use visual indicators, icons, and color coding instead of paragraphs
- **Intuitive Icons**: Weather codes map to expressive emojis and Lucide icons
- **Color Psychology**: Temperature ranges use intuitive color gradients (blue for cold, orange/red for hot)
- **Visual Hierarchy**: Large typography and strategic spacing guide the user's attention

### Lively & "Ramai" Aesthetic

- **Doodle Elements**: Custom SVG patterns and decorative elements make the interface feel alive
- **Smooth Animations**: Floating, pulsing, and scaling effects without being distracting
- **Professional Polish**: Despite the playfulness, maintains usability and clarity
- **Engaging Cards**: Rotated and interactive card elements create visual interest

### Multi-Page Navigation

- **Floating Nav Bar**: Fixed bottom navigation with active state indicators
- **Smooth Transitions**: Page transitions use fade-in and slide-up animations
- **Icon-Based**: Icons for navigation reduce cognitive load

## 🌤️ Pages Explanation

### Home (`/`)

- **Current weather** with large temperature display
- Color-coded based on temperature range
- Quick info badges: wind, humidity, precipitation, visibility
- Secondary cards: feels-like temp, tomorrow's forecast, air quality

### Forecast (`/forecast`)

- **5-day temperature trend** chart using animated area graph
- **7-day daily breakdown** with maximum detail
- Weather insights: warmest day, coolest day, rain probability
- Visual indicators for wind, precipitation, and cloud cover

### Advanced Stats (`/stats`)

- **Top metrics**: Average temperature, max wind, rain chance, cloud coverage
- **Cloud coverage analysis** with bar charts
- **Wind speed trends** with line charts
- **Precipitation forecast** with probability bars
- **Key insights**: AI-like pattern analysis and alerts

## 🔌 API Integration

### Open-Meteo API

- **Endpoint**: `https://api.open-meteo.com/v1/forecast`
- **Features**:
  - Current weather conditions
  - 7-day forecast
  - Hourly data (can be extended)
  - WMO weather codes interpretation
- **Authentication**: None required (public, free tier)
- **Caching**: ISR revalidates data every 3600 seconds (1 hour)

### Example API Response Structure

```typescript
{
  current: {
    temperature_2m: 25.5,
    weather_code: 2,
    wind_speed_10m: 12,
    relative_humidity_2m: 65,
    precipitation: 0
  },
  daily: {
    time: ["2024-03-17", "2024-03-18", ...],
    temperature_2m_max: [28, 26, ...],
    temperature_2m_min: [18, 16, ...],
    precipitation_probability_max: [10, 35, ...],
    weather_code: [2, 61, ...],
    wind_speed_10m_max: [15, 18, ...],
    cloud_cover_max: [20, 60, ...]
  }
}
```

## 🎯 Customization

### Change Default Location

Edit `src/lib/api.ts`:

```typescript
export async function getWeatherData(
  latitude: number = YOUR_LAT,
  longitude: number = YOUR_LON,
): Promise<WeatherData>;
```

### Modify Color Scheme

Update `tailwind.config.ts` and `src/lib/utils.ts` temperature color mapping

### Add More Data Points

Open-Meteo API supports many additional parameters:

```typography
daily: hourly_data, uv_index, soil_moisture, etc.
```

## 📊 Chart Customization

All charts are built with Recharts and can be extensively customized:

- **Custom tooltips** in `ForecastChart.tsx`
- **Color gradients** with Recharts `linear-gradient` definitions
- **Animation settings** via `isAnimationActive` props
- **Chart types**: Easily switch between Area, Line, and Bar charts

## 🔐 Security Notes

- No sensitive data stored or transmitted
- Open-Meteo API is public and free
- All data cached on the server (ISR)
- No private API keys required

## 🚀 Deployment

### Vercel (Recommended)

```bash
vercel deploy
```

### Other Platforms

```bash
npm run build
npm start
```

The application is fully static-friendly and can be deployed to any platform supporting Node.js 18+.

## 📱 Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile browsers: iOS Safari 13+, Chrome Mobile 90+

## 🎓 Learning Resources

- [Next.js App Router Docs](https://nextjs.org/docs/app)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Recharts Gallery](https://recharts.org/examples)
- [Open-Meteo Docs](https://open-meteo.com/en/docs)

## 📋 Future Enhancements

- [ ] Location search and favorites
- [ ] Hourly forecast detail
- [ ] Historical weather data
- [ ] Severe weather alerts
- [ ] Dark mode toggle
- [ ] Weather radar integration
- [ ] Multi-language support
- [ ] PWA support with offline caching

## 🤝 Contributing

Feel free to fork and improve this project! Perfect for learning Next.js, TypeScript, and data visualization.

## 📄 License

MIT License - Feel free to use this project for personal or commercial purposes.

## 🙏 Acknowledgments

- [Open-Meteo](https://open-meteo.com/) for free, reliable weather data
- [Vercel](https://vercel.com/) for Next.js and deployment infrastructure
- [Tailwind Labs](https://tailwindlabs.com/) for CSS utilities
- [Recharts](https://recharts.org/) for beautiful chart components

---

**Built with ❤️ for weather enthusiasts and developers who appreciate beautiful data visualization.**
