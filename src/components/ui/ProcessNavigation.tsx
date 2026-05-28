import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface NavStep {
  id: string;
  name: string;
}

interface ProcessNavigationProps {
  prevStep: NavStep | null;
  nextStep: NavStep | null;
}

export function ProcessNavigation({ prevStep, nextStep }: ProcessNavigationProps) {
  return (
    <div className="flex items-center justify-between mt-6 pt-6 border-t border-border">
      {prevStep ? (
        <Link
          to={`/process/${prevStep.id}`}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:border-primary/50 hover:bg-secondary transition-all group"
        >
          <ArrowLeft className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
          <div>
            <p className="text-xs text-muted-foreground">上一步</p>
            <p className="text-sm font-medium">{prevStep.name}</p>
          </div>
        </Link>
      ) : (
        <Link
          to="/"
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:border-primary/50 hover:bg-secondary transition-all group"
        >
          <ArrowLeft className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
          <div>
            <p className="text-xs text-muted-foreground">返回</p>
            <p className="text-sm font-medium">首页</p>
          </div>
        </Link>
      )}

      {nextStep ? (
        <Link
          to={`/process/${nextStep.id}`}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all group"
        >
          <div className="text-right">
            <p className="text-xs text-primary-foreground/70">下一步</p>
            <p className="text-sm font-medium">{nextStep.name}</p>
          </div>
          <ArrowRight className="h-4 w-4" />
        </Link>
      ) : (
        <Link
          to="/"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
        >
          <div className="text-right">
            <p className="text-xs text-primary-foreground/70">完成</p>
            <p className="text-sm font-medium">返回首页</p>
          </div>
          <ArrowRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}
