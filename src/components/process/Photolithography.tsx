export function PhotolithographyAnimation() {
  return (
    <svg viewBox="0 0 400 300" className="w-full h-full">
      <defs>
        <linearGradient id="uv-beam" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(270 70% 60%)" stopOpacity="0.1" />
          <stop offset="50%" stopColor="hsl(270 70% 70%)" stopOpacity="0.6" />
          <stop offset="100%" stopColor="hsl(270 70% 80%)" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id="resist-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(270 50% 40%)" />
          <stop offset="100%" stopColor="hsl(270 50% 30%)" />
        </linearGradient>
        <filter id="uv-glow">
          <feGaussianBlur stdDeviation="3" />
        </filter>
        <style>{`
          .ph-beam-pulse {
            animation: ph-pulse 2s ease-in-out infinite;
          }
          @keyframes ph-pulse {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 0.7; }
          }
          .ph-ray {
            animation: ph-ray-flicker 1.5s ease-in-out infinite;
            animation-delay: var(--delay);
          }
          @keyframes ph-ray-flicker {
            0%, 100% { opacity: 0.1; }
            50% { opacity: 0.5; }
          }
          .ph-mask {
            animation: ph-mask-glow 2s ease-in-out infinite;
            animation-delay: var(--delay);
          }
          @keyframes ph-mask-glow {
            0%, 100% { opacity: 0.5; }
            50% { opacity: 1; }
          }
          .ph-proj {
            animation: ph-proj-appear 2s ease-in-out infinite;
            animation-delay: var(--delay);
          }
          @keyframes ph-proj-appear {
            0% { opacity: 0; }
            40% { opacity: 0.8; }
            100% { opacity: 0.6; }
          }
          .ph-resist {
            animation: ph-pulse 2s ease-in-out infinite;
          }
          .ph-exposed {
            animation: ph-exposed-flash 3s ease-in-out infinite;
            animation-delay: var(--delay);
          }
          @keyframes ph-exposed-flash {
            0% { opacity: 0; }
            33% { opacity: 0.7; }
            100% { opacity: 0; }
          }
          .ph-glow-area {
            animation: ph-glow-pulse 2s ease-in-out infinite;
          }
          @keyframes ph-glow-pulse {
            0%, 100% { opacity: 0.1; }
            50% { opacity: 0.4; }
          }
        `}</style>
      </defs>

      {/* UV Light Source */}
      <rect x="170" y="10" width="60" height="20" rx="4" fill="hsl(270 70% 40%)" />
      <text x="200" y="24" fill="hsl(270 70% 80%)" fontSize="8" textAnchor="middle">EUV光源</text>

      {/* UV Beam cone */}
      <polygon className="ph-beam-pulse" points="190,30 210,30 280,120 120,120" fill="url(#uv-beam)" opacity="0.5" />

      {/* UV ray lines */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <line
          key={i}
          className="ph-ray"
          x1={185 + i * 4}
          y1={30}
          x2={135 + i * 18}
          y2={120}
          stroke="hsl(270 70% 70%)"
          strokeWidth="0.5"
          style={{ '--delay': `${i * 0.15}s` } as React.CSSProperties}
        />
      ))}

      {/* Photomask */}
      <rect x="130" y="70" width="140" height="8" rx="2" fill="hsl(222 47% 25%)" stroke="hsl(222 47% 40%)" strokeWidth="0.5" />
      {/* Mask patterns */}
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <rect key={i} className="ph-mask" x={145 + i * 18} y={71} width={8} height={6} fill="hsl(270 70% 80%)" style={{ '--delay': `${i * 0.2}s` } as React.CSSProperties} />
      ))}
      <text x="80" y="78" fill="hsl(270 70% 60%)" fontSize="8">掩模版</text>

      {/* Lens system */}
      <ellipse cx="200" cy="105" rx="50" ry="8" fill="hsl(222 30% 30%)" stroke="hsl(217 91% 50%)" strokeWidth="0.5" opacity="0.6" />
      <text x="80" y="108" fill="hsl(217 91% 60%)" fontSize="8">透镜</text>

      {/* Projected pattern on wafer */}
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <rect key={`proj-${i}`} className="ph-proj" x={155 + i * 14} y={168} width={6} height={4} fill="hsl(270 70% 70%)" style={{ '--delay': `${0.8 + i * 0.1}s` } as React.CSSProperties} />
      ))}

      {/* Wafer */}
      <rect x="130" y="175" width="140" height="12" rx="2" fill="hsl(220 15% 65%)" stroke="hsl(220 15% 50%)" strokeWidth="0.5" />

      {/* Photoresist layer */}
      <rect className="ph-resist" x="130" y="165" width="140" height="10" rx="1" fill="url(#resist-grad)" opacity="0.8" />
      <text x="80" y="173" fill="hsl(270 50% 60%)" fontSize="8">光刻胶</text>

      {/* Exposed resist pattern */}
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <rect key={`exp-${i}`} className="ph-exposed" x={157 + i * 14} y={166} width={6} height={8} fill="hsl(270 70% 50%)" style={{ '--delay': `${1 + i * 0.2}s` } as React.CSSProperties} />
      ))}

      {/* Wafer base */}
      <text x="200" y="200" fill="hsl(220 15% 60%)" fontSize="8" textAnchor="middle">硅晶圆</text>

      {/* Bottom labels */}
      <text x="130" y="230" fill="hsl(270 70% 60%)" fontSize="9" textAnchor="middle">13.5nm</text>
      <text x="200" y="230" fill="hsl(270 70% 70%)" fontSize="9" textAnchor="middle">极紫外光刻</text>
      <text x="280" y="230" fill="hsl(270 70% 60%)" fontSize="9" textAnchor="middle">纳米级精度</text>

      {/* Glowing effect on exposed area */}
      <ellipse className="ph-glow-area" cx="200" cy="170" rx="50" ry="8" fill="hsl(270 70% 60%)" filter="url(#uv-glow)" opacity="0.3" />
    </svg>
  );
}
