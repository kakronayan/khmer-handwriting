import { getCharacterById } from "@/data/characters";
import { assetPath } from "@/lib/asset-path";

let currentUtterance: SpeechSynthesisUtterance | null = null;

export async function speakCharacter(characterId: string): Promise<void> {
  const character = getCharacterById(characterId);
  if (!character) return;

  if (typeof window === "undefined") return;

  if ("speechSynthesis" in window) {
    const voices = window.speechSynthesis.getVoices();
    const khmerVoice = voices.find(
      (v) => v.lang.startsWith("km") || v.lang.includes("Khmer"),
    );

    if (khmerVoice) {
      window.speechSynthesis.cancel();
      currentUtterance = new SpeechSynthesisUtterance(character.character);
      currentUtterance.lang = "km-KH";
      currentUtterance.voice = khmerVoice;
      currentUtterance.rate = 0.85;
      window.speechSynthesis.speak(currentUtterance);
      return;
    }
  }

  if (character.audioFile) {
    try {
      const audio = new Audio(assetPath(character.audioFile));
      await audio.play();
    } catch {
      // Audio file not available yet — fallback architecture in place
    }
  }
}

export function stopSpeaking(): void {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
  currentUtterance = null;
}
