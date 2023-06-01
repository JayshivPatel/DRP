import type { NextApiRequest, NextApiResponse } from "next";

import { sendSms } from "../../server/sms";

const message = `Dear PATIENT, we regret to inform you that the clinic is currently running 45 minutes late.
If you can no longer make this, please phone the surgery to cancel your appointment`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { recipient } = req.query;

  if (typeof recipient !== "string") {
    res.status(400).json({});
    return;
  }

  await sendSms(recipient, message);

  res.status(200).json({});
}
