import { send } from "process";
import { Twilio } from "twilio";
import { keys } from "../../../config";
const accountSid = keys.TWILIO_ACCOUNT_SID;
const authToken = keys.TWILIO_AUTH_TOKEN;
const twilioNumber = keys.TWILIO_PHONE_NUMBER;
const myNumber = keys.MY_NUMBER;

class TwilioService {
  private client: Twilio;

  constructor() {
    this.client = new Twilio(accountSid, authToken);
  }

  public sendSMS(message: string) {
    return this.client.messages.create({
      from: twilioNumber,
      to: myNumber,
      body: message,
    });
  }
}

export default TwilioService;

// const main = async () => {
//   const translator = new TwilioService();
//   const response = await translator.sendSMS("Hello World");
//   console.log("🚀 ~ file: twillio.ts:30 ~ main ~ response:", response);
// };

// main();
