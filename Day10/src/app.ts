import express from "express";
import contactRoutesV1 from "./routes/contact.routes";
import contactRoutesV2 from "./routes/v2/contact.routes";
import reportsRoutesV2 from "./routes/v2/reports.routes";
import { loggerMiddleware } from "./middleware/logger.middleware";
import { errorMiddleware } from "./middleware/error.middleware";

const app = express();

app.use(express.json());
app.use(loggerMiddleware);

app.use("/api/v1", contactRoutesV1);
app.use("/api/v2", contactRoutesV2);
app.use("/api/v2", reportsRoutesV2);

app.get("/", (_req, res) => {
  res.json({
    success: true,
    data: {
      message: "CRM Lite API Running",
      versions: {
        v1: "/api/v1/contacts  (in-memory)",
        v2: "/api/v2/contacts  (MySQL + pagination + search + audit logs)",
        reports: "/api/v2/reports/contacts-stats",
      },
    },
    error: null,
  });
});

app.use(errorMiddleware);

export default app;
