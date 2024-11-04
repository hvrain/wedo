import { cookies } from "next/headers";

import AuthHeader from "./AuthHeader";
import UnAuthHeader from "./UnAuthHeader";

export default async function HeaderLayout() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken");

  return (
    <header className="fixed top-0 z-40 w-screen bg-brand-header">
      <div className="lg-medium relative mx-auto flex h-[60px] w-full max-w-[1440px] items-center justify-between px-4 tab:px-6">
        {accessToken?.value ? <AuthHeader /> : <UnAuthHeader />}
      </div>
    </header>
  );
}
