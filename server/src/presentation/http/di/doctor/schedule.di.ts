import { SetDoctorScheduleUseCase } from "@application/use-cases/doctor/schedule/SetDoctorScheduleUseCase.ts";
import { DoctorScheduleController } from "../../controllers/doctor/schedule.controller.ts";
import { PinoLoggerService } from "@infrastructure/services/PinoLoggerService.ts";
import { DoctorShiftRepository } from "@infrastructure/database/repositories/DoctorShiftRepository.ts";
import { NanoidGenerator } from "@infrastructure/services/NanoidGenerator.ts";
import { MongoDoctorRepository } from "@infrastructure/database/repositories/MongoDoctorRepository.ts";
import { SlotGenerator } from "@application/service/SlotGenerator.ts";
import { GetDoctorScheduleUseCase } from "@application/use-cases/doctor/schedule/getDoctorSchedule/GetDoctorScheduleUseCase.ts";

const loggerService = new PinoLoggerService();
const idGenerator = new NanoidGenerator();

const doctorRepo = new MongoDoctorRepository(loggerService);
const doctorShiftRepo = new DoctorShiftRepository(loggerService);

const setScheduleUseCase = new SetDoctorScheduleUseCase(
  loggerService,
  doctorShiftRepo,
  idGenerator,
  doctorRepo,
  new SlotGenerator(idGenerator)
);
const getDoctorScheduleUseCase = new GetDoctorScheduleUseCase(
  loggerService,
  doctorShiftRepo
);
export const doctorScheduleController = new DoctorScheduleController(
  setScheduleUseCase,
  getDoctorScheduleUseCase
);
