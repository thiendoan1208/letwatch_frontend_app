import { NextResponse, NextRequest } from "next/server";
import { jwtVerify } from "jose";

// const privatePath = [];
const authPath = ["/sign-in", "/sign-up", "/recover"];
const privatePath = ["/watch/danh-sach-xem"];
const adminPath = ["/admin"];

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

async function verify(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (error) {
    console.log(error);
    return null;
  }
}

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("access_token")?.value;
  const recoverEmail = request.cookies.get("recover-email")?.value;

  if (authPath.some((path) => path === pathname) && accessToken) {
    return NextResponse.redirect(new URL("/watch/trang-chu", request.url));
  }

  if (privatePath.some((path) => path === pathname) && !accessToken) {
    return NextResponse.redirect(new URL("/watch/trang-chu", request.url));
  }

  if (pathname === "/recover" && !recoverEmail && !accessToken) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (adminPath.some((path) => pathname.startsWith(path))) {
    if (!accessToken) {
      return NextResponse.redirect(new URL("/watch/trang-chu", request.url));
    }

    const data = await verify(accessToken);
    if (
      data &&
      data.email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL &&
      data.role !== 2
    ) {
      return NextResponse.redirect(new URL("/watch/trang-chu", request.url));
    }
  }
}

export const config = {
  matcher: [
    "/sign-in",
    "/sign-up",
    "/recover",
    "/watch/danh-sach-xem",
    "/admin/:path*",
  ],
};
