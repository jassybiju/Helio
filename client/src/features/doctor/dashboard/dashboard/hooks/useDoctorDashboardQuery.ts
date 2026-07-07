import { useQuery } from "@tanstack/react-query";
import { doctorDashboardService } from "../../../services/dashboard.service";

export const useDoctorDashboardQuery = () => {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: doctorDashboardService.getDashboard,
  });
};
