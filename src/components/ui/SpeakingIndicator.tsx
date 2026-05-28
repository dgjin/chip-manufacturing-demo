import { useMemo } from 'react';

export function SpeakingIndicator() {
  const barHeights = useMemo(
    () => [0, 1, 2, 3].map(() => 8 + Math.round(Math.random() * 8)),
    []
  );

  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30">
      <div className="flex gap-0.5">
        {barHeights.map((h, i) => (
          <div
            key={i}
            className="w-1 bg-primary rounded-full"
            style={{
              animation: 'pulse-glow 0.5s ease-in-out infinite',
              height: `${h}px`,
              animationDelay: `${i * 0.1}s`,
            }}
          />
        ))}
      </div>
      <span className="text-xs text-primary">语音讲解中...</span>
    </div>
  );
}
