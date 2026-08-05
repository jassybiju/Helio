import type { IPDFDispatcher } from "#application/ports/use-cases/pdf/IPdfDispatcher.js";
import type { IPdfRequestDTO } from "#application/ports/use-cases/pdf/IPdfRequestDTO.js";
import type { IPdfUseCase } from "#application/ports/use-cases/pdf/IPdfUseCase.js";
import { ForbiddenError } from "#shared/errors/ForbiddenError.js";
import type { PDF_TYPE } from "#shared/types/pdf.type.js";
import type { Readable } from "node:stream";

export class PdfDispatcher implements IPDFDispatcher {
  constructor(private readonly usecases: Map<PDF_TYPE, IPdfUseCase>) {}

  execute(request: IPdfRequestDTO): Promise<Readable> {
    const usecase = this.usecases.get(request.type);

    if (!usecase) {
      throw new ForbiddenError("Unsupported PDF File");
    }

    return usecase.execute(request);
  }
}
