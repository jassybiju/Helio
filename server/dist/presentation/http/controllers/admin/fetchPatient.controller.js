import { fetchPatientSchema } from "../../schemas/admin/fetchPatient.schema.js";
import { AppError } from "#shared/errors/AppError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";
export class FetchPatientController {
    _fetchPatientByStartingChar;
    constructor(_fetchPatientByStartingChar) {
        this._fetchPatientByStartingChar = _fetchPatientByStartingChar;
    }
    fetchPatientByStartingChar = async (req, res, next) => {
        try {
            const parsed = fetchPatientSchema.safeParse(req.body);
            if (!parsed.success) {
                throw new AppError("Validation Erorr", HTTPStatus.UNPROCESSBLE_ENTITY);
            }
            const result = await this._fetchPatientByStartingChar.execute(parsed.data);
            return res.status(HTTPStatus.OK).json({ result });
        }
        catch (error) {
            next(error);
        }
    };
}
//# sourceMappingURL=fetchPatient.controller.js.map