import { SetDoctorScheduleUseCase } from "#application/use-cases/doctor/schedule/SetDoctorScheduleUseCase.js";
import { DoctorScheduleController } from "../../controllers/doctor/schedule.controller.js";
import { PinoLoggerService } from "#infrastructure/services/PinoLoggerService.js";
import { DoctorShiftRepository } from "#infrastructure/database/repositories/DoctorShiftRepository.js";
import { NanoidGenerator } from "#infrastructure/services/NanoidGenerator.js";
import { MongoDoctorRepository } from "#infrastructure/database/repositories/MongoDoctorRepository.js";
import { GetDoctorScheduleUseCase } from "#application/use-cases/doctor/schedule/getDoctorSchedule/GetDoctorScheduleUseCase.js";
import { DeleteDoctorScheduleUseCase } from "#application/use-cases/doctor/schedule/deleteDoctorSchedule/DeleteDoctorScheduleUseCase.js";
import { MongoUnitOfWork } from "#infrastructure/database/unitOfWork/MongoUnitOfWork.js";

const loggerService = PinoLoggerService.getInstance();
const idGenerator = new NanoidGenerator();
const uow = new MongoUnitOfWork();

const doctorRepo = new MongoDoctorRepository(loggerService);
const doctorShiftRepo = new DoctorShiftRepository(loggerService);

const setScheduleUseCase = new SetDoctorScheduleUseCase(
  loggerService,
  uow,
  doctorShiftRepo,
  idGenerator,
  doctorRepo
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
