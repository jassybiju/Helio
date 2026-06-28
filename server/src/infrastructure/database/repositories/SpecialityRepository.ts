import { Specialty } from "@domain/entities/Specialty.ts";
import { SpecialtyModel } from "../model/SpecialityModel.ts";
import type { ISpecialityRepository } from "@application/ports/repositories/ISpeicaltyRepository.ts";
import type { PipelineStage } from "mongoose";

export class SpecialtyRepository implements ISpecialityRepository {
  async findAll() {
    const docs = await SpecialtyModel.find({ isActive: true }).lean();
    return docs.map(
      (doc) =>
        new Specialty(doc._id, doc.name, doc.description ?? "", doc.isActive)
    );
  }

  async findById(id: string) {
    const doc = await SpecialtyModel.findById(id);
    if (!doc) {
      return null;
    }

    return new Specialty(
      doc._id,
      doc.name,
      doc.description ?? "",
      doc.isActive
    );
  }

  async create(data: { _id: string; name: string; description?: string }) {
    const existing = await SpecialtyModel.findOne({ name: data.name });

    if (existing) {
      throw new Error("Specialty already exists");
    }

    await SpecialtyModel.create({
      ...data,
      isActive: true,
    });
  }

  async findAllActive(): Promise<Specialty[]> {
    const docs = await SpecialtyModel.find({ isActive: true }).lean();
    return docs.map(
      (doc) =>
        new Specialty(doc._id, doc.name, doc.description ?? "", doc.isActive)
    );
  }

  async delete(id: string): Promise<void> {
    await SpecialtyModel.deleteOne({ _id: id });
  }

  async findMany(filters: { page?: number; limit?: number }) {
    const query: Record<string, unknown> = {};

    query.isActive = true;
    if (!filters.page) {
      filters.page = 1;
    }
    if (!filters.limit) {
      filters.limit = 5;
    }

    let skip: number = Math.max((filters.page - 1) * filters.limit, 0);

    const pipeline: PipelineStage[] = [
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
