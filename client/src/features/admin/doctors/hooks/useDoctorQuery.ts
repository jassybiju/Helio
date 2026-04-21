import { useQuery } from "@tanstack/react-query";
import { adminDoctorService } from "../../services/doctor.service";

export const useDoctorQuery = (id: string) => {
  return useQuery({
    queryKey: ["doctors", id],
    queryFn: () => adminDoctorService.getDoctor(id),
  });
};
