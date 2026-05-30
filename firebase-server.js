import express from "express";
import app from "./server.js";

const server = express();
server.use(app);

export default server;
