import type { NextApiRequest, NextApiResponse } from "next";

import { sendSms } from "../../server/sms";
import * as z from "zod";
import { routeHandler } from "../../server/handlers";

const postSchema = z.object({
  recipient: z.string(),
  lateness: z.number().positive(),
});

export default routeHandler({
  async POST(req: NextApiRequest, res: NextApiResponse) {
    const { recipient, lateness } = postSchema.parse(req.body);
    const message = `Dear PATIENT, we regret to inform you that the clinic is currently running ${lateness} minutes late.
If you can no longer make this, please phone the surgery to cancel your appointment`;

    await sendSms(recipient, message);

    res.status(200).json({});
  },
});
