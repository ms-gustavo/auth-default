import session from "express-session";
import { RequestHandler } from "express";
import dotenv from "dotenv";
dotenv.config();

const sessionMiddleware: RequestHandler = session({
  secret: process.env.SECRET_KEY!,
  resave: false,
  saveUninitialized: true,
});

export default sessionMiddleware;
