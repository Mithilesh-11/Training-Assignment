import express from "express";
import cookieParser from "cookie-parser";
import contactRoutesV2 from "./routes/contact.routes";
import reportsRoutesV2 from "./routes/reports.routes";
import authRoutesV2 from "./routes/auth.routes";
import { loggerMiddleware } from "./middleware/logger.middleware";
import { errorMiddleware } from "./middleware/error.middleware";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(loggerMiddleware);

app.use("/api/v2", contactRoutesV2);
app.use("/api/v2", reportsRoutesV2);
app.use("/api/v2/auth", authRoutesV2);

app.get("/", (_req, res) => {
  res.json({
    success: true,
    data: {
      message: "CRM Lite API Running",
      versions: {
        v2: "/api/v2/contacts  (MySQL + pagination + search + audit logs)",
        reports: "/api/v2/reports/contacts-stats",
      },
    },
    error: null,
  });
});

app.use(errorMiddleware);

export default app;
