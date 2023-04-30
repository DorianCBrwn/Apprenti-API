import express from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";

import * as userService from "./user.service";

export const userRouter = express.Router();

//Get list of all Users
userRouter.get("/", async (req: Request, res: Response) => {
  try {
    const users = await userService.listUsers();
    return res.status(200).json(users);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
});

// Get a single User
userRouter.get("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);
  try {
    const user = await userService.getUser(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
});
