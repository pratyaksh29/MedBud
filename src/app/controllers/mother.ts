import { Request, Response } from "express";
import * as service from "../services/mother";

export const addMother = async (req: Request, res: Response) => {
  const { number, natalSupport } = req.body;
  const response = await service.addMother(number, natalSupport);
  try {
    res.json(response);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const getMother = async (req: Request, res: Response) => {
  const response = await service.getMother();
  try {
    res.json(response);
  } catch (err) {
    res.status(500).send(err);
  }
};
