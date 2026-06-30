import { Request, Response, NextFunction } from "express";

export const validateCustomer = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let { name } = req.body;

  if (name === undefined || name === null) {
    res.status(400).json({ error: "Customer name is required." });
    return;
  }

  name = String(name).trim();

  if (name.length === 0) {
    res.status(400).json({ error: "Customer name cannot be empty." });
    return;
  }

  if (name.length > 50) {
    res.status(400).json({ error: "Customer name must be 50 characters or less." });
    return;
  }

  // Update request body with the trimmed name
  req.body.name = name;
  next();
};
