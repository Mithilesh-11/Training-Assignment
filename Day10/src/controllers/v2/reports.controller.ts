import { Request, Response, NextFunction } from "express";
import { ReportsService } from "../../services/v2/reports.service";
import { sendSuccessResponse } from "../../utils/response";

const service = new ReportsService();

// ─── GET /api/v2/reports/contacts-stats ─────────────────────────────────
export const getContactStats = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const stats = await service.getContactStats();

    sendSuccessResponse(res, 200, stats);
  } catch (error) {
    next(error);
  }
};
