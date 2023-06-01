import { Twilio } from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const phoneNumber = process.env.TWILIO_PHONE_NUMBER;

const client = new Twilio(accountSid, authToken);

export async function sendSms(to: string, body: string) {
  await client.messages.create({
    from: phoneNumber,
    to,
    body,
  });
}
