import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { patientSearchService } from "../../services/search.service";

export type SearchDoctorsQueryParams = {
  name?: string;
  specialization?: string;
  location?: string;
  consultationType?: "ONLINE" | "CLINIC";
  minFee?: number;
  maxFee?: number;
  experienceYears?: number;
  date?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
};

export const usePatientSearchDoctor = (params: SearchDoctorsQueryParams) => {
  return useQuery({
    queryKey: ["searchDoctors", params],
    queryFn: () => patientSearchService.search(params),
    placeholderData : keepPreviousData,
    staleTime: 1000 * 60 * 2,
  });
};
