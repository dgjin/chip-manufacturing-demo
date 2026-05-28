import { useParams, Link } from 'react-router-dom';
import { processStepMetas } from '@/data/stepMetas';
import { loadStepDetail, loadAllSteps } from '@/data/steps';
import type { ProcessStep } from '@/data/types';
import { useSpeech } from '@/hooks/useSpeech';
import { SiliconPurificationAnimation } from '@/components/process/SiliconPurification';
import { WaferManufacturingAnimation } from '@/components/process/WaferManufacturing';
import { PhotolithographyAnimation } from '@/components/process/Photolithography';
import { EtchingAnimation } from '@/components/process/Etching';
import { IonImplantationAnimation } from '@/components/process/IonImplantation';
import { ThinFilmDepositionAnimation } from '@/components/process/ThinFilmDeposition';
import { CMPAnimation } from '@/components/process/CMP';
import { MetallizationAnimation } from '@/components/process/Metallization';
import { PackagingAnimation } from '@/components/process/Packaging';
import { TestingAnimation } from '@/components/process/Testing';
import { Volume2, VolumeX, Home, RotateCcw, Building2, Loader2 } from 'lucide-react';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { CompanySection } from '@/components/ui/CompanyCard';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { ProcessNavigation } from '@/components/ui/ProcessNavigation';
import { AnimationArea } from '@/components/ui/AnimationArea';

const animationMap: Record<string, React.FC> = {
  'silicon-purification': SiliconPurificationAnimation,
  'wafer-manufacturing': WaferManufacturingAnimation,
  'photolithography': PhotolithographyAnimation,
  'etching': EtchingAnimation,
  'ion-implantation': IonImplantationAnimation,
  'thin-film-deposition': ThinFilmDepositionAnimation,
  'cmp': CMPAnimation,
  'metallization': MetallizationAnimation,
  'packaging': PackagingAnimation,
  'testing': TestingAnimation,
};

export function ProcessDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { speak, stop } = useSpeech();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const [step, setStep] = useState<ProcessStep | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [companyStepCounts, setCompanyStepCounts] = useState<Record<string, number>>({});

  // Build nameEn → Company lookup for subStep companyRefs resolution
  const companyMap = useMemo(() => {
    if (!step) return new Map<string, typeof step.companies[number]>();
    return new Map(step.companies.map((c) => [c.nameEn, c]));
  }, [step]);

  const currentIndex = processStepMetas.findIndex((s) => s.id === id);
  const meta = processStepMetas[currentIndex];

  const prevStep = currentIndex > 0 ? processStepMetas[currentIndex - 1] : null;
  const nextStep = currentIndex < processStepMetas.length - 1 ? processStepMetas[currentIndex + 1] : null;

  const AnimationComponent = meta ? animationMap[meta.id] : null;

  // Load current step detail
  useEffect(() => {
    if (!id) return;
    setIsLoading(true);
    loadStepDetail(id).then((s) => {
      setStep(s);
      setIsLoading(false);
    });
  }, [id]);

  // Load all steps to compute companyStepCounts
  useEffect(() => {
    loadAllSteps().then((allSteps) => {
      const counts: Record<string, number> = {};
      allSteps.forEach((s) => {
        s.companies.forEach((c) => {
          counts[c.nameEn] = (counts[c.nameEn] || 0) + 1;
        });
      });
      setCompanyStepCounts(counts);
    });
  }, []);

  const handleSpeak = useCallback(() => {
    if (!step) return;
    if (isSpeaking) {
      stop();
      setIsSpeaking(false);
    } else {
      speak(step.narration);
      setIsSpeaking(true);
    }
  }, [isSpeaking, step, speak, stop]);

  // Reset animation key when step changes
  useEffect(() => {
    setAnimationKey((k) => k + 1);
    stop();
    setIsSpeaking(false);
  }, [id, stop]);

  // Listen for speech end
  useEffect(() => {
    const handleEnd = () => setIsSpeaking(false);
    window.speechSynthesis?.addEventListener('end', handleEnd);
    return () => {
      window.speechSynthesis?.removeEventListener('end', handleEnd);
      stop();
    };
  }, [stop]);

  const handleReset = () => {
    setAnimationKey((k) => k + 1);
    if (isSpeaking) {
      stop();
      setIsSpeaking(false);
    }
  };

  if (!meta) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl mb-4">未找到该工艺步骤</p>
          <Link to="/" className="text-primary hover:underline">返回首页</Link>
        </div>
      </div>
    );
  }

  if (isLoading || !step) {
    return (
      <div className="min-h-screen circuit-pattern pt-14">
        <div className="container py-8">
          <ProgressBar currentIndex={currentIndex} />
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-3 text-muted-foreground">加载工艺详情...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen circuit-pattern pt-14">
      <div className="container py-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Link to="/" className="hover:text-primary transition-colors flex items-center gap-1">
            <Home className="h-3.5 w-3.5" />
            首页
          </Link>
          <span>/</span>
          <span className="text-foreground">{step.name}</span>
        </div>

        {/* Progress bar */}
        <ProgressBar currentIndex={currentIndex} />

        {/* Main content */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Animation panel */}
          <div className="relative">
            <div
              className="rounded-xl border border-border bg-card overflow-hidden shadow-glow"
              style={{ borderColor: `${step.color}33` }}
            >
              {/* Animation header */}
              <div
                className="px-3 py-1.5 border-b border-border flex items-center justify-between"
                style={{ borderColor: `${step.color}22` }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">{step.icon}</span>
                  <span className="font-medium text-sm">{step.name}</span>
                  <span className="text-xs text-muted-foreground font-mono">{step.nameEn}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={handleReset}
                    className="p-1.5 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                    title="重播动画"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={handleSpeak}
                    className={`p-1.5 rounded-md transition-all ${
                      isSpeaking
                        ? 'bg-primary/20 text-primary shadow-glow'
                        : 'hover:bg-secondary text-muted-foreground hover:text-foreground'
                    }`}
                    title={isSpeaking ? '停止语音' : '播放语音讲解'}
                  >
                    {isSpeaking ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5" />}
                  </button>
                </div>
              </div>

              {/* Animation area */}
              <AnimationArea
                glowColor={step.glowColor}
                animationKey={animationKey}
                AnimationComponent={AnimationComponent}
                isSpeaking={isSpeaking}
              />
            </div>

            {/* Voice control button - compact */}
            <button
              onClick={handleSpeak}
              className="mt-3 w-full py-2 rounded-lg border border-border bg-card hover:bg-secondary transition-all flex items-center justify-center gap-2 text-xs font-medium"
              style={isSpeaking ? { borderColor: step.color, boxShadow: `0 0 20px ${step.glowColor}` } : {}}
            >
              {isSpeaking ? (
                <>
                  <Volume2 className="h-3.5 w-3.5 text-primary" />
                  <span className="text-primary">停止语音讲解</span>
                </>
              ) : (
                <>
                  <Volume2 className="h-3.5 w-3.5 text-muted-foreground" />
                  <span>播放中文语音讲解</span>
                </>
              )}
            </button>

            {/* Narration text - moved to left column below voice button */}
            <div className="mt-3 p-3 rounded-xl border border-border bg-card bg-gradient-card">
              <h3 className="text-xs font-semibold text-chip-purple mb-1.5 flex items-center gap-2">
                <span className="w-1 h-3.5 rounded-full bg-chip-purple" />
                语音讲解文稿
              </h3>
              <p className="text-xs text-foreground/60 leading-relaxed italic">{step.narration}</p>
            </div>

            {/* Process step indicator - moved to left column below animation */}
            <div className="mt-3 p-3 rounded-xl border border-border bg-card">
              <div className="flex items-center flex-wrap gap-1">
                {processStepMetas.map((s, i) => (
                  <Link
                    key={s.id}
                    to={`/process/${s.id}`}
                    className={`px-2 py-0.5 rounded text-[11px] transition-all ${
                      i === currentIndex
                        ? 'bg-primary/20 text-primary border border-primary/30'
                        : i < currentIndex
                        ? 'bg-primary/5 text-primary/50 border border-transparent'
                        : 'text-muted-foreground border border-transparent hover:bg-secondary'
                    }`}
                  >
                    {s.icon} {s.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Info panel */}
          <div className="space-y-4">
            {/* Title */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-lg"
                  style={{ backgroundColor: `${step.color}15`, border: `1px solid ${step.color}33` }}
                >
                  {step.icon}
                </div>
                <div>
                  <h1 className="text-xl font-bold">{step.name}</h1>
                  <p className="text-xs text-muted-foreground font-mono">{step.nameEn}</p>
                </div>
              </div>
              <p className="text-base text-foreground/80">{step.description}</p>
            </div>

            {/* Detail */}
            <div className="p-3 rounded-xl border border-border bg-card bg-gradient-card">
              <h3 className="text-xs font-semibold text-primary mb-1.5 flex items-center gap-2">
                <span className="w-1 h-3.5 rounded-full bg-primary" />
                工艺详解
              </h3>
              <p className="text-xs text-foreground/70 leading-relaxed">{step.detail}</p>
            </div>

            {/* Key Metrics */}
            {step.keyMetrics && step.keyMetrics.length > 0 && (
              <div className="p-3 rounded-xl border border-border bg-card bg-gradient-card">
                <h3 className="text-xs font-semibold text-chip-gold mb-2 flex items-center gap-2">
                  <span className="w-1 h-3.5 rounded-full bg-chip-gold" />
                  关键工艺指标
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {step.keyMetrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="p-2 rounded-lg border border-border bg-secondary/30"
                      style={{ borderColor: `${step.color}22` }}
                    >
                      <p className="text-[10px] text-muted-foreground mb-0.5">{metric.label}</p>
                      <p
                        className="text-xs font-bold font-mono"
                        style={{ color: step.color }}
                      >
                        {metric.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sub Steps */}
            {step.subSteps && step.subSteps.length > 0 && (
              <div className="p-3 rounded-xl border border-border bg-card bg-gradient-card">
                <h3 className="text-xs font-semibold text-chip-green mb-2 flex items-center gap-2">
                  <span className="w-1 h-3.5 rounded-full bg-chip-green" />
                  详细工艺步骤
                  <span className="text-[10px] text-muted-foreground font-normal">
                    ({step.subSteps.length} 步)
                  </span>
                </h3>
                <div className="space-y-1.5">
                  {step.subSteps.map((sub, idx) => (
                    <div
                      key={idx}
                      className="flex gap-2.5 items-start p-2 rounded-lg hover:bg-secondary/40 transition-colors"
                    >
                      <div
                        className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold mt-0.5"
                        style={{
                          backgroundColor: `${step.color}20`,
                          color: step.color,
                          border: `1px solid ${step.color}40`,
                        }}
                      >
                        {idx + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-foreground/90 leading-tight">
                          {sub.title}
                        </p>
                        <p className="text-[11px] text-foreground/55 leading-relaxed mt-0.5">
                          {sub.desc}
                        </p>
                        {sub.companyRefs && sub.companyRefs.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-1.5">
                            {sub.companyRefs.map((ref) => {
                              const company = companyMap.get(ref);
                              if (!company) return null;
                              const tagStyle: Record<string, string> = {
                                '国际龙头': 'bg-chip-gold/10 text-chip-gold border-chip-gold/25',
                                '中国力量': 'bg-primary/10 text-primary border-primary/25',
                                '新兴势力': 'bg-chip-green/10 text-chip-green border-chip-green/25',
                              };
                              return (
                                <span
                                  key={ref}
                                  className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-medium border ${tagStyle[company.tag] || 'bg-secondary/50 text-muted-foreground border-border'}`}
                                  title={`${company.name} · ${company.country} · ${company.highlight}`}
                                >
                                  <span className="text-[9px]" role="img" aria-label={company.country}>{company.flag}</span>
                                  {company.name}
                                </span>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Companies Section */}
        <div className="mt-6 p-4 rounded-xl border border-border bg-card bg-gradient-card">
          <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <Building2 className="h-4 w-4 text-chip-gold" />
            <span className="w-1 h-4 rounded-full bg-chip-gold" />
            相关企业
            <span className="text-xs text-muted-foreground font-normal ml-1">
              — {step.companies.length}家代表性企业
            </span>
          </h3>
          <CompanySection companies={step.companies} processColor={step.color} companyStepCounts={companyStepCounts} />
        </div>

        {/* Navigation */}
        <ProcessNavigation prevStep={prevStep} nextStep={nextStep} />
      </div>
    </div>
  );
}
