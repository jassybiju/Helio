export interface IBaseMapper<T, Model> {
    toDomain(raw: Model): T;
    toPersistance(t: T): Model;
}
//# sourceMappingURL=IBaseMapper.d.ts.map