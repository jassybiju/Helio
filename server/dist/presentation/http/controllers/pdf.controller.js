import { pipeline } from "stream/promises";
export class GeneratePDFController {
    _pdfDispatcher;
    constructor(_pdfDispatcher) {
        this._pdfDispatcher = _pdfDispatcher;
    }
    generate = async (req, res, next) => {
        try {
            const { type, resource_id, from, to } = req.body;
            let pdfStream = await this._pdfDispatcher.execute({
                type,
                resource_id,
                from,
                to,
                currentUser: req.user,
            });
            res.setHeader("Content-Type", "application/pdf");
            res.setHeader("Content-Disposition", `attachment; filename="${type}-${resource_id}.pdf"`);
            await pipeline(pdfStream, res);
        }
        catch (error) {
            next(error);
        }
    };
}
//# sourceMappingURL=pdf.controller.js.map