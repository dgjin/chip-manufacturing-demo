import { processStepMetas } from '@/data/stepMetas';
import { Link } from 'react-router-dom';
import { ArrowRight, Play } from 'lucide-react';
import { ProcessFlowMap } from '@/components/layout/ProcessFlowMap';

export function HomePage() {
  return (
    <div className="min-h-screen circuit-pattern">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute top-40 right-1/4 w-72 h-72 bg-chip-purple/10 rounded-full blur-[80px]" />

        <div className="container relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            芯片制造全流程动画演示
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            <span className="text-gradient-cyan">从沙子到芯片</span>
            <br />
            <span className="text-foreground/80">探索半导体制造的精密世界</span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            十大核心工艺，百余个关键步骤，纳米级的极致精度。
            通过交互式动画和真人语音讲解，深入了解一颗芯片的诞生之旅。
          </p>

          <div className="flex items-center justify-center gap-4">
            <Link
              to={`/process/${processStepMetas[0].id}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all shadow-glow hover:shadow-glow-lg"
            >
              <Play className="h-4 w-4" />
              开始探索
            </Link>
            <a
              href="#process-flow"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border text-foreground font-medium hover:bg-secondary transition-all"
            >
              浏览流程
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Process Flow Map */}
      <ProcessFlowMap />

      {/* Stats Section */}
      <section className="py-16 border-t border-border">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '10', label: '核心工艺步骤', unit: '步' },
              { value: '<2', label: '纳米级精度', unit: 'nm' },
              { value: '1000+', label: '制造工序', unit: '道' },
              { value: '~99%', label: '成熟制程良率', unit: '' },
            ].map((stat, i) => (
              <div key={i} className="space-y-1">
                <div className="text-3xl font-bold text-gradient-cyan">
                  {stat.value}
                  <span className="text-sm text-muted-foreground ml-1">{stat.unit}</span>
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container text-center text-sm text-muted-foreground">
          <p>芯片制造全流程动画演示 · 真人语音讲解 · 交互式学习</p>
        </div>
      </footer>
    </div>
  );
}
