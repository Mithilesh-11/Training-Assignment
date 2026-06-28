import { Request, Response, NextFunction } from "express";
import { ReportsService } from "../services/reports.service";

const service = new ReportsService();

// ─── GET /api/v2/reports/contacts-stats ─────────────────────────────────
export const getContactStats = async (req: Request,res: Response,next: NextFunction): Promise<void> => {
  try {
    const stats = await service.getContactStats(req.user!);

    res.status(200).json({
      success: true,
      data: stats,
      error: null,
    });
  } catch (error) {
    next(error);
  }
};
