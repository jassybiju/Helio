export interface IGetAllSpecialityUseCase {
  execute(): Promise<{ label: string; value: string }[]>;
}
