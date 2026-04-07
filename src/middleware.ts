import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { HttpCodes } from "@/http-codes";
import { validateAuthKey } from "@/domain/auth-keys/auth-keys";
import { logger } from "@/logging";

export async function middleware(request: NextRequest) {
  logger.info(`Received auth request at endpoint ${request.nextUrl.pathname}`);

  const reqKey = request.headers.get("Authorization");
  const unauthResp = new NextResponse(null, {
    status: HttpCodes.unauthorized,
    headers: { "WWW-Authenticate": "key" },
  });

  if (reqKey === null) {
    return unauthResp;
  }

  const authRes = await validateAuthKey(reqKey);

  if (!authRes) {
    return unauthResp;
  }
}

export const config = {
  runtime: "nodejs",
  matcher: "/api/upload/:path*",
};
