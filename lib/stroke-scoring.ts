import { normalizePoint } from "@/lib/canvas-utils";
import { sampleSvgPath } from "@/lib/svg-path-utils";
import type {
  CanvasPoint,
  CanvasStroke,
  StrokeFeedback,
  StrokeFeedbackStatus,
  StrokePath,
} from "@/types";

export type { StrokeFeedback, StrokeFeedbackStatus } from "@/types";

export interface PracticeScoreResult {
  overallScore: number;
  strokeFeedbacks: StrokeFeedback[];
  strokesCompleted: number;
  totalStrokes: number;
}

const CANVAS_SIZE = 480;
const START_THRESHOLD = 35;
const PATH_THRESHOLD = 28;
const DIRECTION_THRESHOLD = Math.PI / 2.5;

function distance(a: CanvasPoint, b: CanvasPoint): number {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function resample(points: CanvasPoint[], count: number): CanvasPoint[] {
  if (points.length === 0) return [];
  if (points.length === 1) return Array(count).fill(points[0]);

  const totalLength = points.reduce(
    (sum, p, i) => (i === 0 ? 0 : sum + distance(points[i - 1], p)),
    0,
  );
  if (totalLength === 0) return Array(count).fill(points[0]);

  const result: CanvasPoint[] = [];
  let segmentStart = 0;

  for (let i = 0; i < count; i++) {
    const target = (i / (count - 1)) * totalLength;
    let accumulated = 0;

    for (let j = 1; j < points.length; j++) {
      const segLen = distance(points[j - 1], points[j]);
      if (accumulated + segLen >= target) {
        const t = (target - accumulated) / segLen;
        result.push({
          x: points[j - 1].x + t * (points[j].x - points[j - 1].x),
          y: points[j - 1].y + t * (points[j].y - points[j - 1].y),
          pressure: 0.5,
        });
        segmentStart = 1;
        break;
      }
      accumulated += segLen;
    }

    if (segmentStart === 0) {
      result.push(points[points.length - 1]);
    }
    segmentStart = 0;
  }

  return result;
}

function averagePathDistance(
  userPoints: CanvasPoint[],
  refPoints: CanvasPoint[],
): number {
  const user = resample(userPoints, 30);
  const ref = resample(refPoints, 30);
  let total = 0;
  for (let i = 0; i < user.length; i++) {
    total += distance(user[i], ref[i]);
  }
  return total / user.length;
}

function getStrokeDirection(points: CanvasPoint[]): number {
  if (points.length < 2) return 0;
  const start = points[0];
  const end = points[points.length - 1];
  return Math.atan2(end.y - start.y, end.x - start.x);
}

function getReferenceDirection(refPoints: CanvasPoint[]): number {
  if (refPoints.length < 2) return 0;
  const start = refPoints[0];
  const end = refPoints[refPoints.length - 1];
  return Math.atan2(end.y - start.y, end.x - start.x);
}

function angleDiff(a: number, b: number): number {
  let diff = Math.abs(a - b);
  if (diff > Math.PI) diff = 2 * Math.PI - diff;
  return diff;
}

function scoreStroke(
  userStroke: CanvasStroke,
  refStroke: StrokePath,
  strokeIndex: number,
): StrokeFeedback {
  const normalized = userStroke.points.map((p) =>
    normalizePoint(p, CANVAS_SIZE, CANVAS_SIZE),
  );

  if (normalized.length < 2) {
    return {
      strokeIndex,
      status: "retry",
      score: 0,
      messageKm: "គូសខ្សែឱ្យវែងជាងនេះ",
      messageEn: "Draw a longer stroke",
    };
  }

  const refPoints = sampleSvgPath(refStroke.path);
  const startDist = distance(normalized[0], {
    x: refStroke.startX,
    y: refStroke.startY,
    pressure: 0.5,
  });

  const userDir = getStrokeDirection(normalized);
  const refDir = getReferenceDirection(refPoints);
  const dirDiff = angleDiff(userDir, refDir);

  if (dirDiff > DIRECTION_THRESHOLD && startDist < START_THRESHOLD * 2) {
    return {
      strokeIndex,
      status: "wrong_direction",
      score: 20,
      messageKm: "អនុវត្តតាមទិសដៅខ្សែ",
      messageEn: "Follow the stroke direction",
    };
  }

  const pathDist = averagePathDistance(normalized, refPoints);
  const startPenalty = Math.max(0, startDist - START_THRESHOLD) * 0.5;
  const adjustedDist = pathDist + startPenalty;

  let score: number;
  let status: StrokeFeedbackStatus;

  if (adjustedDist <= PATH_THRESHOLD && startDist <= START_THRESHOLD) {
    score = Math.round(100 - adjustedDist * 1.5);
    status = "correct";
  } else if (adjustedDist <= PATH_THRESHOLD * 1.8) {
    score = Math.round(70 - adjustedDist);
    status = "retry";
  } else {
    score = Math.max(10, Math.round(50 - adjustedDist));
    status = "retry";
  }

  score = Math.max(0, Math.min(100, score));

  const isCorrect = status === "correct";

  return {
    strokeIndex,
    status,
    score,
    messageKm: isCorrect ? "ត្រឹមត្រូវ ✓" : "សាកល្បងម្តងទៀត ↗",
    messageEn: isCorrect ? "Correct ✓" : "Try again ↗",
  };
}

export function scorePractice(
  userStrokes: CanvasStroke[],
  refStrokes: StrokePath[],
): PracticeScoreResult {
  const totalStrokes = refStrokes.length;
  const strokeFeedbacks: StrokeFeedback[] = [];

  for (let i = 0; i < totalStrokes; i++) {
    const userStroke = userStrokes[i];
    if (!userStroke) {
      strokeFeedbacks.push({
        strokeIndex: i,
        status: "retry",
        score: 0,
        messageKm: "ខ្សែនេះមិនទាន់បានគូស",
        messageEn: "This stroke was not drawn",
      });
      continue;
    }
    strokeFeedbacks.push(scoreStroke(userStroke, refStrokes[i], i));
  }

  const completed = userStrokes.filter((s) => s.points.length >= 2).length;
  const strokeScores = strokeFeedbacks.map((f) => f.score);
  const avgStroke =
    strokeScores.length > 0
      ? strokeScores.reduce((a, b) => a + b, 0) / strokeScores.length
      : 0;

  const countBonus = (completed / totalStrokes) * 20;
  const overallScore = Math.round(Math.min(100, avgStroke * 0.8 + countBonus));

  return {
    overallScore,
    strokeFeedbacks,
    strokesCompleted: completed,
    totalStrokes,
  };
}
