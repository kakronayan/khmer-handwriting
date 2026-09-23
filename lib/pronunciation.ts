import { getCharacterById } from "@/data/characters";
import { assetPath } from "@/lib/asset-path";
import { getAudioPath, getSpeechText } from "@/lib/speech-text";

let currentUtterance: SpeechSynthesisUtterance | null = null;
let currentAudio: HTMLAudioElement | null = null;

function playAudioFile(path: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const audio = new Audio(assetPath(path));
    currentAudio = audio;

    audio.onended = () => {
      if (currentAudio === audio) currentAudio = null;
      resolve();
    };
    audio.onerror = () => {
      if (currentAudio === audio) currentAudio = null;
      reject(new Error("Audio playback failed"));
    };

    void audio.play().catch(reject);
  });
}

function speakWithBrowser(text: string): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      resolve();
      return;
    }

    const voices = window.speechSynthesis.getVoices();
    const khmerVoice = voices.find(
      (voice) => voice.lang.startsWith("km") || voice.lang.includes("Khmer"),
    );

    window.speechSynthesis.cancel();
    currentUtterance = new SpeechSynthesisUtterance(text);
    currentUtterance.lang = "km-KH";
    currentUtterance.rate = 0.85;

    if (khmerVoice) {
      currentUtterance.voice = khmerVoice;
    }

    currentUtterance.onend = () => {
      currentUtterance = null;
      resolve();
    };
    currentUtterance.onerror = () => {
      currentUtterance = null;
      resolve();
    };

    window.speechSynthesis.speak(currentUtterance);
  });
}

export async function speakText(
  text: string,
  audioPath?: string,
): Promise<void> {
  if (typeof window === "undefined") return;

  stopSpeaking();

  if (audioPath) {
    try {
      await playAudioFile(audioPath);
      return;
    } catch {
      // Fall back to browser speech when the MP3 is missing or blocked.
    }
  }

  await speakWithBrowser(text);
}

export async function speakCharacter(characterId: string): Promise<void> {
  const character = getCharacterById(characterId);
  if (!character || typeof window === "undefined") return;

  const audioPath = character.audioFile ?? getAudioPath(character.id);
  await speakText(getSpeechText(character), audioPath);
}

export function stopSpeaking(): void {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }

  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }

  currentUtterance = null;
}
