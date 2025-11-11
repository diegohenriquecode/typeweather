export default function WeatherArtHot() {
  return (
    <svg viewBox="0 0 160 110" className="h-full w-full" role="img" aria-label="Arte de clima quente">
      <defs>
        <radialGradient id="sunGlow" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#FFD166" stopOpacity="1" />
          <stop offset="60%" stopColor="#FFB703" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#FB8500" stopOpacity="0.55" />
        </radialGradient>

        <radialGradient id="sunCore" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stopColor="#FFE8A3" />
          <stop offset="55%" stopColor="#FFD166" />
          <stop offset="100%" stopColor="#FFB703" />
        </radialGradient>

        <linearGradient id="heat" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#FFA94D" stopOpacity=".95" />
          <stop offset="100%" stopColor="#FF7A3D" stopOpacity=".95" />
        </linearGradient>
      </defs>

      <circle cx="55" cy="45" r="28" fill="url(#sunGlow)" />

      <circle cx="55" cy="45" r="18" fill="url(#sunCore)" />

      <g stroke="#FFB703" strokeWidth="3" strokeLinecap="round" opacity="0.95">
        <line x1="55" y1="18" x2="55" y2="10" />
        <line x1="55" y1="80" x2="55" y2="72" />
        <line x1="28" y1="45" x2="20" y2="45" />
        <line x1="90" y1="45" x2="82" y2="45" />

        <line x1="38" y1="28" x2="32" y2="22" />
        <line x1="78" y1="68" x2="72" y2="62" />
        <line x1="72" y1="28" x2="78" y2="22" />
        <line x1="32" y1="68" x2="38" y2="62" />
      </g>

      <g opacity="0.25">
        <ellipse cx="108" cy="42" rx="20" ry="10" fill="#fff" />
        <ellipse cx="123" cy="44" rx="18" ry="9" fill="#fff" />
      </g>

      <g stroke="url(#heat)" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.9">
        <path d="M70 72c6 0 6 6 12 6s6-6 12-6 6 6 12 6" />
        <path d="M74 84c6 0 6 6 12 6s6-6 12-6 6 6 12 6" />
      </g>
    </svg>
  );
}
