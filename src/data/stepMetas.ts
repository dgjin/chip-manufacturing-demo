export interface ProcessStepMeta {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  icon: string;
  color: string;
  glowColor: string;
}

export const processStepMetas: ProcessStepMeta[] = [
  {
    id: 'silicon-purification',
    name: '硅提纯',
    nameEn: 'Silicon Purification',
    description: '从石英砂中提取11N纯度电子级多晶硅',
    icon: '⚗️',
    color: 'hsl(43 96% 56%)',
    glowColor: 'hsl(43 96% 56% / 0.3)',
  },
  {
    id: 'wafer-manufacturing',
    name: '晶圆制造',
    nameEn: 'Wafer Manufacturing',
    description: 'CZ单晶生长→切片→双面研磨→CMP，制备镜面硅晶圆',
    icon: '🔵',
    color: 'hsl(217 91% 60%)',
    glowColor: 'hsl(217 91% 60% / 0.3)',
  },
  {
    id: 'photolithography',
    name: '光刻',
    nameEn: 'Photolithography',
    description: 'EUV/DUV光学投影将纳米级电路图形精确转印晶圆',
    icon: '💡',
    color: 'hsl(270 70% 60%)',
    glowColor: 'hsl(270 70% 60% / 0.3)',
  },
  {
    id: 'etching',
    name: '刻蚀',
    nameEn: 'Etching',
    description: '等离子体各向异性刻蚀实现纳米级图形精确转移',
    icon: '✂️',
    color: 'hsl(187 85% 53%)',
    glowColor: 'hsl(187 85% 53% / 0.3)',
  },
  {
    id: 'ion-implantation',
    name: '离子注入',
    nameEn: 'Ion Implantation',
    description: '精确控制掺杂离子能量与剂量，调控半导体电学特性',
    icon: '⚡',
    color: 'hsl(160 84% 39%)',
    glowColor: 'hsl(160 84% 39% / 0.3)',
  },
  {
    id: 'thin-film-deposition',
    name: '薄膜沉积',
    nameEn: 'Thin Film Deposition',
    description: 'CVD/PVD/ALD精确沉积绝缘、导电及功能薄膜层',
    icon: '🧱',
    color: 'hsl(217 91% 60%)',
    glowColor: 'hsl(217 91% 60% / 0.3)',
  },
  {
    id: 'cmp',
    name: '化学机械抛光',
    nameEn: 'CMP',
    description: '化学腐蚀与机械研磨协同，全局纳米级平坦化',
    icon: '✨',
    color: 'hsl(270 70% 60%)',
    glowColor: 'hsl(270 70% 60% / 0.3)',
  },
  {
    id: 'metallization',
    name: '金属化',
    nameEn: 'Metallization & Interconnect',
    description: '铜大马士革工艺构建多达20+层纳米级互连网络',
    icon: '🔗',
    color: 'hsl(43 96% 56%)',
    glowColor: 'hsl(43 96% 56% / 0.3)',
  },
  {
    id: 'packaging',
    name: '封装',
    nameEn: 'Advanced Packaging',
    description: '从引线键合到2.5D/3D先进封装，突破摩尔定律算力极限',
    icon: '📦',
    color: 'hsl(160 84% 39%)',
    glowColor: 'hsl(160 84% 39% / 0.3)',
  },
  {
    id: 'testing',
    name: '测试',
    nameEn: 'Semiconductor Testing',
    description: '贯穿全流程的工艺检测、电学测试与可靠性验证',
    icon: '🔍',
    color: 'hsl(187 85% 53%)',
    glowColor: 'hsl(187 85% 53% / 0.3)',
  },
];
