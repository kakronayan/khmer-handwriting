import type { KhmerCharacter } from "@/types";

/** Khmer text to speak for TTS / audio generation. */
export function getSpeechText(character: KhmerCharacter): string {
  if (character.category === "mark") {
    return `ក${character.character}`;
  }

  if (character.category === "subscript") {
    return character.character.replace(/^\u17D2/, "") || character.character;
  }

  return character.character;
}

export function getAudioPath(characterId: string): string {
  return `/audio/${characterId}.mp3`;
}
