"use client";

import { ChangeEvent, FormEvent, useState } from "react";

import { useRouter } from "next/navigation";

import { Button } from "@/components/@common/Button";
import { useToast } from "@/hooks/useToast";
import { revalidateLayout } from "@/lib/revalidate";
import { useAddTeam } from "@/queries/group";

import TeamImageInput from "./TeamImageInput";
import TeamNameInput from "./TeamNameInput";

export default function AddTeamForm() {
  const [currentImageFile, setCurrentImageFile] = useState<File | null>(null);
  const [teamName, setTeamName] = useState("");
  const [errorMessage, setErrorMessage] = useState({ image: "", name: "" });

  const { mutate: addTeam } = useAddTeam();

  const { toast } = useToast();
  const router = useRouter();

  // image file input 변경시 동작
  // 1. image file을 변경시에 에러메세지를 제거
  // 2. image file이 있는지 확인하고 있으면 currentImageFile state를 변경
  const handleTeamImageInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (errorMessage.image) {
      setErrorMessage((prevErrorMessage) => ({
        ...prevErrorMessage,
        image: "",
      }));
    }

    const currentImageFiles = e.target.files;
    if (!currentImageFiles) return;

    setCurrentImageFile(currentImageFiles[0]);
  };

  // team name input이 변경시에 동작, teamName state를 변경하고 error message를 초기화
  const handleTeamNameInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTeamName(e.target.value);

    if (errorMessage.name) {
      setErrorMessage((prevErrorMessage) => ({
        ...prevErrorMessage,
        name: "",
      }));
    }
  };

  // submit 동작시에 실행
  // 1. currentImageFile이나 teamName이 없다면 경고 띄움 (api 요청 안함)
  // 2. api 요청 후 발생하는 에러에 따라서 input의 error message를 변경
  // 3. 성공시에는 토스트를 띄우고 생성한 팀 페이지로 이동
  const handleTeamSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!currentImageFile || !teamName) {
      if (!currentImageFile) {
        setErrorMessage((prevErrorMessage) => ({
          ...prevErrorMessage,
          image: "프로필 이미지를 넣어주세요.",
        }));
      }
      if (!teamName) {
        setErrorMessage((prevErrorMessage) => ({
          ...prevErrorMessage,
          name: "팀 이름을 입력해주세요.",
        }));
      }
      return;
    }

    // name 때문에 발생하는 에러인지, image 때문에 발생하는 에러인지 어떻게 분기하는게 좋을지 고민중
    addTeam(
      { image: currentImageFile, name: teamName },
      {
        onError: (error) => {
          if (
            error.message === "이미지 파일의 용량이 10MB를 넘을 수 없습니다."
          ) {
            setErrorMessage((prevErrorMessage) => ({
              ...prevErrorMessage,
              image: error.message,
            }));
          } else {
            setErrorMessage((prevErrorMessage) => ({
              ...prevErrorMessage,
              name: error.message,
            }));
          }
        },
        onSuccess: (response) => {
          (() => toast({ title: "팀 생성에 성공했습니다!" }))();

          const { id: teamId } = response;
          revalidateLayout();
          router.push(`/${teamId}`);
        },
      },
    );
  };

  return (
    <form onSubmit={handleTeamSubmit}>
      <TeamImageInput
        onChange={handleTeamImageInputChange}
        currentImageFile={currentImageFile}
        errorMessage={errorMessage.image}
      />
      <TeamNameInput
        onChange={handleTeamNameInputChange}
        value={teamName}
        errorMessage={errorMessage.name}
      />
      <Button className="mb-6 mt-6 w-full" type="submit">
        생성하기
      </Button>
    </form>
  );
}
