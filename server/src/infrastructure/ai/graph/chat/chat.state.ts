import type { CONSULTATION_TYPE } from "#domain/common/enums/doctorShift.enum.js";
import { Annotation, messagesStateReducer } from "@langchain/langgraph";
import type { BaseMessage } from "langchain";
export type DoctorOption = {
  id: string;
  name: string;
  specialty: string;
};

export type SlotOption = {
  time: string;
  type: string;
  status: string;
};
export const BookingState = Annotation.Root({
  messages: Annotation<BaseMessage[]>({
    reducer: messagesStateReducer,
    default: () => [],
  }),

  patientId: Annotation<string>({
    reducer: (_, value) => value,
    default: () => "",
  }),

  availableDoctors: Annotation<DoctorOption[]>({
    reducer: (_, value) => value,
    default: () => [],
  }),

  selectedDoctor: Annotation<DoctorOption | null>({
    reducer: (_, value) => value,
    default: () => null,
  }),

  doctorId: Annotation<string | null>({
    reducer: (_, value) => value,
    default: () => null,
  }),

  doctorName: Annotation<string | null>({
    reducer: (_, value) => value,
    default: () => null,
  }),

  consultationType: Annotation<CONSULTATION_TYPE | null>({
    reducer: (_, value) => value,
    default: () => null,
  }),

  dateTime: Annotation<string | null>({
    reducer: (_, value) => value,
    default: () => null,
  }),

  pendingConfirmation: Annotation<boolean>({
    reducer: (_, value) => value,
    default: () => false,
  }),
});
export type BookingStateType = typeof BookingState.State;
export type BookingStateUpdate = typeof BookingState.Update;
