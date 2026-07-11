import { useQuery } from "@tanstack/react-query";
import { adminDashboardService } from "../../services/dashboard.service";

export const useGetAdminDashboardQuery = () => useQuery({
    queryKey : ['dashboard'],
    queryFn : ()=>adminDashboardService.getDashboard('MONTH')
})