import type { IPasswordService } from "#application/ports/services/IPasswordService.js";
export declare class BcryptPasswordService implements IPasswordService {
    hash(password: string): Promise<string>;
    compare(password: string, hash: string): Promise<boolean>;
}
//# sourceMappingURL=BcryptPasswordService.d.ts.map