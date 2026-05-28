import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { processStepMetas, type ProcessStepMeta } from '@/data/stepMetas';
import { loadAllSteps } from '@/data/steps';
import type { ProcessSubStep } from '@/data/types';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useInView } from '@/hooks/useInView';

// ─── Sub-components ────────────────────────────────────────

function FlowSubStep({
  subStep,
  index,
  stepId,
  color,
}: {
  subStep: ProcessSubStep;
  index: number;
  stepId: string;
  color: string;
}) {
  return (
    <Link
      to={`/process/${stepId}`}
      className="flex gap-3 items-start p-2.5 rounded-lg hover:bg-secondary/40 transition-colors group/sub"
    >
      <div
        className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold mt-0.5"
        style={{
          backgroundColor: `${color}20`,
          color,
          border: `1px solid ${color}40`,
        }}
      >
        {index + 1}
      </div>
      <div className="min-w-0">
        <p className="text-xs font-semibold text-foreground/90 leading-tight group-hover/sub:text-primary transition-colors">
          {subStep.title}
        </p>
        <p className="text-xs text-foreground/50 leading-relaxed mt-0.5 line-clamp-2 md:line-clamp-1">
          {subStep.desc}
        </p>
      </div>
    </Link>
  );
}

function FlowStepNode({
  step,
  index,
  subSteps,
  isExpanded,
  onToggle,
  isLast,
}: {
  step: ProcessStepMeta;
  index: number;
  subSteps: ProcessSubStep[] | undefined;
  isExpanded: boolean;
  onToggle: () => void;
  isLast: boolean;
}) {
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.1 });
  const [hasBeenVisible, setHasBeenVisible] = useState(false);

  useEffect(() => {
    if (isInView && !hasBeenVisible) setHasBeenVisible(true);
  }, [isInView, hasBeenVisible]);

  return (
    <div
      ref={ref}
      className="relative flex gap-4 md:gap-6"
      style={{
        opacity: hasBeenVisible ? 1 : 0,
        transform: hasBeenVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.5s ease-out',
        transitionDelay: `${index * 80}ms`,
      }}
    >
      {/* Timeline column */}
      <div className="flex flex-col items-center flex-shrink-0">
        {/* Circle marker */}
        <div
          className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-xs md:text-sm font-bold ring-4 ring-background z-10"
          style={{
            backgroundColor: `${step.color}20`,
            color: step.color,
            border: `2px solid ${step.color}`,
          }}
        >
          <span className="hidden md:inline">{String(index + 1).padStart(2, '0')}</span>
          <span className="md:hidden">{index + 1}</span>
        </div>
        {/* Connecting line */}
        {!isLast && (
          <div className="w-0.5 flex-1 bg-gradient-to-b from-border via-primary/20 to-border" />
        )}
      </div>

      {/* Card content */}
      <div className={cn('flex-1 pb-6', isLast && 'pb-0')}>
        <div className="relative group rounded-xl border border-border bg-card bg-gradient-card overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-glow">
          {/* Hover glow */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: `radial-gradient(circle at 30% 30%, ${step.glowColor}, transparent 60%)`,
            }}
          />

          <div className="relative p-4">
            {/* Header: icon + name + english name */}
            <div className="flex items-start justify-between gap-3">
              <Link
                to={`/process/${step.id}`}
                className="flex items-start gap-3 flex-1 min-w-0 hover:opacity-80 transition-opacity"
              >
                <span className="text-2xl flex-shrink-0">{step.icon}</span>
                <div className="min-w-0">
                  <h3 className="font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
                    {step.name}
                  </h3>
                  <p className="text-xs text-muted-foreground font-mono mt-0.5">
                    {step.nameEn}
                  </p>
                </div>
              </Link>
              <Link
                to={`/process/${step.id}`}
                className="flex-shrink-0 p-1.5 rounded-md hover:bg-secondary text-muted-foreground hover:text-primary transition-colors"
                title={`查看${step.name}详情`}
              >
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground mt-2">{step.description}</p>

            {/* Expand toggle */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onToggle();
              }}
              className="flex items-center gap-1.5 mt-3 text-xs font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              <ChevronDown
                className={cn(
                  'h-3.5 w-3.5 transition-transform duration-300',
                  isExpanded && 'rotate-180'
                )}
              />
              {isExpanded ? '收起步骤' : `展开步骤${subSteps ? ` (${subSteps.length})` : ''}`}
            </button>
          </div>

          {/* Expandable subSteps panel */}
          <div
            className="grid transition-[grid-template-rows] duration-300 ease-in-out"
            style={{
              gridTemplateRows: isExpanded ? '1fr' : '0fr',
            }}
          >
            <div className="overflow-hidden">
              <div className="px-4 pb-4 border-t border-border/50">
                <div className="space-y-1 pt-3">
                  {subSteps ? (
                    subSteps.map((sub, idx) => (
                      <FlowSubStep
                        key={idx}
                        subStep={sub}
                        index={idx}
                        stepId={step.id}
                        color={step.color}
                      />
                    ))
                  ) : (
                    <div className="flex items-center gap-2 py-2 text-xs text-muted-foreground">
                      <div className="w-3 h-3 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                      加载子步骤...
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main component ────────────────────────────────────────

export function ProcessFlowMap() {
  const [expandedSteps, setExpandedSteps] = useState<Set<string>>(new Set());
  const [subStepsMap, setSubStepsMap] = useState<Record<string, ProcessSubStep[]>>({});

  // Load all step details to get subSteps
  useEffect(() => {
    loadAllSteps().then((allSteps) => {
      const map: Record<string, ProcessSubStep[]> = {};
      allSteps.forEach((s) => {
        map[s.id] = s.subSteps;
      });
      setSubStepsMap(map);
    });
  }, []);

  const toggleStep = (stepId: string) => {
    setExpandedSteps((prev) => {
      const next = new Set(prev);
      if (next.has(stepId)) {
        next.delete(stepId);
      } else {
        next.add(stepId);
      }
      return next;
    });
  };

  return (
    <section id="process-flow" className="py-16">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold mb-3">制造工艺流程</h2>
          <p className="text-muted-foreground">
            展开每个工艺步骤，查看详细的原子级流程
          </p>
        </div>

        {/* Vertical timeline */}
        <div className="max-w-3xl mx-auto pl-4 md:pl-8 lg:pl-12">
          {processStepMetas.map((step, index) => (
            <FlowStepNode
              key={step.id}
              step={step}
              index={index}
              subSteps={subStepsMap[step.id]}
              isExpanded={expandedSteps.has(step.id)}
              onToggle={() => toggleStep(step.id)}
              isLast={index === processStepMetas.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
