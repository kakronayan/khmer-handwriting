export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

export function formatKhmerNumber(num: number): string {
  const khmerDigits = ["០", "១", "២", "៣", "៤", "៥", "៦", "៧", "៨", "៩"];
  return String(num)
    .split("")
    .map((d) => khmerDigits[parseInt(d, 10)] ?? d)
    .join("");
}

export function getScoreLabel(score: number, lang: "km" | "en"): string {
  if (score >= 90) return lang === "km" ? "ល្អណាស់" : "Excellent";
  if (score >= 80) return lang === "km" ? "ល្អ" : "Good";
  if (score >= 60) return lang === "km" ? "មធ្យម" : "Fair";
  return lang === "km" ? "សាកម្តងទៀត" : "Try again";
}
