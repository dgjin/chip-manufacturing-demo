export function SiliconPurificationAnimation() {
  return (
    <svg viewBox="0 0 400 300" className="w-full h-full">
      <defs>
        <radialGradient id="heat-glow" cx="50%" cy="60%" r="50%">
          <stop offset="0%" stopColor="hsl(30 100% 60%)" stopOpacity="0.8" />
          <stop offset="50%" stopColor="hsl(20 100% 50%)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="hsl(10 100% 30%)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="silicon-melt" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(30 100% 70%)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="hsl(15 100% 40%)" stopOpacity="1" />
        </linearGradient>
        <filter id="heat-blur">
          <feGaussianBlur stdDeviation="2" />
        </filter>
        <style>{`
          .si-molten {
            animation: si-molten-breathe 2s ease-in-out infinite;
          }
          @keyframes si-molten-breathe {
            0%, 100% { d: path("M125 180 L132 245 L268 245 L275 180 Z"); }
            50% { d: path("M125 178 L132 245 L268 245 L275 178 Z"); }
          }
          .si-heat-ellipse {
            animation: si-heat-pulse 1.5s ease-in-out infinite;
          }
          @keyframes si-heat-pulse {
            0%, 100% { opacity: 0.6; transform: scaleY(1); }
            50% { opacity: 1; transform: scaleY(1.125); }
          }
          .si-particle {
            animation: si-particle-rise var(--dur) ease-out infinite;
            animation-delay: var(--delay);
          }
          @keyframes si-particle-rise {
            0% { transform: translateY(0); opacity: 0.8; }
            50% { opacity: 0.4; }
            100% { transform: translateY(-100px); opacity: 0; }
          }
          .si-rod {
            animation: si-rod-appear 4s ease forwards;
          }
          @keyframes si-rod-appear {
            0%, 50% { opacity: 0; }
            100% { opacity: 0.9; }
          }
          .si-rod-shine {
            animation: si-rod-shine-appear 4s ease forwards;
          }
          @keyframes si-rod-shine-appear {
            0%, 50% { opacity: 0; }
            100% { opacity: 0.5; }
          }
          .si-arrow-pulse {
            animation: si-pulse 2s ease-in-out infinite;
          }
          @keyframes si-pulse {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 0.8; }
          }
          .si-temp-bar {
            animation: si-temp-grow 1s ease-in-out infinite;
          }
          @keyframes si-temp-grow {
            0%, 100% { transform: scaleY(1); }
            50% { transform: scaleY(1.167); }
          }
        `}</style>
      </defs>

      {/* Crucible */}
      <path d="M120 160 L130 250 L270 250 L280 160" fill="none" stroke="hsl(222 47% 30%)" strokeWidth="3" />
      <path d="M120 160 L130 250 L270 250 L280 160 Z" fill="hsl(222 47% 12%)" opacity="0.5" />

      {/* Molten silicon */}
      <path className="si-molten" d="M125 180 L132 245 L268 245 L275 180 Z" fill="url(#silicon-melt)" />

      {/* Heat glow */}
      <ellipse className="si-heat-ellipse" cx="200" cy="190" rx="80" ry="40" fill="url(#heat-glow)" style={{ transformOrigin: '200px 190px' }} />

      {/* Rising particles */}
      {[0, 1, 2, 3, 4].map((i) => (
        <circle
          key={i}
          className="si-particle"
          cx={150 + i * 25}
          cy={170}
          r="2"
          fill="hsl(43 96% 70%)"
          filter="url(#heat-blur)"
          style={{ '--dur': `${2 + i * 0.3}s`, '--delay': `${i * 0.4}s` } as React.CSSProperties}
        />
      ))}

      {/* Silicon rod (result) */}
      <rect className="si-rod" x="185" y="50" width="30" height="110" rx="4" fill="hsl(220 10% 75%)" />
      <rect className="si-rod-shine" x="188" y="55" width="8" height="100" rx="2" fill="hsl(220 10% 85%)" />

      {/* Labels */}
      <text x="100" y="290" fill="hsl(43 96% 70%)" fontSize="10" textAnchor="middle">石英砂</text>
      <text x="300" y="290" fill="hsl(43 96% 70%)" fontSize="10" textAnchor="middle">多晶硅</text>

      {/* Arrow */}
      <line className="si-arrow-pulse" x1="110" y1="285" x2="150" y2="285" stroke="hsl(43 96% 56%)" strokeWidth="1" />
      <polygon className="si-arrow-pulse" points="150,282 150,288 158,285" fill="hsl(43 96% 56%)" />

      {/* Temperature indicator */}
      <text x="340" y="100" fill="hsl(0 80% 60%)" fontSize="11" textAnchor="end">1100°C</text>
      <rect className="si-temp-bar" x="345" y="90" width="3" height="30" rx="1" fill="hsl(0 80% 60%)" opacity="0.6" style={{ transformOrigin: '345px 120px' }} />
    </svg>
  );
}
