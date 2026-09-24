import express from "express";
import appRoutes from "../routes/auth.routes.js";
import productRoutes from "../routes/product.routes.js";
import cookieParser from "cookie-parser";
const app = express();
// middleware
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", appRoutes);
app.use("/api/products", productRoutes);
export default app;
