import { useMutation } from "@tanstack/react-query";
import { patientChatService } from "../../../services/chat.service";

export const usePatientSendMessageMutation = (id: string | null) => {
  return useMutation({
    mutationFn: (message: string) => {
      if (!id) {
        throw new Error("NO Chat Selected");
      }
      return patientChatService.sendMessage(id, message);
    },
  });
};
