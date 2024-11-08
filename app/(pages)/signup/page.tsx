import Container from "@/@common/container/Container";
import SignUpForm from "@/components/auth/signup/SignUpForm";

export default function SignUpPage() {
  return (
    <Container background="lightBeige">
      <div className="mx-auto mt-6 flex max-w-[460px] flex-col items-center justify-center pb-20 tab:mt-[100px] pc:mt-[140px]">
        <h1 className="2xl-medium pc:4xl-medium">회원가입</h1>
        <SignUpForm />
        <div className="mt-[60px] flex w-full flex-col items-center gap-4" />
      </div>
    </Container>
  );
}
