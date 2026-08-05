import { ForbiddenError } from "#shared/errors/ForbiddenError.js";
export class PdfDispatcher {
    usecases;
    constructor(usecases) {
        this.usecases = usecases;
    }
    execute(request) {
        const usecase = this.usecases.get(request.type);
        if (!usecase) {
            throw new ForbiddenError("Unsupported PDF File");
        }
        return usecase.execute(request);
    }
}
//# sourceMappingURL=PdfDispatcher.js.map