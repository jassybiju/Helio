import type { IGetChatListUseCase } from "@application/ports/use-cases/chat/IGetChatListUseCase.ts";
import type { IGetChatUseCase } from "@application/ports/use-cases/chat/IGetChatUseCase.ts";
import type { ISendMessageUseCase } from "@application/ports/use-cases/chat/ISendMessageUseCase.ts";
import { USER_ROLES } from "@domain/common/enums/user-roles.enum.ts";
import { MESSAGE } from "@shared/constants/messages.ts";
import { NotFoundError } from "@shared/errors/NotFoundError.ts";
import { HTTPStatus } from "@shared/types/HTTPStatus.ts";
import {
  apiResponse,
  successResponse,
} from "@shared/utils/apiReponse.utils.ts";
import type { NextFunction, Request, Response } from "express";

export class PatientChatController {
  constructor(
    private readonly _sendMessage: ISendMessageUseCase,
    private readonly _getChatList: IGetChatListUseCase,
    private readonly _getChat: IGetChatUseCase
  ) {}

  getChat = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;

      if (!userId) {
        throw new NotFoundError(MESSAGE.PATIENT_NOT_FOUND);
      }

      const { chatSessionId } = req.params;

      if (!chatSessionId) {
        throw new NotFoundError(MESSAGE.CHAT_SESSION_NOT_FOUND);
      }

      const response = await this._getChat.execute(
        userId,
        chatSessionId as string,
        USER_ROLES.PATIENT
      );

      return apiResponse(
        res,
        HTTPStatus.OK,
        successResponse(response, "Chat Send Successfuly")
      );
    } catch (error) {
      next(error);
    }
  };

  getChatList = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;

      if (!userId) {
        throw new NotFoundError(MESSAGE.PATIENT_NOT_FOUND);
      }

      const response = await this._getChatList.execute(
        userId,
        USER_ROLES.PATIENT
      );

      return apiResponse(
        res,
        HTTPStatus.OK,
        successResponse(response, "Chat List Recieved Successfuly")
      );
    } catch (error) {
      next(error);
    }
  };

  sendMessage = async (req: Request, res: Response, next: NextFunction) => {
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
      const response = await this._sendMessage.execute(
        userId,
        chatSessionId as string,
        USER_ROLES.PATIENT,
        content
      );

      return apiResponse(
        res,
        HTTPStatus.OK,
        successResponse(response, "Chat Send Successfuly")
      );
    } catch (error) {
      next(error);
    }
  };
}
