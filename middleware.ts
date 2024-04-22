import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  //return NextResponse.redirect(new URL('/home', request.url))
  const pathname = request.nextUrl.pathname;

  const authtoken = request.cookies.get("authentication") || "";
  const public_route = ["/register", "/login"];
  if (public_route.includes(pathname) && authtoken) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }
  if (!public_route.includes(pathname) && !authtoken) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/:path"],
};
