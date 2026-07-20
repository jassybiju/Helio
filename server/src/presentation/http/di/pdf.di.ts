import { PdfDispatcher } from "@application/service/PdfDispatcher.ts";
import { GeneratePDFController } from "../controllers/pdf.controller.ts";
import { GeneratePatientAppointmentPDFUseCase } from "@application/use-cases/pdf/patientAppointment/GeneratePatientAppointmentPDFUseCase.ts";
import { PinoLoggerService } from "@infrastructure/services/PinoLoggerService.ts";
import { MongoDoctorRepository } from "@infrastructure/database/repositories/MongoDoctorRepository.ts";
import { AppointmentRepository } from "@infrastructure/database/repositories/AppointmentRepository.ts";
import { ConsultationRepository } from "@infrastructure/database/repositories/ConsultationRepository.ts";
import { GotenbergPdfGenerator } from "@infrastructure/pdf/GotenbergPdfGenerator.ts";
import { HandlebarsTemplateRenderer } from "@infrastructure/pdf/HandlerbarsTemplateRenderer.ts";
import { PatientRepository } from "@infrastructure/database/repositories/MongoPatientRepository.ts";
import { PDF_TYPE } from "@shared/types/pdf.type.ts";
import { GeneratePatientInvoicePDFUseCase } from "@application/use-cases/pdf/patientInvoice/GeneratePatientInvoicePDFUseCase.ts";
import type { IPdfUseCase } from "@application/ports/use-cases/pdf/IPdfUseCase.ts";

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
