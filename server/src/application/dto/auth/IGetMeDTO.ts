import type { USER_ROLES } from "@shared/types/UserRoles.ts";
import type { ILoginResponseDTO } from "./ILoginDTO.ts";
import type { DOCTOR_VERIFICATION_STATUS } from "@domain/common/enums/doctor.enum.ts";

export type IGetMeRequestDTO = {
  id: string;
  role: USER_ROLES;
};

export type IGetMeResponseDTO = {
  id: string;
  email: string;
  role: USER_ROLES;
  status?: DOCTOR_VERIFICATION_STATUS;
};
