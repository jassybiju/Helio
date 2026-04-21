import { useQuery } from "@tanstack/react-query";
import { doctorScheduleService } from "../../../services/schedule.service";

export const useGetScheduleQuery = () => {
  return useQuery({
    queryKey: ["schedule"],
    queryFn: doctorScheduleService.getSchedule,
  });
};
