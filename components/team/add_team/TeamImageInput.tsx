import { ChangeEvent, useEffect, useState } from "react";

import Image from "next/image";

interface TeamImageInputProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  currentImageFile: File | null;
  errorMessage: string;
}

export default function TeamImageInput({
  onChange,
  currentImageFile,
  errorMessage,
}: TeamImageInputProps) {
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // preview image url을 생성하고 preview image state를 set
  useEffect(() => {
    if (!currentImageFile) {
      setPreviewImage(null);
      return;
    }

    const previewImageUrl = URL.createObjectURL(currentImageFile);
    setPreviewImage(previewImageUrl);

    return () => URL.revokeObjectURL(previewImageUrl);
  }, [currentImageFile]);

  return (
    <>
      <div className="pc:text-center">
        <label
          htmlFor="teamImage"
          className="mb-6 inline-block cursor-pointer pc:mx-auto"
        >
          <h3 className="lg-medium text-default-light pc:hidden">팀 프로필</h3>
          <div className="relative mt-3 h-[64px] w-[64px] pc:mx-auto pc:h-[147px] pc:w-[147px]">
            {previewImage ? (
              <>
                <Image
                  fill
                  className="rounded-full border-2 border-solid border-[#acacac] object-cover pc:border-[5px]"
                  src={previewImage}
                  alt="프리뷰 이미지"
                />
                <div className="absolute bottom-0 right-0 z-10 h-[18px] w-[18px] pc:h-[47px] pc:w-[47px]">
                  <Image
                    fill
                    src="/images/team_pfp_preview_edit.png"
                    alt="팀 이미지 수정"
                  />
                </div>
              </>
            ) : (
              <Image
                fill
                src="/images/team_pfp_register.png"
                alt="팀 이미지 등록"
              />
            )}
          </div>
          {errorMessage && (
            <p className="md-medium mt-3 text-danger">{errorMessage}</p>
          )}
        </label>
      </div>
      <input
        id="teamImage"
        type="file"
        accept="image/*"
        onChange={onChange}
        className="hidden"
      />
    </>
  );
}
