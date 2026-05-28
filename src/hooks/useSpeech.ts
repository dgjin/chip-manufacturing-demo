import { useCallback, useRef } from 'react';

const VOICE_PREF_KEY = 'chip-demo:preferred-zh-voice';

/**
 * Score a voice for Chinese naturalness.
 * Higher = more human-like / preferred.
 */
function scoreVoice(v: SpeechSynthesisVoice): number {
  let score = 0;
  const name = v.name.toLowerCase();

  // Neural / natural-speech voices (highest priority)
  const neuralKeywords = [
    'xiaoxiao', 'xiaoyi', 'yunjian', 'yunyang', 'yunxi', 'yunxia', // Microsoft Zh neural
    'natural', 'neural',                                              // Generic neural tags
    'tingting', 'sinji',                                              // macOS natural zh voices
    'mei-jia',                                                        // macOS Mei-Jia
    'yu-shu',                                                         // macOS Yu-Shu
  ];
  if (neuralKeywords.some((k) => name.includes(k))) score += 50;

  // Microsoft voices tend to be high quality
  if (name.includes('microsoft')) score += 20;

  // Google voices
  if (name.includes('google')) score += 15;

  // Apple voices (macOS)
  if (name.includes('siri') || name.includes('com.apple')) score += 10;

  // Prefer zh-CN over zh-TW / zh-HK for mainland Chinese text
  if (v.lang === 'zh-CN') score += 8;
  else if (v.lang.startsWith('zh')) score += 3;

  // Local service voices are more reliable (no network dependency)
  if (v.localService) score += 5;

  return score;
}

function pickBestZhVoice(): SpeechSynthesisVoice | null {
  const voices = window.speechSynthesis.getVoices();
  const zhVoices = voices.filter((v) => v.lang.startsWith('zh'));
  if (zhVoices.length === 0) return null;

  // Try to restore user preference
  const savedName = localStorage.getItem(VOICE_PREF_KEY);
  if (savedName) {
    const saved = zhVoices.find((v) => v.name === savedName);
    if (saved) return saved;
  }

  // Pick the highest-scoring voice
  const sorted = [...zhVoices].sort((a, b) => scoreVoice(b) - scoreVoice(a));
  const best = sorted[0];

  // Persist the choice
  try { localStorage.setItem(VOICE_PREF_KEY, best.name); } catch {}

  return best;
}

export function useSpeech() {
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);

  const getVoice = useCallback((): SpeechSynthesisVoice | null => {
    if (voiceRef.current) return voiceRef.current;
    const v = pickBestZhVoice();
    if (v) voiceRef.current = v;
    return v;
  }, []);

  const speak = useCallback(
    (text: string) => {
      if (!('speechSynthesis' in window)) {
        console.warn('Web Speech API not supported');
        return;
      }

      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'zh-CN';
      utterance.rate = 0.88;   // Slightly slower than default for clarity
      utterance.pitch = 1.05;  // Very slightly higher pitch for a warmer, friendlier tone
      utterance.volume = 1;

      const assignVoiceAndSpeak = () => {
        const voice = getVoice();
        if (voice) utterance.voice = voice;
        window.speechSynthesis.speak(utterance);
      };

      if (window.speechSynthesis.getVoices().length > 0) {
        assignVoiceAndSpeak();
      } else {
        // Voices haven't loaded yet — wait for the event
        const handler = () => {
          window.speechSynthesis.onvoiceschanged = null;
          assignVoiceAndSpeak();
        };
        window.speechSynthesis.onvoiceschanged = handler;
      }
    },
    [getVoice]
  );

  const stop = useCallback(() => {
    window.speechSynthesis.cancel();
    window.speechSynthesis.onvoiceschanged = null;
  }, []);

  /**
   * Returns all available zh voices sorted by quality score.
   * Useful for building a voice-picker UI.
   */
  const getAvailableVoices = useCallback((): SpeechSynthesisVoice[] => {
    const voices = window.speechSynthesis.getVoices();
    return voices
      .filter((v) => v.lang.startsWith('zh'))
      .sort((a, b) => scoreVoice(b) - scoreVoice(a));
  }, []);

  /**
   * Manually set a preferred voice by name (persists to localStorage).
   */
  const setPreferredVoice = useCallback((voiceName: string) => {
    try { localStorage.setItem(VOICE_PREF_KEY, voiceName); } catch {}
    voiceRef.current = null; // force re-resolve on next speak()
  }, []);

  return { speak, stop, getAvailableVoices, setPreferredVoice };
}
