import type { USER_ROLES } from "#domain/common/enums/user-roles.enum.js";
import { Wallet } from "#domain/entities/Wallet.js";
import type { WalletDoc } from "#infrastructure/database/model/WalletModel.js";

export class WalletMapper {
  static toDomain(doc: WalletDoc): Wallet {
    return new Wallet(
      doc._id,
      doc.user_id,
      doc.user_role as USER_ROLES,
      doc.balance,
      doc.created_at,
      doc.updated_at
    );
  }

  static toPersistence(wallet: Wallet) {
    return {
      _id: wallet.id,
      user_id: wallet.userId,
      user_role: wallet.userRole,
      balance: wallet.balance,
      created_at: wallet.createdAt,
      updated_at: wallet.updatedAt,
    };
  }
}
