import { apiRequest } from "@/src/libs/axios.config";
import { APIResponse, HTTP_METHOD } from "@/src/types/API.types";
import { useQuery } from "@tanstack/react-query";

export const useSpecialtyQuery = ({ page }: { page: number }) => {
  return useQuery({
    queryKey: ["specialty", { page }],
    queryFn: () =>
      apiRequest("/admin/specialty/", HTTP_METHOD.GET, null, {
        page,
      }) as Promise<
        APIResponse<{
          specialty: {
            _id: string;
            label: string;
            value: string;
          }[];
          count: number;
        }>
      >,
  });
};
