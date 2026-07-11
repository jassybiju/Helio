import type { IPDFDispatcher } from "@application/ports/use-cases/pdf/IPdfDispatcher.ts";
import type { NextFunction, Request, Response } from "express";
import { pipeline } from "stream/promises";
export class GeneratePDFController {
  constructor(private readonly _pdfDispatcher: IPDFDispatcher) {}

  generate = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { type, resource_id, from, to } = req.body;
      console.log(req.body, req.params, req.query);
      let pdfStream = await this._pdfDispatcher.execute({
        type,
        resource_id,
        from,
        to,
        currentUser: req.user!,
      });

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${type}-${resource_id}.pdf"`
      );

      await pipeline(pdfStream, res);
    } catch (error) {
      next(error);
    }
  };
}
