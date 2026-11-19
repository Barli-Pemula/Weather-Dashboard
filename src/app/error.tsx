"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return <div className="state-panel" role="alert"><p className="eyebrow">Weather temporarily unavailable</p><h1>We couldn’t load the forecast.</h1><p>The weather service may be taking a moment. Please try again.</p><button onClick={reset}>Try again</button></div>;
}
