import type { DAY_OF_WEEK } from "#domain/common/enums/doctorShift.enum.js";
import type { DoctorShift } from "#domain/entities/DoctorShift.js";
import type { ClientSession } from "mongoose";
export interface IDoctorShiftRepository {
    /**
     * Finds and returns DoctorShift or null by id
     * @param id DoctorShift Id
     */
    findById(id: string): Promise<DoctorShift | null>;
    /**
     * Returns all the shift of the doctor in a particular day
     * @param doctorId Doctor Id
     * @param day Day of a week instance of DAY_OF_WEEk
     */
    findAllByDoctorAndDay(doctorId: string, day: DAY_OF_WEEK): Promise<DoctorShift[]>;
    /**
     * Find all shift of doctor by id
     * @param id Doctor Id
     */
    findAllByDoctorId(id: string): Promise<DoctorShift[]>;
    /**
     * creates DoctorShift
     * @param shift Doctor Shift
     */
    create(shift: DoctorShift): Promise<void>;
    /**
     * updates DoctorShift
     * @param shift Doctor Shift
     */
    update(shift: DoctorShift): Promise<void>;
    findByDoctor(doctorId: string): Promise<DoctorShift[]>;
    /**
     * Deletes the shift having the shiftId
     * @param shiftId Shift Id string
     */
    delete(shiftId: string): Promise<void>;
    withSession(session: ClientSession): IDoctorShiftRepository;
    findByDoctorIds(doctorIds: string[]): Promise<DoctorShift[]>;
    bulkInsert(shifts: DoctorShift[]): Promise<void>;
}
//# sourceMappingURL=IDoctorShiftRepository.d.ts.map