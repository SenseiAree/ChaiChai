import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { jsonLimit, urlencodedLimit } from "./constants.js";

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express.json({ limit: jsonLimit }));
app.use(express.urlencoded({ extended: true, limit: urlencodedLimit }));
app.use(express.static("public"));
app.use(cookieParser());

export { app };
