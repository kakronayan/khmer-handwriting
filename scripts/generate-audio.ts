import { mkdirSync } from "node:fs";
import path from "node:path";
import { EdgeTTS } from "node-edge-tts";
import { characters } from "../data/characters";
import { getAudioPath, getSpeechText } from "../lib/speech-text";

const VOICE = "km-KH-PisethNeural";
const OUTPUT_DIR = path.join(process.cwd(), "public", "audio");

async function main() {
  mkdirSync(OUTPUT_DIR, { recursive: true });

  const tts = new EdgeTTS({
    voice: VOICE,
    lang: "km-KH",
    outputFormat: "audio-24khz-96kbitrate-mono-mp3",
    rate: "-5%",
  });

  let generated = 0;

  for (const character of characters) {
    const outputPath = path.join(
      OUTPUT_DIR,
      `${character.id}.mp3`,
    );
    const speechText = getSpeechText(character);

    process.stdout.write(`Generating ${character.id} (${speechText})... `);

    try {
      await tts.ttsPromise(speechText, outputPath);
      generated += 1;
      console.log("done");
    } catch (error) {
      console.log("failed");
      console.error(error);
    }
  }

  console.log(`\nGenerated ${generated}/${characters.length} files in ${OUTPUT_DIR}`);
  console.log(`Audio paths follow ${getAudioPath("<id>")}`);
}

void main();
