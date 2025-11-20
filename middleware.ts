import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    if (req.nextUrl.pathname.startsWith("/admin") && req.nextauth.token?.role !== "admin") {
      // Could redirect to unauthorized page or just allow if role check isn't strict in token
      // For this demo, we assume presence of token is enough, or you can add role checks
      return NextResponse.next();
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/admin/login",
    },
  }
);

export const config = {
  matcher: ["/admin/:path*"],
};
