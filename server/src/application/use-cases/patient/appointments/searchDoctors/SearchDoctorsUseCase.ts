import type {
  ISearchDoctorsInput,
  ISearchDoctorUseCase,
} from "@application/ports/use-cases/patient/appointments/ISearchDoctorUseCase.ts";
import type { ISearchDoctorsDTO } from "./ISearchDoctorDTO.ts";
import type { ILogger } from "@application/ports/services/ILogger.ts";
import type { IDoctorShiftRepository } from "@application/ports/repositories/IDoctorShiftRepository.ts";
import type { IDoctorRepository } from "@application/ports/repositories/IDoctorRepository.ts";
import type { ISlotGenerator } from "@application/ports/services/ISlotGenerator.ts";

export class SearchDoctorsUseCase implements ISearchDoctorUseCase {
  constructor(
    private readonly _logger: ILogger,
    private readonly _shiftRepo: IDoctorShiftRepository,
    private readonly _doctorRepo: IDoctorRepository,
    private readonly _slotGen: ISlotGenerator
  ) {}

  async execute(
    input: ISearchDoctorsInput
  ): Promise<{ data: ISearchDoctorsDTO[] }> {
    this._logger.info("Search Doctors started", input);

    // get all doctors based on query (name , speciality, doctorFee , experience)
    const { doctors } = await this._doctorRepo.search(input);

    if (!doctors.length) return { data: [] };

    const doctorIds = doctors.map((doc) => doc.id);
    const shifts = await this._shiftRepo.findByDoctorIds(doctorIds);

    const filteredShifts = shifts.filter((shift) => {
      if (
        input.consultationType &&
        input.consultationType !== shift.consultationType
      ) {
        return false;
      }
      return true;
    });
    let fromDate = input.date;

    if (!fromDate) {
      fromDate = new Date();
    }

    const slots = this._slotGen.generateNextAvailableSlot(
      filteredShifts,
      fromDate
    );

    return {
      data: slots.map((s) => {
        const doctor = doctors.find((doc) => doc.id == s.doctorId)!;
        return {
          doctorId: s.doctorId,
          name: doctor.fullName,
          specialization: doctor.specialization,
          experienceYears: doctor.yearsOfExperience,
          fees: { clinic: doctor?.clinicFee, online: doctor?.onlineFee },
          consultationType: s.consultationType,
          location: s.location ?? null,
          nextAvailableSlot: s.startTime,
        };
      }),
    };
  }
}
