import type { IPDFDispatcher } from "#application/ports/use-cases/pdf/IPdfDispatcher.js";
import type { IPdfRequestDTO } from "#application/ports/use-cases/pdf/IPdfRequestDTO.js";
import type { IPdfUseCase } from "#application/ports/use-cases/pdf/IPdfUseCase.js";
import type { PDF_TYPE } from "#shared/types/pdf.type.js";
import type { Readable } from "node:stream";
export declare class PdfDispatcher implements IPDFDispatcher {
    private readonly usecases;
    constructor(usecases: Map<PDF_TYPE, IPdfUseCase>);
    execute(request: IPdfRequestDTO): Promise<Readable>;
}
//# sourceMappingURL=PdfDispatcher.d.ts.map