import type { NextApiRequest, NextApiResponse } from "next";
import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);
const message =
  "Dear PATIENT, we regret to inform you that the clinic is currently running 45 minutes late. \n If you can no longer make this, please phone the surgery to cancel your appointment";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  client.messages
    .create({ body: message, from: "+447862128714", to: "+447770160480" })
    .then((message) => console.log(message.sid));
  res.status(200);
}
