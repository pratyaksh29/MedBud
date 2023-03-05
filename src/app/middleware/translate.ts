import axios, { AxiosRequestConfig } from "axios";
import { response } from "express";
import { keys } from "../../../config";
export class Translator {
  KEY: string;
  HOST: string;

  constructor() {
    this.KEY = keys.TRANSLATE_KEY;
    this.HOST = keys.TRANSLATE_HOST;
  }

  public translate = async (text: string, source: string, target: string) => {
    const data = {
      q: text,
      source: source,
      target: target,
    };
    const options = {
      method: "POST",
      url: "https://deep-translate1.p.rapidapi.com/language/translate/v2",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": this.KEY,
        "X-RapidAPI-Host": this.HOST,
      },
      data: `${JSON.stringify(data)}`,
    };
    const response = await axios
      .request(options as AxiosRequestConfig)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error;
      });

    return response.data;
  };

  public detect = async (text: string) => {
    const data = {
      q: text,
    };
    const options = {
      method: "POST",
      url: "https://deep-translate1.p.rapidapi.com/language/translate/v2/detect",
      headers: {
        "X-RapidAPI-Key": this.KEY,
        "X-RapidAPI-Host": this.HOST,
      },
      data: `${JSON.stringify(data)}`,
    };

    const response = await axios
      .request(options as AxiosRequestConfig)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error(error);
      });

    return response.data.detections[0].language;
  };
  public async translateText(text: string, lang_translate: string) {
    const detectLang: string = await this.detect(text);
    const response = await this.translate(text, detectLang, lang_translate);
    const translatedText = response.translations.translatedText;
    return { translatedText, detectLang };
  }
  public async translateText2(text: string, lang_translate: string) {
    const detectLang: string = await this.detect(text);
    const response = await this.translate(text, detectLang, lang_translate);
    const translatedText = response.translations.translatedText;
    return translatedText;
  }
}

// const main = async () => {
//   const translator = new Translator();
//   const response = await translator.translateText(" World!" , "hi");
//   console.log("🚀 ~ file: translate.ts:77 ~ main ~ response:", response.translatedText)
//   console.log("🚀 ~ file: translate.ts:76 ~ main ~ response:", response.detectLang)
// };

// main();
