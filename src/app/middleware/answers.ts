const { Configuration, OpenAIApi } = require("openai");
import { keys } from "../../../config";

export class Answers {
  key: string;
  constructor() {
    this.key = keys.ANSWER_KEY;
  }

  public getAnswer = async (question: string) => {
    const configuration = new Configuration({
      apiKey: this.key,
    });
    const openai = new OpenAIApi(configuration);
    const prompt: string = `I have ${question}. Give me different ways to self treat it. If my symptoms are too severe then please give the desired solution explain it in less than 160 characters`;

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 100,
      temperature: 0.4,
    });
    return response.data.choices[0].text;
  };
}

// Path: src/app/middleware/twillio.ts
