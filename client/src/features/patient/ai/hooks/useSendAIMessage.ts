import { useMutation } from "@tanstack/react-query";
import { patientAiService } from "../../services/ai.service";

export const useSendAIMessage = () => {
  return useMutation({
    mutationFn: patientAiService.chat,
    onError: (error) => {
      console.error("AI chat error:", error);
    },
  });
};
