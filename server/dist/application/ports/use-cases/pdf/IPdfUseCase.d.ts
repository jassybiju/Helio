import type { Readable } from "stream";
import type { IPdfRequestDTO } from "./IPdfRequestDTO.js";
export interface IPdfUseCase {
    execute(request: IPdfRequestDTO): Promise<Readable>;
}
//# sourceMappingURL=IPdfUseCase.d.ts.map