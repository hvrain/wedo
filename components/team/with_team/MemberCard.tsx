import Image from "next/image";

import { Button } from "@/@common/Button";
import Modal from "@/@common/modal/Modal";
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
    <button>
      <Modal
        trigger={<Kebab className="shrink-0" width="24" height="24" />}
        type="modal"
        footer={
          <Button className="flex-1" onClick={handleEmailCopyButtonClick}>
            이메일 복사하기
          </Button>
        }
        hasCrossCloseIcon
      >
        <div className="flex flex-col items-center justify-center gap-6">
          <Image
            width={52}
            height={52}
            src={
              member.userImage
                ? member.userImage
                : "/images/team_page_default_user_pfp.png"
            }
            alt="유저 프로필 이미지"
          />
          <div className="flex flex-col items-center justify-center gap-2">
            <h2 className="md-medium text-default-light">{member.userName}</h2>
            <div className="xs-normal text-default-light">
              {member.userEmail}
            </div>
          </div>
        </div>
      </Modal>
    </button>
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
            className="aspect-square rounded-full"
            objectFit="cover"
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
          className="aspect-square rounded-full"
          objectFit="cover"
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
