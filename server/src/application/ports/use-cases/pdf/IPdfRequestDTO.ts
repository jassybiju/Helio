import type { USER_ROLES } from "@domain/common/enums/user-roles.enum.ts";
import type { PDF_TYPE } from "@shared/types/pdf.type.ts";

export interface IPdfRequestDTO {
  type: PDF_TYPE;
  resource_id?: string;
  currentUser: { id: string; role: USER_ROLES };
  from?: Date;
  to?: Date;
}
