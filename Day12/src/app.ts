import express from "express";
import cors from "cors";
import { setupSwagger } from "./config/swagger.js";
import uploadRoutes from "./routes/upload.routes.js";
import { notFound } from "./middlewares/notFound.middleware.js";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express(); 


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

setupSwagger(app);

app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Upload Service API is running 🚀",
  });
});
app.use("/api/v1/upload", uploadRoutes);
app.use(notFound);


app.use(errorHandler);

export default app;