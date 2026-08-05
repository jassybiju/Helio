import type { ILoginResponseDTO } from "#application/dto/auth/ILoginDTO.js";
export interface IGoogleLoginUseCase {
    execute({ credentials, role, }: {
        credentials: string;
        role: string;
    }): Promise<ILoginResponseDTO>;
}
//# sourceMappingURL=IGoogleLoginUseCase.d.ts.map