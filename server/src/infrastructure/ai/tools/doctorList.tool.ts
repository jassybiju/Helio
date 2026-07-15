import type { IDoctorRepository } from "@application/ports/repositories/IDoctorRepository.ts";
import { tool } from "@langchain/core/tools";

export async function createGetAllDoctorsTool(doctorRepo: IDoctorRepository) {
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
      name: "getAllDoctors",
      description: "Get All Doctor Details",
    }
  );
}
