import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import Container from "@/@common/container/Container";
import { postArticle } from "@/apis/article";
import { uploadImage } from "@/apis/image";
import { Button } from "@/components/@common/Button";
import Input from "@/components/@common/Input";
import Textarea from "@/components/@common/Textarea";
import ImagePreviewInput from "@/components/board/ImagePreviewInput";

export default function AddBoard() {
  async function addArticle(formData: FormData) {
    "use server";

    const req: {
      title: string;
      content: string;
      image?: string;
    } = {
      title: formData.get("title") as string,
      content: formData.get("content") as string,
    };

    const image = formData.get("image") as File;

    if (image.size) {
      const { url } = await uploadImage(image);
      req.image = url;
    }

    const data = await postArticle(req);
    revalidatePath("/", "layout");
    redirect(`/board/${data.id}`);
  }

  return (
    <Container background="white" className="pb-8 pt-10 tab:pt-14">
      <form action={addArticle} className="relative flex flex-col gap-y-10">
        <fieldset className="flex flex-col gap-y-6 tab:gap-y-8 pc:gap-y-10">
          <legend className="2lg-medium flex h-8 items-center tab:xl-bold tab:h-12">
            게시글 쓰기
          </legend>

          <hr className="mt-6 tab:mt-8 pc:mt-10" />

          <label htmlFor="addboardTitleInput" className="flex flex-col gap-y-4">
            <p className="md-medium tab:lg-medium">
              <strong className="text-brand-tertiary">*</strong> 제목
            </p>

            <Input
              id="addboardTitleInput"
              type="text"
              name="title"
              Padding="lg"
              placeholder="제목을 입력해주세요."
              required
              autoFocus
            />
          </label>

          <label
            htmlFor="addboardContentTextarea"
            className="flex flex-col gap-y-4"
          >
            <p className="md-medium tab:lg-medium">
              <strong className="text-brand-tertiary">*</strong> 내용
            </p>

            <Textarea
              id="addboardContentTextarea"
              name="content"
              BoxSize="lg"
              Padding="lg"
              placeholder="내용을 입력해주세요."
              required
            />
          </label>

          <ImagePreviewInput />
        </fieldset>

        <Button
          type="submit"
          className="w-full max-tab:md-semibold tab:absolute tab:right-0 tab:top-0 tab:w-48"
        >
          등록
        </Button>
      </form>
    </Container>
  );
}
