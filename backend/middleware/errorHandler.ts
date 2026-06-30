import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error("Centralized Error Handler caught:", err);

  const statusCode = err.status || 500;
  const message = err.message || "An unexpected database or server error occurred.";

  res.status(statusCode).json({
    status: statusCode,
    error: message,
  });
};
