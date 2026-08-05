import { USER_ROLES } from "#domain/common/enums/user-roles.enum.js";
import { MESSAGE } from "#shared/constants/messages.js";
import { NotFoundError } from "#shared/errors/NotFoundError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";
import { apiResponse, successResponse, } from "#shared/utils/apiReponse.utils.js";
export class PatientChatController {
    _sendMessage;
    _getChatList;
    _getChat;
    constructor(_sendMessage, _getChatList, _getChat) {
        this._sendMessage = _sendMessage;
        this._getChatList = _getChatList;
        this._getChat = _getChat;
    }
    getChat = async (req, res, next) => {
        try {
            const userId = req.user?.id;
            if (!userId) {
                throw new NotFoundError(MESSAGE.PATIENT_NOT_FOUND);
            }
            const { chatSessionId } = req.params;
            if (!chatSessionId) {
                throw new NotFoundError(MESSAGE.CHAT_SESSION_NOT_FOUND);
            }
            const response = await this._getChat.execute(userId, chatSessionId, USER_ROLES.PATIENT);
            return apiResponse(res, HTTPStatus.OK, successResponse(response, "Chat Send Successfuly"));
        }
        catch (error) {
            next(error);
        }
    };
    getChatList = async (req, res, next) => {
        try {
            const userId = req.user?.id;
            if (!userId) {
                throw new NotFoundError(MESSAGE.PATIENT_NOT_FOUND);
            }
            const response = await this._getChatList.execute(userId, USER_ROLES.PATIENT);
            return apiResponse(res, HTTPStatus.OK, successResponse(response, "Chat List Recieved Successfuly"));
        }
        catch (error) {
            next(error);
        }
    };
    sendMessage = async (req, res, next) => {
        try {
            const userId = req.user?.id;
            if (!userId) {
                throw new NotFoundError(MESSAGE.PATIENT_NOT_FOUND);
            }
            const { chatSessionId } = req.params;
            if (!chatSessionId) {
                throw new NotFoundError(MESSAGE.CHAT_SESSION_NOT_FOUND);
            }
            const { content } = req.body;
            const response = await this._sendMessage.execute(userId, chatSessionId, USER_ROLES.PATIENT, content);
            return apiResponse(res, HTTPStatus.OK, successResponse(response, "Chat Send Successfuly"));
        }
        catch (error) {
            next(error);
        }
    };
}
//# sourceMappingURL=chat.controller.js.map