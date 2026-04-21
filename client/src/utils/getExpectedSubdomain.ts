export const getExpectedSubdomain = (role: string) => {
  if (role === "patient") return null;
  if (["admin", "doctor"].includes(role)) return role;
  return null;
};
