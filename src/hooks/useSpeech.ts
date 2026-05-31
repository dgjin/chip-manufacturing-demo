import { useCallback, useRef } from 'react';

/** 各工艺步骤预录真人讲解音频（public/narration/{id}.mp3） */
export function getNarrationAudioUrl(stepId: string): string {
  return `/narration/${stepId}.mp3`;
}

export function useSpeech() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const stop = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      audio.onended = null;
      audio.onerror = null;
    }
    audioRef.current = null;
  }, []);

  /** 播放预录讲解音频（真人配音 MP3，非浏览器 TTS） */
  const speak = useCallback((audioUrl: string, onEnd?: () => void) => {
    stop();

    const audio = new Audio(audioUrl);
    audioRef.current = audio;

    if (onEnd) {
      audio.onended = onEnd;
      audio.onerror = onEnd;
    }

    void audio.play().catch((err) => {
      console.warn('Failed to play narration audio:', err);
      onEnd?.();
    });
  }, [stop]);

  return { speak, stop };
}
