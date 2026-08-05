export interface AddMoneyVerifyInput {
    userId: string;
    transactionId: string;
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
}
export interface IAddMoneyVerifyUseCase {
    execute(data: AddMoneyVerifyInput): Promise<void>;
}
//# sourceMappingURL=IAddMoneyVerifyUseCase.d.ts.map