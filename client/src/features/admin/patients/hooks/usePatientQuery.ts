import { useQuery } from "@tanstack/react-query"
import { adminPatientService } from "../../services/patient.service"

export type PatientQueryParams = {
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

export const usePatientQuery = (params  : PatientQueryParams ) => {
  return useQuery({
    queryKey : ['patients',params],
    queryFn :()=> adminPatientService.getPatients(params)
  })
}