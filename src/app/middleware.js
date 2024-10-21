import { NextResponse } from "next/server";
import { auth } from "./lib/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export async function middleware(req) {
  const auth = getAuth();
  let user;

  await new Promise((resolve) => {
    onAuthStateChanged(auth, (currentUser) => {
      user = currentUser;
      resolve();
    });
  });
  const protectedRoutes = ["/dashboard"];
  if (!user && protectedRoutes.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: ["/dashboard", "/another-protected-route"],
};
