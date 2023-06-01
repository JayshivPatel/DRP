import type { NextApiRequest, NextApiResponse } from "next";

import { sendSms } from "../../server/sms";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { recipient, lateness } = req.query;

  if (
    typeof recipient !== "string" ||
    typeof lateness !== "string" ||
    Number.isNaN(parseInt(lateness))
  ) {
    res.status(400).json({});
    return;
  }

  const message = `Dear PATIENT, we regret to inform you that the clinic is currently running ${lateness} minutes late.
If you can no longer make this, please phone the surgery to cancel your appointment`;

  await sendSms(recipient, message);

  res.status(200).json({});
}
