export function ThinFilmDepositionAnimation() {
  return (
    <svg viewBox="0 0 400 300" className="w-full h-full">
      <defs>
        <linearGradient id="gas-flow" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(217 91% 60%)" stopOpacity="0.1" />
          <stop offset="100%" stopColor="hsl(217 91% 60%)" stopOpacity="0.4" />
        </linearGradient>
        <filter id="deposit-glow">
          <feGaussianBlur stdDeviation="1" />
        </filter>
        <style>{`
          .tfd-gas-line {
            animation: tfd-dash 1s linear infinite, tfd-gas-fade 2s ease-in-out infinite;
            animation-delay: 0s, var(--delay);
          }
          @keyframes tfd-dash {
            to { stroke-dashoffset: -8; }
          }
          @keyframes tfd-gas-fade {
            0%, 100% { opacity: 0.1; }
            50% { opacity: 0.4; }
          }
          .tfd-mol {
            animation: tfd-mol-fall var(--dur) ease-in infinite;
            animation-delay: var(--delay);
          }
          @keyframes tfd-mol-fall {
            0% { transform: translateY(0); opacity: 0.6; }
            80% { opacity: 0.2; }
            100% { transform: translateY(100px); opacity: 0; }
          }
          .tfd-layer1 {
            animation: tfd-layer1-grow 6s ease-in-out infinite;
            transform-origin: 125px 180px;
          }
          @keyframes tfd-layer1-grow {
            0% { transform: scaleY(0); opacity: 0.6; }
            50% { transform: scaleY(0.5); opacity: 0.6; }
            100% { transform: scaleY(1); opacity: 0.6; }
          }
          .tfd-layer2 {
            animation: tfd-layer2-grow 6s ease-in-out infinite;
            transform-origin: 125px 174px;
          }
          @keyframes tfd-layer2-grow {
            0%, 50% { transform: scaleY(0); opacity: 0; }
            100% { transform: scaleY(1); opacity: 0.5; }
          }
        `}</style>
      </defs>

      {/* CVD Chamber */}
      <rect x="80" y="20" width="240" height="220" rx="8" fill="none" stroke="hsl(222 47% 30%)" strokeWidth="2" />
      <text x="200" y="15" fill="hsl(217 91% 60%)" fontSize="9" textAnchor="middle">CVD反应腔</text>

      {/* Gas inlet */}
      <rect x="140" y="20" width="50" height="12" rx="3" fill="hsl(222 47% 18%)" stroke="hsl(217 91% 40%)" strokeWidth="0.5" />
      <text x="165" y="30" fill="hsl(217 91% 70%)" fontSize="6" textAnchor="middle">SiH₄</text>
      <rect x="210" y="20" width="50" height="12" rx="3" fill="hsl(222 47% 18%)" stroke="hsl(217 91% 40%)" strokeWidth="0.5" />
      <text x="235" y="30" fill="hsl(217 91% 70%)" fontSize="6" textAnchor="middle">O₂</text>

      {/* Gas flow lines */}
      {Array.from({ length: 8 }).map((_, i) => (
        <line
          key={`gas-${i}`}
          className="tfd-gas-line"
          x1={130 + i * 20}
          y1={35}
          x2={130 + i * 20}
          y2={160}
          stroke="hsl(217 91% 50%)"
          strokeWidth="0.5"
          opacity="0.2"
          strokeDasharray="4 4"
          style={{ '--delay': `${i * 0.2}s` } as React.CSSProperties}
        />
      ))}

      {/* Falling molecules */}
      {Array.from({ length: 10 }).map((_, i) => (
        <circle
          key={`mol-${i}`}
          className="tfd-mol"
          cx={120 + (i % 5) * 40}
          cy={50 + Math.floor(i / 5) * 30}
          r="3"
          fill="hsl(217 91% 60%)"
          filter="url(#deposit-glow)"
          opacity="0.6"
          style={{ '--dur': `${2 + (i % 3) * 0.5}s`, '--delay': `${(i % 5) * 0.4}s` } as React.CSSProperties}
        />
      ))}

      {/* Wafer substrate */}
      <rect x="120" y="180" width="160" height="12" rx="2" fill="hsl(220 15% 60%)" stroke="hsl(220 15% 50%)" strokeWidth="0.5" />
      <text x="200" y="190" fill="hsl(220 15% 80%)" fontSize="7" textAnchor="middle">硅衬底</text>

      {/* Deposition layers building up */}
      <rect className="tfd-layer1" x="125" y={174} width="150" height="6" rx="1" fill="hsl(217 91% 40%)" />

      {/* Second deposition layer */}
      <rect className="tfd-layer2" x="125" y={168} width="150" height="4" rx="1" fill="hsl(270 50% 50%)" />

      {/* Heater */}
      <rect x="130" y="200" width="140" height="8" rx="2" fill="hsl(0 70% 40%)" opacity="0.4" />
      <text x="200" y="207" fill="hsl(0 70% 70%)" fontSize="6" textAnchor="middle">加热器</text>

      {/* Pump */}
      <rect x="160" y="225" width="80" height="10" rx="3" fill="hsl(222 47% 18%)" stroke="hsl(222 47% 35%)" strokeWidth="0.5" />
      <text x="200" y="233" fill="hsl(222 47% 50%)" fontSize="6" textAnchor="middle">真空泵</text>

      {/* Layer labels on the right */}
      <line x1="275" y1="176" x2="300" y2="160" stroke="hsl(217 91% 50%)" strokeWidth="0.5" opacity="0.5" />
      <text x="305" y="160" fill="hsl(217 91% 60%)" fontSize="7">SiO₂层</text>

      <line x1="275" y1="170" x2="300" y2="140" stroke="hsl(270 50% 60%)" strokeWidth="0.5" opacity="0.5" />
      <text x="305" y="140" fill="hsl(270 50% 60%)" fontSize="7">Si₃N₄层</text>

      <text x="200" y="260" fill="hsl(217 91% 60%)" fontSize="9" textAnchor="middle">化学气相沉积 (CVD)</text>
    </svg>
  );
}
