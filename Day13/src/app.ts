import express from "express";
import dotenv from "dotenv";

import orderRoutes from "./routes/order.routes";

import { errorMiddleware } from "./middlewares/error.middleware";
import { notFoundMiddleware } from "./middlewares/notFound.middleware";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/orders", orderRoutes);

app.use(notFoundMiddleware);

app.use(errorMiddleware);

export default app;