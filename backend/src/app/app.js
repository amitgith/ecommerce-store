import express from "express";
import appRoutes from "../routes/auth.routes.js";
import productRoutes from "../routes/product.routes.js";
import { fileURLToPath } from 'url';
import path from 'path';
import cookieParser from "cookie-parser";
import config from "../config/config.js";
const app = express();

// 1. ES Module mein __dirname ko aise banate hain:
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// middleware
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", appRoutes);
app.use("/api/products", productRoutes);
console.log(config.NODE_ENV)
if(config.NODE_ENV === 'production') {
    const buildPath = path.join(__dirname, '../../../frontend/dist');
    console.log(buildPath)
    app.use(express.static(buildPath))
    app.get("*any", (req, res) =>{
        res.sendFile(path.join(buildPath, 'index.html'))
    })
} else {
    app.get("/", (req, res) => {
        res.status(200).json({
            success: true,
            message: "Server is healthy"
        })
    })
}

export default app;
