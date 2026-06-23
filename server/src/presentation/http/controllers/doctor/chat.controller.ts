import type { IDoctorSendMessageUseCase } from "@application/ports/use-cases/doctor/chat/IDoctorSendMessageUseCase.ts";
import { MESSAGE } from "@shared/constants/messages.ts";
import { NotFoundError } from "@shared/errors/NotFoundError.ts";
import { HTTPStatus } from "@shared/types/HTTPStatus.ts";
import {
  apiResponse,
  successResponse,
} from "@shared/utils/apiReponse.utils.ts";
import type { NextFunction, Request, Response } from "express";

export class DoctorChatController {
  constructor(private readonly _sendMessage: IDoctorSendMessageUseCase) {}

  sendMessage = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;

      if (!userId) {
        throw new NotFoundError(MESSAGE.DOCTOR_NOT_FOUND);
      }

      const { chatSessionId } = req.params;

      if (!chatSessionId) {
        throw new NotFoundError(MESSAGE.CHAT_SESSION_NOT_FOUND);
      }

      const { content } = req.body;
      await this._sendMessage.execute(userId, chatSessionId as string, content);

      return apiResponse(
        res,
        HTTPStatus.OK,
        successResponse(null, "Chat Send Successfuly")
      );
    } catch (error) {
      next(error);
    }
  };
}
