import { DoctorSlotController } from "../../controllers/doctor/slot.controller.ts";
import { PinoLoggerService } from "@infrastructure/services/PinoLoggerService.ts";
import { MongoDoctorRepository } from "@infrastructure/database/repositories/MongoDoctorRepository.ts";
import { DoctorSlotRepository } from "@infrastructure/database/repositories/DoctorSlotRepository.ts";
import { GetDoctorWeeklySlotsUsecase } from "@application/use-cases/doctor/slot/getDoctorSlots/GetDoctorWeeklySlotsUseCase.ts";
import { GenerateFutureSlotsUseCase } from "@application/use-cases/doctor/slot/generateFutureSlots/GenerateFutureSlotsUseCase.ts";
import { DoctorShiftRepository } from "@infrastructure/database/repositories/DoctorShiftRepository.ts";
import { SlotGenerator } from "@application/service/SlotGenerator.ts";
import { NanoidGenerator } from "@infrastructure/services/NanoidGenerator.ts";

const loggerService = new PinoLoggerService();

const doctorRepo = new MongoDoctorRepository(loggerService);
const doctorSlotRepo = new DoctorSlotRepository(loggerService);
const doctorShiftRepo = new DoctorShiftRepository(loggerService);
const idGenerator = new NanoidGenerator();
const doctorGetWeeklySlotUseCase = new GetDoctorWeeklySlotsUsecase(
  loggerService,
  doctorRepo,
  doctorSlotRepo
);

export const generateFutureSlotUseCase = new GenerateFutureSlotsUseCase(
  loggerService,
  doctorRepo,
  doctorShiftRepo,
  doctorSlotRepo,
  new SlotGenerator(idGenerator)
);

export const doctorSlotController = new DoctorSlotController(
  doctorGetWeeklySlotUseCase
);
