import { Request, Response } from "express";
import { Answers } from "../middleware/answers";
import { Translator } from "../middleware/translate";
import * as service from "../services/query";

// prompts -> translator ->[en] -> chatgpt -> [eng] -> translator -> [detected lang] -> answers
export const postIssue = async (req: Request, res: Response) => {
  const prompt: string = req.body.prompt;
  const user = await service.upsertUser(req.body.phNumber, req.body.location);
  const data = await service.addPrompt(req.body.phNumber, req.body.prompt);
  // translator part
  const translator = new Translator();
  const question = await translator.translateText(prompt, "en");

  const answers = new Answers();
  const answer = await answers.getAnswer(question.translatedText);

  const ans = await translator.translateText(answer, question.detectLang);

  try {
    res.json(ans);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const getPrompts = async (req: Request, res: Response) => {
  const phNumber: number = req.body.phNumber;
  const prompts = await service.fetchPrompts(phNumber);

  try {
    res.json(prompts);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const getLocations = async (req: Request, res: Response) => {
  const phNumber: number = req.body.phNumber;
  const locations = await service.fetchLocation(phNumber);
  try {
    res.json(locations);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const getNearbyHospital = async (req: Request, res: Response) => {
  const response = await service.nearbyHospital(req.body.location);

  try {
    res.json(response);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const emergency = async (req: Request, res: Response) => {
  const response = await service.emergency(req.body.phNumber);
  try {
    res.json(response);
  } catch (err) {
    res.status(500).send(err);
  }
};
