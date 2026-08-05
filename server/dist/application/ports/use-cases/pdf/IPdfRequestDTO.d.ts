import type { USER_ROLES } from "#domain/common/enums/user-roles.enum.js";
import type { PDF_TYPE } from "#shared/types/pdf.type.js";
export interface IPdfRequestDTO {
    type: PDF_TYPE;
    resource_id?: string;
    currentUser: {
        id: string;
        role: USER_ROLES;
    };
    from?: Date;
    to?: Date;
}
//# sourceMappingURL=IPdfRequestDTO.d.ts.map