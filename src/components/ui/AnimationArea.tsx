import { useInView } from '@/hooks/useInView';
import { SpeakingIndicator } from './SpeakingIndicator';

interface AnimationAreaProps {
  glowColor: string;
  animationKey: number;
  AnimationComponent: React.FC | null;
  isSpeaking: boolean;
}

export function AnimationArea({ glowColor, animationKey, AnimationComponent, isSpeaking }: AnimationAreaProps) {
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className="aspect-[16/10] relative"
      style={{
        background: `radial-gradient(ellipse at center, ${glowColor}, transparent 70%), var(--gradient-card)`,
      }}
    >
      {isInView && AnimationComponent && <AnimationComponent key={animationKey} />}

      {/* Speaking indicator */}
      {isSpeaking && <SpeakingIndicator />}
    </div>
  );
}
