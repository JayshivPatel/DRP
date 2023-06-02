import { createAgent } from "../server/tests";
import { sendSms } from "../server/sms";

jest.mock("../server/sms");

const agent = createAgent("../pages/api/send");

describe("GET /api/send", () => {
  it("sends an SMS with the number of minutes", async () => {
    const response = await agent.post("/api/send").query({
      recipient: "+1234",
      lateness: "27",
    });

    expect(response.status).toEqual(200);
    expect(sendSms).toHaveBeenCalledTimes(1);
    expect(sendSms).toHaveBeenCalledWith(
      "+1234",
      expect.stringContaining("27 minutes late")
    );
  });

  it("responds with HTTP 400 if the lateness is not a number", async () => {
    const response = await agent.post("/api/send").query({
      recipient: "+1234",
      lateness: "hello",
    });

    expect(response.status).toEqual(400);
    expect(sendSms).toHaveBeenCalledTimes(0);
  });
});
