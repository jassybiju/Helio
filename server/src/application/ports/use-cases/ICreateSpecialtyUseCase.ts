export interface ICreateSpecialtyUseCase {
  execute(input: {
    name: string;
    description?: string;
  }): Promise<{ id: string }>;
}
