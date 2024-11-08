"use client";

import { useState, useEffect } from "react";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Swiper as SwiperCore } from "swiper";
import { Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { getUser } from "@/apis/user";

const GRADIENTS = [
  "linear-gradient(to bottom, #16A6EEB3, #64c6f794)",
  "linear-gradient(to bottom, #64c6f794, #b2e4fd93",
  "linear-gradient(to bottom, #b2e4fd93, #fff8d7)",
  "linear-gradient(to bottom, #fff8d7, #fff8d7)",
  "linear-gradient(to bottom, #fff8d7, #f8f6ed)",
];

export default function LandingPage({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [bgGradient, setBgGradient] = useState(GRADIENTS[0]);
  const [userFirstTeam, setUserFirstTeam] = useState<number | undefined>(
    undefined,
  );
  const res = async () => {
    const user = await getUser();
    const firstTeam = user ? user.memberships[0]?.groupId : undefined;
    setUserFirstTeam(firstTeam);
  };
  useEffect(() => {
    if (isLoggedIn) {
      res();
    }
  }, [isLoggedIn]);
  const handleSlideChange = (swiper: SwiperCore) => {
    setBgGradient(GRADIENTS[swiper.activeIndex]);
  };
  return (
    <main
      style={{
        position: "relative",
        overflow: "hidden",
        height: "100vh",
        paddingTop: "60px",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: bgGradient,
        }}
      />
      <Swiper
        speed={1000}
        className="mySwiper relative"
        direction="vertical"
        slidesPerView="auto"
        mousewheel
        autoHeight
        modules={[Mousewheel]}
        onSlideChange={handleSlideChange}
      >
        <SwiperSlide>
          <section className="flex min-h-[calc(100vh-60px)] w-full items-start justify-center">
            <div className="mt-[40px] flex flex-col items-center justify-center pc:mt-[80px]">
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="mb-[24px] text-[24px] text-[#ffffff] pc:mb-[32px] pc:text-[34px]"
              >
                우리가 만드는 투두 리스트
              </motion.h1>
              <div className="mb-[80px] flex flex-col items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.5,
                    ease: [0, 0.71, 0.2, 1.01],
                  }}
                >
                  <Image
                    className="mb-[24px] h-[49px] w-[100px] pc:h-[79px] pc:w-[160px]"
                    width={160}
                    height={78}
                    src="/images/landing_logo.png"
                    alt="로고"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.9,
                    ease: [0, 0.71, 0.2, 1.01],
                    scale: {
                      type: "spring",
                      damping: 5,
                      stiffness: 100,
                      restDelta: 0.001,
                    },
                  }}
                >
                  <Image
                    width={160}
                    height={217}
                    src="/images/todolist.png"
                    alt="투두리스트"
                  />
                </motion.div>
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, delay: 1.3 }}
              >
                <Link
                  className="w-[270px] rounded-full bg-[#ffffff] px-14 py-3 text-center text-[18px] transition duration-300 ease-in-out hover:bg-[#FFAE67]"
                  href={`${isLoggedIn ? `/${userFirstTeam}` : "/login"}`}
                >
                  지금 시작하기
                </Link>
              </motion.div>
            </div>
          </section>
        </SwiperSlide>
        <SwiperSlide>
          <section className="flex min-h-[calc(100vh-60px)] justify-center px-[16px] pc:px-0">
            <div className="flex flex-col-reverse items-start justify-end gap-[30px] pt-[80px] tab:flex-row tab:items-center tab:pt-0 pc:flex-row pc:items-center pc:justify-center pc:gap-[100px] pc:pt-0">
              <Image
                width={500}
                height={330}
                src="/images/content_group.png"
                alt="그룹 콘텐츠"
              />
              <div className="w-[300px]">
                <Image
                  width={60}
                  height={60}
                  src="/images/content_group_icon.png"
                  alt="그룹 콘텐츠 아이콘"
                />
                <h2 className="mt-[16px] text-[18px] pc:text-[24px]">
                  그룹을 만들어 팀원들과 <br /> 할 일을 공유하고 관리해 보세요!
                </h2>
              </div>
            </div>
          </section>
        </SwiperSlide>
        <SwiperSlide>
          <section className="flex min-h-[calc(100vh-60px)] justify-center px-[16px] pc:px-0">
            <div className="flex flex-col-reverse items-start justify-end gap-[30px] pt-[80px] tab:flex-row tab:items-center tab:pt-0 pc:flex-row pc:items-center pc:justify-center pc:gap-[100px] pc:pt-0">
              <Image
                width={500}
                height={521}
                src="/images/content_invite.png"
                alt="초대 콘텐츠"
              />
              <div className="w-[300px]">
                <Image
                  width={60}
                  height={60}
                  src="/images/content_invite_icon.png"
                  alt="초대 콘텐츠 아이콘"
                />
                <h2 className="mt-[16px] text-[18px] pc:text-[24px]">
                  간단하게 함께 할 <br /> 팀원을 초대해 보세요!
                </h2>
              </div>
            </div>
          </section>
        </SwiperSlide>
        <SwiperSlide>
          <section className="flex min-h-[calc(100vh-60px)] justify-center px-[16px] pc:px-0">
            <div className="flex flex-col-reverse items-start justify-end gap-[30px] pt-[80px] tab:flex-row tab:items-center tab:pt-0 pc:flex-row pc:items-center pc:justify-center pc:gap-[100px] pc:pt-0">
              <Image
                width={500}
                height={521}
                src="/images/content_check.png"
                alt="완료 콘텐츠"
              />
              <div className="w-[300px]">
                <Image
                  width={60}
                  height={60}
                  src="/images/content_check_icon.png"
                  alt="완료 콘텐츠 아이콘"
                />
                <h2 className="mt-[16px] text-[18px] pc:text-[24px]">
                  완료된 할 일을 <br /> 간편하게 체크해 보세요!
                </h2>
              </div>
            </div>
          </section>
        </SwiperSlide>
        <SwiperSlide>
          <section className="relative flex min-h-[calc(100vh-60px)] justify-center">
            <div className="relative z-10">
              <h2 className="mb-[32px] flex justify-center pt-[100px] text-[24px]">
                지금 시작해 보세요!
              </h2>
              <Link
                className="w-[270px] rounded-full bg-[#ffffff] px-14 py-3 text-center text-[18px] transition duration-300 ease-in-out hover:bg-[#FFAE67]"
                href={`${isLoggedIn ? `/${userFirstTeam}` : "/login"}`}
              >
                지금 시작하기
              </Link>
            </div>
            <div
              className="absolute bottom-[-80px] h-[355px] w-full bg-cover bg-center"
              style={{
                backgroundImage: "url('/images/background_floor.png')",
                backgroundPosition: "center",
              }}
            />
            <div
              className="absolute bottom-[230px] h-[219px] w-[485px] bg-cover bg-center tab:h-[370px] tab:w-[817px] pc:h-[474px] pc:w-[1040px]"
              style={{
                backgroundImage: "url('/images/content_bottom.png')",
              }}
            />
          </section>
        </SwiperSlide>
      </Swiper>
    </main>
  );
}
