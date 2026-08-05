import type { NextFunction, Request, Response } from "express";
import type { IGetDoctorWeeklySlotsUseCase } from "#application/ports/use-cases/doctor/slot/IGetDoctorWeeklySlotsUseCase.js";
import type { IBlockDoctorSlotUseCase } from "#application/ports/use-cases/doctor/slot/IBlockDoctorSlotUseCase.js";
import type { IGetDoctorBlockSlotUseCase } from "#application/ports/use-cases/doctor/slot/IGetDoctorBlockSlotUseCase.js";
import type { IDeleteDoctorBlockSlotUseCase } from "#application/ports/use-cases/doctor/slot/IDeleteDoctorBlockSlotUseCase.js";
export declare class DoctorSlotController {
    private readonly _getSlots;
    private readonly _blockSlot;
    private readonly _getBlockSlot;
    private readonly _deleteblockSlot;
    constructor(_getSlots: IGetDoctorWeeklySlotsUseCase, _blockSlot: IBlockDoctorSlotUseCase, _getBlockSlot: IGetDoctorBlockSlotUseCase, _deleteblockSlot: IDeleteDoctorBlockSlotUseCase);
    deleteBlock: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
    getSlots: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
    blockSlots: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
    getBlockSlot: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
}
//# sourceMappingURL=slot.controller.d.ts.map