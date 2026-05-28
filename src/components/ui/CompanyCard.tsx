import { Company } from '@/data/types';

interface CompanyCardProps {
  company: Company;
  accentColor: string;
  stepCount?: number;
}

export function CompanyCard({ company, accentColor, stepCount }: CompanyCardProps) {
  const tagColorMap: Record<string, string> = {
    '国际龙头': 'bg-chip-gold/15 text-chip-gold border-chip-gold/30',
    '中国力量': 'bg-primary/15 text-primary border-primary/30',
    '新兴势力': 'bg-chip-green/15 text-chip-green border-chip-green/30',
  };

  const tagGlowMap: Record<string, string> = {
    '国际龙头': 'shadow-[0_0_12px_hsl(43_96%_56%/0.15)]',
    '中国力量': 'shadow-[0_0_12px_hsl(187_85%_53%/0.15)]',
    '新兴势力': 'shadow-[0_0_12px_hsl(160_84%_39%/0.15)]',
  };

  return (
    <div
      className="group relative p-4 rounded-xl border border-border bg-card hover:border-primary/40 transition-all duration-300 overflow-hidden"
      style={{
        background: `linear-gradient(180deg, hsl(222 47% 10%) 0%, hsl(222 47% 6%) 100%)`,
      }}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at 30% 30%, ${accentColor}, transparent 60%)`,
        }}
      />

      {/* Content */}
      <div className="relative">
        {/* Header */}
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-xl" role="img" aria-label={company.country}>{company.flag}</span>
            <div>
              <h4 className="font-bold text-sm text-foreground leading-tight">{company.name}</h4>
              <p className="text-xs text-muted-foreground font-mono">{company.nameEn}</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 flex-wrap justify-end">
            {typeof stepCount === 'number' && stepCount > 1 && (
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-secondary/60 text-muted-foreground border border-border">
                {stepCount}个环节
              </span>
            )}
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium border ${tagColorMap[company.tag]} ${tagGlowMap[company.tag]}`}
            >
              {company.tag}
            </span>
          </div>
        </div>

        {/* Country & Category */}
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <p className="text-xs text-muted-foreground">{company.country}</p>
          {company.category && (
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-secondary/70 text-foreground/60 border border-border">
              {company.category}
            </span>
          )}
        </div>

        {/* Highlight badge */}
        <div
          className="inline-flex items-center px-2 py-1 rounded-md text-[11px] font-bold mb-2"
          style={{
            backgroundColor: `${accentColor}15`,
            color: accentColor,
            border: `1px solid ${accentColor}33`,
          }}
        >
          {company.highlight}
        </div>

        {/* Description */}
        <p className="text-xs text-foreground/60 leading-relaxed line-clamp-3 group-hover:text-foreground/75 transition-colors">
          {company.description}
        </p>
      </div>
    </div>
  );
}

interface CompanySectionProps {
  companies: Company[];
  processColor: string;
  companyStepCounts?: Record<string, number>;
}

export function CompanySection({ companies, processColor, companyStepCounts }: CompanySectionProps) {
  const international = companies.filter((c) => c.tag === '国际龙头');
  const chinese = companies.filter((c) => c.tag === '中国力量');
  const emerging = companies.filter((c) => c.tag === '新兴势力');

  return (
    <div className="space-y-5">
      {international.length > 0 && (
        <div>
          <h4 className="text-xs font-semibold text-chip-gold mb-3 flex items-center gap-2">
            <span className="w-1 h-4 rounded-full bg-chip-gold" />
            国际龙头企业
            <span className="text-[10px] text-muted-foreground font-normal">
              ({international.length})
            </span>
          </h4>
          <div className="grid sm:grid-cols-2 gap-3">
            {international.map((company) => (
              <CompanyCard key={company.nameEn} company={company} accentColor={processColor} stepCount={companyStepCounts?.[company.nameEn]} />
            ))}
          </div>
        </div>
      )}

      {chinese.length > 0 && (
        <div>
          <h4 className="text-xs font-semibold text-primary mb-3 flex items-center gap-2">
            <span className="w-1 h-4 rounded-full bg-primary" />
            中国力量
            <span className="text-[10px] text-muted-foreground font-normal">
              ({chinese.length})
            </span>
          </h4>
          <div className="grid sm:grid-cols-2 gap-3">
            {chinese.map((company) => (
              <CompanyCard key={company.nameEn} company={company} accentColor={processColor} stepCount={companyStepCounts?.[company.nameEn]} />
            ))}
          </div>
        </div>
      )}

      {emerging.length > 0 && (
        <div>
          <h4 className="text-xs font-semibold text-chip-green mb-3 flex items-center gap-2">
            <span className="w-1 h-4 rounded-full bg-chip-green" />
            新兴势力
            <span className="text-[10px] text-muted-foreground font-normal">
              ({emerging.length})
            </span>
          </h4>
          <div className="grid sm:grid-cols-2 gap-3">
            {emerging.map((company) => (
              <CompanyCard key={company.nameEn} company={company} accentColor={processColor} stepCount={companyStepCounts?.[company.nameEn]} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
