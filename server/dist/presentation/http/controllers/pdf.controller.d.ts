import type { IPDFDispatcher } from "#application/ports/use-cases/pdf/IPdfDispatcher.js";
import type { NextFunction, Request, Response } from "express";
export declare class GeneratePDFController {
    private readonly _pdfDispatcher;
    constructor(_pdfDispatcher: IPDFDispatcher);
    generate: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
//# sourceMappingURL=pdf.controller.d.ts.map