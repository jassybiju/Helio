export interface IReadNotificationUseCase {
  execute(userId: string, notificationId: string): Promise<void>;
}
