import type { Readable } from "stream";

export interface IPDFGeneratorService {
  generate(html: string): Promise<Readable>;
}
