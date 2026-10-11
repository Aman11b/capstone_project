import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";

export function requireAdmin(
  req: Request,
  _req: Response,
  next: NextFunction,
): void {
  if (req.user?.role !== "ADMIN") {
    next(new AppError(403, "AAdmin access required."));
    return;
  }

  next();
}
