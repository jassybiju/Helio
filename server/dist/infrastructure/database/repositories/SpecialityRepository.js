import { Specialty } from "#domain/entities/Specialty.js";
import { SpecialtyModel } from "../model/SpecialityModel.js";
export class SpecialtyRepository {
    async findAll() {
        const docs = await SpecialtyModel.find({ isActive: true }).lean();
        return docs.map((doc) => new Specialty(doc._id, doc.name, doc.description ?? "", doc.isActive));
    }
    async findById(id) {
        const doc = await SpecialtyModel.findById(id);
        if (!doc) {
            return null;
        }
        return new Specialty(doc._id, doc.name, doc.description ?? "", doc.isActive);
    }
    async create(data) {
        const existing = await SpecialtyModel.findOne({ name: data.name });
        if (existing) {
            throw new Error("Specialty already exists");
        }
        await SpecialtyModel.create({
            ...data,
            isActive: true,
        });
    }
    async findAllActive() {
        const docs = await SpecialtyModel.find({ isActive: true }).lean();
        return docs.map((doc) => new Specialty(doc._id, doc.name, doc.description ?? "", doc.isActive));
    }
    async delete(id) {
        await SpecialtyModel.updateOne({ _id: id }, { $set: { is_deleted: true } });
    }
    async findMany(filters) {
        const query = {};
        query.isActive = true;
        if (!filters.page) {
            filters.page = 1;
        }
        if (!filters.limit) {
            filters.limit = 5;
        }
        let skip = Math.max((filters.page - 1) * filters.limit, 0);
        const pipeline = [
            { $match: query },
            {
                $facet: {
                    data: [{ $skip: skip }, { $limit: filters.limit }],
                    totalCount: [{ $count: "count" }],
                },
            },
        ];
        const result = await SpecialtyModel.aggregate(pipeline);
        return {
            specialty: result[0].data,
            totalCount: result[0].totalCount[0]?.count ?? 0,
        };
    }
}
//# sourceMappingURL=SpecialityRepository.js.map