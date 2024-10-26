"use client";

import { useEffect, useState } from "react";

import dayjs from "dayjs";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

import { formatToHyphenDate, formatToMonthDay } from "@/utils/convertDate";

export default function TasksDate() {
  const searchParams = useSearchParams();

  const initialDate = searchParams.get("date")
    ? dayjs(searchParams.get("date"))
    : dayjs();
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(initialDate);

  useEffect(() => {
    const formattedDate = formatToHyphenDate(selectedDate);
    router.push(`?date=${formattedDate}`);
  }, [selectedDate, router]);

  const handleDateIncrease = () => {
    setSelectedDate((prevDate) => prevDate.add(1, "day"));
  };
  const handleDateDecrease = () => {
    setSelectedDate((prevDate) => prevDate.subtract(1, "day"));
  };

  return (
    <div className="mb-6 flex items-center gap-3">
      <h3>{formatToMonthDay(selectedDate)}</h3>
      <div className="flex items-center gap-1">
        <button onClick={handleDateDecrease}>
          <Image
            width={20}
            height={20}
            src="/images/arrow_button.png"
            alt="다음 날짜 선택"
          />
        </button>
        <button onClick={handleDateIncrease}>
          <Image
            className="rotate-180 transform"
            width={20}
            height={20}
            src="/images/arrow_button.png"
            alt="이전 날짜 선택"
          />
        </button>
      </div>
      <button onClick={handleDateIncrease}>
        <Image
          width={24}
          height={24}
          src="/images/calendar_button.png"
          alt="날짜 선택"
        />
      </button>
    </div>
  );
}
