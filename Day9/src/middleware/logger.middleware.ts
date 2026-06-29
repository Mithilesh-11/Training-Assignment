import { Request, Response, NextFunction } from "express";

const SENSITIVE_FIELDS = [
  "password",
  "confirmPassword",
  "token",
  "accessToken",
  "refreshToken",
  "authorization",
  "cookie",
];

const sanitize = (data: Record<string, unknown>) => {
  const sanitized = { ...data };

  for (const field of SENSITIVE_FIELDS) {
    if (field in sanitized) {
      sanitized[field] = "***";
    }
  }

  return sanitized;
};

export const loggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const startTime = Date.now();

  res.on("finish", () => {
    const executionTime = Date.now() - startTime;

    console.log({
      timestamp: new Date().toISOString(),
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      executionTime: `${executionTime}ms`,
      params: req.params,
      query: sanitize(req.query as Record<string, unknown>),
      body: sanitize(req.body as Record<string, unknown>),
    });
  });

  next();
};