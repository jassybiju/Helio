import type { USER_ROLES } from "#domain/common/enums/user-roles.enum.js";
import type { DOCTOR_VERIFICATION_STATUS } from "#domain/common/enums/doctor.enum.js";
export type IGetMeRequestDTO = {
    id: string;
    role: USER_ROLES;
};
export type IGetMeResponseDTO = {
    id: string;
    email: string;
    role: USER_ROLES;
    status?: DOCTOR_VERIFICATION_STATUS;
    isProfileComplete: boolean;
    profilePic: string | null;
};
//# sourceMappingURL=IGetMeDTO.d.ts.map