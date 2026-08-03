import { useQuery } from "@tanstack/react-query";
import { doctorConsultationService } from "../../../services/consultation.service";

export const useDoctorViewHistoryQuery = ({
  id,
  page,
  limit,
}: {
  id: string;
  page: number;
  limit: number;
}) => {
  return useQuery({
    queryKey: ["consultation-history", page, limit],
    queryFn: () => doctorConsultationService.viewHistory(id, page, limit),
  });
};
