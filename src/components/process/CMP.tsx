export function CMPAnimation() {
  return (
    <svg viewBox="0 0 400 300" className="w-full h-full">
      <defs>
        <linearGradient id="pad-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(270 40% 30%)" />
          <stop offset="100%" stopColor="hsl(270 40% 20%)" />
        </linearGradient>
        <filter id="slurry-blur">
          <feGaussianBlur stdDeviation="1" />
        </filter>
        <style>{`
          .cmp-pad-spin {
            animation: cmp-spin 8s linear infinite;
            transform-origin: 200px 100px;
          }
          @keyframes cmp-spin {
            to { transform: rotate(360deg); }
          }
          .cmp-slurry {
            animation: cmp-slurry-bob 1s ease-in-out infinite;
            animation-delay: var(--delay);
          }
          @keyframes cmp-slurry-bob {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(5px); }
          }
          .cmp-dash-flow {
            animation: cmp-dash 0.5s linear infinite;
          }
          @keyframes cmp-dash {
            to { stroke-dashoffset: -4; }
          }
          .cmp-shine {
            animation: cmp-shine-slide 2s ease-in-out infinite;
          }
          @keyframes cmp-shine-slide {
            0%, 100% { transform: translateX(0); }
            50% { transform: translateX(20px); }
          }
        `}</style>
      </defs>

      {/* Polish pad (rotating) */}
      <ellipse className="cmp-pad-spin" cx="200" cy="100" rx="140" ry="30" fill="url(#pad-grad)" stroke="hsl(270 40% 40%)" strokeWidth="1" />

      {/* Pad texture lines */}
      {Array.from({ length: 6 }).map((_, i) => (
        <line
          key={`pad-${i}`}
          className="cmp-pad-spin"
          x1={100 + i * 35}
          y1={80}
          x2={110 + i * 35}
          y2={120}
          stroke="hsl(270 30% 35%)"
          strokeWidth="0.5"
          opacity="0.4"
        />
      ))}

      <text x="200" y="60" fill="hsl(270 40% 60%)" fontSize="8" textAnchor="middle">抛光垫 (旋转)</text>

      {/* Slurry drops */}
      {Array.from({ length: 5 }).map((_, i) => (
        <circle
          key={`slurry-${i}`}
          className="cmp-slurry"
          cx={140 + i * 30}
          cy={95}
          r="3"
          fill="hsl(270 50% 60%)"
          filter="url(#slurry-blur)"
          opacity="0.6"
          style={{ '--delay': `${i * 0.2}s` } as React.CSSProperties}
        />
      ))}

      {/* Slurry supply */}
      <rect x="170" y="40" width="60" height="15" rx="3" fill="hsl(222 47% 18%)" stroke="hsl(270 50% 40%)" strokeWidth="0.5" />
      <text x="200" y="51" fill="hsl(270 50% 70%)" fontSize="6" textAnchor="middle">抛光液</text>
      <line className="cmp-dash-flow" x1="185" y1="55" x2="185" y2="80" stroke="hsl(270 50% 50%)" strokeWidth="0.5" strokeDasharray="2 2" />
      <line className="cmp-dash-flow" x1="215" y1="55" x2="215" y2="80" stroke="hsl(270 50% 50%)" strokeWidth="0.5" strokeDasharray="2 2" />

      {/* Wafer being polished */}
      <ellipse cx="200" cy="130" rx="50" ry="10" fill="hsl(220 15% 60%)" stroke="hsl(220 15% 50%)" strokeWidth="0.5" />

      {/* Wafer holder / pressure head */}
      <rect x="170" y="130" width="60" height="30" rx="4" fill="hsl(222 47% 18%)" stroke="hsl(222 47% 30%)" strokeWidth="0.5" />
      <text x="200" y="148" fill="hsl(222 47% 50%)" fontSize="6" textAnchor="middle">压力头</text>

      {/* Pressure arrows */}
      <line x1="200" y1="170" x2="200" y2="130" stroke="hsl(222 47% 40%)" strokeWidth="1" opacity="0.5" />
      <polygon points="195,132 205,132 200,125" fill="hsl(222 47% 40%)" opacity="0.5" />

      {/* Before/After comparison */}
      {/* Before - uneven surface */}
      <g>
        <text x="80" y="200" fill="hsl(270 50% 60%)" fontSize="8" textAnchor="middle">抛光前</text>
        <rect x="50" y="210" width="60" height="10" rx="1" fill="hsl(220 15% 60%)" />
        {/* Uneven bumps */}
        <rect x="55" y="206" width="8" height="4" fill="hsl(217 91% 40%)" />
        <rect x="70" y="204" width="10" height="6" fill="hsl(217 91% 40%)" />
        <rect x="88" y="207" width="6" height="3" fill="hsl(217 91% 40%)" />
      </g>

      {/* Arrow */}
      <line x1="130" y1="215" x2="160" y2="215" stroke="hsl(270 50% 60%)" strokeWidth="1.5" opacity="0.5" />
      <polygon points="160,211 160,219 168,215" fill="hsl(270 50% 60%)" opacity="0.5" />

      {/* After - flat surface */}
      <g>
        <text x="240" y="200" fill="hsl(270 50% 60%)" fontSize="8" textAnchor="middle">抛光后</text>
        <rect x="210" y="210" width="60" height="10" rx="1" fill="hsl(220 15% 60%)" />
        <rect x="210" y="207" width="60" height="3" fill="hsl(217 91% 40%)" />
        {/* Smooth shine */}
        <rect className="cmp-shine" x="210" y="207" width="60" height="3" fill="hsl(220 15% 85%)" opacity="0.3" />
      </g>

      <text x="200" y="260" fill="hsl(270 50% 60%)" fontSize="9" textAnchor="middle">化学机械抛光 (CMP)</text>
      <text x="200" y="275" fill="hsl(270 50% 45%)" fontSize="7" textAnchor="middle">化学腐蚀 + 机械研磨 = 全局平坦化</text>
    </svg>
  );
}
