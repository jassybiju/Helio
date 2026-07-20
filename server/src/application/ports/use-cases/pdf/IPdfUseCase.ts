import type { Readable } from "stream";
import type { IPdfRequestDTO } from "./IPdfRequestDTO.ts";

export interface IPdfUseCase {
  execute(request: IPdfRequestDTO): Promise<Readable>;
}
