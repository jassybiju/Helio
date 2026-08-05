export class RazorpayPaymentService {
    _razorpay;
    constructor(_razorpay) {
        this._razorpay = _razorpay;
    }
    async pay(data) {
        try {
            const order = await this._razorpay.orders.create({
                amount: Math.round(data.amount * 100),
                currency: "INR",
                receipt: data.appointment.id,
            });
            return {
                orderId: order.id,
                amount: data.amount,
                currency: "INR",
            };
        }
        catch (err) {
            console.dir(err, { depth: null });
            throw err;
        }
    }
}
//# sourceMappingURL=RazorpayPaymentService.js.map