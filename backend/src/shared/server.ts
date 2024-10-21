import express from "express";
import cors from "cors";
import authRoutes from "../routes/AuthRoutes";
import providerRoutes from "../routes/ProviderRoutes";
import sessionMiddleware from "../middlewares/session.middleware";
import passport from "../services/Passport/passport";

const app = express();
app.use(cors());
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/", providerRoutes);

export { app };
