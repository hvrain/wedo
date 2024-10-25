export function getFrequencyType(frequency: string): string {
  switch (frequency) {
    case "ONCE":
      return "반복 없음";
    case "DAILY":
      return "매일 반복";
    case "WEEKLY":
      return "주 반복";
    case "MONTHLY":
      return "월 반복";
    default:
      return frequency;
  }
}
