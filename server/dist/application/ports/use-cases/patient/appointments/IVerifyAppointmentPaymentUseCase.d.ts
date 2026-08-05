export interface VerifyAppointmentPaymentInput {
    appointmentId: string;
    patientId: string;
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
}
export interface IVerifyAppointmentPaymentUseCase {
    execute(data: VerifyAppointmentPaymentInput): Promise<void>;
}
//# sourceMappingURL=IVerifyAppointmentPaymentUseCase.d.ts.map