import { AppError } from "#shared/errors/AppError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";
import { OTPMapper } from "../../../mappers/OTPMapper.js";
import { RedisBaseRepository } from "./RedisBaseRepository.js";
export class RedisOTPRepository extends RedisBaseRepository {
    _logger;
    constructor(_logger) {
        super();
        this._logger = _logger;
    }
    async save(otp) {
        try {
            const ttl = Math.floor(otp.expiresAt.getTime() / 1000) -
                Math.floor(Date.now() / 1000);
            await super.set("otp:" + otp.id, OTPMapper.toPersistance(otp), ttl);
        }
        catch (error) {
            this._logger.error("Error saving otp", error);
            throw new AppError("Error saving otp", HTTPStatus.INTERNAL_ERROR);
        }
    }
    async findById(id) {
        try {
            const otp = await super.get("otp:" + id);
            if (!otp) {
                return null;
            }
            return OTPMapper.toDomain(otp, id);
        }
        catch (error) {
            this._logger.error("Error Getting OTP", error);
            throw new AppError("Error getting otp", HTTPStatus.INTERNAL_ERROR);
        }
    }
    async findByIdAndContext(id, context) {
        const otpData = await this.findById(id);
        if (!otpData) {
            return null;
        }
        if (otpData.context !== context) {
            return null;
        }
        return otpData;
    }
    async delete(id) {
        try {
            await super.delete("otp:" + id);
        }
        catch (error) {
            this._logger.error("Error Deleting OTP", error);
            throw new AppError("Error deleting otp", HTTPStatus.INTERNAL_ERROR);
        }
    }
}
//# sourceMappingURL=RedisOTPRepository.js.map