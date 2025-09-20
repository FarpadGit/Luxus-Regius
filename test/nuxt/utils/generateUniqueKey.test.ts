import { describe, expect, it } from "vitest";
import generateUniqueKey from "@app/utils/generateUniqueKey";
import { mockMenu } from "@test/mocks";

describe("generateUniqueKey", () => {
  it("always generates a unique id not found in a given list", () => {
    const iterationCount = 1000;
    const localMockMenu = structuredClone(mockMenu);
    const newItems = new Set<string>(mockMenu.map((m) => m.id));

    for (let i = 0; i < iterationCount; i++) {
      const id = generateUniqueKey(localMockMenu);
      localMockMenu.push({
        id,
        children: [],
        editMode: false,
        isRightColumn: false,
        level: 0,
        parent: null,
        text: "",
      });
      newItems.add(id);
    }

    expect(newItems.size).toBe(mockMenu.length + iterationCount);
    expect(localMockMenu).not.toEqual(mockMenu);
  });
});
