import { GetWalletUseCase } from "@application/use-cases/wallet/getWallet/GetWalletUseCase.ts";
import { WalletController } from "../controllers/wallet.controller.ts";
import { PinoLoggerService } from "@infrastructure/services/PinoLoggerService.ts";
import { WalletRepository } from "@infrastructure/database/repositories/WalletRepository.ts";
import { WalletTransactionRepository } from "@infrastructure/database/repositories/WalletTransactionRepository.ts";
import { NanoidGenerator } from "@infrastructure/services/NanoidGenerator.ts";
import { AddMoneyUseCase } from "@application/use-cases/wallet/addMoney/AddMoneyUseCase.ts";
import { razorpay } from "@config/razorpay.config.ts";
import { AddMoneyVerifyUseCase } from "@application/use-cases/wallet/addMoney/AddMoneyVerifyUseCase.ts";
import { MongoUnitOfWork } from "@infrastructure/database/unitOfWork/MongoUnitOfWork.ts";

const logger = PinoLoggerService.getInstance();

const walletRepo = new WalletRepository(logger);
const transactionRepo = new WalletTransactionRepository(logger);
const idGenerator = new NanoidGenerator();
const uow = new MongoUnitOfWork();

const getWalletUseCase = new GetWalletUseCase(
  logger,
  walletRepo,
  transactionRepo
);
const addMoneyUseCase = new AddMoneyUseCase(
  logger,
  walletRepo,
  transactionRepo,
  idGenerator,
  razorpay,
  uow
);

const verifyAddMoney = new AddMoneyVeUseCase(
  logger,
  walletRepo,
  transactionRepo
);
export const walletController = new WalletController(
  getWalletUseCase,
  addMoneyUseCase,
  verifyAddMoney
);
