import type { PDF_TYPE } from "#shared/types/pdf.type.js";
export interface ITemplateRenderer {
    render(template: PDF_TYPE, model: unknown): Promise<string>;
}
//# sourceMappingURL=ITemplateRenderer.d.ts.map