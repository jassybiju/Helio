import { useInfiniteQuery } from "@tanstack/react-query";
import { apiRequest } from "../libs/axios.config";
import { HTTP_METHOD } from "../types/API.types";

export const useGetAllNotificationQuery = () =>
  useInfiniteQuery({
    queryKey: ["notification"],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => {
      return apiRequest<{
        notifications: {
          id: string;
          heading: string;
          message: string;
          isRead: boolean;
          createdAt: string;
        }[];
        hasMore: boolean;
      }>("/notification", HTTP_METHOD.GET, null, { page: pageParam, limit: 1 });
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.data.hasMore ? allPages.length + 1 : undefined;
    },
  });
