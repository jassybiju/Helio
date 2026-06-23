import { ChatMessage } from "@domain/entities/ChatMessage.ts";
import { BaseRepository } from "./BaseRepository.ts";
import {
  chatMessageModel,
  type ChatMessageRaw,
} from "../model/ChatMessageModel.ts";
import type { ILogger } from "@application/ports/services/ILogger.ts";
import type { ClientSession } from "mongoose";
import type { IChatMessageRepository } from "@application/ports/repositories/IChatMessageRepository.ts";
import { ChatMessageMapper } from "../../../mappers/ChatMessageMapper.ts";

export class ChatMessageRepository
  extends BaseRepository<ChatMessage, ChatMessageRaw>
  implements IChatMessageRepository
{
  constructor(
    private readonly _logger: ILogger,
    session?: ClientSession
  ) {
    super(chatMessageModel, session);
  }

  withSession(session: ClientSession): IChatMessageRepository {
    return new ChatMessageRepository(this._logger, session);
  }

  findById(id: string) {
    return super.findById(id, ChatMessageMapper.toDomain);
  }

  async create(chatMessage: ChatMessage): Promise<void> {
    await super.create(chatMessage, ChatMessageMapper.toPersistance);
  }
  async update(chatMessage: ChatMessage): Promise<void> {
    await super.update(
      chatMessage,
      chatMessage.id,
      ChatMessageMapper.toPersistance
    );
  }
  async delete(id: string): Promise<void> {
    await super.delete(id);
  }
}
