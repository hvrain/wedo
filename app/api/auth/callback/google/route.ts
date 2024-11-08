import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { postSignInGoogle } from "@/apis/auth";

export async function GET(req: Request) {
  const TOKEN_ENDPOINT = "https://oauth2.googleapis.com/token";
  const newUrl = new URL(req.url as string);
  const code = newUrl.searchParams.get("code")!;
  const params = {
    code,
    client_id: process.env.GOOGLE_CLIENT_ID!,
    client_secret: process.env.GOOGLE_CLIENT_SECRET!,
    grant_type: "authorization_code",
    redirect_uri: process.env.GOOGLE_REDIRECT_URI!,
  };
  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "x-www-form-urlencoded",
    },
    body: JSON.stringify(params),
  });
  if (!response.ok) redirect("/login");
  const json = await response.json();
  const loginRes = await postSignInGoogle({ token: json.id_token });
  const cookieStore = cookies();
  cookieStore.set("accessToken", loginRes.accessToken);
  cookieStore.set("refreshToken", loginRes.refreshToken);
  redirect("/");
}
