export interface IGetSpecialityUsecase {
  execute(data: {
    page?: number | undefined;
    limit?: number | undefined;
  }): Promise<
    {
      label: string;
      value: string;
    }[]
  >;
}
