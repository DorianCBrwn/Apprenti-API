import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
dotenv.config();

import { userRouter } from "./user/user.router";

if (!process.env.PORT) {
  console.log(`Error to get ports ${process.env.PORT}`);

  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const server = express();
server.use(cors());
server.use(express.json());
server.use("/api/users", userRouter);

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
