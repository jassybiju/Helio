export interface IAddMoneyUseCase {
  execute(
    userId: string,
    amount: number
  ): Promise<{
    transactionId: string;
    orderId: string;
    amount: number;
    currency: "INR";
  }>;
}
