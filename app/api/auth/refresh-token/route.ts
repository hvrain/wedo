import { cookies } from "next/headers";
import { NextRequest } from "next/server";

const AUTH_BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/8-7`;

export async function POST(req: NextRequest) {
  const { refreshToken } = await req.json();
  const response = await fetch(`${AUTH_BASE_URL}/auth/refresh-token`, {
    method: "POST",
    body: JSON.stringify({ refreshToken }),
    headers: {
      "Content-Type": "application/json",
    },
    next: { revalidate: 0 },
  });
  const { accessToken }: { accessToken: string } = await response.json();
  const cookieStore = await cookies();
  cookieStore.set("accessToken", accessToken);
  return Response.json({ accessToken }, { status: 201 });
}
