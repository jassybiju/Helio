export interface IVectorDocument {
    content: string;
    metadata: Record<string, unknown>;
    pageContent: string;
}
export interface IVectorStoreService {
    addDocuments(documents: IVectorDocument[]): Promise<void>;
    search(query: string): Promise<IVectorDocument[]>;
}
//# sourceMappingURL=IVectorStoreService.d.ts.map