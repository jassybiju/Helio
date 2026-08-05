import { Readable } from "stream";
import { ReadableStream } from "stream/web";
export class GotenbergPdfGenerator {
    _gotenbergUrl;
    constructor(_gotenbergUrl) {
        this._gotenbergUrl = _gotenbergUrl;
    }
    async generate(html) {
        const form = new FormData();
        form.append("outputFilename", "ABC");
        form.append("files", new Blob([html], { type: "text/html" }), "index.html");
        const response = await fetch(`${this._gotenbergUrl}/forms/chromium/convert/html`, { method: "POST", body: form });
        if (!response.ok) {
            throw new Error("Failed to generate PDF. Gotenberg responed with " + response.status);
        }
        if (!response.body) {
            throw new Error("Gotenberg returned an empty response");
        }
        return Readable.fromWeb(response.body);
    }
}
//# sourceMappingURL=GotenbergPdfGenerator.js.map