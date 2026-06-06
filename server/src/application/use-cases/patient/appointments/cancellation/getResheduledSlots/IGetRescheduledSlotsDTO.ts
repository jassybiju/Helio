import type { SLOT_STATUS } from "@domain/common/enums/doctorShift.enum.ts";

export type IGetRescheduledSlotsDTO = {
  slots: Record<
    string,
    {
      clinic: {
        slots: { time: string; status: SLOT_STATUS }[];
        location: string;
      };
      online: { slots: { time: string; status: SLOT_STATUS }[] };
    }
  >;
  doctor: { name: string; specialty: string | null; id: string };
};
