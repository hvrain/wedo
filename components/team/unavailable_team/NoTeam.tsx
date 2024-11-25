import Link from "next/link";

import { Button } from "@/@common/Button";
import Container from "@/components/@common/container/Container";

import UnavailableImage from "./UnavailableImage";

export default function NoTeam() {
  return (
    <Container background="lightBeige">
      <div className="pb-[100px] pt-[186px] tab:pt-[272px] pc:pt-[212px]">
        <UnavailableImage />
        <div className="lg-medium mb-12 mt-12 flex flex-col gap-1 text-center text-default-dark tab:mb-20">
          <p>아직 소속된 팀이 없습니다</p>
          <p>팀을 생성하거나 팀에 참여해보세요.</p>
        </div>
        <div className="mx-auto flex w-[186px] flex-col gap-4">
          <Button asChild>
            <Link href="/addteam">팀 생성하기</Link>
          </Button>
          <Button asChild variant="outline" className="border-2">
            <Link href="/jointeam">팀 참여하기</Link>
          </Button>
        </div>
      </div>
    </Container>
  );
}
