import type { SLOT_STATUS } from "#domain/common/enums/doctorShift.enum.js";
export type IGetSlotDTO = Record<string, {
    clinic: {
        slots: {
            time: string;
            status: SLOT_STATUS;
        }[];
        location: string;
    };
    online: {
        slots: {
            time: string;
            status: SLOT_STATUS;
        }[];
    };
}>;
//# sourceMappingURL=IGetSlotDTO.d.ts.map