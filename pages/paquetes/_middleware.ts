import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { TYPE_ROLES } from "../../utils";

export async function middleware(req: NextRequest | any, ev: NextFetchEvent) {
  const url = req.nextUrl.clone();
  url.pathname = "/";

  const session: any = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  if (session && session?.user?.rol == TYPE_ROLES.oficinista) {
    return NextResponse.next();
  }
  return NextResponse.redirect(url);
}
