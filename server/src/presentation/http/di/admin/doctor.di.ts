import { GetAllDoctorUseCase } from "@application/use-cases/admin/doctor/getAllDoctors/GetAllDoctosUseCase.ts";
import { MongoDoctorRepository } from "@infrastructure/database/repositories/MongoDoctorRepository.ts";
import { PinoLoggerService } from "@infrastructure/services/PinoLoggerService.ts";
import { AdminDoctorController } from "../../controllers/admin/doctor.controller.ts";
import { ChangeDoctorApprovalStatusUseCase } from "@application/use-cases/admin/doctor/changeDoctorApprovalStatus/ChangeDoctorApprovalStatusUseCase.ts";
import { GetDoctorUseCase } from "@application/use-cases/admin/doctor/getDoctor/GetDoctorUseCase.ts";
import { ToggleBlockDoctorUseCase } from "@application/use-cases/admin/doctor/toggleBlock/ToggleBlockDoctorUseCase.ts";
import { CloudinaryFileUploadService } from "@infrastructure/services/CloudinaryFileUploadService.ts";

const loggerService = PinoLoggerService.getInstance();
const fileUploadService = new CloudinaryFileUploadService();

const doctorRepo = new MongoDoctorRepository(loggerService);
const fileUpload = new CloudinaryFileUploadService();
const getAllDoctorsUseCase = new GetAllDoctorUseCase(
  loggerService,
  doctorRepo,
  fileUpload
);
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
