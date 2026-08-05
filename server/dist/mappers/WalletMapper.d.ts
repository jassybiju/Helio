import type { USER_ROLES } from "#domain/common/enums/user-roles.enum.js";
import { Wallet } from "#domain/entities/Wallet.js";
import type { WalletDoc } from "#infrastructure/database/model/WalletModel.js";
export declare class WalletMapper {
    static toDomain(doc: WalletDoc): Wallet;
    static toPersistence(wallet: Wallet): {
        _id: string;
        user_id: string;
        user_role: USER_ROLES;
        balance: number;
        created_at: Date;
        updated_at: Date;
    };
}
//# sourceMappingURL=WalletMapper.d.ts.map