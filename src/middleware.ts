import { NextResponse, NextRequest } from "next/server";

// const privatePath = [];
const authPath = ["/sign-in", "/sign-up", "/recover"];
const privatePath = ["/watch/watchlist"];

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("access_token")?.value;

  if (authPath.some((path) => path === pathname) && accessToken) {
    return NextResponse.redirect(new URL("/watch/trang-chu", request.url));
  }

  if (privatePath.some((path) => path === pathname) && !accessToken) {
    return NextResponse.redirect(new URL("/watch/trang-chu", request.url));
  }
}

export const config = {
  matcher: ["/sign-in", "/sign-up", "/recover", "/watch/watchlist"],
};
