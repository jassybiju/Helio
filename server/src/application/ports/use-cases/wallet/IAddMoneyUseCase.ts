export interface IAddMoneyUseCase {
  execute(userId: string, amount: number): Promise<void>;
}
