export const getSubdomain = () => {
  if (typeof window === "undefined") return null;

  const host = window.location.hostname;

  const parts = host.split(".");
  return parts.length > 2 ? parts[0] : null;
};
