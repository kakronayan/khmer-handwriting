import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { characters } from "../data/characters";
import {
  getAudioPath,
  getHomeTitleAudioPath,
  getSpeechText,
  HOME_TITLE_SPEECH_TEXT,
} from "../lib/speech-text";

const KIRI_API_URL = "https://api.kiritts.com/v1/audio/speech";
const VOICE = "Maly";
const MODEL = "KiriTTS-1";
const OUTPUT_DIR = path.join(process.cwd(), "public", "audio");
const DELAY_AFTER_SUCCESS_MS = 2000;
const INITIAL_RETRY_DELAY_MS = 3000;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isValidMp3(data: Buffer): boolean {
  if (data.length < 4) return false;
  // ID3 tag or MP3 frame sync (0xFF 0xFB/F3/F2/E0...)
  if (data[0] === 0x49 && data[1] === 0x44 && data[2] === 0x33) return true;
  return data[0] === 0xff && (data[1] & 0xe0) === 0xe0;
}

async function synthesizeSpeech(input: string, outputPath: string): Promise<void> {
  const apiKey = "sk--ymlhAZkdbpAZYNyssd1aXUTgA8i-Oxc9TEyV2R30Fc";
  if (!apiKey) {
    throw new Error("KIRI_API_KEY environment variable is required");
  }

  let attempt = 0;
  let retryDelayMs = INITIAL_RETRY_DELAY_MS;

  while (true) {
    attempt += 1;
    if (attempt > 1) {
      process.stdout.write(`retry ${attempt}... `);
    }

    const response = await fetch(KIRI_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        input,
        voice: VOICE,
        response_format: "mp3",
        speed: 1,
      }),
    });

    if (response.ok) {
      const audio = Buffer.from(await response.arrayBuffer());
      if (!isValidMp3(audio)) {
        throw new Error("Response was not a valid MP3 file");
      }
      writeFileSync(outputPath, audio);
      return;
    }

    const errorText = await response.text();

    if (response.status === 403) {
      throw new Error(
        `Kiri TTS API access denied (403): ${errorText}. Upgrade your plan at https://www.kiritts.com/dashboard/api`,
      );
    }

    if (response.status === 429) {
      process.stdout.write(`rate limited, waiting ${retryDelayMs}ms... `);
      await sleep(retryDelayMs);
      retryDelayMs = Math.min(retryDelayMs * 2, 60_000);
      continue;
    }

    process.stdout.write(`error ${response.status}, waiting ${retryDelayMs}ms... `);
    await sleep(retryDelayMs);
    retryDelayMs = Math.min(retryDelayMs * 2, 60_000);
  }
}

async function generateOne(
  index: number,
  total: number,
  id: string,
  speechText: string,
  outputPath: string,
): Promise<void> {
  console.log(`[${index}/${total}] Generating ${id} (${speechText})`);
  await synthesizeSpeech(speechText, outputPath);
  console.log(`[${index}/${total}] ${id} done. Waiting ${DELAY_AFTER_SUCCESS_MS}ms before next request...`);
  await sleep(DELAY_AFTER_SUCCESS_MS);
}

async function main() {
  mkdirSync(OUTPUT_DIR, { recursive: true });

  const jobs = [
    ...characters.map((character) => ({
      id: character.id,
      speechText: getSpeechText(character),
      outputPath: path.join(OUTPUT_DIR, `${character.id}.mp3`),
    })),
    {
      id: "home-title",
      speechText: HOME_TITLE_SPEECH_TEXT,
      outputPath: path.join(OUTPUT_DIR, "home-title.mp3"),
    },
  ];

  let generated = 0;

  for (let i = 0; i < jobs.length; i += 1) {
    const job = jobs[i];
    await generateOne(i + 1, jobs.length, job.id, job.speechText, job.outputPath);
    generated += 1;
  }

  console.log(`\nGenerated ${generated}/${jobs.length} files in ${OUTPUT_DIR}`);
  console.log(`Character audio paths follow ${getAudioPath("<id>")}`);
  console.log(`Home title audio path: ${getHomeTitleAudioPath()}`);
}

void main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
