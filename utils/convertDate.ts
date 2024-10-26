import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/ko";

export function formatToHyphenDate(date: Date | Dayjs) {
  return dayjs(date).format("YYYY-MM-DD");
}

export function formatToDotDate(date: Date) {
  return dayjs(date).format("YYYY.MM.DD");
}

export function formatToKorDate(date: Date) {
  return dayjs(date).format("YYYY년 MM월 DD일");
}

export function formatToMonthDay(date: Date | Dayjs) {
  return dayjs(date).locale("ko").format("MM월 DD일 (dd)");
}

export function formatKorStartTime(date: Date | Dayjs) {
  return dayjs(date)
    .format("A H:MM")
    .replace("AM", "오전")
    .replace("PM", "오후");
}

export function convertDate(getTime: Date) {
  const startTime = dayjs(getTime).valueOf();
  const endTime = dayjs().valueOf();
  const seconds = Math.floor((endTime - startTime) / 1000);
  if (seconds < 60) return "방금 전";

  const minutes = seconds / 60;
  if (minutes < 60) return `${Math.floor(minutes)}분 전`;

  const hours = minutes / 60;
  if (hours < 60) return `${Math.floor(hours)}시간 전`;

  const days = hours / 24;
  if (days < 60) return `${Math.floor(days)}일 전`;

  return formatToDotDate(getTime);
}
