import { HTTPStatus } from "#shared/types/HTTPStatus.js";
import { apiResponse, successResponse, } from "#shared/utils/apiReponse.utils.js";
export class AIController {
    _aiChatBotUseCase;
    constructor(_aiChatBotUseCase) {
        this._aiChatBotUseCase = _aiChatBotUseCase;
    }
    chat = async (req, res, next) => {
        try {
            const patientId = req.user?.id;
            const { message, conversationId } = req.body;
            if (!patientId) {
                throw new Error("Patient Id not found");
            }
            const response = await this._aiChatBotUseCase.execute(patientId, message, conversationId);
            return apiResponse(res, HTTPStatus.OK, successResponse(response, "AI MESAGE GOT"));
        }
        catch (error) {
            next(error);
        }
    };
}
//# sourceMappingURL=ai.controller.js.map