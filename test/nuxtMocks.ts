import { vi } from "vitest";
import type { H3Event, EventHandlerRequest } from "h3";
import Empty from "@app/../server/assets/Empty.json";

export function createMockH3Event(
  partialEvent: Partial<H3Event> & {
    body?: Record<string, any>;
    params?: Record<string, any>;
    method?: "GET" | "POST";
  }
): H3Event {
  const event = {
    node: {
      req: {
        headers: { "content-type": "application/json" },
        method: partialEvent.method || "POST",
      },
    },
    context: {
      params: partialEvent.params || {},
    },
    // Our mock readBody function will look for this property
    _requestBody: partialEvent.body,
    ...partialEvent,
  } as unknown as H3Event;

  return event as H3Event;
}

type Handler = (event: H3Event<EventHandlerRequest>) => Promise<unknown>;

export function useH3TestUtils() {
  const h3 = vi.hoisted(() => ({
    defineEventHandler: vi.fn((handler: Handler) => handler),
    readBody: vi.fn(async (event: H3Event) => {
      if (event._requestBody && typeof event._requestBody === "string") {
        return JSON.parse(event._requestBody);
      }
      return event._requestBody || {};
    }),
    getRouterParam: vi.fn(
      (event: H3Event, key: string) => event.context?.params[key] || {}
    ),
  }));

  // Stubbing global auto-imported functions
  vi.stubGlobal("defineEventHandler", h3.defineEventHandler);
  vi.stubGlobal("readBody", h3.readBody);
  vi.stubGlobal("getRouterParam", h3.getRouterParam);

  return h3;
}

export const mockDatabaseUtils = {
  addMenuProperties: vi.fn(() => [{ mock: true }]),
  getMenuFromDB: vi.fn(() => Promise.resolve(Empty)),
  saveMenuToDB: vi.fn(() => Promise.resolve()),
  resetMenuInDB: vi.fn(() => Promise.resolve({ mockReset: true, ...Empty })),
};
