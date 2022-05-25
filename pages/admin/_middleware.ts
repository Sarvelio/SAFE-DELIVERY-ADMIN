import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest | any, ev: NextFetchEvent) {
  const url = req.nextUrl.clone();
  url.pathname = "/";

  const session: any = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  if (session && session?.user?.rol == "administrador") {
    return NextResponse.next();
  }
  return NextResponse.redirect(url);
}
