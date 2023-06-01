import type { NextApiRequest, NextApiResponse } from "next";

//I have created a separate env file (these should be referenced with process.env.TOKEN)
//This doesn't work so left hardcoded for now.
require("dotenv").config();
const accountSid = "ACd0b0e732ed8d0b2c4fa10de618ad2945";
const authToken = "e7dbbf2b0de00c1972be59a04d834443";
const client = require("twilio")(accountSid, authToken);
var message =
  "Dear PATIENT, we regret to inform you that the clinic is currently running 45 minutes late. \n If you can no longer make this, please phone the surgery to cancel your appointment";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  client.messages
    .create({ body: message, from: "+447883318511", to: "+447770160480" })
    .then((message) => console.log(message.sid));
  res.status(200);
}
