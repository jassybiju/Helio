import { ValidationError } from "#shared/errors/ValidationError.js";
export const validate = (schema) => (req, res, next) => {
    const parsed = schema.safeParse({
        body: req.body,
        params: req.params,
        query: req.query,
    });
    if (!parsed.success) {
        return next(new ValidationError(parsed.error.issues[0]?.message ?? "Validation Error"));
    }
    if (parsed.data.body) {
        req.body = parsed.data.body;
    }
    if (parsed.data.params) {
        req.params = parsed.data.params;
    }
    if (parsed.data.query) {
        Object.defineProperty(req, "query", {
            ...Object.getOwnPropertyDescriptor(req, "query"),
            writable: true,
            value: { ...parsed.data.query },
        });
    }
    next();
};
//# sourceMappingURL=validation.middleware.js.map