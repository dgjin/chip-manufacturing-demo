import type { ProcessStep } from '../types';

const stepModules: Record<string, () => Promise<{ default: ProcessStep }>> = {
  'silicon-purification': () => import('./silicon-purification'),
  'wafer-manufacturing': () => import('./wafer-manufacturing'),
  photolithography: () => import('./photolithography'),
  etching: () => import('./etching'),
  'ion-implantation': () => import('./ion-implantation'),
  'thin-film-deposition': () => import('./thin-film-deposition'),
  cmp: () => import('./cmp'),
  metallization: () => import('./metallization'),
  packaging: () => import('./packaging'),
  testing: () => import('./testing'),
};

export async function loadStepDetail(id: string): Promise<ProcessStep | null> {
  const loader = stepModules[id];
  if (!loader) return null;
  const mod = await loader();
  return mod.default;
}

export async function loadAllSteps(): Promise<ProcessStep[]> {
  const entries = Object.entries(stepModules);
  const results = await Promise.all(
    entries.map(async ([id, loader]) => {
      const mod = await loader();
      return mod.default;
    })
  );
  // Preserve order defined in stepModules
  return results;
}
