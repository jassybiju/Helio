import { nanoid } from "nanoid";
export class NanoidGenerator {
    generate(append) {
        return append + "_" + nanoid(12);
    }
}
//# sourceMappingURL=NanoidGenerator.js.map