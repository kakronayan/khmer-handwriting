import type { RecognitionResponse } from "@/types";

export interface RecognitionService {
  recognize(imageData: ImageData): Promise<RecognitionResponse>;
}

const MOCK_RESULTS: Record<string, RecognitionResponse> = {
  ka: {
    primary: { character: "ក", characterId: "ka", confidence: 92 },
    alternatives: [
      { character: "ខ", characterId: "kha", confidence: 5 },
      { character: "គ", characterId: "ko", confidence: 3 },
    ],
  },
};

export class MockRecognitionService implements RecognitionService {
  async recognize(imageData: ImageData): Promise<RecognitionResponse> {
    void imageData;
    await new Promise((resolve) => setTimeout(resolve, 600));
    return MOCK_RESULTS.ka;
  }
}

export const recognitionService: RecognitionService = new MockRecognitionService();
