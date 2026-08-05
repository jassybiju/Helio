import type { Readable } from "stream";
import type { IPdfRequestDTO } from "./IPdfRequestDTO.js";
export interface IPDFDispatcher {
    execute(request: IPdfRequestDTO): Promise<Readable>;
}
//# sourceMappingURL=IPdfDispatcher.d.ts.map