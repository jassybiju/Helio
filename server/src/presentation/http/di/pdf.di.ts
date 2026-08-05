import { PdfDispatcher } from "#application/service/PdfDispatcher.js";
import { GeneratePDFController } from "../controllers/pdf.controller.js";
import { GeneratePatientAppointmentPDFUseCase } from "#application/use-cases/pdf/patientAppointment/GeneratePatientAppointmentPDFUseCase.js";
import { PinoLoggerService } from "#infrastructure/services/PinoLoggerService.js";
import { MongoDoctorRepository } from "#infrastructure/database/repositories/MongoDoctorRepository.js";
import { AppointmentRepository } from "#infrastructure/database/repositories/AppointmentRepository.js";
import { ConsultationRepository } from "#infrastructure/database/repositories/ConsultationRepository.js";
import { GotenbergPdfGenerator } from "#infrastructure/pdf/GotenbergPdfGenerator.js";
import { HandlebarsTemplateRenderer } from "#infrastructure/pdf/HandlerbarsTemplateRenderer.js";
import { PatientRepository } from "#infrastructure/database/repositories/MongoPatientRepository.js";
import { PDF_TYPE } from "#shared/types/pdf.type.js";
import { GeneratePatientInvoicePDFUseCase } from "#application/use-cases/pdf/patientInvoice/GeneratePatientInvoicePDFUseCase.js";
import type { IPdfUseCase } from "#application/ports/use-cases/pdf/IPdfUseCase.js";

const logger = PinoLoggerService.getInstance();

const doctorRepo = new MongoDoctorRepository(logger);
const appointmentRepo = new AppointmentRepository(logger);
const patientRepo = new PatientRepository(logger);
const consultationRepo = new ConsultationRepository(logger);

const pdfGenerator = new GotenbergPdfGenerator("http://gotenberg:3000");
const templateRenderer = new HandlebarsTemplateRenderer();
const generatePatientAppointmentPDF = new GeneratePatientAppointmentPDFUseCase(
  logger,
  patientRepo,
  doctorRepo,
  consultationRepo,
  appointmentRepo,
  templateRenderer,
  pdfGenerator
);
const generatePatientInvoicePDF = new GeneratePatientInvoicePDFUseCase(
  logger,
  patientRepo,
  appointmentRepo,
  doctorRepo,
  templateRenderer,
  pdfGenerator
);

const pdfDispatcher = new PdfDispatcher(
  new Map<PDF_TYPE, IPdfUseCase>([
    [PDF_TYPE.PATIENT_APPOINTMENT, generatePatientAppointmentPDF],
    [PDF_TYPE.PATIENT_INVOICE, generatePatientInvoicePDF],
  ])
);

export const pdfController = new GeneratePDFController(pdfDispatcher);
