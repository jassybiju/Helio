import { GetAllDoctorUseCase } from "@application/use-cases/admin/doctor/getAllDoctors/GetAllDoctosUseCase.ts";
import { MongoDoctorRepository } from "@infrastructure/database/repositories/MongoDoctorRepository.ts";
import { PinoLoggerService } from "@infrastructure/services/PinoLoggerService.ts";
import { AdminDoctorController } from "../../controllers/admin/doctor.controller.ts";
import { ChangeDoctorApprovalStatusUseCase } from "@application/use-cases/admin/doctor/changeDoctorApprovalStatus/ChangeDoctorApprovalStatusUseCase.ts";
import { GetDoctorUseCase } from "@application/use-cases/admin/doctor/getDoctor/GetDoctorUseCase.ts";
import { LocalFileUploadService } from "@infrastructure/services/LocalFileUploadService.ts";
import { ToggleBlockDoctorUseCase } from "@application/use-cases/admin/doctor/toggleBlock/ToggleBlockDoctorUseCase.ts";

const loggerService = new PinoLoggerService();
const fileUploadService = new LocalFileUploadService();

const doctorRepo = new MongoDoctorRepository(loggerService);

const getAllDoctorsUseCase = new GetAllDoctorUseCase(loggerService, doctorRepo);
const changeDoctorApprovalStatusUseCase = new ChangeDoctorApprovalStatusUseCase(
  loggerService,
  doctorRepo
);
const getDoctorUseCase = new GetDoctorUseCase(
  loggerService,
  doctorRepo,
  fileUploadService
);
const toggleBlockDoctorUseCase = new ToggleBlockDoctorUseCase(
  loggerService,
  doctorRepo
);

export const adminDoctorController = new AdminDoctorController(
  getAllDoctorsUseCase,
  getDoctorUseCase,
  changeDoctorApprovalStatusUseCase,
  toggleBlockDoctorUseCase
);
