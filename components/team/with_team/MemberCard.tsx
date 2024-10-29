import Image from "next/image";

import { Button } from "@/@common/Button";
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
  ModalFooter,
} from "@/components/@common/modal/NewModal";
import { Member } from "@/dtos/GroupDtos";
import { useToast } from "@/hooks/useToast";
import Kebab from "@/public/svg/kebab.svg";

interface CardProps {
  member: Member;
}

function MemberDetailButton({ member }: CardProps) {
  const { toast } = useToast();

  const handleEmailCopyButtonClick = () => {
    navigator.clipboard.writeText(member.userEmail);

    (() => toast({ title: "클립보드에 복사되었습니다!" }))();
  };

  return (
    <Modal>
      <ModalTrigger className="h-6 w-6 shrink-0">
        <Kebab width="24" height="24" />
      </ModalTrigger>
      <ModalContent hasCrossCloseIcon>
        <ModalHeader>
          <Image
            width={52}
            height={52}
            className="mx-auto mb-6 aspect-square rounded-full object-cover"
            src={
              member.userImage
                ? member.userImage
                : "/images/team_page_default_user_pfp.png"
            }
            alt="유저 프로필 이미지"
          />
          <ModalTitle>{member.userName}</ModalTitle>
          <ModalDescription>{member.userEmail}</ModalDescription>
        </ModalHeader>
        <ModalFooter>
          <Button onClick={handleEmailCopyButtonClick}>이메일 복사하기</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export function MobileMemberCard({ member }: CardProps) {
  return (
    <div className="flex h-[68px] items-center justify-between rounded-2xl bg-brand-secondary-light px-6 py-3">
      <div className="min-w-0">
        <div className="mb-1 flex items-center gap-2">
          <Image
            width={24}
            height={24}
            className="aspect-square rounded-full object-cover"
            src={
              member.userImage
                ? member.userImage
                : "/images/team_page_default_user_pfp.png"
            }
            alt="유저 프로필 이미지"
          />
          <div className="md-medium truncate text-default-light">
            {member.userName}
          </div>
        </div>
        <div className="md-medium truncate text-subText">
          {member.userEmail}
        </div>
      </div>
      <MemberDetailButton member={member} />
    </div>
  );
}

export function PcMemberCard({ member }: CardProps) {
  return (
    <div className="flex h-[73px] items-center justify-between rounded-2xl bg-brand-secondary-light px-6 py-3">
      <div className="flex min-w-0 gap-3">
        <Image
          width={32}
          height={32}
          className="aspect-square rounded-full object-cover"
          src={
            member.userImage
              ? member.userImage
              : "/images/team_page_default_user_pfp.png"
          }
          alt="유저 프로필 이미지"
        />
        <div className="min-w-0">
          <div className="md-medium truncate text-default-light">
            {member.userName}
          </div>
          <div className="md-medium truncate text-subText">
            {member.userEmail}
          </div>
        </div>
      </div>
      <MemberDetailButton member={member} />
    </div>
  );
}
