export interface IGetSpecialityUsecase {
  execute(): Promise<
    {
      label: string;
      value: string;
    }[]
  >;
}
