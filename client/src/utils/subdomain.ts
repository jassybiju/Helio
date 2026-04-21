export function getValidSubdomain(host: string): string {
  let subdomain: string | null = "";
  if (!host && typeof window !== "undefined") {
    host = window.location.host;
  }

  if (host && host.includes(".")) {
    const parts = host.split(".");
    if (parts.length > 2) {
      const candidate = parts[0];

      if (candidate && candidate !== "www") {
        subdomain = candidate;
      }
    }
  }
  console.log(subdomain);
  return subdomain!;
}
