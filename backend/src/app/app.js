import express from "express";
import appRoutes from "../routes/auth.routes.js";
const app = express();
// middleware
app.use(express.json());
app.use("/api/auth", appRoutes);
export default app;
