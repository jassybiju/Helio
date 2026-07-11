export interface IGetAllNotificationUseCase {
  execute(
    userId: string,
    page: number,
    limit: number
  ): Promise<{
    notifications: {
      id: string;
      heading: string;
      message: string;
      isRead: boolean;
      createdAt: string;
    }[];
    page: number;
    limit: number;
    hasMore: boolean;
  }>;
}
