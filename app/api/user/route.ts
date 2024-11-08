import { NextRequest } from "next/server";

export async function DELETE(req: NextRequest) {
  req.cookies.delete("accessToken");
  req.cookies.delete("refreshToken");
  return new Response(null, { status: 204 });
}
