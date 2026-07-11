import type { Readable } from "stream";
import type { IPdfRequestDTO } from "./IPdfRequestDTO.ts";

export interface IPDFDispatcher {
  execute(request: IPdfRequestDTO): Promise<Readable>;
}
