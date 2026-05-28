export interface Company {
  name: string;
  nameEn: string;
  country: string;
  flag: string;
  description: string;
  highlight: string;
  tag: '国际龙头' | '中国力量' | '新兴势力';
  category: '设备商' | '材料商' | '代工厂' | 'IDM' | 'EDA/IP' | '封测';
}

export interface ProcessSubStep {
  title: string;
  desc: string;
  /** 引用本步骤 companies[] 中的企业 nameEn，表示该子步骤涉及的龙头企业 */
  companyRefs?: string[];
}

export interface ProcessStep {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  detail: string;
  subSteps: ProcessSubStep[];
  narration: string;
  icon: string;
  color: string;
  glowColor: string;
  keyMetrics: { label: string; value: string }[];
  companies: Company[];
}
