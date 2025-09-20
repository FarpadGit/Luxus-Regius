import { afterAll, afterEach, describe, expect, it, vi } from "vitest";
import {
  useH3TestUtils,
  createMockH3Event,
  mockDatabaseUtils,
} from "@test/nuxtMocks";

const { defineEventHandler } = useH3TestUtils();

describe("POST /api/menuItems", async () => {
  vi.mock("@app/../server/serverUtils", () => mockDatabaseUtils);

  // Dynamically import the handler *after* mocks are set up
  const handler = (await import("@app/../server/api/menuItems/[id].post"))
    .default;

  it("should register as an event handler", () => {
    expect(defineEventHandler).toHaveBeenCalled();
  });

  it("should write new menu information into database", async () => {
    const testID = "testID";
    const testBody = {
      newMenu: [{ mockMenu: true }],
      newTemplateData: { mockTemplate: true },
    };
    const event = createMockH3Event({
      params: { id: testID },
      body: testBody,
    });

    await handler(event);

    expect(mockDatabaseUtils.saveMenuToDB).toHaveBeenCalledWith(
      testID,
      JSON.stringify({
        template: testBody.newTemplateData,
        menu: testBody.newMenu,
      })
    );
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  afterAll(() => {
    vi.unstubAllGlobals();
  });
});
