import { NextRequest, NextResponse } from "next/server";
import { getValidSubdomain } from "./utils/subdomain";

const PUBLIC_FILE = /\.(.*)$/; // Files

export function proxy(req: NextRequest) {
  const url = req.nextUrl.clone();
  const allowed = ["doctor", "admin", "www", ""];
  const host = req.headers.get("host") || "";

  // HANDLES REDIRECTION BASED ON SUBDOMAIN
  if (PUBLIC_FILE.test(url.pathname) || url.pathname.includes("_next")) return;

  let subdomain = getValidSubdomain(host);

  // return new Response(`Host: ${host}, Subdomain: ${subdomain}`);
  if (!allowed.includes(subdomain)) {
    console.log(`Invalid subdomain ${subdomain}, ${host}`);
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  console.log(subdomain, host);
  if (subdomain === "") subdomain = "patient";

  // redirecting path based on subdomain
  if (subdomain) {
    console.log(
      `>>>>REWRITING : ${url.pathname} to /${subdomain}${url.pathname}`,
    );
    url.pathname = `/${subdomain}${url.pathname}`;
  }
  console.log(url)
  if (url.pathname.startsWith("/")) return NextResponse.rewrite(url);
  console.log(123)
}

export const config = {
  matcher: ["/:path*"],
};
