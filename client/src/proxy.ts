import { NextRequest, NextResponse } from "next/server";
import { getValidSubdomain } from "./utils/subdomain";

const PUBLIC_FILE = /\.(.*)$/; // Files

export function proxy(req: NextRequest) {
  const url = req.nextUrl.clone();
  const allowed = ["doctor", "admin", 'www',''];
  
  if(PUBLIC_FILE.test(url.pathname) || url.pathname.includes('_next')) return
  
  const host = req.headers.get("host") || "";
  let subdomain = getValidSubdomain(host)

  // return new Response(`Host: ${host}, Subdomain: ${subdomain}`);
  if (!allowed.includes(subdomain)) {
    console.log(`Invalid subdomain ${subdomain}`)
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  if(subdomain === '') subdomain = 'patient'

  if(subdomain){
    console.log(`>>>>REWRITING : ${url.pathname} to /${subdomain}${url.pathname}`)
    url.pathname = `/${subdomain}${url.pathname}`
  }

  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/:path*"],
};
