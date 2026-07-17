import type { IDoctorRepository } from "@application/ports/repositories/IDoctorRepository.ts";
import { tool } from "@langchain/core/tools";
import z from "zod";

export function createSearchByNameTool(doctorRepo: IDoctorRepository) {
  return tool(
    async ({ query }: { query: string }) => {
      const doctors = await doctorRepo.searchByName(query);

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
      name: "search_doctors",
      description:
        "Find doctors by name or medical specialization. Example queries: cardiologist, dermatologist, Dr John.",
      schema: z.object({
        query: z
          .string()
          .describe("Provide Specialization or Name of the doctor to search"),
      }),
    }
  );
}
