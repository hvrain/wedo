import { MouseEvent } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

import { Button } from "@/@common/Button";
import ImageInput from "@/@common/ImageInput";
import {
  Modal,
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalHeader,
  ModalTitle,
} from "@/components/@common/modal/NewModal";
import FormProviderField from "@/components/auth/InputField";
import { useToast } from "@/hooks/useToast";
import { revalidateLayout } from "@/lib/revalidate";
import { useEditTeam } from "@/queries/group";

const teamEditSchema = z.object({
  teamImage: z.union([
    z.string().trim().min(1, {
      message: "이미지 URL이 올바르지 않습니다.",
    }),
    z.instanceof(File).refine((file) => file.size <= 10 * 1024 * 1024, {
      message: "이미지 파일의 크기는 10MB를 넘을 수 없습니다.",
    }),
  ]),
  teamName: z.string().max(30, { message: "팀 이름은 30자 이내입니다." }),
});

interface TeamEditModalProps {
  isOpen: boolean;
  toggleIsOpen: () => void;
  groupId: number;
  currentTeamImageUrl: string;
  currentTeamName: string;
}

interface UseFormInput {
  teamImage: string | File;
  teamName: string;
}

export default function TeamEditModal({
  isOpen,
  toggleIsOpen,
  groupId,
  currentTeamImageUrl,
  currentTeamName,
}: TeamEditModalProps) {
  const queryClient = useQueryClient();
  const form = useForm({
    mode: "onChange",
    resolver: zodResolver(teamEditSchema),
    defaultValues: {
      teamImage: currentTeamImageUrl,
      teamName: currentTeamName,
    },
  });
  const { toast } = useToast();
  const { mutate: editTeam } = useEditTeam();

  const handleOpenChange = () => {
    toggleIsOpen();

    if (!isOpen) {
      form.reset({ teamName: currentTeamName });
    }
  };

  const handleSubmitButtonClick = (e: MouseEvent) => {
    if (
      form.watch("teamName") === currentTeamName &&
      form.watch("teamImage") === currentTeamImageUrl
    ) {
      toast({
        title: "팀 정보가 이전과 동일합니다.",
        className: "bg-inverse [&_*]:text-danger",
      });
      e.preventDefault();
    }
    if (Object.keys(form.formState.errors).length !== 0) {
      e.preventDefault();
    }
  };

  const handleFormSubmit = (data: UseFormInput) => {
    editTeam(
      { groupId, image: data.teamImage, name: data.teamName },
      {
        onError: (error) => {
          toast({
            variant: "danger",
            title: "팀 정보 수정에 실패하였습니다.",
            description: error.message,
          });
        },
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["team", groupId] });
          revalidateLayout();
        },
      },
    );
  };

  return (
    <Modal open={isOpen} onOpenChange={handleOpenChange}>
      <ModalContent hasCrossCloseIcon>
        <ModalHeader>
          <ModalTitle>팀 정보</ModalTitle>
          <VisuallyHidden asChild>
            <ModalDescription>팀 이름과 이미지를 수정합니다.</ModalDescription>
          </VisuallyHidden>
        </ModalHeader>
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(handleFormSubmit)}
            className="flex flex-col gap-6"
          >
            <ImageInput
              name="teamImage"
              type="file"
              control={form.control}
              defaultPreview={currentTeamImageUrl}
            />
            <FormProviderField
              name="teamName"
              className="bg-input-default"
              placeholder="팀 이름을 작성해주세요."
            />
            <ModalClose asChild>
              <Button onClick={handleSubmitButtonClick} type="submit">
                수정 하기
              </Button>
            </ModalClose>
          </form>
        </FormProvider>
      </ModalContent>
    </Modal>
  );
}
