export function PackagingAnimation() {
  return (
    <svg viewBox="0 0 400 300" className="w-full h-full">
      <defs>
        <linearGradient id="pkg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(160 50% 25%)" />
          <stop offset="100%" stopColor="hsl(160 50% 18%)" />
        </linearGradient>
        <linearGradient id="chip-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(220 15% 50%)" />
          <stop offset="100%" stopColor="hsl(220 15% 40%)" />
        </linearGradient>
        <filter id="pkg-glow">
          <feGaussianBlur stdDeviation="1.5" />
        </filter>
        <style>{`
          .pkg-blade {
            animation: pkg-blade-flash 1s ease-in-out infinite;
          }
          @keyframes pkg-blade-flash {
            0%, 100% { opacity: 0.4; }
            50% { opacity: 1; }
          }
          .pkg-die-drop {
            animation: pkg-die-drop 2s ease forwards;
          }
          @keyframes pkg-die-drop {
            0% { transform: translateY(0); }
            100% { transform: translateY(18px); }
          }
          .pkg-wire {
            animation: pkg-wire-appear 3s ease forwards;
            animation-delay: var(--delay);
          }
          @keyframes pkg-wire-appear {
            0%, 33% { opacity: 0; }
            100% { opacity: 0.8; }
          }
        `}</style>
      </defs>

      {/* Step 1: Wafer dicing */}
      <g>
        <text x="80" y="25" fill="hsl(160 84% 60%)" fontSize="8" textAnchor="middle">Step 1: 划片</text>
        {/* Wafer */}
        <circle cx="80" cy="65" r="30" fill="hsl(220 15% 60%)" stroke="hsl(220 15% 50%)" strokeWidth="0.5" opacity="0.7" />
        {/* Grid lines on wafer */}
        {Array.from({ length: 5 }).map((_, i) => (
          <line key={`h-${i}`} x1="52" y1={45 + i * 10} x2="108" y2={45 + i * 10} stroke="hsl(222 47% 40%)" strokeWidth="0.3" />
        ))}
        {Array.from({ length: 5 }).map((_, i) => (
          <line key={`v-${i}`} x1={60 + i * 10} y1="37" x2={60 + i * 10} y2="93" stroke="hsl(222 47% 40%)" strokeWidth="0.3" />
        ))}
        {/* Diamond blade */}
        <line className="pkg-blade" x1="80" y1="35" x2="80" y2="95" stroke="hsl(160 84% 60%)" strokeWidth="1" opacity="0.8" />
      </g>

      {/* Arrow 1 */}
      <line x1="125" y1="65" x2="155" y2="65" stroke="hsl(160 84% 50%)" strokeWidth="1" opacity="0.4" />
      <polygon points="155,61 155,69 163,65" fill="hsl(160 84% 50%)" opacity="0.4" />

      {/* Step 2: Die attach */}
      <g>
        <text x="215" y="25" fill="hsl(160 84% 60%)" fontSize="8" textAnchor="middle">Step 2: 贴装</text>
        {/* Substrate */}
        <rect x="175" y="70" width="80" height="15" rx="2" fill="url(#pkg-grad)" stroke="hsl(160 50% 35%)" strokeWidth="0.5" />
        <text x="215" y="81" fill="hsl(160 50% 50%)" fontSize="6" textAnchor="middle">封装基板</text>
        {/* Die on substrate */}
        <rect className="pkg-die-drop" x="195" y={40} width="40" height="12" rx="1" fill="url(#chip-grad)" stroke="hsl(220 15% 55%)" strokeWidth="0.5" />
        {/* Die pads */}
        {[0, 1, 2, 3].map((i) => (
          <rect key={`pad-${i}`} x={200 + i * 8} y={67} width={3} height={3} fill="hsl(43 96% 56%)" opacity="0.7" />
        ))}
      </g>

      {/* Arrow 2 */}
      <line x1="270" y1="65" x2="300" y2="65" stroke="hsl(160 84% 50%)" strokeWidth="1" opacity="0.4" />
      <polygon points="300,61 300,69 308,65" fill="hsl(160 84% 50%)" opacity="0.4" />

      {/* Step 3: Wire bonding */}
      <g>
        <text x="355" y="25" fill="hsl(160 84% 60%)" fontSize="8" textAnchor="middle">Step 3: 键合</text>
        {/* Substrate */}
        <rect x="315" y="70" width="80" height="15" rx="2" fill="url(#pkg-grad)" stroke="hsl(160 50% 35%)" strokeWidth="0.5" />
        {/* Die */}
        <rect x="335" y="58" width="40" height="12" rx="1" fill="url(#chip-grad)" />
        {/* Wire bonds */}
        {[0, 1, 2, 3].map((i) => (
          <path
            key={`wire-${i}`}
            className="pkg-wire"
            d={`M${340 + i * 8},${58} Q${340 + i * 8},${42} ${325 + i * 5},${70}`}
            fill="none"
            stroke="hsl(43 96% 70%)"
            strokeWidth="0.5"
            style={{ '--delay': `${0.5 + i * 0.3}s` } as React.CSSProperties}
          />
        ))}
      </g>

      {/* Bottom section: Final packaged chip */}
      <text x="200" y="120" fill="hsl(160 84% 60%)" fontSize="9" textAnchor="middle">封装成品</text>

      {/* Package body */}
      <rect x="130" y="135" width="140" height="80" rx="4" fill="url(#pkg-grad)" stroke="hsl(160 50% 35%)" strokeWidth="1" />

      {/* Package markings */}
      <rect x="155" y="145" width="90" height="20" rx="2" fill="hsl(222 47% 15%)" stroke="hsl(160 50% 30%)" strokeWidth="0.5" />
      <text x="200" y="158" fill="hsl(160 50% 60%)" fontSize="7" textAnchor="middle">CHIP-2024</text>
      <text x="200" y="167" fill="hsl(160 50% 40%)" fontSize="5" textAnchor="middle">7nm FinFET</text>

      {/* Pin array */}
      {Array.from({ length: 8 }).map((_, i) => (
        <g key={`pin-${i}`}>
          <rect x={140 + i * 15} y={215} width={6} height={15} rx="1" fill="hsl(43 70% 45%)" stroke="hsl(43 70% 35%)" strokeWidth="0.3" />
          <rect x={140 + i * 15} y={130} width={6} height={5} rx="1" fill="hsl(43 70% 45%)" stroke="hsl(43 70% 35%)" strokeWidth="0.3" />
        </g>
      ))}

      {/* Mold seal line */}
      <line x1="130" y1="175" x2="270" y2="175" stroke="hsl(160 50% 30%)" strokeWidth="0.5" strokeDasharray="3 3" />

      <text x="200" y="260" fill="hsl(160 84% 60%)" fontSize="9" textAnchor="middle">芯片封装</text>
      <text x="200" y="275" fill="hsl(160 84% 45%)" fontSize="7" textAnchor="middle">划片 → 贴装 → 键合 → 塑封</text>
    </svg>
  );
}
