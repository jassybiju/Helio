import path from "path";
import fs from "fs/promises";
import Handlebars from "handlebars";
export class HandlebarsTemplateRenderer {
    templatePath = path.resolve(process.cwd(), "src/infrastructure/pdf/templates");
    constructor() { }
    async render(template, data) {
        const html = await fs.readFile(path.join(this.templatePath, `${template}.hbs`), "utf-8");
        const compiled = Handlebars.compile(html);
        return compiled(data);
    }
}
//# sourceMappingURL=HandlerbarsTemplateRenderer.js.map