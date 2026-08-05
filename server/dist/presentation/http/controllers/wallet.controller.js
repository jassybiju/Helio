import { AppError } from "#shared/errors/AppError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";
import { addMoneySchema, getWalletSchema } from "../schemas/wallet.schema.js";
import { apiResponse, successResponse, } from "#shared/utils/apiReponse.utils.js";
import { GetWalletMapper } from "#application/use-cases/wallet/getWallet/GetWalletMapper.js";
export class WalletController {
    _getWalletUseCase;
    _addMoneyUseCase;
    _verifyAddMoney;
    constructor(_getWalletUseCase, _addMoneyUseCase, _verifyAddMoney) {
        this._getWalletUseCase = _getWalletUseCase;
        this._addMoneyUseCase = _addMoneyUseCase;
        this._verifyAddMoney = _verifyAddMoney;
    }
    verifyAddMoney = async (req, res, next) => {
        try {
            const { transactionId } = req.params;
            const patientId = req.user?.id;
            const body = req.body;
            const response = await this._verifyAddMoney.execute({
                transactionId: transactionId,
                userId: patientId,
                razorpay_order_id: body.razorpay_order_id,
                razorpay_payment_id: body.razorpay_payment_id,
                razorpay_signature: body.razorpay_signature,
            });
            return apiResponse(res, HTTPStatus.OK, successResponse(response, "Payment Verified Suceesful"));
        }
        catch (error) {
            next(error);
        }
    };
    getWallet = async (req, res, next) => {
        try {
            const userId = req.user?.id;
            if (!userId) {
                throw new AppError("UserId not found", HTTPStatus.INTERNAL_ERROR);
            }
            const parsed = getWalletSchema.safeParse(req.query);
            if (!parsed.success) {
                throw new AppError(parsed.error.issues[0]?.message || "Validation Error", HTTPStatus.UNPROCESSBLE_ENTITY);
            }
            const data = await this._getWalletUseCase.execute(userId, parsed.data);
            const response = GetWalletMapper.toDto(data);
            return apiResponse(res, HTTPStatus.OK, successResponse(response, "Wallet Got Succesffuly"));
        }
        catch (error) {
            next(error);
        }
    };
    addMoney = async (req, res, next) => {
        try {
            const userId = req.user?.id;
            if (!userId) {
                throw new AppError("UserId not found", HTTPStatus.INTERNAL_ERROR);
            }
            const parsed = addMoneySchema.safeParse(req.body);
            if (!parsed.success) {
                throw new AppError(parsed.error.issues[0]?.message || "Validation Error", HTTPStatus.UNPROCESSBLE_ENTITY);
            }
            const response = await this._addMoneyUseCase.execute(userId, parsed.data.amount);
            return apiResponse(res, HTTPStatus.OK, successResponse(response, "Money Added Succesffuly"));
        }
        catch (error) {
            next(error);
        }
    };
}
//# sourceMappingURL=wallet.controller.js.map