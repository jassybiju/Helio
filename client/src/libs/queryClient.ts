import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export const invalidateQuery = (key: string) => {
  queryClient.invalidateQueries({ queryKey: [key] });
};
