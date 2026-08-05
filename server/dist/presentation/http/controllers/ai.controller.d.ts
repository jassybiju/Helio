import type { IAIChatBotUseCase } from "#application/ports/use-cases/ai/IAIChatBotUseCase.js";
import type { NextFunction, Request, Response } from "express";
export declare class AIController {
    private readonly _aiChatBotUseCase;
    constructor(_aiChatBotUseCase: IAIChatBotUseCase);
    chat: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
}
//# sourceMappingURL=ai.controller.d.ts.map