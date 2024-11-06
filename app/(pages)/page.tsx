import { cookies } from "next/headers";

import LandingPage from "@/components/landing/LandingPage";

export default async function Page() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken");
  const isLoggedIn = !!accessToken?.value;
  return <LandingPage isLoggedIn={isLoggedIn} />;
}
