import { Request, Response } from "express";
import { Answers } from "../middleware/answers";
import { Translator } from "../middleware/translate";
import TwilioService from "../middleware/twillio";
import * as service from "../services/query";

// prompts -> translator ->[en] -> chatgpt -> [eng] -> translator -> [detected lang] -> answers
export const postIssue = async (req: Request, res: Response) => {
  const prompt: string = req.body.prompt;
  // const user = await service.upsertUser(req.body.phNumber, req.body.location);
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
  const phNumber: string = req.body.phNumber;
  const prompts = await service.fetchPrompts(phNumber);

  try {
    res.json(prompts);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const getLocations = async (req: Request, res: Response) => {
  const phNumber: string = req.body.phNumber;
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
  const message = new TwilioService();
  const location = response.data?.Location?.location;
  const sendMessage = `People dying pls help -> ${req.body.phNumber} + ${location}`;
  const msg = await message.sendSMS(`${sendMessage}`);
  try {
    res.json(response);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const getLanguage = async (req: Request, res: Response) => {
  const translator = new Translator();
  const response = await translator.translateText2(
    req.body.text,
    req.body.lang_translate
  );
  try {
    res.json(response);
  } catch (err) {
    res.status(500).send(err);
  }
};
