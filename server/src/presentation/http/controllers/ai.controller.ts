import type { IAIChatBotUseCase } from "#application/ports/use-cases/ai/IAIChatBotUseCase.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";
import {
  apiResponse,
  successResponse,
} from "#shared/utils/apiReponse.utils.js";
import type { NextFunction, Request, Response } from "express";

export class AIController {
  constructor(private readonly _aiChatBotUseCase: IAIChatBotUseCase) {}

  chat = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const patientId = req.user?.id;
      const { message, conversationId } = req.body as {
        message: string;
        conversationId: string | null;
      };
      if (!patientId) {
        throw new Error("Patient Id not found");
      }

      const response = await this._aiChatBotUseCase.execute(
        patientId,
        message,
        conversationId
      );

      return apiResponse(
        res,
        HTTPStatus.OK,
        successResponse(response, "AI MESAGE GOT")
      );
    } catch (error) {
      next(error);
    }
  };
}
