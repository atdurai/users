import { Request, Response } from "express";
import User from "../adapter/user";

export const createUser = async (req: Request, res: Response) => {
  const user = await User.create(req.body);
  res.status(201).json(user);
};

export const getUser = (req: Request, res: Response) => {
  res.status(200).json({});
};

export const getUserById = (req: Request, res: Response) => {
  const { id } = req.params;
  const user = {};
  if (!user) {
    res.status(404).send("Item not found");
    return;
  }
  res.status(200).json(user);
};

export const updateUserById = (req: Request, res: Response) => {
  const { id } = req.params;
  const {} = req.body;
  // action
  res.status(200).json({});
};
