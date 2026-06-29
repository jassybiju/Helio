import { GetSpecialtiesUseCase } from "@application/use-cases/GetSpecialtiesUseCase.ts";
import { SpecialtyController } from "../controllers/speciality.controller.ts";
import { SpecialtyRepository } from "@infrastructure/database/repositories/SpecialityRepository.ts";
import { CreateSpecialtyUseCase } from "@application/use-cases/CreateSpecialtyUseCase.ts";
import { NanoidGenerator } from "@infrastructure/services/NanoidGenerator.ts";
import { PinoLoggerService } from "@infrastructure/services/PinoLoggerService.ts";
import { RemoveSpecialtyUseCase } from "@application/use-cases/RemoveSpecialtyUseCase.ts";
import { GetAllSpecialtyUseCase } from "@application/use-cases/GetAllSpecialtyUseCase.ts";

const specialtyRepo = new SpecialtyRepository();
const idGenerator = new NanoidGenerator();
const loggerService = new PinoLoggerService();

const getSpecialityUseCase = new GetSpecialtiesUseCase(specialtyRepo);
const addSpecialty = new CreateSpecialtyUseCase(
  specialtyRepo,
  idGenerator,
  loggerService
);
const removeSpecialty = new RemoveSpecialtyUseCase(
  specialtyRepo,
  loggerService
);
const getAllSpecialtyUseCase = new GetAllSpecialtyUseCase(
  loggerService,
  specialtyRepo
);
export const specialityController = new SpecialtyController(
  getSpecialityUseCase,
  addSpecialty,
  removeSpecialty,
  getAllSpecialtyUseCase
);
