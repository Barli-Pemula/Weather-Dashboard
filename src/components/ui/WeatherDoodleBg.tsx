"use client";

export function WeatherDoodleBg() {
  return (
    <>
      {/* Ambient background doodles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Top-left flowing wave */}
        <svg
          className="absolute -top-20 -left-20 w-96 h-96 text-blue-200 opacity-40"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10,100 Q50,50 100,100 T190,100"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="15 10"
          />
          <path
            d="M20,130 Q60,80 110,130 T200,130"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="10 8"
            opacity="0.6"
          />
        </svg>

        {/* Top-right circular pattern */}
        <svg
          className="absolute -top-10 right-0 w-72 h-72 text-cyan-200 opacity-30 animate-pulse"
          viewBox="0 0 150 150"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="75" cy="75" r="60" stroke="currentColor" strokeWidth="2" strokeDasharray="8 6" />
          <circle cx="75" cy="75" r="45" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.7" />
          <circle cx="75" cy="75" r="30" stroke="currentColor" strokeWidth="1" strokeDasharray="5 3" opacity="0.5" />
        </svg>

        {/* Bottom-left scattered dots and lines */}
        <svg
          className="absolute bottom-0 -left-10 w-80 h-80 text-slate-300 opacity-25"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line x1="20" y1="20" x2="80" y2="80" stroke="currentColor" strokeWidth="2" strokeDasharray="5 5" />
          <line x1="100" y1="20" x2="160" y2="80" stroke="currentColor" strokeWidth="2" strokeDasharray="5 5" />
          <circle cx="40" cy="100" r="3" fill="currentColor" />
          <circle cx="80" cy="80" r="2" fill="currentColor" opacity="0.6" />
          <circle cx="120" cy="120" r="3" fill="currentColor" />
          <circle cx="160" cy="140" r="2" fill="currentColor" opacity="0.6" />
        </svg>

        {/* Bottom-right spiral */}
        <svg
          className="absolute -bottom-20 -right-20 w-96 h-96 text-purple-200 opacity-35"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100,20 Q150,50 150,100 Q150,150 100,150 Q50,150 50,100 Q50,60 100,60"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M100,80 Q130,100 120,130"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.7"
          />
        </svg>
      </div>

      {/* Floating decoration elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Floating cloud shape top-center */}
        <div className="absolute top-24 left-1/2 -translate-x-1/2 w-32 h-16 opacity-10">
          <svg viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-lg">
            <path
              d="M20,35 Q20,20 30,15 Q35,10 45,10 Q50,5 60,5 Q75,5 80,15 Q90,15 90,25 Q90,35 80,40 L20,40 Q10,40 10,30 Q10,20 20,20"
              fill="currentColor"
              className="text-blue-400"
            />
          </svg>
        </div>

        {/* Weather icon doodle - right side */}
        <div className="absolute top-40 right-8 w-24 h-24 opacity-15 animate-float">
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            {/* Sun rays */}
            <circle cx="50" cy="50" r="25" stroke="currentColor" strokeWidth="2" className="text-yellow-400" />
            <line x1="50" y1="15" x2="50" y2="5" stroke="currentColor" strokeWidth="2" className="text-yellow-400" />
            <line x1="50" y1="95" x2="50" y2="85" stroke="currentColor" strokeWidth="2" className="text-yellow-400" />
            <line x1="85" y1="50" x2="95" y2="50" stroke="currentColor" strokeWidth="2" className="text-yellow-400" />
            <line x1="15" y1="50" x2="5" y2="50" stroke="currentColor" strokeWidth="2" className="text-yellow-400" />
          </svg>
        </div>

        {/* Decorative rain drops - bottom left */}
        <div className="absolute bottom-32 left-16 opacity-20 animate-pulse">
          <svg viewBox="0 0 50 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-16">
            <path d="M10,10 L10,30 M25,5 L25,25 M40,15 L40,35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-blue-500" />
          </svg>
        </div>
      </div>
    </>
  );
}
