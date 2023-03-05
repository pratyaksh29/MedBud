import { Request, Response } from "express";
import * as service from "../services/mother";

export const addMother = async (req: Request, res: Response) => {
  const { phNumber, natalSupport } = req.body;
  const response = await service.addMother(phNumber, natalSupport);
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

// Path: src/app/services/mother.ts
