import { GetSpecialtiesUseCase } from "#application/use-cases/GetSpecialtiesUseCase.js";
import { SpecialtyController } from "../controllers/speciality.controller.js";
import { SpecialtyRepository } from "#infrastructure/database/repositories/SpecialityRepository.js";
import { CreateSpecialtyUseCase } from "#application/use-cases/CreateSpecialtyUseCase.js";
import { NanoidGenerator } from "#infrastructure/services/NanoidGenerator.js";
import { PinoLoggerService } from "#infrastructure/services/PinoLoggerService.js";
import { RemoveSpecialtyUseCase } from "#application/use-cases/RemoveSpecialtyUseCase.js";
import { GetAllSpecialtyUseCase } from "#application/use-cases/GetAllSpecialtyUseCase.js";

const specialtyRepo = new SpecialtyRepository();
const idGenerator = new NanoidGenerator();
const loggerService = PinoLoggerService.getInstance();

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
