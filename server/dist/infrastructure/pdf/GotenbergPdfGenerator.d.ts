import type { IPDFGeneratorService } from "#application/ports/services/IPDFGeneratorService.js";
import { Readable } from "stream";
export declare class GotenbergPdfGenerator implements IPDFGeneratorService {
    private readonly _gotenbergUrl;
    constructor(_gotenbergUrl: string);
    generate(html: string): Promise<Readable>;
}
//# sourceMappingURL=GotenbergPdfGenerator.d.ts.map