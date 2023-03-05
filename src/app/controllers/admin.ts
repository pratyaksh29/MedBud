import { Request, Response } from "express";
import * as service from "../services/admin";

export const getUser = async (req: Request, res: Response) => {
  const response = await service.getUser(req.body.phNumber);
  try {
    res.json(response);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const getUsers = async (req: Request, res: Response) => {
  const response = await service.getUsers(req.body.location);
  try {
    res.json(response);
  } catch (err) {
    res.status(500).send(err);
  }
};
