import { afterAll, afterEach, describe, expect, it, vi } from "vitest";
import {
  useH3TestUtils,
  createMockH3Event,
  mockDatabaseUtils,
} from "@test/nuxtMocks";

const { defineEventHandler } = useH3TestUtils();

describe("POST /api/menuItems/reset", async () => {
  vi.mock("@app/../server/serverUtils", () => mockDatabaseUtils);

  // Dynamically import the handler *after* mocks are set up
  const handler = (await import("@app/../server/api/menuItems/reset/[id].post"))
    .default;

  it("should register as an event handler", () => {
    expect(defineEventHandler).toHaveBeenCalled();
  });

  it("should reset database", async () => {
    const testID = "testID";
    const event = createMockH3Event({
      params: { id: testID },
    });

    const response = await handler(event);

    expect(mockDatabaseUtils.resetMenuInDB).toHaveBeenCalledWith(testID);
    expect(response).toEqual(
      expect.objectContaining({
        mockReset: true,
      })
    );
  });

  it("should return error while trying to reset database", async () => {
    const testID = "testID";
    const event = createMockH3Event({
      params: { id: testID },
    });
    mockDatabaseUtils.resetMenuInDB.mockResolvedValueOnce(null);

    const response = await handler(event);

    expect(mockDatabaseUtils.resetMenuInDB).toHaveBeenCalledWith(testID);
    expect(response.error).toBeTypeOf("string");
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  afterAll(() => {
    vi.unstubAllGlobals();
  });
});
