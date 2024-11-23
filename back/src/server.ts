import express from "express";
import usersRouter from "./routes/usersRouter";
import appointmentsRouter from "./routes/appointmentsRouter";
import cors from "cors";

const server = express();

server.use(express.json());
server.use(cors());
server.use("/users", usersRouter);
server.use("/appointments", appointmentsRouter);
export default server;
