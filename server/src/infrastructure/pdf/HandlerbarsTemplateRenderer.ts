import type { ITemplateRenderer } from "@application/ports/services/ITemplateRenderer.ts";
import type { PDF_TYPE } from "@shared/types/pdf.type.ts";
import path from "path";
import fs from "fs/promises";
import Handlebars from "handlebars";
export class HandlebarsTemplateRenderer implements ITemplateRenderer {
  private readonly templatePath = path.resolve(
    process.cwd(),
    "src/infrastructure/pdf/templates"
  );

  constructor() {}

  async render(template: PDF_TYPE, data: unknown): Promise<string> {
    const html = await fs.readFile(
      path.join(this.templatePath, `${template}.hbs`),
      "utf-8"
    );

    const compiled = Handlebars.compile(html);

    return compiled(data);
  }
}
