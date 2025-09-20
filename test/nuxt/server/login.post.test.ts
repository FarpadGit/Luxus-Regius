import { afterAll, describe, expect, it, vi } from "vitest";
import { useH3TestUtils, createMockH3Event } from "@test/nuxtMocks";
import { mockNuxtImport } from "@nuxt/test-utils/runtime";

const { defineEventHandler } = useH3TestUtils();

describe("POST /api/menuItems/reset", async () => {
  const { fakeLoginPassword, mockRuntimeConfig } = vi.hoisted(() => {
    const fakeLoginPassword = "fakeLoginPassword";
    const fakeHashedPassword =
      "8051279d0f7161ade9ef17d1f0a33c5f8478d7ae5bc7c301d1b127655b5a42a2";
    return {
      fakeLoginPassword,
      mockRuntimeConfig: vi.fn(() => ({
        loginPassword: fakeHashedPassword,
      })),
    };
  });

  mockNuxtImport("useRuntimeConfig", () => mockRuntimeConfig);
  const handler = (await import("@app/../server/api/login.post")).default;

  it("should register as an event handler", () => {
    expect(defineEventHandler).toHaveBeenCalled();
  });

  it("should be able to authenticate with correct password", async () => {
    const event = createMockH3Event({
      body: { password: fakeLoginPassword },
    });

    const response = await handler(event);

    expect(response).toBe(true);
  });

  it("should reject authentication with incorrect password", async () => {
    const event = createMockH3Event({
      body: { password: "wrongPassword" },
    });

    const response = await handler(event);

    expect(response).toBe(false);
  });

  afterAll(() => {
    vi.unstubAllGlobals();
  });
});
