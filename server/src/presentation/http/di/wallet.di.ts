import { GetWalletUseCase } from "@application/use-cases/wallet/getWallet/GetWalletUseCase.ts";
import { WalletController } from "../controllers/wallet.controller.ts";
import { PinoLoggerService } from "@infrastructure/services/PinoLoggerService.ts";
import { WalletRepository } from "@infrastructure/database/repositories/WalletRepository.ts";
import { WalletTransactionRepository } from "@infrastructure/database/repositories/WalletTransactionRepository.ts";
import { NanoidGenerator } from "@infrastructure/services/NanoidGenerator.ts";
import { AddMoneyUseCase } from "@application/use-cases/wallet/addMoney/AddMoneyUseCase.ts";

const logger = new PinoLoggerService();

const walletRepo = new WalletRepository(logger);
const transactionRepo = new WalletTransactionRepository(logger);
const idGenerator = new NanoidGenerator();

const getWalletUseCase = new GetWalletUseCase(
  logger,
  walletRepo,
  transactionRepo
);
const addMoneyUseCase = new AddMoneyUseCase(
  logger,
  walletRepo,
  transactionRepo,
  idGenerator
);

export const walletController = new WalletController(
  getWalletUseCase,
  addMoneyUseCase
);
