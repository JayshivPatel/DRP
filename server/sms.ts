import { Twilio } from "twilio";

const phoneNumber = process.env.TWILIO_PHONE_NUMBER;
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

/* Lazy initialize client for tests */
const getClient = (function () {
  let client: Twilio | null = null;

  return () => (client = client || new Twilio(accountSid, authToken));
})();

export async function sendSms(to: string, body: string) {
  await getClient().messages.create({
    from: phoneNumber,
    to,
    body,
  });
}
