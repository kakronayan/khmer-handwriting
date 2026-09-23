/** Standard Khmer consonant order: ក → អ */
export const CONSONANT_IDS = [
  "ka",
  "kha",
  "ko",
  "kho",
  "ngo",
  "cha",
  "chha",
  "co",
  "chho",
  "nyo",
  "da",
  "tha-dent",
  "do",
  "tho",
  "na-dent",
  "ta",
  "tha",
  "to",
  "tho-asp",
  "no",
  "ba",
  "pa",
  "po",
  "pho",
  "mo",
  "yo",
  "ro",
  "lo",
  "vo",
  "sa",
  "ha",
  "la",
  "qa",
] as const;

const consonantIndex = new Map<string, number>(
  CONSONANT_IDS.map((id, index) => [id, index]),
);

export function getConsonantOrder(id: string): number {
  return consonantIndex.get(id) ?? Number.MAX_SAFE_INTEGER;
}

export function compareKhmerConsonants(aId: string, bId: string): number {
  return getConsonantOrder(aId) - getConsonantOrder(bId);
}

export function sortKhmerConsonants<T extends { id: string }>(
  items: T[],
): T[] {
  return [...items].sort((a, b) => compareKhmerConsonants(a.id, b.id));
}
