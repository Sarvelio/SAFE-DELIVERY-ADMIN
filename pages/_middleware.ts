import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest | any, ev: NextFetchEvent) {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { origin } = req.nextUrl;

  if (req.page.name !== "/login" && !session) {
    return NextResponse.redirect(`${origin}/login`);
  }

  return NextResponse.next();
}
