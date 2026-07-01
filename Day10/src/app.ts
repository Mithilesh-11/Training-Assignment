import express from "express";
import { createContactRoutes } from "./routes/contact.routes";
import { createContactRoutesV2 } from "./routes/v2/contact.routes";
import reportsRoutesV2 from "./routes/v2/reports.routes";
import { loggerMiddleware } from "./middleware/logger.middleware";
import { errorMiddleware } from "./middleware/error.middleware";
import { ContactService } from "./services/contact.service";
import { ContactServiceV2 } from "./services/v2/contact.service";

const app = express();
const contactService = new ContactService();
const contactServiceV2 = new ContactServiceV2();

app.use(express.json());
app.use(loggerMiddleware);

app.use("/api/v1", createContactRoutes(contactService));
app.use("/api/v2", createContactRoutesV2(contactServiceV2));
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
