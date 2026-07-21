export interface IGetSpecialityUsecase {
  execute(data: {
    page?: number | undefined;
    limit?: number | undefined;
  }): Promise<{
    specialty: {
      _id: string;
      label: string;
      value: string;
    }[];
    count: number;
  }>;
}
