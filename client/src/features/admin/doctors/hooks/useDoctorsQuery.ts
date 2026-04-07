import { useQuery } from "@tanstack/react-query"
import { adminDoctorService } from "../../services/doctor.service"

export type DoctorQueryParams = {
  search?: string | null; 
  isBlocked?: boolean | null;
  isVerified?: boolean | null;
  createdFrom?: Date | null;
  createdTo?: Date | null;
  page?: number | null;
  limit?: number | null;
  sortBy?: "createdAt" | "firstName" | null; 
  order?: "asc" | "desc" | null;
};

export const useDoctorsQuery = (params  : DoctorQueryParams ) => {
  return useQuery({
    queryKey : ['doctors',params],
    queryFn :()=> adminDoctorService.getDoctors(params)
  })
}