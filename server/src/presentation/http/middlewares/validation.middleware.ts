import { ValidationError } from "@shared/errors/ValidationError.ts";
import type { NextFunction, Request, Response } from "express";
import type { ZodType } from "zod";

export const validate =
  (
    schema: ZodType<{
      body?: unknown;
      params?: Record<string, string>;
      query?: unknown;
    }>
  ) =>
  (req: Request, res: Response, next: NextFunction) => {
    const parsed = schema.safeParse({
      body: req.body,
      params: req.params,
      query: req.query,
    });

    if (!parsed.success) {
      return next(
        new ValidationError(
          parsed.error.issues[0]?.message ?? "Validation Error"
        )
      );
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
