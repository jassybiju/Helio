import type { IPDFDispatcher } from "@application/ports/use-cases/pdf/IPdfDispatcher.ts";
import type { IPdfRequestDTO } from "@application/ports/use-cases/pdf/IPdfRequestDTO.ts";
import type { IPdfUseCase } from "@application/ports/use-cases/pdf/IPdfUseCase.ts";
import { ForbiddenError } from "@shared/errors/ForbiddenError.ts";
import type { PDF_TYPE } from "@shared/types/pdf.type.ts";
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
