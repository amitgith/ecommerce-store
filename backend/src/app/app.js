import express from "express";
import appRoutes from "../routes/auth.routes.js";
const app = express();
app.use("/api/auth", appRoutes);
export default app;
