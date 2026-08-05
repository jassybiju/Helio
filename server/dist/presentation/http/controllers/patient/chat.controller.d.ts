import type { IGetChatListUseCase } from "#application/ports/use-cases/chat/IGetChatListUseCase.js";
import type { IGetChatUseCase } from "#application/ports/use-cases/chat/IGetChatUseCase.js";
import type { ISendMessageUseCase } from "#application/ports/use-cases/chat/ISendMessageUseCase.js";
import type { NextFunction, Request, Response } from "express";
export declare class PatientChatController {
    private readonly _sendMessage;
    private readonly _getChatList;
    private readonly _getChat;
    constructor(_sendMessage: ISendMessageUseCase, _getChatList: IGetChatListUseCase, _getChat: IGetChatUseCase);
    getChat: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
    getChatList: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
    sendMessage: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
}
//# sourceMappingURL=chat.controller.d.ts.map