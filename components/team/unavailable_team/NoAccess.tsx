import Link from "next/link";

import { Button } from "@/@common/Button";
import Container from "@/components/@common/container/Container";

import UnavailableImage from "./UnavailableImage";

export default function NoAccess() {
  return (
    <Container background="lightBeige">
      <div className="pb-[100px] pt-[186px] tab:pt-[272px] pc:pt-[212px]">
        <UnavailableImage />
        <div className="lg-medium mb-12 mt-12 flex flex-col gap-1 text-center text-default-dark tab:mb-20">
          <p>현재 소속된 팀이 아닙니다.</p>
          <p>좌측 상단의 팀 목록에서 참여한 팀을 선택해주세요.</p>
        </div>
        <div className="mx-auto w-[186px]">
          <Button asChild>
            <Link href="/">메인 페이지로 이동</Link>
          </Button>
        </div>
      </div>
    </Container>
  );
}
