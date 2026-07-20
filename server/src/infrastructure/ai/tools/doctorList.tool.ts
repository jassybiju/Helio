import type { IDoctorRepository } from "@application/ports/repositories/IDoctorRepository.ts";
import { tool } from "@langchain/core/tools";
import z from "zod";

export function createGetAllDoctorsTool(doctorRepo: IDoctorRepository) {
  return tool(
    async () => {
      const doctors = await doctorRepo.findAllActive();

      return doctors.map((doc) => ({
        id: doc.id,
        email: doc.email,
        fullname: doc.fullName,
        specialization: doc.specialization,
        bio: doc.bio,
        onlineFee: doc.onlineFee,
        clinicFee: doc.clinicFee,
      }));
    },
    {
      name: "get_all_doctors",
      description:
        "Returns all doctors with their IDs, names, specialties, and departments.",
      schema: z.object({}),
    }
  );
}
