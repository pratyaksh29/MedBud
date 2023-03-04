import { Request, Response } from "express";
import { Answers } from "../middleware/answers";
import { Translator } from "../middleware/translate";
import * as service from "../services/query";

// prompts -> translator ->[en] -> chatgpt -> [eng] -> translator -> [detected lang] -> answers
export const postIssue = async (req: Request, res: Response) => {
  const prompt: string = req.body.prompt;
  // const phNumber: number = req.body.phNumber;
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
