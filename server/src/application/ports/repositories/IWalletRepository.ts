import type { Wallet } from "@domain/entities/Wallet.ts";
import type { ClientSession } from "mongoose";

export interface IWalletRepository {
  withSession(session: ClientSession): IWalletRepository;

  create(wallet: Wallet): Promise<void>;

  findById(id: string): Promise<Wallet | null>;
  findAdminWallet(): Promise<Wallet | null>;

  findByUserId(userId: string): Promise<Wallet | null>;

  update(wallet: Wallet): Promise<void>;

  delete(id: string): Promise<void>;

  existsByUserId(userId: string): Promise<boolean>;
}
