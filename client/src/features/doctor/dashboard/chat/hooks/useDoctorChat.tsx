"use client";

import { useDoctorGetChatListQuery } from "./useDoctorGetChatListQuery";
import { useDoctorGetChatQuery } from "./useDoctorGetChatQuery";
import { useDoctorSendMessageMutation } from "./useDoctorSendMessageMutation";
import { USER_ROLES } from "@/src/types/user.types";
import { useConsultationChatPage } from "@/src/features/shared/chat/hooks/useConsultationChatPage";

export const useDoctorChat = () => {
  return useConsultationChatPage({
    userType: USER_ROLES.DOCTOR,
    useChatListQuery: useDoctorGetChatListQuery,
    useChatQuery: useDoctorGetChatQuery,
    useSendMessageMutation: useDoctorSendMessageMutation,
  });
};
