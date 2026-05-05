import { DoctorSlotController } from "../../controllers/doctor/slot.controller.ts";
import { PinoLoggerService } from "@infrastructure/services/PinoLoggerService.ts";
import { MongoDoctorRepository } from "@infrastructure/database/repositories/MongoDoctorRepository.ts";
import { GetDoctorWeeklySlotsUsecase } from "@application/use-cases/doctor/slot/getDoctorSlots/GetDoctorWeeklySlotsUseCase.ts";
import { DoctorShiftRepository } from "@infrastructure/database/repositories/DoctorShiftRepository.ts";
import { SlotGenerator } from "@application/service/SlotGenerator.ts";
import { BlockDoctorSlotUseCase } from "@application/use-cases/doctor/slot/blockDoctorSlot/BlockDoctorSlotUseCase.ts";
import { NanoidGenerator } from "@infrastructure/services/NanoidGenerator.ts";
import { DoctorBlockShiftRepository } from "@infrastructure/database/repositories/DoctorBlockShiftRepository.ts";
import { GetDoctorBlockSlotUseCase } from "@application/use-cases/doctor/slot/getDoctorBlockSlot/GetDoctorBlockSlotUseCase.ts";
import { AppointmentRepository } from "@infrastructure/database/repositories/AppointmentRepository.ts";

const loggerService = new PinoLoggerService();

const idGenerator = new NanoidGenerator();

const doctorRepo = new MongoDoctorRepository(loggerService);
const doctorShiftRepo = new DoctorShiftRepository(loggerService);
const doctorBlockShiftRepo = new DoctorBlockShiftRepository(loggerService);
const appointmentRepo = new AppointmentRepository();
const doctorGetWeeklySlotUseCase = new GetDoctorWeeklySlotsUsecase(
  loggerService,
  doctorRepo,
  doctorShiftRepo,
  new SlotGenerator(),
  doctorBlockShiftRepo,
  appointmentRepo
);

const doctorBlockSlotUseCase = new BlockDoctorSlotUseCase(
  loggerService,
  idGenerator,
  doctorBlockShiftRepo
);

const getDoctorBlockSlotUseCase = new GetDoctorBlockSlotUseCase(
  loggerService,
  doctorRepo,
  doctorBlockShiftRepo
);

export const doctorSlotController = new DoctorSlotController(
  doctorGetWeeklySlotUseCase,
  doctorBlockSlotUseCase,
  getDoctorBlockSlotUseCase
);
