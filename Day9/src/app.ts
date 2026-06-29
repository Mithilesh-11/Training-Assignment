import express from "express";
import contactRoutes from "./routes/contact.routes";
import { loggerMiddleware } from "./middleware/logger.middleware";
import { errorMiddleware } from "./middleware/error.middleware";

const app = express();

app.use(express.json());
app.use(loggerMiddleware);


app.use("/api", contactRoutes);
app.get(
  "/",
  (req, res) => {
    res.json({
      success: true,
      data: {
        message:"User Contact Book API Running"
      },
      error: null
    });
  }
);

app.use(errorMiddleware);

export default app;