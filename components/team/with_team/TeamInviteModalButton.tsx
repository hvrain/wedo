import { MouseEvent } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import z from "zod";

import { Button } from "@/@common/Button";
import {
  Modal,
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from "@/components/@common/modal/NewModal";
import FormProviderField from "@/components/auth/InputField";
import { useToast } from "@/hooks/useToast";
import {
  useInviteMemberWithEmail,
  useGenerateInviteToken,
} from "@/queries/group";

const emailSchema = z.object({
  email: z.string().email({ message: "이메일 형식이 올바르지 않습니다." }),
});

interface TeamInviteModalButtonProps {
  groupId: number;
}

interface UseFormInput {
  email: string;
}

export default function TeamInviteModalButton({
  groupId,
}: TeamInviteModalButtonProps) {
  const queryClient = useQueryClient();
  const form = useForm<UseFormInput>({
    mode: "onChange",
    resolver: zodResolver(emailSchema),
    defaultValues: { email: "" },
  });
  const { toast } = useToast();
  const { mutate: inviteMemberWithEmail } = useInviteMemberWithEmail();

  // Submit Button Click 핸들러
  // input value의 유효성 검사 이후에 문제가 있으면 모달이 닫히지 않고 api 요청을 하지 않도록 함
  // 최초 렌더링 시에만 별도로 수동 에러를 발생 (onChange 이전)
  const handleSubmitButtonClick = (e: MouseEvent) => {
    if (form.watch("email") === "") {
      form.setError("email", {
        type: "invalid_string",
        message: "이메일 형식이 올바르지 않습니다.",
      });
    }
    if (Object.keys(form.formState.errors).length !== 0) {
      e.preventDefault();
    }
  };

  // Form Submit 핸들러, 서버 에러의 경우에는 토스트를 통해서 에러 메세지를 전달
  const handleFormSubmit = (data: UseFormInput) => {
    inviteMemberWithEmail(
      { groupId, email: data.email },
      {
        onError: (error) => {
          toast({
            title: error.message,
            className: "bg-inverse [&_*]:text-danger",
          });
        },
        onSuccess: () => {
          (() => toast({ title: "초대에 성공하였습니다." }))();
          queryClient.invalidateQueries({ queryKey: ["team", groupId] });
        },
      },
    );
  };

  // 초대 링크 복사 버튼 핸들러
  const { data: inviteToken } = useGenerateInviteToken(groupId);

  const handleInviteTokenCopyButton = () => {
    toast({ title: "초대 링크를 복사하였습니다." });

    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_DEPLOY_URL}/jointeam?invite=${inviteToken}`,
    );
  };

  return (
    <Modal>
      <ModalTrigger
        onClick={() => form.reset()}
        className="md-medium text-brand-active"
      >
        + 새로운 멤버 초대하기
      </ModalTrigger>
      <ModalContent hasCrossCloseIcon>
        <ModalHeader>
          <ModalTitle>멤버 초대</ModalTitle>
          <ModalDescription>
            초대 받을 유저의 email을 입력합니다.
            <br />
            또는 그룹에 참여할 수 있는 링크를 복사합니다.
          </ModalDescription>
        </ModalHeader>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)}>
            <FormProviderField
              name="email"
              type="email"
              className="bg-input-default"
              placeholder="초대할 유저의 이메일을 입력해주세요."
            />
            <div className="mt-6 flex w-full flex-col gap-2">
              <ModalClose onClick={handleSubmitButtonClick} asChild>
                <Button className="w-full" type="submit">
                  이메일로 초대하기
                </Button>
              </ModalClose>
              <ModalClose asChild>
                <Button
                  onClick={handleInviteTokenCopyButton}
                  className="w-full"
                  type="button"
                  variant="outline"
                >
                  링크 복사하기
                </Button>
              </ModalClose>
            </div>
          </form>
        </FormProvider>
      </ModalContent>
    </Modal>
  );
}
