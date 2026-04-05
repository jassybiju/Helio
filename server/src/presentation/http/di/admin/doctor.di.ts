import { GetAllDoctorUseCase } from "@application/use-cases/admin/doctor/getAllDoctors/GetAllDoctosUseCase.ts";
import { MongoDoctorRepository } from "@infrastructure/database/repositories/MongoDoctorRepository.ts";
import { PinoLoggerService } from "@infrastructure/services/PinoLoggerService.ts";
import { AdminDoctorController } from "../../controllers/admin/doctor.controller.ts";
import { ChangeDoctorApprovalStatusUseCase } from "@application/use-cases/admin/doctor/changeDoctorApprovalStatus/ChangeDoctorApprovalStatusUseCase.ts";

const loggerService = new PinoLoggerService();

const doctorRepo = new MongoDoctorRepository(loggerService);

const getAllDoctorsUseCase = new GetAllDoctorUseCase(loggerService, doctorRepo);
const changeDoctorApprovalStatusUseCase = new ChangeDoctorApprovalStatusUseCase(loggerService, doctorRepo)

export const adminDoctorController = new AdminDoctorController(
  getAllDoctorsUseCase,
  changeDoctorApprovalStatusUseCase
);
