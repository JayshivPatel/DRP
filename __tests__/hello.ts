import { createAgent } from "../server/tests";

const agent = createAgent("../pages/api/hello");

describe("GET /api/hello", () => {
  it("responds with Hello World", async () => {
    const response = await agent.get("/api/hello");

    expect(response.status).toEqual(200);

    for (const item of response.body) {
      expect(item.name).toMatch(/^Hello, World:/);
    }
  });
});
