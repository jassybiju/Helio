import { apiRequest } from "@/src/libs/axios.config";
import { APIResponse, HTTP_METHOD } from "@/src/types/API.types";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useCreateAppointment = () => {
  return useMutation({
    mutationFn: async (data: {
      doctorId: string;
      startTime: string;
      consultationType: "ONLINE" | "CLINIC";
    }) => {
      const res = await (apiRequest("/patient/appointment",HTTP_METHOD.POST, data) as Promise<APIResponse<{appointmentId : string}>>);
      return res.data;
    },
  });
};