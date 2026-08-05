import type { ITemplateRenderer } from "#application/ports/services/ITemplateRenderer.js";
import type { PDF_TYPE } from "#shared/types/pdf.type.js";
export declare class HandlebarsTemplateRenderer implements ITemplateRenderer {
    private readonly templatePath;
    constructor();
    render(template: PDF_TYPE, data: unknown): Promise<string>;
}
//# sourceMappingURL=HandlerbarsTemplateRenderer.d.ts.map