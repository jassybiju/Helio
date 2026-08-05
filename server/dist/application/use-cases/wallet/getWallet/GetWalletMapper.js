export class GetWalletMapper {
    static toDto({ balance, transactions, totalCount, limit, page, }) {
        return {
            balance: balance,
            transactions: transactions.map((transaction) => ({
                id: transaction.id,
                amount: transaction.amount,
                date: transaction.createdAt.toISOString(),
                type: transaction.type,
                description: transaction.description,
                status: transaction.status,
            })),
            limit,
            totalCount,
            page,
        };
    }
}
//# sourceMappingURL=GetWalletMapper.js.map