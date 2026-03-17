import type { IIDGenerator } from "@application/ports/services/IIDGenerator.ts";
import { nanoid } from "nanoid";

export class NanoidGenerator implements IIDGenerator {
  generate(append: string): string {
    return append + nanoid(12)
  }
}