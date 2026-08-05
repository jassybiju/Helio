export interface PaginationType {
    totalCount: number;
    page: number;
    limit: number;
}
export interface PaginationResponse<T> {
    data: T;
    pagination: PaginationType;
}
//# sourceMappingURL=pagination.types.d.ts.map