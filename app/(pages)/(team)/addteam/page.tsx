import Container from "@/components/@common/container/Container";
import AddTeamForm from "@/components/team/add_team/AddTeamForm";

export default function AddTeamPage() {
  return (
    <Container background="lightBeige">
      <div className="mx-auto pt-[72px] tab:w-[460px] tab:pt-[100px] pc:pt-[140px]">
        <h1 className="2xl-medium mb-6 text-center text-default-light pc:4xl-medium tab:mb-20 pc:mb-10">
          팀 생성하기
        </h1>
        <AddTeamForm />
        <p className="lg-normal text-center text-default-light">
          팀 이름은 회사명이나 모임 이름 등으로 설정하면 좋아요.
        </p>
      </div>
    </Container>
  );
}
