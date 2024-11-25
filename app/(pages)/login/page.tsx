import Container from "@/@common/container/Container";
import LoginForm from "@/components/auth/login/LoginForm";
import OAuthLink from "@/components/auth/login/OAuthLink";
import GoogleIcon from "@/public/images/google.png";
import KakaoIcon from "@/public/images/kakao.png";

const GOOGLE_OAUTH_PARAMS = {
  client_id: process.env.GOOGLE_CLIENT_ID!,
  redirect_uri: process.env.GOOGLE_REDIRECT_URI!,
  response_type: "code",
  scope: "openid profile email",
};

const KAKAO_OAUTH_PARAMS = {
  client_id: process.env.KAKAO_CLIENT_ID!,
  redirect_uri: process.env.KAKAO_REDIRECT_URI!,
  response_type: "code",
  scope: "openid,profile_image,profile_nickname",
};

export default function LoginPage() {
  const google = new URLSearchParams(GOOGLE_OAUTH_PARAMS);
  const kakao = new URLSearchParams(KAKAO_OAUTH_PARAMS);

  return (
    <Container background="lightBeige">
      <div className="mx-auto mt-6 flex max-w-[460px] flex-col items-center justify-center pb-20 tab:mt-[100px] pc:mt-[140px]">
        <h1 className="2xl-medium pc:4xl-medium">로그인</h1>
        <LoginForm />
        <div className="mt-[60px] flex w-full flex-col items-center gap-4">
          <OAuthLink
            alt="구글 로그인"
            icon={GoogleIcon}
            href={`https://accounts.google.com/o/oauth2/v2/auth?${google}`}
          >
            Google 계정으로 로그인
          </OAuthLink>
          <OAuthLink
            alt="카카오 로그인"
            icon={KakaoIcon}
            href={`https://kauth.kakao.com/oauth/authorize?${kakao}`}
          >
            카카오 계정으로 로그인
          </OAuthLink>
        </div>
      </div>
    </Container>
  );
}
