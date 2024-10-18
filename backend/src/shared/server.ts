import express from "express";
import authRoutes from "../routes/AuthRoutes";

const app = express();
app.use(express.json());
app.use("/auth", authRoutes);

export { app };
