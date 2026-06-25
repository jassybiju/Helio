"use client";

import { useState } from "react";
import { useDoctorGetChatListQuery } from "./useDoctorGetChatListQuery";
import { useDoctorGetChatQuery } from "./useDoctorGetChatQuery";
import { useDoctorSendMessageMutation } from "./useDoctorSendMessageMutation";
import { useConsultationChat } from "@/src/features/shared/chat/hooks/useConsultationChat";
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
