import { create } from "zustand";

import MEDIA_QUERY_BREAK_POINT from "@/constants/mediaQueryBreakPoints";

type DeviceTypeState = {
  deviceType: {
    isMobile: boolean;
    isTablet: boolean;
    isPc: boolean;
  };
};

type DeviceTypeActions = {
  addEvent: () => void;
  cleanup: () => void;
};

const { MOBILE_MAX_WIDTH, TABLET_MIN_WIDTH, TABLET_MAX_WIDTH, PC_MIN_WIDTH } =
  MEDIA_QUERY_BREAK_POINT;

const useDeviceTypeStore = create<DeviceTypeState & DeviceTypeActions>()((
  set,
) => {
  const createMediaQuery = (query: string) => window.matchMedia(query);
  const mobileMediaQuery = createMediaQuery(
    `(max-width: ${MOBILE_MAX_WIDTH}px)`,
  );
  const tabletMediaQuery = createMediaQuery(
    `(min-width: ${TABLET_MIN_WIDTH}px) and (max-width: ${TABLET_MAX_WIDTH}px)`,
  );
  const pcMediaQuery = createMediaQuery(`(min-width: ${PC_MIN_WIDTH}px)`);
  const mediaQuerys = [mobileMediaQuery, tabletMediaQuery, pcMediaQuery];

  // 미디어 쿼리 값에 만족하면 true of false를 return
  const getDeviceType = () => ({
    isMobile: mobileMediaQuery.matches,
    isTablet: tabletMediaQuery.matches,
    isPc: pcMediaQuery.matches,
  });

  const handleChange = () => {
    set({ deviceType: getDeviceType() });
  };

  // 이벤트 핸들러 등록 함수
  const addEventListener = () => {
    if (typeof window !== "undefined") {
      mediaQuerys.map((mediaQuery) =>
        mediaQuery.addEventListener("change", handleChange),
      );
    }
  };
  addEventListener(); // 전역 이벤트 핸들러 등록

  // 이벤트 핸들러 제거 함수
  const removeEventListener = () => {
    if (typeof window !== "undefined") {
      mediaQuerys.map((mediaQuery) =>
        mediaQuery.removeEventListener("change", handleChange),
      );
    }
  };

  // cleanup은 사용 가능하지만 전역적으로 동작하기 때문에
  // 모든 deviceType 이벤트 핸들러가 제거되기 때문에 유의
  return {
    deviceType: getDeviceType(),
    addEvent: addEventListener,
    cleanup: removeEventListener,
  };
});

export default useDeviceTypeStore;
