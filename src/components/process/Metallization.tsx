export function MetallizationAnimation() {
  return (
    <svg viewBox="0 0 400 300" className="w-full h-full">
      <defs>
        <linearGradient id="copper-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(43 70% 45%)" />
          <stop offset="50%" stopColor="hsl(43 96% 60%)" />
          <stop offset="100%" stopColor="hsl(43 70% 45%)" />
        </linearGradient>
        <filter id="metal-glow">
          <feGaussianBlur stdDeviation="1" />
        </filter>
        <style>{`
          .met-copper {
            animation: met-copper-appear 6s ease forwards;
            animation-delay: var(--delay);
          }
          @keyframes met-copper-appear {
            0%, 33% { opacity: 0; }
            100% { opacity: 0.9; }
          }
          .met-via {
            animation: met-via-appear 6s ease forwards;
            animation-delay: var(--delay);
          }
          @keyframes met-via-appear {
            0%, 33% { opacity: 0; }
            100% { opacity: 0.8; }
          }
          .met-shine {
            animation: met-shine-sweep 3s ease-in-out infinite;
          }
          @keyframes met-shine-sweep {
            0%, 100% { transform: translateX(0); opacity: 0; }
            50% { transform: translateX(120px); opacity: 0.05; }
          }
        `}</style>
      </defs>

      {/* Cross-section view of interconnect layers */}
      <text x="200" y="20" fill="hsl(43 96% 60%)" fontSize="9" textAnchor="middle">铜大马士革工艺 - 截面图</text>

      {/* Dielectric layers */}
      {Array.from({ length: 4 }).map((_, layer) => (
        <g key={`dielectric-${layer}`}>
          <rect
            x={80 + layer * 10}
            y={50 + layer * 50}
            width={240 - layer * 20}
            height={40}
            rx="2"
            fill="hsl(222 47% 12%)"
            stroke="hsl(222 47% 25%)"
            strokeWidth="0.5"
          />
          {/* Trench in dielectric */}
          {Array.from({ length: 3 - layer }).map((_, t) => (
            <rect
              key={`trench-${layer}-${t}`}
              x={100 + layer * 10 + t * 65}
              y={52 + layer * 50}
              width={20}
              height={36}
              rx="1"
              fill="hsl(222 47% 8%)"
            />
          ))}
        </g>
      ))}

      {/* Copper filled in trenches */}
      {Array.from({ length: 4 }).map((_, layer) =>
        Array.from({ length: 3 - layer }).map((_, t) => (
          <rect
            key={`copper-${layer}-${t}`}
            className="met-copper"
            x={100 + layer * 10 + t * 65}
            y={54 + layer * 50}
            width={20}
            height={32}
            rx="1"
            fill="url(#copper-grad)"
            style={{ '--delay': `${layer * 0.8}s` } as React.CSSProperties}
          />
        ))
      )}

      {/* VIA connections between layers */}
      {Array.from({ length: 3 }).map((_, v) => (
        <rect
          key={`via-${v}`}
          className="met-via"
          x={128 + v * 65}
          y={90 + v * 50}
          width={8}
          height={12}
          rx="1"
          fill="url(#copper-grad)"
          style={{ '--delay': `${1 + v * 0.5}s` } as React.CSSProperties}
        />
      ))}

      {/* Copper shine animation */}
      <rect className="met-shine" x="80" y="50" width="240" height="200" fill="hsl(43 96% 80%)" />

      {/* Layer labels */}
      <text x={335} y={70} fill="hsl(43 96% 60%)" fontSize="7">M1 局部互连</text>
      <text x={335} y={120} fill="hsl(43 96% 60%)" fontSize="7">M2 中间互连</text>
      <text x={335} y={170} fill="hsl(43 96% 60%)" fontSize="7">M3 全局互连</text>

      {/* Process steps on left */}
      <text x="30" y="80" fill="hsl(43 80% 50%)" fontSize="7">①刻蚀沟槽</text>
      <text x="30" y="100" fill="hsl(43 80% 50%)" fontSize="7">②电镀铜</text>
      <text x="30" y="120" fill="hsl(43 80% 50%)" fontSize="7">③CMP平坦化</text>

      <text x="200" y="275" fill="hsl(43 96% 60%)" fontSize="9" textAnchor="middle">铜大马士革互连工艺</text>
    </svg>
  );
}
