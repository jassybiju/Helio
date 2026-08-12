import { tool } from "@langchain/core/tools";
import { z } from "zod";

import {
  createBookAppointment,
  createGetAvailableDates,
  createGetAvailableSlots,
  createGetConsultationCost,
  createGetPlatformSpecialties,
  createGetWalletDetails,
  createSearchDoctorByName,
  createSearchDoctorsBySpecialty,
} from "#infrastructure/ai/tools/index.js";

import { MongoDoctorRepository } from "#infrastructure/database/repositories/MongoDoctorRepository.js";
import { DoctorShiftRepository } from "#infrastructure/database/repositories/DoctorShiftRepository.js";
import { DoctorBlockShiftRepository } from "#infrastructure/database/repositories/DoctorBlockShiftRepository.js";
import { AppointmentRepository } from "#infrastructure/database/repositories/AppointmentRepository.js";
import { SpecialtyRepository } from "#infrastructure/database/repositories/SpecialityRepository.js";
import { SlotGenerator } from "#application/service/SlotGenerator.js";
import { logger } from "#shared/utils/logger.utils.js";
import type { BookingState } from "./chat.state.js";
import { CONSULTATION_TYPE } from "#domain/common/enums/doctorShift.enum.js";
import { NanoidGenerator } from "#infrastructure/services/NanoidGenerator.js";
import { NotificationService } from "#application/service/NotificationService.js";
import { NotificationRepository } from "#infrastructure/database/repositories/NotificationRepository.js";
import { SocketRealTimeNotifier } from "#infrastructure/services/SocketRealTimeNotifier.js";
import type { RunnableConfig } from "@langchain/core/runnables";
import { WalletRepository } from "#infrastructure/database/repositories/WalletRepository.js";
import { WalletTransactionRepository } from "#infrastructure/database/repositories/WalletTransactionRepository.js";

const doctorRepository = new MongoDoctorRepository(logger);
const shiftRepository = new DoctorShiftRepository(logger);
const blockShiftRepository = new DoctorBlockShiftRepository(logger);
const appointmentRepository = new AppointmentRepository(logger);
const walletRepo = new WalletRepository(logger);
const transactionRepo = new WalletTransactionRepository(logger);
const idGenerator = new NanoidGenerator();
const notificationService = new NotificationService(
  new NotificationRepository(logger),
  idGenerator,
  new SocketRealTimeNotifier()
);

const searchDoctorByName = createSearchDoctorByName(doctorRepository);

const searchDoctorsBySpecialty =
  createSearchDoctorsBySpecialty(doctorRepository);

const getPlatformSpecialties = createGetPlatformSpecialties(
  new SpecialtyRepository()
);

const getAvailableDates = createGetAvailableDates(
  shiftRepository,
  blockShiftRepository,
  appointmentRepository,
  new SlotGenerator()
);

const getAvailableSlots = createGetAvailableSlots(
  shiftRepository,
  blockShiftRepository,
  appointmentRepository,
  new SlotGenerator()
);

const createAppointemnt = createBookAppointment(
  appointmentRepository,
  doctorRepository,
  shiftRepository,
  walletRepo,
  transactionRepo,
  idGenerator,
  notificationService
);

const getConsultationCost = createGetConsultationCost(doctorRepository);

const getWalletDetails = createGetWalletDetails(walletRepo);

export const listSpecialtiesTool = tool(
  async () => {
    return JSON.stringify(await getPlatformSpecialties());
  },
  {
    name: "get_all_platform_specialties",
    description: "Get all medical specialties available on the platform.",
    schema: z.object({}),
  }
);

export const searchDoctorByNameTool = tool(
  async ({ name }) => {
    return JSON.stringify(await searchDoctorByName(name));
  },
  {
    name: "search_doctor_by_name",
    description: "Search for doctors by full or partial name.",
    schema: z.object({
      name: z.string(),
    }),
  }
);

export const searchDoctorsBySpecialtyTool = tool(
  async ({ specialty }) => {
    return JSON.stringify(await searchDoctorsBySpecialty(specialty));
  },
  {
    name: "search_doctors_by_specialty",
    description: "Search for doctors belonging to a medical specialty.",
    schema: z.object({
      specialty: z.string(),
    }),
  }
);

export const getAvailableDatesTool = tool(
  async ({ doctorId }) => {
    return JSON.stringify(await getAvailableDates(doctorId));
  },
  {
    name: "get_doctor_available_dates",
    description:
      "Get dates on which the specified doctor has available appointments.",
    schema: z.object({
      doctorId: z.string(),
    }),
  }
);

export const getAvailableSlotsTool = tool(
  async ({ doctorId, date }) => {
    console.log("CALLING TOOL GET AVAILABLE SLOT", {
      doctorId,
      date,
    });
    const res = JSON.stringify(await getAvailableSlots(doctorId, date));
    console.log("RESPONSE", res);
    return res;
  },
  {
    name: "get_doctor_available_slots",

    description:
      "Get all available appointment slots for a doctor on a specific date. " +
      "Returns the available time (ist) and consultation type for each slot.",

    schema: z.object({
      doctorId: z.string(),

      date: z.string().describe("Appointment date in YYYY-MM-DD format"),
    }),
  }
);

export const createBookAppointmentTool = tool(
  async (params, config: RunnableConfig) => {
    const patientId = config.configurable?.patientId;

    if (typeof patientId !== "string" || !patientId) {
      return JSON.stringify({
        success: false,
        error: "Patient identity is missing.",
      });
    }
    try {
      const appointmentId = await createAppointemnt({
        ...params,
        patientId: patientId,
      });

      return JSON.stringify({
        success: true,
        appointmentId,
        message: "Appointment booked successfully.",
      });
    } catch (error) {
      if (error instanceof Error) {
        return JSON.stringify({
          success: false,
          error: error.message,
        });
      }

      return JSON.stringify({
        success: false,
        error: "Failed to book appointment.",
      });
    }
  },
  {
    name: "book_appointment",
    description:
      "Book the appointment for the authenticated patient. " +
      "Only call this after the patient explicitly confirms " +
      "the appointment and the required payment is available. " +
      "The booking operation performs final validation.",
    schema: z.object({
      doctorId: z.string().min(1).describe("The ID of the doctor."),

      dateTime: z
        .string()
        .describe(
          "Appointment start time as an ISO-8601 datetime string in UTC."
        ),

      consultationType: z
        .enum(CONSULTATION_TYPE)
        .describe("Type of consultation."),
    }),
  }
);

export const createGetConsultationCostTool = tool(
  async (params) => {
    try {
      const cost = await getConsultationCost(params);

      return JSON.stringify({
        success: true,
        ...cost,
      });
    } catch (error) {
      return JSON.stringify({
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Unable to calculate consultation cost.",
      });
    }
  },
  {
    name: "get_consultation_cost",

    description:
      "Get the consultation fee, platform fee, and total cost " +
      "for a selected doctor and consultation type. " +
      "Use this after the patient has selected a doctor and " +
      "consultation type.",

    schema: z.object({
      doctorId: z.string().min(1).describe("The selected doctor's ID."),

      consultationType: z
        .enum(CONSULTATION_TYPE)
        .describe("The selected consultation type."),
    }),
  }
);

export const createGetWalletDetailsTool = tool(
  async (_params, config) => {
    const patientId = config.configurable?.patientId;

    if (typeof patientId !== "string" || !patientId) {
      return JSON.stringify({
        success: false,
        error: "Patient identity is missing.",
      });
    }

    try {
      const wallet = await getWalletDetails(patientId);

      return JSON.stringify({
        success: true,
        balance: wallet.balance,
      });
    } catch (error) {
      return JSON.stringify({
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Unable to retrieve wallet details.",
      });
    }
  },
  {
    name: "get_wallet_details",

    description:
      "Get the authenticated patient's current wallet balance. " +
      "Use this when checking whether the patient can afford " +
      "the selected appointment.",

    schema: z.object({}),
  }
);

export const bookingAgentTools = [
  listSpecialtiesTool,
  searchDoctorByNameTool,
  searchDoctorsBySpecialtyTool,
  getAvailableDatesTool,
  getAvailableSlotsTool,
  createGetConsultationCostTool,
  createGetWalletDetailsTool,
  createBookAppointmentTool,
];
