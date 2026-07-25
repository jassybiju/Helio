import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { adminDashboardService } from "../../services/dashboard.service";

export const useGetAdminDashboardQuery = (filter : string) => useQuery({
    queryKey : ['dashboard',filter],
    placeholderData : keepPreviousData,
    queryFn : ()=>adminDashboardService.getDashboard(filter)
})