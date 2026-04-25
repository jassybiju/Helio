import { SetDoctorScheduleUseCase } from "@application/use-cases/doctor/schedule/SetDoctorScheduleUseCase.ts";
import { DoctorScheduleController } from "../../controllers/doctor/schedule.controller.ts";
import { PinoLoggerService } from "@infrastructure/services/PinoLoggerService.ts";
import { DoctorShiftRepository } from "@infrastructure/database/repositories/DoctorShiftRepository.ts";
import { NanoidGenerator } from "@infrastructure/services/NanoidGenerator.ts";
import { MongoDoctorRepository } from "@infrastructure/database/repositories/MongoDoctorRepository.ts";
import { SlotGenerator } from "@application/service/SlotGenerator.ts";
import { GetDoctorScheduleUseCase } from "@application/use-cases/doctor/schedule/getDoctorSchedule/GetDoctorScheduleUseCase.ts";
import { DeleteDoctorScheduleUseCase } from "@application/use-cases/doctor/schedule/deleteDoctorSchedule/DeleteDoctorScheduleUseCase.ts";
import { DoctorSlotRepository } from "@infrastructure/database/repositories/DoctorSlotRepository.ts";
import { MongoUnitOfWork } from "@infrastructure/database/unitOfWork/MongoUnitOfWork.ts";

const loggerService = new PinoLoggerService();
const idGenerator = new NanoidGenerator();
const uow = new MongoUnitOfWork();

const doctorRepo = new MongoDoctorRepository(loggerService);
const doctorShiftRepo = new DoctorShiftRepository(loggerService);
const doctorSlotRepo = new DoctorSlotRepository(loggerService);

const setScheduleUseCase = new SetDoctorScheduleUseCase(
  loggerService,
  uow,
  doctorShiftRepo,
  idGenerator,
  doctorRepo,
  new SlotGenerator(idGenerator),
  doctorSlotRepo
);
const getDoctorScheduleUseCase = new GetDoctorScheduleUseCase(
  loggerService,
  doctorShiftRepo
);
const deleteDoctorScheduleUseCase = new DeleteDoctorScheduleUseCase(
  loggerService,
  doctorRepo,
  doctorShiftRepo
);
export const doctorScheduleController = new DoctorScheduleController(
  setScheduleUseCase,
  getDoctorScheduleUseCase,
  deleteDoctorScheduleUseCase
);
