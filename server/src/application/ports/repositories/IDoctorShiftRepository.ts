import type { DAY_OF_WEEK } from "@domain/common/enums/doctorShift.enum.ts";
import type { DoctorShift } from "@domain/entities/DoctorShift.ts";

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
  findByDoctorAndDay(
    doctorId: string,
    day: DAY_OF_WEEK
  ): Promise<DoctorShift[]>;

  /**
   * Saves DoctorShift
   * @param shift Doctor Shift
   */
  save(shift: DoctorShift): Promise<void>;

  findByDoctor(doctorId: string): Promise<DoctorShift[]>;
}
