import type { IDoctorRepository } from "@application/ports/repositories/IDoctorRepository.ts";
import type { IDoctorShiftRepository } from "@application/ports/repositories/IDoctorShiftRepository.ts";
import type { IDoctorBlockShiftRepository } from "@application/ports/repositories/IDoctorBlockShiftRepository.ts";
import type { IAppointmentRepository } from "@application/ports/repositories/IAppointmentRepository.ts";
import type { ISlotGenerator } from "@application/ports/services/ISlotGenerator.ts";

import {
  CONSULTATION_TYPE,
  SLOT_STATUS,
} from "@domain/common/enums/doctorShift.enum.ts";

import { tool } from "@langchain/core/tools";
import z from "zod";
import { logger } from "@shared/utils/logger.utils.ts";

export function createSearchAvailableDoctorsTool(
  doctorRepo: IDoctorRepository,
  doctorShiftRepo: IDoctorShiftRepository,
  doctorBlockRepo: IDoctorBlockShiftRepository,
  appointmentRepo: IAppointmentRepository,
  slotService: ISlotGenerator
) {
  return tool(
    async ({
      query,
      date,
      consultationType,
    }: {
      query: string;
      date: string;
      consultationType: CONSULTATION_TYPE;
    }) => {
         logger.info("GET DOCTOR SLOTS", {
              query,
              date,
              consultationType,
            });
      if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        return { error: "Invalid date format, expected YYYY-MM-DD" };
      }
      const doctors = await doctorRepo.searchByName(query);

      if (!doctors.length) {
        return {
          doctors: [],
        };
      }

      const now = new Date();

      const endDate = new Date(`${date}T23:59:59+05:30`);

      const availableDoctors = [];

      for (const doctor of doctors) {
        const [shifts, blockedShifts, appointments] = await Promise.all([
          doctorShiftRepo.findAllByDoctorId(doctor.id),

          doctorBlockRepo.findByDoctorFromRange(doctor.id, now, endDate),

          appointmentRepo.findDoctorAppointmentForRange(
            doctor.id,
            now,
            endDate
          ),
        ]);

        const slots = slotService.generateSlotsFromRange(shifts, now, endDate);

        const availableSlots = slots
          .filter((slot) => {
            // consultation filter
            if (slot.consultationType !== consultationType) {
              return false;
            }

            // blocked shift
            const blocked = blockedShifts.some(
              (block) =>
                slot.startTime < block.endTime && slot.endTime > block.startTime
            );

            if (blocked) {
              return false;
            }

            const bookedCount = appointments.filter(
              (appointment) =>
                appointment.startTime.getTime() === slot.startTime.getTime() &&
                appointment.consultationType === slot.consultationType
            ).length;

            return bookedCount < slot.capacity;
          })
          .map((slot) => ({
            startTime: slot.startTime.toISOString(),

            displayTime: new Intl.DateTimeFormat("en-IN", {
              timeZone: "Asia/Kolkata",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            }).format(slot.startTime),

            location: slot.location ?? null,
          }));

        if (availableSlots.length) {
          availableDoctors.push({
            doctorId: doctor.id,
            name: doctor.fullName,
            specialization: doctor.specialization,
            bio: doctor.bio,
            onlineFee: doctor.onlineFee,
            clinicFee: doctor.clinicFee,
            availableSlots,
          });
        }
      }
      return {
        date,
        consultationType,
        doctors: availableDoctors,
      };
    },
    {
      name: "search_available_doctors",
      description:
        "Find doctors who have available appointment slots for a given date and consultation type. Use when patient asks for doctors available for a specialization.",
      schema: z.object({
        query: z
          .string()
          .describe(
            "Doctor name or specialization. Example: cardiologist, dermatologist, Dr John"
          ),

        date: z.string().describe("Appointment date in YYYY-MM-DD format"),
        consultationType: z
          .enum([CONSULTATION_TYPE.ONLINE, CONSULTATION_TYPE.CLINIC])
          .describe("Consultation mode"),
      }),
    }
  );
}
