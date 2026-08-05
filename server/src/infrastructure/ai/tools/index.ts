import type { ISpecialityRepository } from "#application/ports/repositories/ISpeicaltyRepository.js";
import { SpecialtyRepository } from "#infrastructure/database/repositories/SpecialityRepository.js";
import type { IDoctorRepository } from "#application/ports/repositories/IDoctorRepository.js";
import { MongoDoctorRepository } from "#infrastructure/database/repositories/MongoDoctorRepository.js";
import { logger } from "#shared/utils/logger.utils.js";
import { DynamicStructuredTool } from "langchain";
import z from "zod";

const DOCTORS = [
  {
    id: "doc_1",
    name: "Dr. Ann Mathew",
    specialty: "Cardiology",
    experienceYears: 12,
    rating: 4.8,
    fee: 500,
  },
  {
    id: "doc_2",
    name: "Dr. Rahul Nair",
    specialty: "Cardiology",
    experienceYears: 8,
    rating: 4.6,
    fee: 400,
  },
  {
    id: "doc_3",
    name: "Dr. Priya Menon",
    specialty: "Dermatology",
    experienceYears: 6,
    rating: 4.5,
    fee: 350,
  },
];

interface Slot {
  dateTime: string;
  consultationType: "ONLINE" | "CLINIC";
  id: string;
}

function generateSlots(): Slot[] {
  const slots: Slot[] = [];
  const now = new Date();
  for (let i = 1; i <= 5; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() + i);
    d.setHours(10, 0, 0, 0);
    slots.push({
      id: `slot_${i}`,
      dateTime: d.toISOString(),
      consultationType: i % 2 === 0 ? "CLINIC" : "ONLINE",
    });
  }
  return slots;
}

export function createGetSpecialtyTool(specialtyRepo: ISpecialityRepository) {
  return new DynamicStructuredTool({
    name: "get_specialities",
    description:
      "Get the list of medical specialties available on Helio. Call this before recommending a specialty to a patient based on their symptoms.",
    schema: z.object({}),
    func: async () => {
      console.log("🔧 [Tool: get_specialities] Invoked");
      debugger;
      const specialties = await specialtyRepo.findAllActive();
      return { specialties: specialties.map((spec) => spec.name) };
    },
  });
}

export function createSearchDoctorTool(doctorRepo: IDoctorRepository) {
  return new DynamicStructuredTool({
    name: "search_doctors",
    description:
      "Search for doctors. `query` should contain the specialty and/or doctor name, e.g. 'Cardiology' or 'Cardiology, Dr. Ann'.",
    schema: z.object({
      query: z.string().describe("Specialty and/or doctor name to search for"),
    }),
    func: async ({ query }: { query: string }) => {
      console.log("🔧 [Tool: search_doctors] Invoked with query:", query);
      debugger;
      const q = query.toLowerCase();
      const results = await doctorRepo.searchByName(q);
      console.log("TOOL RESULT", results);
      return {
        doctors: results.map((doc) => ({
          id: doc.id,
          name: doc.fullName,
          clinicFee: doc.clinicFee,
          onlineFee: doc.onlineFee,
          experienceYears: doc.yearsOfExperience,
          rating: 4,
        })),
      };
    },
  });
}
export const getDoctorDetailsTool = new DynamicStructuredTool({
  name: "get_doctor_details",
  description: "Get full details for a specific doctor by id.",
  schema: z.object({
    doctorId: z.string(),
  }),
  func: async ({ doctorId }: { doctorId: string }) => {
    console.log(
      "🔧 [Tool: get_doctor_details] Invoked with doctorId:",
      doctorId
    );
    debugger;
    const doctor = DOCTORS.find((d) => d.id === doctorId);
    if (!doctor) return { error: `Doctor ${doctorId} not found` };
    return { doctor };
  },
});

export const getDoctorSlotsTool = new DynamicStructuredTool({
  name: "get_doctor_slots",
  description:
    "Get available appointment slots (dateTime + consultationType) for a doctor.",
  schema: z.object({
    doctorId: z.string(),
  }),
  func: async ({ doctorId }: { doctorId: string }) => {
    console.log("🔧 [Tool: get_doctor_slots] Invoked for doctorId:", doctorId);
    debugger;
    const doctor = DOCTORS.find((d) => d.id === doctorId);
    if (!doctor) return { error: `Doctor ${doctorId} not found` };
    return { slots: generateSlots() };
  },
});

export const bookAppointmentTool = new DynamicStructuredTool({
  name: "book_appointment",
  description:
    "Book an appointment. Only call this after explicit confirmation.",
  schema: z.object({
    doctorId: z.string(),
    date: z.string().describe("ISO dateTime matching available slots"),
    consultationType: z.enum(["ONLINE", "CLINIC"]),
  }),
  func: async ({
    doctorId,
    date,
    consultationType,
  }: {
    doctorId: string;
    date: string;
    consultationType: "ONLINE" | "CLINIC";
  }) => {
    console.log("🔧 [Tool: book_appointment] Invoked with params:", {
      doctorId,
      date,
      consultationType,
    });
    debugger;
    return {
      bookingId: `BOOK_${Math.random().toString(36).slice(2, 10)}`,
      doctorId,
      date,
      consultationType,
      status: "CONFIRMED",
    };
  },
});

export const getPatientWalletTool = new DynamicStructuredTool({
  name: "getPatientWallet",
  description: "Get patient wallet balance.",
  schema: z.object({
    patientId: z.string().optional(),
  }),
  func: async () => {
    console.log("🔧 [Tool: getPatientWallet] Invoked");
    debugger;
    return { balance: 1000, currency: "INR" };
  },
});

export const helioTools = [
  createGetSpecialtyTool(new SpecialtyRepository()),
  createSearchDoctorTool(new MongoDoctorRepository(logger)),
  getDoctorDetailsTool,
  getDoctorSlotsTool,
  bookAppointmentTool,
  getPatientWalletTool,
];
