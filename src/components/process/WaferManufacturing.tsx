export function WaferManufacturingAnimation() {
  return (
    <svg viewBox="0 0 400 300" className="w-full h-full">
      <defs>
        <linearGradient id="ingot-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(220 15% 55%)" />
          <stop offset="30%" stopColor="hsl(220 15% 75%)" />
          <stop offset="50%" stopColor="hsl(220 15% 85%)" />
          <stop offset="70%" stopColor="hsl(220 15% 75%)" />
          <stop offset="100%" stopColor="hsl(220 15% 55%)" />
        </linearGradient>
        <radialGradient id="wafer-shine" cx="40%" cy="40%" r="50%">
          <stop offset="0%" stopColor="hsl(220 15% 95%)" stopOpacity="0.4" />
          <stop offset="100%" stopColor="hsl(220 15% 70%)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="wire-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(217 91% 60%)" />
          <stop offset="100%" stopColor="hsl(217 91% 40%)" />
        </linearGradient>
        <style>{`
          .wf-ingot {
            animation: wf-ingot-shrink 8s ease-in-out infinite;
            transform-origin: 80px 40px;
          }
          @keyframes wf-ingot-shrink {
            0% { transform: scaleY(1); }
            14% { transform: scaleY(0.9); }
            28% { transform: scaleY(0.8); }
            43% { transform: scaleY(0.7); }
            57% { transform: scaleY(0.6); }
            71% { transform: scaleY(0.5); }
            86% { transform: scaleY(0.4); }
            100% { transform: scaleY(0.3); }
          }
          .wf-rotate-dash {
            animation: wf-dash 1s linear infinite;
          }
          @keyframes wf-dash {
            to { stroke-dashoffset: -12; }
          }
          .wf-wire {
            animation: wf-wire-move 8s ease-in-out infinite;
          }
          @keyframes wf-wire-move {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(120px); }
          }
          .wf-wire-vib {
            animation: wf-wire-move 8s ease-in-out infinite, wf-vib-flicker 0.1s step-end infinite;
          }
          @keyframes wf-vib-flicker {
            0%, 100% { opacity: 0.6; }
            50% { opacity: 0; }
          }
          .wf-wafer {
            opacity: 0;
            animation: wf-wafer-appear 0.5s ease forwards;
            animation-delay: var(--delay);
          }
          @keyframes wf-wafer-appear {
            to { opacity: 1; }
          }
          .wf-spark {
            animation: wf-spark-move 0.5s ease-in-out infinite, wf-spark-fade 0.5s ease-in-out infinite, wf-spark-track 8s ease-in-out infinite;
          }
          @keyframes wf-spark-move {
            0% { transform: translate(0, 0); }
            25% { transform: translate(-10px, -5px); }
            50% { transform: translate(10px, 5px); }
            75% { transform: translate(0, 0); }
          }
          @keyframes wf-spark-fade {
            0%, 100% { opacity: 0; }
            50% { opacity: 1; }
          }
          @keyframes wf-spark-track {
            0%, 100% { --spark-y: 0px; }
            50% { --spark-y: 120px; }
          }
        `}</style>
      </defs>

      {/* Ingot */}
      <rect className="wf-ingot" x="60" y="40" width="40" height="200" rx="8" fill="url(#ingot-grad)" />

      {/* Seed crystal at top */}
      <line x1="80" y1="10" x2="80" y2="40" stroke="hsl(222 47% 40%)" strokeWidth="2" />
      <circle cx="80" cy="8" r="4" fill="hsl(222 47% 60%)" />

      {/* Rotation indicator */}
      <path className="wf-rotate-dash" d="M70 15 A15 15 0 0 1 90 15" fill="none" stroke="hsl(217 91% 60%)" strokeWidth="1" opacity="0.5" strokeDasharray="3 3" />

      {/* Wire saw */}
      <g className="wf-wire">
        <line x1="130" y1="80" x2="250" y2="80" stroke="url(#wire-grad)" strokeWidth="1.5" opacity="0.8" />
      </g>
      {/* Wire vibration */}
      <g className="wf-wire-vib">
        <line x1="130" y1="82" x2="250" y2="82" stroke="hsl(217 91% 60%)" strokeWidth="0.5" opacity="0.4" />
      </g>

      {/* Cut wafers stacking on the right */}
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <ellipse className="wf-wafer" cx="310" cy={240 - i * 12} rx="40" ry="5" fill="hsl(220 15% 75%)" stroke="hsl(220 15% 60%)" strokeWidth="0.5" style={{ '--delay': `${1.5 + i * 1}s` } as React.CSSProperties} />
          <ellipse className="wf-wafer" cx="310" cy={240 - i * 12} rx="40" ry="5" fill="url(#wafer-shine)" style={{ '--delay': `${1.5 + i * 1}s` } as React.CSSProperties} />
        </g>
      ))}

      {/* Sparkle particles at cut point */}
      <circle className="wf-spark" cx="130" cy="140" r="1.5" fill="hsl(217 91% 80%)" />

      {/* Labels */}
      <text x="80" y="280" fill="hsl(217 91% 70%)" fontSize="10" textAnchor="middle">单晶硅锭</text>
      <text x="310" y="280" fill="hsl(217 91% 70%)" fontSize="10" textAnchor="middle">晶圆</text>

      {/* CZ label */}
      <text x="200" y="30" fill="hsl(217 91% 60%)" fontSize="10" textAnchor="middle" opacity="0.6">CZ法提拉</text>
    </svg>
  );
}
