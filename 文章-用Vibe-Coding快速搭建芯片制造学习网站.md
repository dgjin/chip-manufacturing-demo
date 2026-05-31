# 用 Vibe Coding 快速搭建芯片制造学习网站——从零到交付的实战复盘

> 一位非前端出身的开发者，如何借助 AI 编程助手在短时间内完成一个包含10道工艺动画、44家企业数据、中文语音讲解的专业级学习网站？本文基于真实开发过程，完整复盘 Vibe Coding 的工作流、关键决策与踩坑经验。

## 一、什么是 Vibe Coding？

Vibe Coding 不是某个具体工具，而是一种**以意图驱动、AI 协作、快速迭代**的编程方式。核心理念：

- **你负责"要什么"，AI 负责"怎么写"**
- 用自然语言描述需求，AI 生成代码，你审核与调整
- 一次对话解决一个完整功能模块，而非逐行手写

这种方式特别适合**知识密集型学习网站**——你拥有领域知识，AI 拥有工程能力，两者结合就能产出远超个人能力范围的产品。

## 二、项目背景：芯片制造全流程演示网站

### 2.1 需求概览

芯片制造是当今最复杂的人造工艺之一，从石英砂到可用的芯片，历经10大核心工艺、数百道子步骤。我们要构建一个**交互式动画演示网站**，让学习者直观理解每个工艺环节的原理、关键参数、涉及的龙头企业。

核心需求：

| 维度 | 要求 |
|------|------|
| 工艺覆盖 | 10大核心步骤，每步5~7个原子级子步骤 |
| 动画演示 | 每个步骤配备独立SVG工艺动画 |
| 语音讲解 | 中文TTS实时朗读，自动优选自然语音 |
| 产业链图谱 | 每个子步骤关联3~5家龙头企业，区分国际/中国 |
| 布局体验 | 信息紧凑、层次清晰、无大块留白 |

### 2.2 技术选型

```
React 18 + TypeScript + Vite
Tailwind CSS（原子化样式，快速迭代）
React Router 7（SPA路由）
Lucide Icons（轻量图标库）
Web Speech API（浏览器原生语音合成）
```

选型原则：**零后端、纯前端**，数据内嵌，部署简单，适合学习网站场景。

## 三、Vibe Coding 实战：五大关键阶段

### 阶段一：数据先行——定义领域模型

**痛点**：芯片制造有大量专业术语和参数，如果数据结构没设计好，后续组件开发会反复返工。

**做法**：先让 AI 根据需求生成类型定义，再填充数据。

```typescript
// src/data/types.ts —— 一切从类型开始
export interface Company {
  name: string;           // 中文名
  nameEn: string;         // 英文名
  country: string;
  flag: string;           // 国旗 emoji
  description: string;
  highlight: string;      // 核心亮点
  tag: '国际龙头' | '中国力量' | '新兴势力';
  category: '设备商' | '材料商' | '代工厂' | 'IDM' | 'EDA/IP' | '封测';
}

export interface ProcessSubStep {
  title: string;
  desc: string;
  companyRefs?: string[];  // 引用本步骤 companies[] 中的 nameEn
}

export interface ProcessStep {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  detail: string;
  subSteps: ProcessSubStep[];
  narration: string;       // 语音讲解文稿
  icon: string;            // emoji 图标
  color: string;           // HSL 色值
  keyMetrics: { label: string; value: string }[];
  companies: Company[];
}
```

**关键决策——`companyRefs` 引用式设计**：

子步骤需要关联企业，但没有把整个 Company 对象嵌入 subStep，而是用 `companyRefs: string[]` 引用 `companies[].nameEn`。这避免了数据冗余——44家企业的详细信息只需维护在一个 `companies[]` 数组中，子步骤只需引用名字。

```typescript
// 数据文件中的实际用法
subSteps: [
  {
    title: "EUV/DUV曝光",
    desc: "EUV 13.5nm（NA=0.33→0.55 High-NA）...",
    companyRefs: ["ASML Holding", "Cymer (ASML旗下)", "Nikon Corporation", "TSMC", "Samsung Electronics"]
  },
  // ...
]
```

**Vibe Coding 心得**：数据模型是最值得和 AI 深度讨论的环节。一次 10 分钟的类型设计对话，能省下后续数小时的数据调整成本。

### 阶段二：SVG 动画——从 SMIL 到 CSS 的批量迁移

**痛点**：初期用 SVG 原生 `<animate>` 标签实现动画，10个组件共 82 个动画元素。但 SMIL 在部分浏览器中正在被弃用，且无法适配 `prefers-reduced-motion` 无障碍需求。

**做法**：让 AI 批量将所有 SMIL 动画重写为 CSS `@keyframes`。

每个组件的改写模式一致：

```tsx
// 改写前：SMIL
<circle cx="200" cy="100" r="3" fill="#fff" opacity="0.8">
  <animate attributeName="cy" from="100" to="0" dur="2s" repeatCount="indefinite" />
  <animate attributeName="opacity" from="0.8" to="0" dur="2s" repeatCount="indefinite" />
</circle>

// 改写后：CSS @keyframes + CSS 自定义属性
<defs>
  <style>{`
    .si-particle {
      animation: si-particle-rise var(--dur) ease-out infinite;
      animation-delay: var(--delay);
    }
    @keyframes si-particle-rise {
      0% { transform: translateY(0); opacity: 0.8; }
      100% { transform: translateY(-100px); opacity: 0; }
    }
  `}</style>
</defs>
<circle className="si-particle"
  style={{ '--dur': '2s', '--delay': '0.4s' } as React.CSSProperties} />
```

用 CSS 自定义属性 `--dur` 和 `--delay` 参数化每个元素的时序，让一个 `@keyframes` 定义服务于多个元素，只靠 inline style 传参区分。

**Vibe Coding 心得**：对于"模式一致、量大面广"的改写任务，Vibe Coding 效率极高。只需描述一次改写模式，AI 就能逐文件批量执行，82 个 `<animate>` 标签的迁移在几轮对话中完成。

### 阶段三：首页流程导图——垂直时间轴的交互设计

**痛点**：首页原本是简单的卡片网格，缺乏工艺流程的连贯感。需要增加一个"流程导图"，详细到每个原子级子步骤。

**交互决策**：AI 给出了三种布局方案——

| 方案 | 优点 | 缺点 |
|------|------|------|
| 水平流程图 | 直观表达流水线 | 步骤多时横向溢出，移动端不友好 |
| 树形菜单 | 信息层次清晰 | 不适合线性流程展示 |
| **垂直时间轴** | 步骤再多也能纵向滚动，移动端友好 | 占纵向空间 |

最终选择垂直时间轴，并用 `useInView` 实现滚动进入时的交错入场动画：

```tsx
function FlowStepNode({ step, index, isExpanded, onToggle, isLast }) {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className="transition-all duration-500"
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translateY(0)' : 'translateY(20px)',
        transitionDelay: `${index * 80}ms`,
      }}
    >
      {/* 时间轴圆点 + 卡片 + 可展开子步骤面板 */}
    </div>
  );
}
```

展开/收起子步骤面板的动画用了 CSS `grid-template-rows` 技巧——比传统的 `max-height` hack 更平滑：

```tsx
<div style={{
  display: 'grid',
  gridTemplateRows: isExpanded ? '1fr' : '0fr',
  transition: 'grid-template-rows 300ms',
}}>
  <div className="overflow-hidden">
    {/* 子步骤内容 */}
  </div>
</div>
```

**Vibe Coding 心得**：当需求有多种实现路径时，让 AI 先列出方案对比表，再做选择，比直接让它"写一个"靠谱得多。AI 的价值不仅是写代码，更是帮你理清设计空间。

### 阶段四：中文语音讲解——浏览器原生 TTS 的优化实践

**痛点**：Web Speech API 的语音质量完全取决于操作系统和浏览器。macOS 上的中文声音偏机械，Windows 上可能有微软神经合成声音。

**做法**：构建一个智能语音评分系统，自动优选最自然的中文声音。

```typescript
// src/hooks/useSpeech.ts —— 语音评分核心逻辑
function scoreVoice(v: SpeechSynthesisVoice): number {
  let score = 0;
  const name = v.name.toLowerCase();

  // 神经网络声音优先（Xiaoxiao/Yunyang 等）
  const neuralKeywords = [
    'xiaoxiao', 'xiaoyi', 'yunjian', 'yunyang', 'yunxi', 'yunxia',
    'natural', 'neural', 'tingting', 'sinji', 'mei-jia', 'yu-shu',
  ];
  if (neuralKeywords.some((k) => name.includes(k))) score += 50;
  if (name.includes('microsoft')) score += 20;  // 微软声音通常更自然
  if (name.includes('google')) score += 15;
  if (name.includes('siri') || name.includes('com.apple')) score += 10;
  if (v.lang === 'zh-CN') score += 8;           // 简体中文优先
  else if (v.lang.startsWith('zh')) score += 3;
  if (v.localService) score += 5;                // 本地声音延迟更低

  return score;
}
```

最终选择评分最高的声音，并持久化到 `localStorage`：

```typescript
function pickBestZhVoice(): SpeechSynthesisVoice | null {
  // 1. 先读用户上次选择
  const saved = localStorage.getItem('chip-demo:preferred-zh-voice');
  const voices = speechSynthesis.getVoices().filter(v => v.lang.startsWith('zh'));

  // 2. 命中缓存直接返回
  if (saved) {
    const found = voices.find(v => v.name === saved);
    if (found) return found;
  }

  // 3. 按评分排序，选最高
  const best = voices.sort((a, b) => scoreVoice(b) - scoreVoice(a))[0];
  if (best) localStorage.setItem('chip-demo:preferred-zh-voice', best.name);
  return best ?? null;
}
```

语速微调为 0.88、音调 1.05，听感更温暖自然。

**Vibe Coding 心得**：涉及浏览器兼容性的功能，用评分+降级策略比硬编码某个声音名更健壮。AI 能帮你快速构建这类自适应逻辑。

### 阶段五：布局优化——从"能用"到"好用"的最后一公里

**痛点**：功能完备后，页面左列（动画区）与右列（信息区）高度严重不匹配，动画下方大块留白。

**诊断与对策**：

| 问题 | 原因 | 解法 |
|------|------|------|
| 动画区过高 | `aspect-[4/3]` 宽高比 | 改为 `aspect-[16/10]`，减少 17% 高度 |
| 右侧卡片堆叠过多 | 6个独立卡片 + 大间距 | 语音文稿移至左列，工艺导航移至左列 |
| 间距浪费 | `space-y-6` + `p-4` | 统一压缩为 `space-y-4` + `p-3` |
| 语音按钮独占一行 | `w-full py-3` | 紧凑为 `py-2 text-xs` |

最终布局结构变为：

```
┌─────────────────────────────────────────────┐
│           进度条 + 图标名称导航              │
├──────────────────┬──────────────────────────┤
│   动画区(16:10)   │  标题 + 描述             │
│                  │  工艺详解                │
│   语音按钮       │  关键指标(2×2网格)        │
│   语音讲解文稿    │  详细步骤 + 企业标签      │
│   工艺流程导航    │                          │
├──────────────────┴──────────────────────────┤
│              相关企业卡片群                   │
│              上一步 / 下一步                  │
└─────────────────────────────────────────────┘
```

**Vibe Coding 心得**：布局微调是最适合"快速对话迭代"的场景——描述问题，AI 生成修改，看效果，再微调。这种 30 秒一轮的反馈速度是传统开发无法企及的。

## 四、Vibe Coding 效率密码

### 4.1 什么任务适合 Vibe Coding？

| 适合 | 不适合 |
|------|--------|
| 数据模型设计（让 AI 生成接口定义） | 需要精确像素级还原的 UI |
| 批量改写（SMIL→CSS、重命名变量） | 涉及复杂状态机的业务逻辑 |
| 样板代码（CRUD、表单、列表渲染） | 需要深度调试的性能瓶颈 |
| 多方案对比（让 AI 列出利弊） | 安全敏感的认证/加密逻辑 |
| 布局微调（间距、字号、颜色） | 需要精确数学计算的算法 |

### 4.2 提示词技巧

**好的提示**（具体、有约束、有上下文）：

> "在 ProcessSubStep 类型中增加 companyRefs?: string[] 字段，引用本步骤 companies[] 中的 nameEn。然后在 ProcessDetailPage 的子步骤渲染中，用 companyRefs 从 companyMap 查找企业，展示为带国旗+名称的标签，按 tag 着色。"

**差的提示**（模糊、无约束）：

> "把企业信息加到子步骤里。"

区别在于：好的提示**指定了数据结构、关联方式、展示形式和样式规则**，AI 不需要猜。

### 4.3 避坑清单

1. **类型先行**：先定义 `types.ts`，再写数据和组件。数据结构不稳定时写组件，必返工。
2. **构建常验**：每次改动后跑 `vite build`，不要攒一堆再验。类型错误越早发现越好。
3. **引用优于嵌入**：`companyRefs: string[]` 比 `companies: Company[]` 好维护——企业详情改一处，全局生效。
4. **降级优于硬编码**：语音选择用评分降级策略，而非 `if (name === 'Microsoft Xiaoxiao')`。
5. **CSS 技巧优先**：`grid-template-rows` 动画比 `max-height` hack 好；CSS 自定义属性比每个动画写一个 `@keyframes` 好。

## 五、项目成果

| 指标 | 数据 |
|------|------|
| 工艺步骤 | 10 个，每步 5~7 个子步骤，共 58 个原子步骤 |
| SVG 动画 | 10 个独立组件，82 个 CSS keyframe 动画 |
| 企业数据 | 44 家（国际龙头 + 中国力量 + 新兴势力） |
| 子步骤企业关联 | 58 个子步骤全部配置 companyRefs |
| 语音讲解 | 智能评分优选神经合成声音 + localStorage 持久化 |
| 代码分割 | 10 个步骤数据文件自动懒加载（5.9~9.1 KB/chunk） |
| 构建体积 | JS 总包 ~287 KB (gzip 85 KB) |

## 六、总结

Vibe Coding 的核心价值不是"让 AI 替你写代码"，而是**让领域专家的知识直接转化为可交互的产品**。在芯片制造学习网站这个案例中：

- **领域知识**（工艺参数、企业信息、讲解文稿）由人提供
- **工程实现**（类型设计、动画迁移、语音优化、布局调整）由 AI 协作完成
- **架构决策**（引用式关联、评分降级策略、布局结构）由人引导 AI 探索

三者结合，才能在短时间内产出一个**专业准确、交互丰富、视觉精良**的学习网站。

> 代码是 AI 写的，但产品是你设计的。Vibe Coding 的上限，取决于你的领域深度和设计判断力。

---

*本文基于芯片制造全流程动画演示网站的真实开发过程撰写。技术栈：React 18 + TypeScript + Vite + Tailwind CSS。*
