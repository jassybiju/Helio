import { useQuery } from "@tanstack/react-query";
import { doctorDashboardService } from "../../../services/dashboard.service";

export const useDoctorDashboardQuery = (period : string) => {
  return useQuery({
    queryKey: ["dashboard",period],
    queryFn:()=>doctorDashboardService.getDashboard(period),
  });
};
