import { Request,Response,NextFunction} from "express";

export const loggerMiddleware = ( req: Request, res: Response, next: NextFunction) => {
  const startTime = Date.now();

  res.on("finish", () => {
    const executionTime = Date.now() - startTime;

   console.log(`
    [${new Date().toISOString()}]
    ${req.method} ${req.originalUrl}
    Status: ${res.statusCode}
    Execution Time: ${executionTime}ms
    `);
  });

  next();
};