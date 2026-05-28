export function EtchingAnimation() {
  return (
    <svg viewBox="0 0 400 300" className="w-full h-full">
      <defs>
        <linearGradient id="plasma-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(187 85% 53%)" stopOpacity="0.05" />
          <stop offset="100%" stopColor="hsl(187 85% 53%)" stopOpacity="0.3" />
        </linearGradient>
        <filter id="plasma-blur">
          <feGaussianBlur stdDeviation="1.5" />
        </filter>
        <style>{`
          .et-plasma {
            animation: et-plasma-pulse 1.5s ease-in-out infinite;
          }
          @keyframes et-plasma-pulse {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 0.6; }
          }
          .et-particle {
            animation: et-particle-bob var(--dur) ease-in-out infinite;
          }
          @keyframes et-particle-bob {
            0%, 100% { transform: translateY(0); opacity: 0.3; }
            50% { transform: translateY(20px); opacity: 1; }
          }
          .et-ion-line {
            animation: et-ion-bob 1s ease-in-out infinite;
            animation-delay: var(--delay);
          }
          @keyframes et-ion-bob {
            0%, 100% { transform: translateY(0); opacity: 0.5; }
            50% { transform: translateY(10px); opacity: 0.5; }
          }
          .et-ion-head {
            animation: et-ion-head-pulse 1s ease-in-out infinite;
            animation-delay: var(--delay);
          }
          @keyframes et-ion-head-pulse {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 0.8; }
          }
          .et-trench {
            animation: et-trench-grow 4s ease-in-out infinite;
            transform-origin: center top;
          }
          @keyframes et-trench-grow {
            0% { transform: scaleY(0); }
            38% { transform: scaleY(0.385); }
            77% { transform: scaleY(0.769); }
            100% { transform: scaleY(1); }
          }
          .et-debris {
            animation: et-debris-rise 2s ease-out infinite;
            animation-delay: var(--delay);
          }
          @keyframes et-debris-rise {
            0% { transform: translateY(0); opacity: 0.6; }
            50% { opacity: 0.3; }
            100% { transform: translateY(-40px); opacity: 0; }
          }
        `}</style>
      </defs>

      {/* Vacuum chamber */}
      <rect x="80" y="20" width="240" height="220" rx="8" fill="none" stroke="hsl(222 47% 30%)" strokeWidth="2" />
      <text x="200" y="15" fill="hsl(222 47% 50%)" fontSize="9" textAnchor="middle">等离子体刻蚀腔</text>

      {/* Gas inlet */}
      <rect x="175" y="20" width="50" height="15" rx="3" fill="hsl(222 47% 18%)" stroke="hsl(187 85% 40%)" strokeWidth="0.5" />
      <text x="200" y="32" fill="hsl(187 85% 70%)" fontSize="7" textAnchor="middle">SF₆气体</text>

      {/* Plasma region */}
      <rect className="et-plasma" x="100" y="45" width="200" height="80" fill="url(#plasma-grad)" opacity="0.5" />

      {/* Plasma particles */}
      {Array.from({ length: 12 }).map((_, i) => (
        <circle
          key={i}
          className="et-particle"
          cx={110 + (i % 4) * 55}
          cy={55 + Math.floor(i / 4) * 25}
          r="2"
          fill="hsl(187 85% 70%)"
          filter="url(#plasma-blur)"
          style={{ '--dur': `${1 + i * 0.2}s` } as React.CSSProperties}
        />
      ))}

      {/* RF electrode */}
      <rect x="100" y="40" width="200" height="4" fill="hsl(222 47% 30%)" />
      <text x="340" y="44" fill="hsl(187 85% 60%)" fontSize="7">RF电极</text>

      {/* Ion arrows going down */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <g key={`ion-${i}`}>
          <line
            className="et-ion-line"
            x1={120 + i * 30}
            y1={90}
            x2={120 + i * 30}
            y2={140}
            stroke="hsl(187 85% 60%)"
            strokeWidth="1"
            style={{ '--delay': `${i * 0.15}s` } as React.CSSProperties}
          />
          <polygon
            className="et-ion-head"
            points={`${117 + i * 30},140 ${123 + i * 30},140 ${120 + i * 30},148`}
            fill="hsl(187 85% 60%)"
            style={{ '--delay': `${i * 0.15}s` } as React.CSSProperties}
          />
        </g>
      ))}

      {/* Wafer with photoresist pattern */}
      <rect x="110" y="190" width="180" height="15" rx="2" fill="hsl(220 15% 60%)" />

      {/* Photoresist mask */}
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={`mask-${i}`} x={120 + i * 32} y={180} width={16} height={10} rx="1" fill="hsl(270 50% 40%)" />
      ))}

      {/* Etched trenches */}
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={`trench-${i}`} className="et-trench" x={140 + i * 32} y={192} width={14} height={13} fill="hsl(222 47% 10%)" />
      ))}

      {/* Etch debris particles */}
      {Array.from({ length: 6 }).map((_, i) => (
        <circle key={`debris-${i}`} className="et-debris" cx={145 + i * 32} cy={195} r="1" fill="hsl(187 85% 80%)" opacity="0.6" style={{ '--delay': `${i * 0.3}s` } as React.CSSProperties} />
      ))}

      <text x="200" y="225" fill="hsl(187 85% 60%)" fontSize="9" textAnchor="middle">反应离子刻蚀 (RIE)</text>
      <text x="200" y="260" fill="hsl(187 85% 50%)" fontSize="8" textAnchor="middle">各向异性 · 高选择比 · 纳米精度</text>
    </svg>
  );
}
