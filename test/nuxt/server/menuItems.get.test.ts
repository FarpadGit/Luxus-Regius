import { afterAll, afterEach, describe, expect, it, vi } from "vitest";
import {
  useH3TestUtils,
  createMockH3Event,
  mockDatabaseUtils,
} from "@test/nuxtMocks";
import Empty from "@app/../server/assets/Empty.json";

const { defineEventHandler } = useH3TestUtils();

describe("GET /api/menuItems", async () => {
  vi.mock("@app/../server/serverUtils", () => mockDatabaseUtils);

  // Dynamically import the handler *after* mocks are set up
  const handler = (await import("@app/../server/api/menuItems/[id].get"))
    .default;

  it("should register as an event handler", () => {
    expect(defineEventHandler).toHaveBeenCalled();
  });

  it("should retrieve a JSON object from database and add client side properties to it", async () => {
    const expectedValue = {
      ...Empty,
      menu: [{ mock: true }],
    };
    const event = createMockH3Event({
      params: { id: "testID" },
      method: "GET",
    });

    const response = await handler(event);

    expect(response).toEqual(expectedValue);
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  afterAll(() => {
    vi.unstubAllGlobals();
  });
});
