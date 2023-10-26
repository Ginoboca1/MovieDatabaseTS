import { ServerApp } from "./server";
import express, { Router } from "express";
import dotenv from "dotenv";
import indexRoutes from "./routes/index";
import "./db";

dotenv.config();

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

const routes = express.Router();
routes.use("/api", indexRoutes);

const server = new ServerApp({ port, routes });
server.start();
