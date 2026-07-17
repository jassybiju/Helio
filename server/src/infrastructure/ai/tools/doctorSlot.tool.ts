import type { IAppointmentRepository } from "@application/ports/repositories/IAppointmentRepository.ts";
import type { IDoctorBlockShiftRepository } from "@application/ports/repositories/IDoctorBlockShiftRepository.ts";
import type { IDoctorRepository } from "@application/ports/repositories/IDoctorRepository.ts";
import type { IDoctorShiftRepository } from "@application/ports/repositories/IDoctorShiftRepository.ts";
import type { ISlotGenerator } from "@application/ports/services/ISlotGenerator.ts";
import { APPOINTMENT_STATUS } from "@domain/common/enums/appointment.enum.ts";
import {
  CONSULTATION_TYPE,
  SLOT_STATUS,
} from "@domain/common/enums/doctorShift.enum.ts";
import type { Appointment } from "@domain/entities/Appointment.ts";
import type { DoctorBlockShift } from "@domain/entities/DoctorBlockShift.ts";
import type { DoctorSlot } from "@domain/value-objects/DoctorSlot.ts";
import { tool } from "@langchain/core/tools";
import { logger } from "@shared/utils/logger.utils.ts";
import z from "zod";

export function createGetDoctorSlotTool(
  doctorShiftRepo: IDoctorShiftRepository,
  doctorBlockRepo: IDoctorBlockShiftRepository,
  appointmentRepo: IAppointmentRepository,
  doctorRepo: IDoctorRepository,
  slotService: ISlotGenerator
) {
  return tool(
    async (
      {
        doctorId,
        date,
        consultationType,
      }: {
        doctorId: string;
        date: string;
        consultationType: CONSULTATION_TYPE;
      },
      config
    ) => {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        return { error: "Invalid date format, expected YYYY-MM-DD" };
      }
      const patientId = config?.configurable?.patientId as string | undefined;

      logger.info("GET DOCTOR SLOTS", {
        doctorId,
        date,
        consultationType,
        patientId,
      });

      const doctor = await doctorRepo.findById(doctorId);

      if (!doctor) {
        return {
          error: "Doctor not found",
        };
      }

      const now = new Date();
      const endDate = new Date(`${date}T23:59:59+05:30`);

      const [shifts, blockedShifts, appointments] = await Promise.all([
        doctorShiftRepo.findAllByDoctorId(doctorId),

        doctorBlockRepo.findByDoctorFromRange(doctorId, now, endDate),

        appointmentRepo.findDoctorAppointmentForRange(doctorId, now, endDate),
      ]);

      const slots = slotService.generateSlotsFromRange(shifts, now, endDate);

      const appointmentMap = new Map<string, Appointment[]>();

      for (const appointment of appointments) {
        const key = `${appointment.startTime.getTime()}-${appointment.consultationType}`;

        const existing = appointmentMap.get(key);

        if (existing) {
          existing.push(appointment);
        } else {
          appointmentMap.set(key, [appointment]);
        }
      }

      const availableSlots = [];

      for (const slot of slots) {
        // only requested consultation type
        if (slot.consultationType !== consultationType) {
          continue;
        }

        // blocked slots
        if (isSlotBlocked(slot, blockedShifts)) {
          continue;
        }

        const slotAppointments =
          appointmentMap.get(
            `${slot.startTime.getTime()}-${slot.consultationType}`
          ) ?? [];

        const status = getSlotStatus(slot, slotAppointments, patientId);

        availableSlots.push({
          time: new Intl.DateTimeFormat("en-IN", {
            timeZone: "Asia/Kolkata",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          }).format(slot.startTime),

          status,

          consultationType: slot.consultationType,

          location: slot.location ?? null,
        });
      }

      return {
        doctor: {
          id: doctor.id,
          name: doctor.fullName,
          specialization: doctor.specialization,
        },

        date,

        consultationType,

        slots: availableSlots,
      };
    },

    {
      name: "get_doctor_slots",

      description:
        "Get appointment slots for a doctor. doctorId must come from get_all_doctors/search_doctors. Requires date in YYYY-MM-DD and consultationType ONLINE or CLINIC.",

      schema: z.object({
        doctorId: z
          .string()
          .describe("Doctor ID obtained from doctor search result"),

        date: z.string().describe("Appointment date YYYY-MM-DD"),

        consultationType: z
          .enum([CONSULTATION_TYPE.ONLINE, CONSULTATION_TYPE.CLINIC])
          .describe(
            "Consultation mode: ONLINE or CLINIC. Ask patient if not provided."
          ),
      }),
    }
  );
}
// function formatIST(date: Date) {
//   return new Intl.DateTimeFormat("en-IN", {
//     timeZone: "Asia/Kolkata",
//     hour: "2-digit",
//     minute: "2-digit",
//     hour12: true,
//   }).format(date);
// }

function isSlotBlocked(slot: DoctorSlot, blockedShifts: DoctorBlockShift[]) {
  return blockedShifts.some(
    (block) => slot.startTime < block.endTime && slot.endTime > block.startTime
  );
}

function getSlotStatus(
  slot: DoctorSlot,
  slotAppointments: Appointment[],
  patientId?: string
) {
  if (
    patientId &&
    slotAppointments.some(
      (appointment) =>
        appointment.patientId === patientId &&
        appointment.status !== APPOINTMENT_STATUS.EXPIRED
    )
  ) {
    return SLOT_STATUS.BOOKED;
  }

  const activeCount = slotAppointments.filter(
    (appointment) =>
      appointment.status !== APPOINTMENT_STATUS.CANCELLED_BY_DOCTOR &&
      appointment.status !== APPOINTMENT_STATUS.CANCELLED_BY_PATIENT &&
      appointment.status !== APPOINTMENT_STATUS.EXPIRED
  ).length;

  return activeCount >= slot.capacity
    ? SLOT_STATUS.BOOKED
    : SLOT_STATUS.AVAILABLE;
}
