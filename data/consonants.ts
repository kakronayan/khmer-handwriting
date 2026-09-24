import { getConsonantStrokes } from "@/data/consonant-strokes";
import { getAudioPath } from "@/lib/speech-text";
import type { Difficulty } from "@/data/consonant-strokes/templates";
import type { KhmerCharacter } from "@/types";

interface ConsonantInput {
  id: string;
  character: string;
  nameKm: string;
  nameEn: string;
  pronunciation: string;
  ipa: string;
  group: number;
  exampleWord: string;
  exampleMeaningKm: string;
}

function makeConsonant(input: ConsonantInput): KhmerCharacter {
  const strokeData = getConsonantStrokes(input.id);
  if (!strokeData) {
    throw new Error(`Missing stroke data for consonant: ${input.id}`);
  }
  return {
    ...input,
    category: "consonant",
    strokeCount: strokeData.strokeCount,
    strokes: strokeData.strokes,
    guidePath: strokeData.guidePath,
    difficulty: strokeData.difficulty,
    audioFile: getAudioPath(input.id),
  };
}

/** 33 used Khmer consonants per https://km.wikipedia.org/wiki/ព្យញ្ជនៈខ្មែរ */
export const consonants: KhmerCharacter[] = [
  makeConsonant({ id: "ka", character: "ក", nameKm: "អក្សរ ក", nameEn: "Letter Ka", pronunciation: "ka", ipa: "/kɑː/", group: 1, exampleWord: "កង្កែប", exampleMeaningKm: "កង្កែប" }),
  makeConsonant({ id: "kha", character: "ខ", nameKm: "អក្សរ ខ", nameEn: "Letter Kha", pronunciation: "kha", ipa: "/kʰɑː/", group: 1, exampleWord: "ខ្ញុំ", exampleMeaningKm: "ខ្ញុំ" }),
  makeConsonant({ id: "ko", character: "គ", nameKm: "អក្សរ គ", nameEn: "Letter Ko", pronunciation: "ko", ipa: "/kɔː/", group: 3, exampleWord: "គ្រូ", exampleMeaningKm: "គ្រូ" }),
  makeConsonant({ id: "kho", character: "ឃ", nameKm: "អក្សរ ឃ", nameEn: "Letter Kho", pronunciation: "kho", ipa: "/kʰɔː/", group: 3, exampleWord: "ឃ្មុំ", exampleMeaningKm: "ឃ្មុំ" }),
  makeConsonant({ id: "ngo", character: "ង", nameKm: "អក្សរ ង", nameEn: "Letter Ngo", pronunciation: "ngo", ipa: "/ŋɔː/", group: 2, exampleWord: "ងូតទឹក", exampleMeaningKm: "ងូតទឹក" }),
  makeConsonant({ id: "cha", character: "ច", nameKm: "អក្សរ ច", nameEn: "Letter Cha", pronunciation: "cha", ipa: "/cɑː/", group: 1, exampleWord: "ចិត្ត", exampleMeaningKm: "ចិត្ត" }),
  makeConsonant({ id: "chha", character: "ឆ", nameKm: "អក្សរ ឆ", nameEn: "Letter Chha", pronunciation: "chha", ipa: "/cʰɑː/", group: 1, exampleWord: "ឆ្កែ", exampleMeaningKm: "ឆ្កែ" }),
  makeConsonant({ id: "co", character: "ជ", nameKm: "អក្សរ ជ", nameEn: "Letter Co", pronunciation: "co", ipa: "/cɔː/", group: 3, exampleWord: "ជីវិត", exampleMeaningKm: "ជីវិត" }),
  makeConsonant({ id: "chho", character: "ឈ", nameKm: "អក្សរ ឈ", nameEn: "Letter Chho", pronunciation: "chho", ipa: "/cʰɔː/", group: 3, exampleWord: "ឈប់", exampleMeaningKm: "ឈប់" }),
  makeConsonant({ id: "nyo", character: "ញ", nameKm: "អក្សរ ញ", nameEn: "Letter Nyo", pronunciation: "nyo", ipa: "/ɲɔː/", group: 2, exampleWord: "ញ៉ាំ", exampleMeaningKm: "ញ៉ាំ" }),
  makeConsonant({ id: "da", character: "ដ", nameKm: "អក្សរ ដ", nameEn: "Letter Da", pronunciation: "da", ipa: "/ɗɑː/", group: 1, exampleWord: "ដើម", exampleMeaningKm: "ដើម" }),
  makeConsonant({ id: "tha-dent", character: "ឋ", nameKm: "អក្សរ ឋ", nameEn: "Letter Tha (palatal)", pronunciation: "tha", ipa: "/tʰɑː/", group: 1, exampleWord: "ឋាន", exampleMeaningKm: "ឋាន" }),
  makeConsonant({ id: "do", character: "ឌ", nameKm: "អក្សរ ឌ", nameEn: "Letter Do", pronunciation: "do", ipa: "/ɗɔː/", group: 3, exampleWord: "ឌុប", exampleMeaningKm: "ឌុប" }),
  makeConsonant({ id: "tho", character: "ឍ", nameKm: "អក្សរ ឍ", nameEn: "Letter Tho (retroflex)", pronunciation: "tho", ipa: "/tʰɔː/", group: 3, exampleWord: "ឍ", exampleMeaningKm: "ឍ" }),
  makeConsonant({ id: "na-dent", character: "ណ", nameKm: "អក្សរ ណ", nameEn: "Letter Na (dental)", pronunciation: "na", ipa: "/nɑː/", group: 1, exampleWord: "ណែនា", exampleMeaningKm: "ណែនា" }),
  makeConsonant({ id: "ta", character: "ត", nameKm: "អក្សរ ត", nameEn: "Letter Ta", pronunciation: "ta", ipa: "/tɑː/", group: 1, exampleWord: "តូច", exampleMeaningKm: "តូច" }),
  makeConsonant({ id: "tha", character: "ថ", nameKm: "អក្សរ ថ", nameEn: "Letter Tha", pronunciation: "tha", ipa: "/tʰɑː/", group: 1, exampleWord: "ថ្ងៃ", exampleMeaningKm: "ថ្ងៃ" }),
  makeConsonant({ id: "to", character: "ទ", nameKm: "អក្សរ ទ", nameEn: "Letter To", pronunciation: "to", ipa: "/tɔː/", group: 3, exampleWord: "ទឹក", exampleMeaningKm: "ទឹក" }),
  makeConsonant({ id: "tho-asp", character: "ធ", nameKm: "អក្សរ ធ", nameEn: "Letter Tho (aspirated)", pronunciation: "tho", ipa: "/tʰɔː/", group: 3, exampleWord: "ធម្ម", exampleMeaningKm: "ធម្ម" }),
  makeConsonant({ id: "no", character: "ន", nameKm: "អក្សរ ន", nameEn: "Letter No", pronunciation: "no", ipa: "/nɔː/", group: 3, exampleWord: "នាង", exampleMeaningKm: "នាង" }),
  makeConsonant({ id: "ba", character: "ប", nameKm: "អក្សរ ប", nameEn: "Letter Ba", pronunciation: "ba", ipa: "/ɓɑː/", group: 2, exampleWord: "ប្រទេស", exampleMeaningKm: "ប្រទេស" }),
  makeConsonant({ id: "pa", character: "ផ", nameKm: "អក្សរ ផ", nameEn: "Letter Pa", pronunciation: "pa", ipa: "/pʰɑː/", group: 1, exampleWord: "ផ្កា", exampleMeaningKm: "ផ្កា" }),
  makeConsonant({ id: "po", character: "ព", nameKm: "អក្សរ ព", nameEn: "Letter Po", pronunciation: "po", ipa: "/pɑː/", group: 1, exampleWord: "ពពក", exampleMeaningKm: "ពពក" }),
  makeConsonant({ id: "pho", character: "ភ", nameKm: "អក្សរ ភ", nameEn: "Letter Pho", pronunciation: "pho", ipa: "/pʰɔː/", group: 3, exampleWord: "ភ្នំ", exampleMeaningKm: "ភ្នំ" }),
  makeConsonant({ id: "mo", character: "ម", nameKm: "អក្សរ ម", nameEn: "Letter Mo", pronunciation: "mo", ipa: "/mɔː/", group: 2, exampleWord: "ម្តាយ", exampleMeaningKm: "ម្តាយ" }),
  makeConsonant({ id: "yo", character: "យ", nameKm: "អក្សរ យ", nameEn: "Letter Yo", pronunciation: "yo", ipa: "/jɔː/", group: 2, exampleWord: "យប់", exampleMeaningKm: "យប់" }),
  makeConsonant({ id: "ro", character: "រ", nameKm: "អក្សរ រ", nameEn: "Letter Ro", pronunciation: "ro", ipa: "/rɔː/", group: 2, exampleWord: "រូប", exampleMeaningKm: "រូប" }),
  makeConsonant({ id: "lo", character: "ល", nameKm: "អក្សរ ល", nameEn: "Letter Lo", pronunciation: "lo", ipa: "/lɔː/", group: 2, exampleWord: "ល្អ", exampleMeaningKm: "ល្អ" }),
  makeConsonant({ id: "vo", character: "វ", nameKm: "អក្សរ វ", nameEn: "Letter Vo", pronunciation: "vo", ipa: "/wɔː/", group: 2, exampleWord: "វត្ត", exampleMeaningKm: "វត្ត" }),
  makeConsonant({ id: "sa", character: "ស", nameKm: "អក្សរ ស", nameEn: "Letter Sa", pronunciation: "sa", ipa: "/sɑː/", group: 2, exampleWord: "ស្ពាន", exampleMeaningKm: "ស្ពាន" }),
  makeConsonant({ id: "ha", character: "ហ", nameKm: "អក្សរ ហ", nameEn: "Letter Ha", pronunciation: "ha", ipa: "/hɑː/", group: 2, exampleWord: "ហាង", exampleMeaningKm: "ហាង" }),
  makeConsonant({ id: "la", character: "ឡ", nameKm: "អក្សរ ឡ", nameEn: "Letter La", pronunciation: "la", ipa: "/lɑː/", group: 3, exampleWord: "ឡាន", exampleMeaningKm: "ឡាន" }),
  makeConsonant({ id: "qa", character: "អ", nameKm: "អក្សរ អ", nameEn: "Letter Qa", pronunciation: "qa", ipa: "/ʔɑː/", group: 2, exampleWord: "អាហារ", exampleMeaningKm: "អាហារ" }),
];

export type { Difficulty };
