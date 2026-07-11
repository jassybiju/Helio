import type { IPDFGeneratorService } from "@application/ports/services/IPDFGeneratorService.ts";
import { Readable } from "stream";
import { ReadableStream } from "stream/web";
export class GotenbergPdfGenerator implements IPDFGeneratorService {
  constructor(private readonly _gotenbergUrl: string) {}

  async generate(html: string): Promise<Readable> {
    const form = new FormData();
    form.append("outputFilename", "ABC");

    form.append("files", new Blob([html], { type: "text/html" }), "index.html");
    console.log(`${this._gotenbergUrl}/forms/chromium/convert/html`);

    const response = await fetch(
      `${this._gotenbergUrl}/forms/chromium/convert/html`,
      { method: "POST", body: form }
    );
    console.log(response);

    if (!response.ok) {
      throw new Error(
        "Failed to generate PDF. Gotenberg responed with " + response.status
      );
    }

    if (!response.body) {
      throw new Error("Gotenberg returned an empty response");
    }

    return Readable.fromWeb(response.body as ReadableStream);
  }
}
