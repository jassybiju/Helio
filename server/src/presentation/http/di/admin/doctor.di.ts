import { GetAllDoctorUseCase } from "@application/use-cases/admin/doctor/getAllDoctors/GetAllDoctosUseCase.ts";
import { MongoDoctorRepository } from "@infrastructure/database/repositories/MongoDoctorRepository.ts";
import { PinoLoggerService } from "@infrastructure/services/PinoLoggerService.ts";
import { AdminDoctorController } from "../../controllers/admin/doctor.controller.ts";

const loggerService = new PinoLoggerService();

const doctorRepo = new MongoDoctorRepository(loggerService);

const getAllDoctorsUseCase = new GetAllDoctorUseCase(loggerService, doctorRepo);

export const adminDoctorController = new AdminDoctorController(
  getAllDoctorsUseCase
);
