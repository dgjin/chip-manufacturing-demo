import { Link } from 'react-router-dom';
import { processStepMetas } from '@/data/stepMetas';

interface ProgressBarProps {
  currentIndex: number;
}

export function ProgressBar({ currentIndex }: ProgressBarProps) {
  const progress = ((currentIndex + 1) / processStepMetas.length) * 100;

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-muted-foreground">
          工艺步骤 {currentIndex + 1} / {processStepMetas.length}
        </span>
        <span className="text-xs text-primary">
          {Math.round(progress)}% 完成
        </span>
      </div>
      <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-primary to-chip-blue transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
      {/* Step indicators with icons */}
      <div className="flex mt-2.5 gap-1">
        {processStepMetas.map((s, i) => (
          <Link
            key={s.id}
            to={`/process/${s.id}`}
            className={`flex-1 flex flex-col items-center gap-0.5 py-1 rounded-md transition-all text-center ${
              i === currentIndex
                ? 'bg-primary/10 border border-primary/30'
                : i < currentIndex
                ? 'hover:bg-secondary/60 border border-transparent'
                : 'hover:bg-secondary/40 border border-transparent'
            }`}
            title={s.name}
          >
            <span className={`text-sm leading-none ${i === currentIndex ? 'scale-110' : ''} ${i > currentIndex ? 'grayscale opacity-40' : ''} transition-all`}>
              {s.icon}
            </span>
            <span className={`text-[9px] leading-tight truncate w-full ${
              i === currentIndex
                ? 'text-primary font-semibold'
                : i < currentIndex
                ? 'text-primary/50'
                : 'text-muted-foreground/60'
            }`}>
              {s.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
