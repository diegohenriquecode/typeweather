export default function WeatherArt() {
  return (
    <svg viewBox="0 0 160 110" className="h-full w-full">
      <defs>
        <linearGradient id="g" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity=".9" />
        </linearGradient>
      </defs>
      <g>
        <ellipse cx="70" cy="50" rx="26" ry="16" fill="url(#g)" />
        <ellipse cx="92" cy="50" rx="22" ry="14" fill="url(#g)" />
        <ellipse cx="54" cy="56" rx="20" ry="12" fill="url(#g)" />
      </g>
      <g stroke="#6ea8ff" strokeWidth="3" strokeLinecap="round">
        <line x1="60" y1="75" x2="60" y2="92" />
        <line x1="78" y1="75" x2="78" y2="95" />
        <line x1="96" y1="75" x2="96" y2="92" />
      </g>
    </svg>
  );
}
