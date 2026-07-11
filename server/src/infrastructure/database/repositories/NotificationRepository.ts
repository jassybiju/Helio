import type { INotificationRepository } from "@application/ports/repositories/INotificationRepository.ts";
import { BaseRepository } from "./BaseRepository.ts";
import {
  notificationModel,
  type NotificationRaw,
} from "../model/NotificationModel.ts";
import type { ClientSession, PipelineStage } from "mongoose";
import type { ILogger } from "@application/ports/services/ILogger.ts";
import { NotificationMapper } from "../../../mappers/NotificationMapper.ts";
import { Notification } from "@domain/entities/Notification.ts";

export class NotificationRepository
  extends BaseRepository<Notification, NotificationRaw>
  implements INotificationRepository
{
  constructor(
    private readonly _logger: ILogger,
    session?: ClientSession
  ) {
    super(notificationModel, session);
  }
  withSession(session: ClientSession): INotificationRepository {
    return new NotificationRepository(this._logger, session);
  }
  create(notification: Notification): Promise<void> {
    return super.create(notification, NotificationMapper.toPersistance);
  }

  findById(id: string): Promise<Notification | null> {
    return super.findById(id, NotificationMapper.toDomain);
  }

  update(notification: Notification): Promise<void> {
    return super.update(
      notification,
      notification.id,
      NotificationMapper.toPersistance
    );
  }

  delete(id: string): Promise<void> {
    return super.delete(id);
  }

  async findAllByUserId(
    userId: string,
    limit: number,
    page: number
  ): Promise<{ notifications: Notification[]; hasMore: boolean }> {
    const skip = Math.max(0, (page - 1) * limit);
    const pipeline: PipelineStage[] = [
      { $match: { user_id: userId } },
      { $sort: { created_at: -1, _id: -1 } },
      { $skip: skip },
      { $limit: limit + 1 },
    ];
    const docs = await super.aggregate<NotificationRaw>(pipeline);
    // this._logger.debug("docs",{docs,pipeline})
    console.log(
      "RAW IDS:",
      docs.map((d) => d._id)
    );
    return {
      notifications: docs.slice(0, limit).map(NotificationMapper.toDomain),
      hasMore: docs.length > limit,
    };
  }
}
