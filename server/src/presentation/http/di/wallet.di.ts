import { GetWalletUseCase } from "#application/use-cases/wallet/getWallet/GetWalletUseCase.js";
import { WalletController } from "../controllers/wallet.controller.js";
import { PinoLoggerService } from "#infrastructure/services/PinoLoggerService.js";
import { WalletRepository } from "#infrastructure/database/repositories/WalletRepository.js";
import { WalletTransactionRepository } from "#infrastructure/database/repositories/WalletTransactionRepository.js";
import { NanoidGenerator } from "#infrastructure/services/NanoidGenerator.js";
import { AddMoneyUseCase } from "#application/use-cases/wallet/addMoney/AddMoneyUseCase.js";
import { razorpay } from "#config/razorpay.config.js";
import { AddMoneyVerifyUseCase } from "#application/use-cases/wallet/addMoney/AddMoneyVerifyUseCase.js";
import { MongoUnitOfWork } from "#infrastructure/database/unitOfWork/MongoUnitOfWork.js";

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

const verifyAddMoney = new AddMoneyVerifyUseCase(
  logger,
  walletRepo,
  transactionRepo
);
export const walletController = new WalletController(
  getWalletUseCase,
  addMoneyUseCase,
  verifyAddMoney
);
