export function IonImplantationAnimation() {
  return (
    <svg viewBox="0 0 400 300" className="w-full h-full">
      <defs>
        <linearGradient id="beam-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(160 84% 39%)" stopOpacity="0.1" />
          <stop offset="50%" stopColor="hsl(160 84% 50%)" stopOpacity="0.7" />
          <stop offset="100%" stopColor="hsl(160 84% 39%)" stopOpacity="0.1" />
        </linearGradient>
        <filter id="ion-glow">
          <feGaussianBlur stdDeviation="2" />
        </filter>
        <style>{`
          .ii-ring {
            animation: ii-ring-flash 0.8s ease-in-out infinite;
            animation-delay: var(--delay);
          }
          @keyframes ii-ring-flash {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 0.8; }
          }
          .ii-beam {
            animation: ii-beam-pulse 1.5s ease-in-out infinite;
          }
          @keyframes ii-beam-pulse {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 0.6; }
          }
          .ii-particle {
            animation: ii-particle-move 0.5s ease-in-out infinite;
            animation-delay: var(--delay);
          }
          @keyframes ii-particle-move {
            0%, 100% { transform: translateX(0); opacity: 0.3; }
            50% { transform: translateX(10px); opacity: 1; }
          }
          .ii-focused {
            animation: ii-focused-pulse 1s ease-in-out infinite;
          }
          @keyframes ii-focused-pulse {
            0%, 100% { opacity: 0.2; }
            50% { opacity: 0.5; }
          }
          .ii-implant {
            animation: ii-implant-dive 1.5s ease-in infinite;
            animation-delay: var(--delay);
          }
          @keyframes ii-implant-dive {
            0% { transform: translateY(0); opacity: 0; }
            66% { transform: translateY(25px); opacity: 1; }
            100% { transform: translateY(30px); opacity: 0.7; }
          }
        `}</style>
      </defs>

      {/* Ion source */}
      <rect x="20" y="120" width="50" height="60" rx="6" fill="hsl(222 47% 15%)" stroke="hsl(160 84% 39%)" strokeWidth="1" />
      <text x="45" y="145" fill="hsl(160 84% 60%)" fontSize="7" textAnchor="middle">离子源</text>
      <text x="45" y="158" fill="hsl(160 84% 50%)" fontSize="6" textAnchor="middle">B⁺/P⁺/As⁺</text>

      {/* Acceleration column */}
      <rect x="75" y="135" width="100" height="30" rx="4" fill="hsl(222 47% 10%)" stroke="hsl(160 84% 30%)" strokeWidth="0.5" />
      {/* Acceleration rings */}
      {[0, 1, 2, 3].map((i) => (
        <g key={`ring-${i}`}>
          <rect className="ii-ring" x={85 + i * 22} y={130} width="2" height="40" fill="hsl(160 84% 39%)" style={{ '--delay': `${i * 0.2}s` } as React.CSSProperties} />
          <text x={86 + i * 22} y={126} fill="hsl(160 84% 50%)" fontSize="6">+</text>
        </g>
      ))}
      <text x="125" y="155" fill="hsl(160 84% 60%)" fontSize="7" textAnchor="middle">加速电场</text>

      {/* Ion beam */}
      <rect className="ii-beam" x="70" y="142" width="130" height="16" fill="url(#beam-grad)" opacity="0.5" />

      {/* Beam particles */}
      {Array.from({ length: 8 }).map((_, i) => (
        <circle key={i} className="ii-particle" cx={80 + i * 16} cy={150} r="2" fill="hsl(160 84% 60%)" filter="url(#ion-glow)" style={{ '--delay': `${i * 0.1}s` } as React.CSSProperties} />
      ))}

      {/* Mass analyzer magnet */}
      <path d="M180 130 Q210 150 180 170" fill="none" stroke="hsl(270 70% 60%)" strokeWidth="3" opacity="0.6" />
      <text x="225" y="140" fill="hsl(270 70% 60%)" fontSize="7">质量分析器</text>
      <text x="225" y="155" fill="hsl(270 70% 50%)" fontSize="6">磁场偏转</text>

      {/* Focused beam */}
      <polygon className="ii-focused" points="200,142 200,158 260,148 260,152" fill="url(#beam-grad)" opacity="0.4" />

      {/* Target wafer */}
      <rect x="260" y="110" width="100" height="80" rx="4" fill="hsl(222 47% 10%)" stroke="hsl(222 47% 25%)" strokeWidth="1" />
      <text x="310" y="105" fill="hsl(222 47% 50%)" fontSize="7" textAnchor="middle">靶室</text>

      {/* Wafer in chamber */}
      <rect x="275" y="135" width="70" height="12" rx="2" fill="hsl(220 15% 60%)" stroke="hsl(220 15% 50%)" strokeWidth="0.5" />

      {/* Silicon lattice */}
      {Array.from({ length: 5 }).map((_, row) =>
        Array.from({ length: 7 }).map((_, col) => (
          <circle key={`lat-${row}-${col}`} cx={282 + col * 10} cy={155 + row * 10} r="2" fill="hsl(220 15% 70%)" opacity="0.4" />
        ))
      )}

      {/* Implanted ions */}
      {Array.from({ length: 5 }).map((_, i) => (
        <circle key={`imp-${i}`} className="ii-implant" cx={285 + i * 12} cy={145} r="2.5" fill="hsl(160 84% 50%)" filter="url(#ion-glow)" style={{ '--delay': `${i * 0.3}s` } as React.CSSProperties} />
      ))}

      {/* Energy label */}
      <text x="125" y="180" fill="hsl(160 84% 50%)" fontSize="8" textAnchor="middle">10keV ~ 5MeV</text>

      {/* Process label */}
      <text x="310" y="260" fill="hsl(160 84% 60%)" fontSize="9" textAnchor="middle">离子注入</text>
      <text x="310" y="275" fill="hsl(160 84% 45%)" fontSize="7" textAnchor="middle">精确控制剂量与深度</text>
    </svg>
  );
}
