"use client";

import { useState, useEffect } from "react";

import MEDIA_QUERY_BREAK_POINT from "@/constants/mediaQueryBreakPoints";

/**
 * window size의 width값을 기준으로 현재 device가 mobile, tablet, pc인지를 체크하는 커스텀 훅
 * @returns [isMobile, isTablet, isPc, isValid]
 */
export default function useDeviceType() {
  const [deviceType, setDeviceType] = useState({
    isMobile: false,
    isTablet: false,
    isPc: false,
  });
  // use client를 사용하지만 window의 type이 undefined인지 체크해서 hydration 에러 방지
  const [isValid, setIsValid] = useState(false);

  const handleResize = () => {
    if (window.innerWidth < MEDIA_QUERY_BREAK_POINT.TABLET_MIN_WIDTH) {
      setDeviceType({ isMobile: true, isTablet: false, isPc: false });
    } else if (window.innerWidth < MEDIA_QUERY_BREAK_POINT.PC_MIN_WIDTH) {
      setDeviceType({ isMobile: false, isTablet: true, isPc: false });
    } else {
      setDeviceType({ isMobile: false, isTablet: false, isPc: true });
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") {
      setIsValid(false);
    } else {
      setIsValid(true);
    }

    // 최초에 handleResize를 실행하지 않으면 모든 값이 false가 되어 정상 동작하지 않음
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isValid]);

  return [deviceType.isMobile, deviceType.isTablet, deviceType.isPc, isValid];
}
