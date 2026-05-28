export function TestingAnimation() {
  return (
    <svg viewBox="0 0 400 300" className="w-full h-full">
      <defs>
        <linearGradient id="scan-line" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(187 85% 53%)" stopOpacity="0" />
          <stop offset="50%" stopColor="hsl(187 85% 70%)" stopOpacity="0.8" />
          <stop offset="100%" stopColor="hsl(187 85% 53%)" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="chip-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(220 15% 50%)" />
          <stop offset="100%" stopColor="hsl(220 15% 40%)" />
        </linearGradient>
        <filter id="test-glow">
          <feGaussianBlur stdDeviation="1" />
        </filter>
        <style>{`
          .tst-result {
            animation: tst-result-appear 3s ease forwards;
            animation-delay: var(--delay);
          }
          @keyframes tst-result-appear {
            0% { opacity: 0; }
            100% { opacity: 0.6; }
          }
          .tst-scan {
            animation: tst-scan-move 3s ease-in-out infinite;
          }
          @keyframes tst-scan-move {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(60px); }
          }
          .tst-cable {
            animation: tst-cable-flow 0.5s linear infinite;
          }
          @keyframes tst-cable-flow {
            to { stroke-dashoffset: -6; }
          }
          .tst-probe {
            animation: tst-probe-bob 2s ease-in-out infinite;
            animation-delay: var(--delay);
          }
          @keyframes tst-probe-bob {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(10px); }
          }
          .tst-signal {
            animation: tst-signal-pulse 1s ease-in-out infinite;
          }
          @keyframes tst-signal-pulse {
            0%, 100% { opacity: 0.2; }
            50% { opacity: 0.7; }
          }
          .tst-led {
            animation: tst-led-blink 1s ease-in-out infinite;
          }
          @keyframes tst-led-blink {
            0%, 100% { opacity: 0.5; }
            50% { opacity: 1; }
          }
          .tst-led-delay {
            animation: tst-led-blink 1s ease-in-out infinite;
            animation-delay: 0.3s;
          }
          .tst-progress {
            animation: tst-progress-grow 8s linear infinite;
            transform-origin: left center;
          }
          @keyframes tst-progress-grow {
            0% { transform: scaleX(0); }
            100% { transform: scaleX(1); }
          }
        `}</style>
      </defs>

      {/* ATE System */}
      <rect x="20" y="40" width="120" height="180" rx="6" fill="hsl(222 47% 12%)" stroke="hsl(222 47% 30%)" strokeWidth="1" />
      <text x="80" y="35" fill="hsl(187 85% 60%)" fontSize="8" textAnchor="middle">自动测试设备 (ATE)</text>

      {/* Screen */}
      <rect x="30" y="50" width="100" height="60" rx="3" fill="hsl(222 47% 8%)" stroke="hsl(187 85% 30%)" strokeWidth="0.5" />

      {/* Test results on screen */}
      {Array.from({ length: 4 }).map((_, row) =>
        Array.from({ length: 8 }).map((_, col) => (
          <rect
            key={`result-${row}-${col}`}
            className="tst-result"
            x={35 + col * 11}
            y={55 + row * 13}
            width={8}
            height={10}
            rx="1"
            fill={row === 2 && col === 5 ? "hsl(0 70% 50%)" : "hsl(160 84% 39%)"}
            style={{ '--delay': `${(row * 8 + col) * 0.05}s` } as React.CSSProperties}
          />
        ))
      )}

      {/* Scan line on screen */}
      <rect className="tst-scan" x="30" y="50" width="100" height="2" fill="url(#scan-line)" />

      {/* PASS/FAIL counter */}
      <text x="55" y="130" fill="hsl(160 84% 60%)" fontSize="7">PASS: 31</text>
      <text x="55" y="142" fill="hsl(0 70% 60%)" fontSize="7">FAIL: 1</text>
      <text x="55" y="155" fill="hsl(187 85% 50%)" fontSize="7">YIELD: 96.9%</text>

      {/* Connection cable */}
      <line className="tst-cable" x1="140" y1="130" x2="180" y2="130" stroke="hsl(187 85% 40%)" strokeWidth="2" strokeDasharray="4 2" />

      {/* Probe card / Test board */}
      <rect x="180" y="60" width="200" height="20" rx="3" fill="hsl(222 47% 15%)" stroke="hsl(187 85% 30%)" strokeWidth="0.5" />
      <text x="280" y="74" fill="hsl(187 85% 50%)" fontSize="7" textAnchor="middle">探针卡 / 测试板</text>

      {/* Probe needles */}
      {Array.from({ length: 8 }).map((_, i) => (
        <line
          key={`probe-${i}`}
          className="tst-probe"
          x1={195 + i * 22}
          y1={80}
          x2={195 + i * 22}
          y2={105}
          stroke="hsl(43 96% 60%)"
          strokeWidth="0.8"
          opacity="0.6"
          style={{ '--delay': `${i * 0.1}s` } as React.CSSProperties}
        />
      ))}

      {/* Chip under test */}
      <rect x="190" y="110" width="180" height="60" rx="4" fill="hsl(222 47% 12%)" stroke="hsl(222 47% 25%)" strokeWidth="0.5" />
      <rect x="220" y="120" width="120" height="40" rx="2" fill="url(#chip-grad)" stroke="hsl(220 15% 55%)" strokeWidth="0.5" />

      {/* Chip die inside */}
      <rect x="240" y="128" width="80" height="24" rx="1" fill="hsl(222 47% 8%)" />
      {/* Die pads */}
      {Array.from({ length: 6 }).map((_, i) => (
        <rect key={`died-${i}`} x={245 + i * 12} y={125} width={4} height={3} fill="hsl(43 96% 56%)" opacity="0.7" />
      ))}
      {Array.from({ length: 6 }).map((_, i) => (
        <rect key={`died-b-${i}`} x={245 + i * 12} y={152} width={4} height={3} fill="hsl(43 96% 56%)" opacity="0.7" />
      ))}

      {/* Test signal waves */}
      <path className="tst-signal" d="M180,130 Q190,125 200,130 Q210,135 220,130" fill="none" stroke="hsl(187 85% 60%)" strokeWidth="0.8" />

      {/* Status indicators */}
      <circle className="tst-led" cx="195" cy="185" r="4" fill="hsl(160 84% 39%)" filter="url(#test-glow)" />
      <text x="205" y="188" fill="hsl(160 84% 60%)" fontSize="7">功能测试</text>

      <circle className="tst-led-delay" cx="295" cy="185" r="4" fill="hsl(187 85% 53%)" filter="url(#test-glow)" />
      <text x="305" y="188" fill="hsl(187 85% 60%)" fontSize="7">性能测试</text>

      <text x="280" y="230" fill="hsl(187 85% 60%)" fontSize="9" textAnchor="middle">芯片测试</text>
      <text x="280" y="248" fill="hsl(187 85% 45%)" fontSize="7" textAnchor="middle">CP晶圆测试 + FT成品测试</text>

      {/* Test timeline at bottom */}
      <rect x="40" y="260" width="320" height="4" rx="2" fill="hsl(222 47% 15%)" />
      <rect className="tst-progress" x="40" y="260" width="320" height="4" rx="2" fill="hsl(187 85% 40%)" opacity="0.6" />
      <text x="40" y="280" fill="hsl(222 47% 50%)" fontSize="6">晶圆测试</text>
      <text x="200" y="280" fill="hsl(222 47% 50%)" fontSize="6">封装</text>
      <text x="340" y="280" fill="hsl(222 47% 50%)" fontSize="6">成品测试</text>
    </svg>
  );
}
