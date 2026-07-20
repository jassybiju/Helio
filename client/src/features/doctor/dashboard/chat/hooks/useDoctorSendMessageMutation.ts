import { useMutation } from "@tanstack/react-query";
import { doctorChatService } from "../../../services/chat.service";

export const useDoctorSendMessageMutation = (id: string | null) => {
  return useMutation({
    mutationFn: (message: string) => {
      if (!id) {
        throw new Error("NO Chat Selected");
      }
      return doctorChatService.sendMessage(id, message);
    },
  });
};
